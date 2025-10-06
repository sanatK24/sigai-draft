import jsPDF from 'jspdf';
import QRCode from 'qrcode';

export interface RegistrationData {
  eventTitle: string;
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
    // Create new PDF
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;

    // Clean Color Palette
    const colors = {
      primary: [37, 99, 235] as [number, number, number], // Blue
      success: [34, 197, 94] as [number, number, number], // Green
      text: [31, 41, 55] as [number, number, number], // Dark gray
      textLight: [107, 114, 128] as [number, number, number], // Light gray
      background: [249, 250, 251] as [number, number, number], // Very light gray
      white: [255, 255, 255] as [number, number, number]
    };

    // Simple Header
    doc.setFillColor(...colors.primary);
    doc.rect(0, 0, pageWidth, 50, 'F');

    doc.setTextColor(...colors.white);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('RAIT ACM SIGAI Student Chapter', pageWidth / 2, 12, { align: 'center' });
    
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Event Registration', pageWidth / 2, 24, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(registrationData.eventTitle, pageWidth / 2, 35, { align: 'center' });

    doc.setFontSize(9);
    doc.text(`Registration ID: ${registrationId.slice(0, 10).toUpperCase()}`, pageWidth / 2, 44, { align: 'center' });

    let yPos = 65;

    // Success Message
    doc.setTextColor(...colors.success);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('✓ Registration Successful', pageWidth / 2, yPos, { align: 'center' });

    yPos += 15;

    // Student Information - Simple and Clean
    doc.setTextColor(...colors.text);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Student Information', margin, yPos);

    yPos += 10;
    doc.setFontSize(11);

    const studentInfo = [
      ['Name', `${registrationData.firstName} ${registrationData.lastName}`],
      ['Email', registrationData.email],
      ['Phone', registrationData.phone],
      ['Roll Number', registrationData.rollNumber],
      ['Branch', `${registrationData.branch} - ${registrationData.year}`],
      ['Division', registrationData.division || 'N/A']
    ];

    studentInfo.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...colors.textLight);
      doc.text(label + ':', margin, yPos);
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...colors.text);
      doc.text(value, margin + 45, yPos);
      yPos += 8;
    });

    yPos += 10;

    // Divider
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(margin, yPos, pageWidth - margin, yPos);

    yPos += 15;

    // Payment Information
    doc.setTextColor(...colors.text);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Payment Information', margin, yPos);

    yPos += 10;
    doc.setFontSize(11);

    const paymentInfo = [
      ['Transaction ID', registrationData.transactionId],
      ['Amount Paid', `₹ ${registrationData.feeAmount}`],
      ['ACM Member', registrationData.isAcmMember ? 'Yes' : 'No'],
      ...(registrationData.isAcmMember && registrationData.membershipId 
        ? [['Membership ID', registrationData.membershipId]] 
        : [])
    ];

    paymentInfo.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...colors.textLight);
      doc.text(label + ':', margin, yPos);
      
      doc.setFont('helvetica', 'normal');
      const isAmount = label === 'Amount Paid';
      doc.setTextColor(...(isAmount ? colors.success : colors.text));
      doc.text(value, margin + 45, yPos);
      yPos += 8;
    });

    // Date
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...colors.textLight);
    doc.text('Date:', margin, yPos);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...colors.text);
    const formattedDate = new Date(registrationData.registrationDate).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
    doc.text(formattedDate, margin + 45, yPos);

    yPos += 20;

    // Divider
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(margin, yPos, pageWidth - margin, yPos);

    yPos += 15;

    // QR Code Section - Clean and Simple
    doc.setTextColor(...colors.text);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Attendance QR Code', pageWidth / 2, yPos, { align: 'center' });

    yPos += 7;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...colors.textLight);
    doc.text('Scan this code at the event for attendance', pageWidth / 2, yPos, { align: 'center' });

    yPos += 12;

    // Generate QR Code
    const qrCodeDataURL = await QRCode.toDataURL(attendanceHash, {
      width: 600,
      margin: 2,
      color: {
        dark: '#2563eb',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'H'
    });

    // Add QR Code - larger and centered
    const qrSize = 70;
    const qrX = (pageWidth - qrSize) / 2;
    doc.addImage(qrCodeDataURL, 'PNG', qrX, yPos, qrSize, qrSize);

    yPos += qrSize + 15;

    // Simple Footer
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...colors.textLight);
    doc.text('Please bring this document and a valid ID to the event', pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 5;
    doc.text('RAIT ACM SIGAI Student Chapter', pageWidth / 2, yPos, { align: 'center' });

    // Return PDF as buffer for server-side generation
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
    return pdfBuffer;

  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
}
