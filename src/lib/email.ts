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

// Sends the CV password to a recipient's email using a dedicated EmailJS template.
// Requires env vars: VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_CV_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY, VITE_CV_PASSWORD
export const sendCvPasswordEmail = async (recipientEmail: string): Promise<{ success: boolean; message: string }> => {
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
    const templateId = import.meta.env.VITE_EMAILJS_CV_TEMPLATE_ID as string | undefined;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;
    const password = import.meta.env.VITE_CV_PASSWORD as string | undefined;

    if (!serviceId || !templateId || !publicKey) {
      throw new Error('EmailJS configuration for CV password is missing.');
    }
    if (!password) {
      throw new Error('CV password is not configured. Set VITE_CV_PASSWORD in your env.');
    }
    if (!recipientEmail) {
      throw new Error('Please provide a valid email address.');
    }

    const result = await emailjs.send(
      serviceId,
      templateId,
      {
        to_email: recipientEmail,
        password,
      },
      publicKey
    );

    if (result.status === 200) {
      return { success: true, message: 'Password sent to your email.' };
    } else {
      throw new Error('Failed to send password email');
    }
  } catch (error) {
    console.error('CV password email error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send password. Please try again.'
    };
  }
}; 