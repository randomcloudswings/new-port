import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { sendEmail } from '@/lib/emailjs'
import { useToast } from '@/hooks/useToastContext'

gsap.registerPlugin(ScrollTrigger)

export function Contact() {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const formRef = useRef(null)
  const nameFieldRef = useRef(null)
  const emailFieldRef = useRef(null)
  const messageFieldRef = useRef(null)
  const buttonRef = useRef(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { toast } = useToast()

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      gsap.set(
        [
          titleRef.current,
          nameFieldRef.current,
          emailFieldRef.current,
          messageFieldRef.current,
          buttonRef.current,
        ],
        {
          opacity: 1,
          y: 0,
          scale: 1,
        }
      )
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -50, rotation: -3 },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      const formElements = [
        nameFieldRef.current,
        emailFieldRef.current,
        messageFieldRef.current,
        buttonRef.current,
      ]

      gsap.fromTo(
        formElements,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const validateField = (name, value) => {
    if (name === 'name') {
      if (!value.trim()) {
        return 'Name is required'
      }
      if (value.trim().length < 2) {
        return 'Name must be at least 2 characters'
      }
      return ''
    }

    if (name === 'email') {
      if (!value.trim()) {
        return 'Email is required'
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address'
      }
      return ''
    }

    if (name === 'message') {
      if (!value.trim()) {
        return 'Message is required'
      }
      if (value.trim().length < 10) {
        return 'Message must be at least 10 characters'
      }
      return ''
    }

    return ''
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (touched[name]) {
      const error = validateField(name, value)
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const handleFocus = (e) => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (!prefersReducedMotion) {
      gsap.to(e.target, {
        scale: 1.02,
        duration: 0.2,
        ease: 'power2.out',
      })
    }
  }

  const handleFocusOut = (e) => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (!prefersReducedMotion) {
      gsap.to(e.target, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.out',
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message),
    }

    setErrors(newErrors)
    setTouched({ name: true, email: true, message: true })

    if (Object.values(newErrors).some((error) => error !== '')) {
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors in the form',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)

    try {
      const result = await sendEmail({
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      })

      if (result.success) {
        toast({
          title: 'Success!',
          description: 'Your message has been sent successfully',
          variant: 'success',
        })

        setFormData({ name: '', email: '', message: '' })
        setTouched({})
        setErrors({})
      } else {
        toast({
          title: 'Error',
          description: 'Failed to send message. Please try again.',
          variant: 'destructive',
        })
      }
    } catch {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center px-6 py-20"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto w-full max-w-2xl">
        <h2
          id="contact-heading"
          ref={titleRef}
          className="text-accent-light mb-12 text-center text-5xl font-bold md:text-6xl lg:text-7xl"
        >
          Get In Touch
        </h2>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-6"
          noValidate
          aria-label="Contact form"
        >
          <div ref={nameFieldRef}>
            <Label htmlFor="name">
              Name <span aria-label="required">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onBlurCapture={handleFocusOut}
              aria-invalid={touched.name && errors.name ? 'true' : 'false'}
              aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
              disabled={isSubmitting}
              placeholder="Your name"
              autoComplete="name"
            />
            {touched.name && errors.name && (
              <p
                id="name-error"
                className="text-destructive mt-2 text-sm"
                role="alert"
                aria-live="polite"
              >
                {errors.name}
              </p>
            )}
          </div>

          <div ref={emailFieldRef}>
            <Label htmlFor="email">
              Email <span aria-label="required">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onBlurCapture={handleFocusOut}
              aria-invalid={touched.email && errors.email ? 'true' : 'false'}
              aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
              disabled={isSubmitting}
              placeholder="your.email@example.com"
              autoComplete="email"
            />
            {touched.email && errors.email && (
              <p
                id="email-error"
                className="text-destructive mt-2 text-sm"
                role="alert"
                aria-live="polite"
              >
                {errors.email}
              </p>
            )}
          </div>

          <div ref={messageFieldRef}>
            <Label htmlFor="message">
              Message <span aria-label="required">*</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onBlurCapture={handleFocusOut}
              aria-invalid={touched.message && errors.message ? 'true' : 'false'}
              aria-describedby={
                touched.message && errors.message ? 'message-error' : undefined
              }
              disabled={isSubmitting}
              placeholder="Your message..."
              rows={6}
            />
            {touched.message && errors.message && (
              <p
                id="message-error"
                className="text-destructive mt-2 text-sm"
                role="alert"
                aria-live="polite"
              >
                {errors.message}
              </p>
            )}
          </div>

          <div ref={buttonRef}>
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full"
              aria-busy={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
