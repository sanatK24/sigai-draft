import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import { createCanvas, loadImage, CanvasRenderingContext2D as NodeCanvasRenderingContext2D } from 'canvas';

export interface TicketData {
  eventTitle: string;
  firstName: string;
  lastName: string;
  rollNumber: string;
  registrationId: string;
  attendanceHash: string;
}

/**
 * Generate a landscape ticket PDF with black background
 * Ticket design: Two-part style with dark main section and light stub
 */
export async function generateTicketPDF(ticketData: TicketData): Promise<Buffer> {
  try {
    // Create landscape PDF with black background
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Black background
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Calculate ticket dimensions (centered)
    const ticketWidth = 240; // mm
    const ticketHeight = 100; // mm
    const ticketX = (pageWidth - ticketWidth) / 2;
    const ticketY = (pageHeight - ticketHeight) / 2;

    // Part 1: Main Ticket Section (Left) - Dark theme
    const mainSectionWidth = ticketWidth * 0.70; // 70% for main section
    
    // Dark background with subtle gradient effect
    doc.setFillColor(18, 18, 18); // Very dark gray
    doc.roundedRect(ticketX, ticketY, mainSectionWidth, ticketHeight, 3, 3, 'F');

    // Add decorative accent line on left edge
    doc.setFillColor(59, 130, 246); // Blue accent
    doc.rect(ticketX, ticketY + 10, 3, ticketHeight - 20, 'F');

    // Add decorative pattern (optional geometric design)
    doc.setDrawColor(59, 130, 246);
    doc.setLineWidth(0.3);
    for (let i = 0; i < 5; i++) {
      const x = ticketX + mainSectionWidth - 40 - (i * 8);
      const y1 = ticketY + 15;
      const y2 = ticketY + 35;
      doc.line(x, y1, x - 10, y2);
    }

    // Event Title - Large and prominent
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    const eventTitle = ticketData.eventTitle;
    doc.text(eventTitle, ticketX + 12, ticketY + 20, { maxWidth: mainSectionWidth - 70 });

    // Organizer info
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(156, 163, 175); // Light gray
    doc.text('Hosted by RAIT ACM SIGAI Student Chapter', ticketX + 12, ticketY + 30);

    // Attendee section
    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175);
    doc.text('ATTENDEE', ticketX + 12, ticketY + 42);
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    const attendeeName = `${ticketData.firstName} ${ticketData.lastName}`;
    doc.text(attendeeName, ticketX + 12, ticketY + 50);

    // QR Code Section
    const qrSize = 50;
    const qrX = ticketX + 12;
    const qrY = ticketY + ticketHeight - qrSize - 18;

    // Generate QR Code for attendance
    const qrCodeDataURL = await QRCode.toDataURL(ticketData.attendanceHash, {
      width: 400,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'H'
    });

    // White background for QR
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(qrX - 2, qrY - 2, qrSize + 4, qrSize + 4, 2, 2, 'F');
    
    doc.addImage(qrCodeDataURL, 'PNG', qrX, qrY, qrSize, qrSize);

    // QR instruction text
    doc.setFontSize(7);
    doc.setTextColor(156, 163, 175);
    doc.text('Scan this code at the', qrX + qrSize + 5, qrY + 15);
    doc.text('event for attendance', qrX + qrSize + 5, qrY + 20);

    // Part 2: Ticket Stub (Right) - Light theme
    const stubWidth = ticketWidth * 0.30; // 30% for stub
    const stubX = ticketX + mainSectionWidth;

    // Light gray/white background for stub
    doc.setFillColor(243, 244, 246);
    doc.roundedRect(stubX, ticketY, stubWidth, ticketHeight, 3, 3, 'F');

    // Perforated line effect between sections (dashed line simulation)
    doc.setDrawColor(107, 114, 128);
    doc.setLineWidth(0.5);
    // Simulate dashed line with small segments
    for (let i = ticketY + 5; i < ticketY + ticketHeight - 5; i += 4) {
      doc.line(stubX, i, stubX, i + 2);
    }

    // Stub header
    doc.setFillColor(59, 130, 246);
    doc.rect(stubX, ticketY, stubWidth, 15, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Ticket ID', stubX + stubWidth / 2, ticketY + 10, { align: 'center' });

    // Registration ID
    doc.setTextColor(31, 41, 55);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('REGISTRATION ID', stubX + 8, ticketY + 28);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(59, 130, 246);
    doc.text(ticketData.registrationId, stubX + 8, ticketY + 36);

    // Roll Number
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(31, 41, 55);
    doc.text('ROLL NUMBER', stubX + 8, ticketY + 50);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(31, 41, 55);
    doc.text(ticketData.rollNumber, stubX + 8, ticketY + 58);

    // Small QR code on stub (duplicate for verification)
    const stubQrSize = 25;
    const stubQrX = stubX + (stubWidth - stubQrSize) / 2;
    const stubQrY = ticketY + ticketHeight - stubQrSize - 10;
    
    doc.addImage(qrCodeDataURL, 'PNG', stubQrX, stubQrY, stubQrSize, stubQrSize);

    // Footer text on stub
    doc.setFontSize(6);
    doc.setTextColor(107, 114, 128);
    doc.text('Keep this ticket', stubX + stubWidth / 2, ticketY + ticketHeight - 3, { align: 'center' });

    // Return PDF as buffer
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
    return pdfBuffer;

  } catch (error) {
    console.error('Error generating ticket PDF:', error);
    throw new Error('Failed to generate ticket PDF');
  }
}

