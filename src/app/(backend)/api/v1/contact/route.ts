import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '@/libs/mail';

export async function POST(request: NextRequest) {
  try {
    // Get the request body
    const body = await request.json();
    const { name, email, phone, content } = body;

    // Validate required fields
    if (!name || !email || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and content are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send email using TLS SMTP
    const emailSent = await sendContactEmail({ name, email, phone, content });

    if (!emailSent) {
      console.error('Failed to send contact form email');
      return NextResponse.json(
        { error: 'Failed to send email notification' },
        { status: 500 }
      );
    }

    console.log('Contact form submission processed and email sent:', { name, email, phone, content });

    // Return success response
    return NextResponse.json(
      {
        message: 'Contact form submitted successfully',
        emailSent: true
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    );
  }
}