import { Resend } from "resend";

// Only throw error in production, allow dev mode without key for testing
const resendKey = process.env.RESEND_API_KEY || "";

export const resend = resendKey ? new Resend(resendKey) : null;

// Email configuration
export const EMAIL_CONFIG = {
  from: process.env.EMAIL_FROM || "onboarding@resend.dev",
  to: process.env.EMAIL_TO || "your-email@example.com",
};

// Email template for new contact form submissions
export function createContactEmailHtml({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
  </div>
  
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <h2 style="color: #667eea; margin-top: 0; font-size: 18px;">Contact Information</h2>
      <p style="margin: 10px 0;">
        <strong style="color: #555;">Name:</strong><br/>
        <span style="font-size: 16px;">${name}</span>
      </p>
      <p style="margin: 10px 0;">
        <strong style="color: #555;">Email:</strong><br/>
        <a href="mailto:${email}" style="color: #667eea; text-decoration: none; font-size: 16px;">${email}</a>
      </p>
    </div>
    
    <div style="background: white; padding: 20px; border-radius: 8px;">
      <h2 style="color: #667eea; margin-top: 0; font-size: 18px;">Message</h2>
      <p style="margin: 0; white-space: pre-wrap; font-size: 15px; line-height: 1.6;">${message}</p>
    </div>
    
    <div style="margin-top: 20px; padding: 15px; background: #e8f4f8; border-left: 4px solid #667eea; border-radius: 4px;">
      <p style="margin: 0; font-size: 13px; color: #555;">
        <strong>Quick Action:</strong> Reply directly to <a href="mailto:${email}" style="color: #667eea;">${email}</a>
      </p>
    </div>
  </div>
  
  <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
    <p>This email was sent from your Global Cooperation (Private) Limited website contact form.</p>
  </div>
</body>
</html>
  `.trim();
}

// Plain text version for email clients that don't support HTML
export function createContactEmailText({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  return `
New Contact Form Submission
===========================

Name: ${name}
Email: ${email}

Message:
${message}

---
Reply to: ${email}
  `.trim();
}
