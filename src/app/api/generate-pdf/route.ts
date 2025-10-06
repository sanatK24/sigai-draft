import { NextRequest, NextResponse } from 'next/server';
import { generateRegistrationPDF, RegistrationData } from '@/lib/generatePDF';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { registrationData, attendanceHash, registrationId } = body;

    if (!registrationData || !attendanceHash || !registrationId) {
      return NextResponse.json(
        { success: false, error: 'Missing required data' },
        { status: 400 }
      );
    }

    // Generate PDF buffer
    const pdfBuffer = await generateRegistrationPDF(
      registrationData as RegistrationData,
      attendanceHash,
      registrationId
    );

    // Return PDF as blob
    return new NextResponse(pdfBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${registrationData.eventTitle.replace(/[^a-zA-Z0-9]/g, '_')}_${registrationData.rollNumber}.pdf"`,
      },
    });

  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate PDF. Please try again.' 
      },
      { status: 500 }
    );
  }
}
