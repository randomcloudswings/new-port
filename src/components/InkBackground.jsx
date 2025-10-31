import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function InkBackground() {
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    sceneRef.current = scene
    rendererRef.current = renderer

    const vertexShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      varying vec2 vUv;
      
      void main() {
        vUv = uv;
        vec3 pos = position;
        
        float distToMouse = distance(uv, uMouse);
        float wave = sin(distToMouse * 10.0 - uTime * 2.0) * 0.1;
        pos.z += wave * (1.0 - distToMouse);
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `

    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      varying vec2 vUv;
      
      vec3 palette(float t) {
        vec3 a = vec3(0.047, 0.047, 0.055);
        vec3 b = vec3(0.267, 0.267, 0.306);
        vec3 c = vec3(0.443, 0.353, 0.353);
        vec3 d = vec3(0.827, 0.855, 0.851);
        return a + b * cos(6.28318 * (c * t + d));
      }
      
      void main() {
        vec2 uv = vUv * 2.0 - 1.0;
        vec2 uv0 = uv;
        vec3 finalColor = vec3(0.0);
        
        for (float i = 0.0; i < 3.0; i++) {
          uv = fract(uv * 1.5) - 0.5;
          
          float d = length(uv) * exp(-length(uv0));
          vec3 col = palette(length(uv0) + i * 0.4 + uTime * 0.1);
          
          d = sin(d * 8.0 + uTime * 0.5) / 8.0;
          d = abs(d);
          d = pow(0.01 / d, 1.2);
          
          finalColor += col * d;
        }
        
        float distToMouse = distance(vUv, uMouse);
        float mouseInfluence = smoothstep(0.5, 0.0, distToMouse);
        finalColor += vec3(0.443, 0.353, 0.353) * mouseInfluence * 0.3;
        
        gl_FragColor = vec4(finalColor * 0.15, 0.8);
      }
    `

    const geometry = new THREE.PlaneGeometry(10, 10, 128, 128)
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const mousePosition = { x: 0.5, y: 0.5 }

    const handleMouseMove = (event) => {
      mousePosition.x = event.clientX / window.innerWidth
      mousePosition.y = 1.0 - event.clientY / window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove)

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    window.addEventListener('resize', handleResize)

    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      material.uniforms.uTime.value = elapsedTime
      material.uniforms.uMouse.value.lerp(
        new THREE.Vector2(mousePosition.x, mousePosition.y),
        0.05
      )

      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 h-full w-full" />
}
