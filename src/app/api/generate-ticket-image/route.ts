import { NextRequest, NextResponse } from 'next/server';
import { generateTicketPNG, TicketData } from '@/lib/generateTicket';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventTitle, firstName, lastName, rollNumber, registrationId, attendanceHash } = body;

    if (!eventTitle || !firstName || !lastName || !rollNumber || !registrationId || !attendanceHash) {
      return NextResponse.json(
        { success: false, error: 'Missing required data' },
        { status: 400 }
      );
    }

    const ticketData: TicketData = {
      eventTitle,
      firstName,
      lastName,
      rollNumber,
      registrationId: registrationId.slice(0, 10).toUpperCase(),
      attendanceHash,
    };

    // Generate PNG ticket
    const pngBuffer = await generateTicketPNG(ticketData);

    // Return PNG as blob
    return new NextResponse(pngBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="Ticket_${eventTitle.replace(/[^a-zA-Z0-9]/g, '_')}_${rollNumber}.png"`,
      },
    });

  } catch (error) {
    console.error('Ticket PNG generation error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate ticket image. Please try again.' 
      },
      { status: 500 }
    );
  }
}
