import emailjs from 'emailjs-com';

export interface EmailFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendEmail = async (formData: EmailFormData): Promise<{ success: boolean; message: string }> => {
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      throw new Error('EmailJS configuration is missing. Please check your environment variables.');
    }

    const result = await emailjs.send(
      serviceId,
      templateId,
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      },
      publicKey
    );

    if (result.status === 200) {
      return { success: true, message: 'Message sent successfully!' };
    } else {
      throw new Error('Failed to send message');
    }
  } catch (error) {
    console.error('Email sending error:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to send message. Please try again.' 
    };
  }
}; 