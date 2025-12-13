import { NextRequest, NextResponse } from 'next/server';

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

    // You can add your business logic here, such as:
    // - Sending the data to a database
    // - Sending an email notification
    // - Forwarding to another service
    console.log('Contact form submission:', { name, email, phone, content });

    // For now, just return a success response
    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
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