import { Resend } from 'resend';

// Check if the API key exists
if (!process.env.RESEND_API_KEY) {
  console.warn('RESEND_API_KEY is not defined in your environment variables');
}

// Initialize the Resend client with the API key from environment variables
export const resend = new Resend(process.env.RESEND_API_KEY);