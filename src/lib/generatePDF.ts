import jsPDF from 'jspdf';
import QRCode from 'qrcode';

export interface RegistrationData {
  eventTitle: string;
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  rollNumber: string;
  branch: string;
  year: string;
  division: string;
  isAcmMember: boolean;
  membershipId: string | null;
  transactionId: string;
  feeAmount: number;
  registrationDate: string;
}

export async function generateRegistrationPDF(
  registrationData: RegistrationData,
  attendanceHash: string,
  registrationId: string
): Promise<Buffer> {
  try {
    // Create new PDF - LANDSCAPE orientation with black background
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Black background for entire page
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Modern Color Palette
    const colors = {
      darkBg: [17, 24, 39] as [number, number, number], // Dark gray-900
      lightBg: [243, 244, 246] as [number, number, number], // Light gray-100
      accent: [59, 130, 246] as [number, number, number], // Blue-500
      accentLight: [147, 197, 253] as [number, number, number], // Blue-300
      white: [255, 255, 255] as [number, number, number],
      textDark: [31, 41, 55] as [number, number, number],
      textLight: [156, 163, 175] as [number, number, number],
      border: [75, 85, 99] as [number, number, number], // Gray-600
    };

    // Ticket card dimensions (centered on page)
    const ticketWidth = 240;
    const ticketHeight = 120;
    const ticketX = (pageWidth - ticketWidth) / 2;
    const ticketY = 25;

    // Stub width (right section)
    const stubWidth = 70;
    const mainSectionWidth = ticketWidth - stubWidth;

    // ========== MAIN TICKET SECTION (LEFT - DARK THEME) ==========
    doc.setFillColor(...colors.darkBg);
    doc.roundedRect(ticketX, ticketY, mainSectionWidth, ticketHeight, 3, 3, 'F');

    let currentY = ticketY + 8;

    // SIGAI Logo in top-left corner (transparent background will blend with dark theme)
    // Logo placeholder - will need to be loaded as base64 or from URL
    try {
      // Add small logo in corner
      const logoSize = 12;
      // Note: Logo should be added here via doc.addImage() with base64 or URL
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...colors.accentLight);
      doc.text('SIGAI', ticketX + 8, currentY + 3);
      currentY += logoSize + 2;
    } catch (e) {
      currentY += 6;
    }

    // Event Title
    doc.setTextColor(...colors.white);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    const eventTitle = registrationData.eventTitle;
    const titleLines = doc.splitTextToSize(eventTitle, mainSectionWidth - 20);
    doc.text(titleLines, ticketX + 10, currentY);
    currentY += titleLines.length * 6.5 + 2;

    // Organizer
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...colors.textLight);
    doc.text('Hosted by RAIT ACM SIGAI Student Chapter', ticketX + 10, currentY);
    currentY += 8;

    // Event Details (Date, Time, Location)
    if (registrationData.eventDate || registrationData.eventTime || registrationData.eventLocation) {
      doc.setFontSize(8);
      doc.setTextColor(...colors.accentLight);
      let detailsText = '';
      if (registrationData.eventDate) detailsText += registrationData.eventDate;
      if (registrationData.eventTime) detailsText += (detailsText ? ' • ' : '') + registrationData.eventTime;
      if (registrationData.eventLocation) {
        doc.text(detailsText, ticketX + 10, currentY);
        currentY += 4;
        doc.text(registrationData.eventLocation, ticketX + 10, currentY);
        currentY += 6;
      } else {
        doc.text(detailsText, ticketX + 10, currentY);
        currentY += 6;
      }
    }

    // Divider line
    doc.setDrawColor(...colors.border);
    doc.setLineWidth(0.2);
    doc.line(ticketX + 10, currentY, ticketX + mainSectionWidth - 10, currentY);
    currentY += 5;

    // Attendee Name
    doc.setFontSize(8);
    doc.setTextColor(...colors.accentLight);
    doc.text('ATTENDEE', ticketX + 10, currentY);
    currentY += 5;
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...colors.white);
    doc.text(`${registrationData.firstName} ${registrationData.lastName}`, ticketX + 10, currentY);
    currentY += 5;

    // Branch and Year
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...colors.textLight);
    doc.text(`${registrationData.branch} • ${registrationData.year} • Roll: ${registrationData.rollNumber}`, ticketX + 10, currentY);
    currentY += 8;

    // QR Code Section (bottom left)
    const qrY = ticketY + ticketHeight - 42;
    doc.setFontSize(8);
    doc.setTextColor(...colors.accentLight);
    doc.text('ATTENDANCE QR CODE', ticketX + 10, qrY);
    
    doc.setFontSize(7);
    doc.setTextColor(...colors.textLight);
    doc.text('Scan at event entrance', ticketX + 10, qrY + 3.5);

    // Generate and add QR Code
    const qrCodeDataURL = await QRCode.toDataURL(attendanceHash, {
      width: 400,
      margin: 1,
      color: {
        dark: '#3B82F6',
        light: '#111827'
      },
      errorCorrectionLevel: 'H'
    });

    const qrSize = 32;
    doc.addImage(qrCodeDataURL, 'PNG', ticketX + 10, qrY + 5, qrSize, qrSize);

    // Decorative accent line on left edge
    doc.setFillColor(...colors.accent);
    doc.rect(ticketX, ticketY, 3, ticketHeight, 'F');

    // ========== PERFORATION LINE ==========
    const perforationX = ticketX + mainSectionWidth;
    doc.setDrawColor(...colors.border);
    doc.setLineWidth(0.3);
    doc.setFillColor(...colors.border);
    // Create dashed line effect with small circles
    for (let i = ticketY + 5; i < ticketY + ticketHeight - 5; i += 3) {
      doc.circle(perforationX, i, 0.5, 'F');
    }

    // ========== TICKET STUB (RIGHT - LIGHT THEME) ==========
    doc.setFillColor(...colors.lightBg);
    doc.roundedRect(perforationX, ticketY, stubWidth, ticketHeight, 3, 3, 'F');

    // SIGAI Logo in stub (top center)
    const stubCenterX = perforationX + stubWidth / 2;
    let stubY = ticketY + 12;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...colors.accent);
    doc.text('SIGAI', stubCenterX, stubY, { align: 'center' });
    stubY += 8;

    // Registration ID
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...colors.textLight);
    doc.text('REGISTRATION ID', stubCenterX, stubY, { align: 'center' });
    stubY += 4;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...colors.textDark);
    const shortRegId = registrationId.slice(0, 10).toUpperCase();
    doc.text(shortRegId, stubCenterX, stubY, { align: 'center' });
    stubY += 10;

    // Roll Number
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...colors.textLight);
    doc.text('ROLL NUMBER', stubCenterX, stubY, { align: 'center' });
    stubY += 4;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...colors.textDark);
    doc.text(registrationData.rollNumber, stubCenterX, stubY, { align: 'center' });
    stubY += 10;

    // Attendee Name (abbreviated if too long)
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...colors.textLight);
    doc.text('ATTENDEE', stubCenterX, stubY, { align: 'center' });
    stubY += 4;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...colors.textDark);
    const fullName = `${registrationData.firstName} ${registrationData.lastName}`;
    const abbreviatedName = fullName.length > 20 ? fullName.substring(0, 18) + '...' : fullName;
    doc.text(abbreviatedName, stubCenterX, stubY, { align: 'center' });
    stubY += 10;

    // Transaction ID (smaller)
    doc.setFontSize(6);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...colors.textLight);
    doc.text('TXN: ' + registrationData.transactionId.substring(0, 10), stubCenterX, stubY, { align: 'center' });
    stubY += 6;

    // Amount Paid
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...colors.accent);
    doc.text(`₹${registrationData.feeAmount}`, stubCenterX, stubY, { align: 'center' });

    // Decorative accent line on right edge
    doc.setFillColor(...colors.accent);
    doc.rect(ticketX + ticketWidth - 3, ticketY, 3, ticketHeight, 'F');

    // ========== REGISTERED DETAILS SECTION (BELOW TICKET) ==========
    let detailsY = ticketY + ticketHeight + 12;
    
    // Section Title
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(200, 200, 200);
    doc.text('REGISTRATION DETAILS', ticketX, detailsY);
    detailsY += 6;

    // Details in two columns
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(160, 160, 160);

    const col1X = ticketX;
    const col2X = ticketX + 80;
    const col3X = ticketX + 160;

    // Column 1
    doc.text('Email:', col1X, detailsY);
    doc.setTextColor(200, 200, 200);
    doc.text(registrationData.email, col1X, detailsY + 3.5);
    
    doc.setTextColor(160, 160, 160);
    doc.text('Phone:', col1X, detailsY + 9);
    doc.setTextColor(200, 200, 200);
    doc.text(registrationData.phone, col1X, detailsY + 12.5);

    // Column 2
    doc.setTextColor(160, 160, 160);
    doc.text('Branch:', col2X, detailsY);
    doc.setTextColor(200, 200, 200);
    doc.text(registrationData.branch, col2X, detailsY + 3.5);
    
    doc.setTextColor(160, 160, 160);
    doc.text('Year & Division:', col2X, detailsY + 9);
    doc.setTextColor(200, 200, 200);
    doc.text(`${registrationData.year} - ${registrationData.division || 'N/A'}`, col2X, detailsY + 12.5);

    // Column 3
    doc.setTextColor(160, 160, 160);
    doc.text('ACM Member:', col3X, detailsY);
    doc.setTextColor(200, 200, 200);
    doc.text(registrationData.isAcmMember ? 'Yes' : 'No', col3X, detailsY + 3.5);
    
    if (registrationData.isAcmMember && registrationData.membershipId) {
      doc.setTextColor(160, 160, 160);
      doc.text('Membership ID:', col3X, detailsY + 9);
      doc.setTextColor(200, 200, 200);
      doc.text(registrationData.membershipId, col3X, detailsY + 12.5);
    }

    detailsY += 18;

    // Registration Date
    doc.setTextColor(160, 160, 160);
    doc.text('Registered on:', col1X, detailsY);
    doc.setTextColor(200, 200, 200);
    const formattedDate = new Date(registrationData.registrationDate).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
    doc.text(formattedDate, col1X + 20, detailsY);

    // ========== FOOTER NOTE ==========
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(140, 140, 140);
    const footerY = pageHeight - 15;
    doc.text('Note: If you have trouble scanning your QR code at the venue, please don\'t worry.', pageWidth / 2, footerY, { align: 'center' });
    doc.text('Our team will be available to assist you with manual check-in.', pageWidth / 2, footerY + 4, { align: 'center' });

    // Return PDF as buffer for server-side generation
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
    return pdfBuffer;

  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
}
