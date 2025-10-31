import emailjs from '@emailjs/browser'

export const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
}

export async function sendEmail(formData) {
  try {
    const response = await emailjs.send(
      emailConfig.serviceId,
      emailConfig.templateId,
      formData,
      emailConfig.publicKey
    )
    return { success: true, response }
  } catch (error) {
    console.error('EmailJS Error:', error)
    return { success: false, error }
  }
}