/**
 * Generate a PNG image of the ticket with transparent background
 * This excludes the black PDF background and only renders the ticket card
 */
export async function generateTicketPNG(ticketData: TicketData): Promise<Buffer> {
  try {
    // Canvas dimensions (ticket only, no page background)
    const ticketWidth = 900; // px (increased for high resolution)
    const ticketHeight = 375; // px
    
    const canvas = createCanvas(ticketWidth, ticketHeight);
    const ctx = canvas.getContext('2d') as unknown as NodeCanvasRenderingContext2D;

    // Transparent background (no black page)
    ctx.clearRect(0, 0, ticketWidth, ticketHeight);

    // Calculate sections
    const mainSectionWidth = ticketWidth * 0.70;
    const stubWidth = ticketWidth * 0.30;

    // Part 1: Main Section - Dark background
    ctx.fillStyle = '#121212';
    roundRect(ctx, 0, 0, mainSectionWidth, ticketHeight, 10);
    ctx.fill();

    // Blue accent line on left
    ctx.fillStyle = '#3B82F6';
    ctx.fillRect(0, 40, 10, ticketHeight - 80);

    // Decorative pattern
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 2;
    for (let i = 0; i < 5; i++) {
      const x = mainSectionWidth - 150 - (i * 30);
      const y1 = 50;
      const y2 = 130;
      ctx.beginPath();
      ctx.moveTo(x, y1);
      ctx.lineTo(x - 40, y2);
      ctx.stroke();
    }

    // Event Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 32px Arial';
    wrapText(ctx, ticketData.eventTitle, 45, 75, mainSectionWidth - 280, 40);

    // Organizer
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '16px Arial';
    ctx.fillText('Hosted by RAIT ACM SIGAI Student Chapter', 45, 115);

    // Attendee label
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '14px Arial';
    ctx.fillText('ATTENDEE', 45, 160);

    // Attendee name
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 26px Arial';
    const attendeeName = `${ticketData.firstName} ${ticketData.lastName}`;
    ctx.fillText(attendeeName, 45, 190);

    // Generate QR Code
    const qrCodeDataURL = await QRCode.toDataURL(ticketData.attendanceHash, {
      width: 600,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'H'
    });

    const qrImage = await loadImage(qrCodeDataURL);
    const qrSize = 150;
    const qrX = 45;
    const qrY = ticketHeight - qrSize - 30;

    // White background for QR
    ctx.fillStyle = '#FFFFFF';
    roundRect(ctx, qrX - 5, qrY - 5, qrSize + 10, qrSize + 10, 8);
    ctx.fill();

    ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize);

    // QR instruction
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '13px Arial';
    ctx.fillText('Scan this code at the', qrX + qrSize + 15, qrY + 55);
    ctx.fillText('event for attendance', qrX + qrSize + 15, qrY + 75);

    // Part 2: Stub Section - Light background
    const stubX = mainSectionWidth;
    ctx.fillStyle = '#F3F4F6';
    roundRect(ctx, stubX, 0, stubWidth, ticketHeight, 10);
    ctx.fill();

    // Perforated line
    ctx.strokeStyle = '#6B7280';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.moveTo(stubX, 20);
    ctx.lineTo(stubX, ticketHeight - 20);
    ctx.stroke();
    ctx.setLineDash([]);

    // Stub header
    ctx.fillStyle = '#3B82F6';
    ctx.fillRect(stubX, 0, stubWidth, 55);
    
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Ticket ID', stubX + stubWidth / 2, 35);
    ctx.textAlign = 'left';

    // Registration ID
    ctx.fillStyle = '#1F2937';
    ctx.font = '14px Arial';
    ctx.fillText('REGISTRATION ID', stubX + 25, 90);
    
    ctx.fillStyle = '#3B82F6';
    ctx.font = 'bold 18px Arial';
    ctx.fillText(ticketData.registrationId, stubX + 25, 115);

    // Roll Number
    ctx.fillStyle = '#1F2937';
    ctx.font = '14px Arial';
    ctx.fillText('ROLL NUMBER', stubX + 25, 155);
    
    ctx.fillStyle = '#1F2937';
    ctx.font = 'bold 18px Arial';
    ctx.fillText(ticketData.rollNumber, stubX + 25, 180);

    // Small QR on stub
    const stubQrSize = 90;
    const stubQrX = stubX + (stubWidth - stubQrSize) / 2;
    const stubQrY = ticketHeight - stubQrSize - 30;
    ctx.drawImage(qrImage, stubQrX, stubQrY, stubQrSize, stubQrSize);

    // Footer text
    ctx.fillStyle = '#6B7280';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Keep this ticket', stubX + stubWidth / 2, ticketHeight - 10);

    // Convert canvas to buffer
    return canvas.toBuffer('image/png');

  } catch (error) {
    console.error('Error generating ticket PNG:', error);
    throw new Error('Failed to generate ticket PNG');
  }
}

// Helper function to draw rounded rectangles
function roundRect(
  ctx: NodeCanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

// Helper function to wrap text
function wrapText(
  ctx: NodeCanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
}
