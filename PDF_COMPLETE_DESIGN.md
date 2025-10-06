# Complete Event Ticket PDF Design

## Overview
The event registration PDF has been completely redesigned with comprehensive event details, attendee information, and a professional two-part ticket with stub. The design includes all requested features with proper layout and SIGAI branding.

## Design Updates

### Page Structure
- **Orientation**: Landscape (A4 - 297mm × 210mm)
- **Background**: Black (#000000) for modern appearance
- **Ticket Position**: Top section (not vertically centered)
- **Additional Sections**: Registration details below ticket

### Components

## 1. TICKET STUB & MAIN SECTION

### Ticket Dimensions
- **Total Width**: 240mm
- **Total Height**: 120mm (increased from 110mm)
- **Main Section**: 170mm wide (dark theme)
- **Stub Section**: 70mm wide (light theme)
- **Position**: Top of page (ticketY = 25mm)

### Main Ticket Section (Left - Dark Theme)
**Background**: #111827 (Dark gray-900)

**Contents** (Top to bottom):
1. **SIGAI Logo**
   - Position: Top-left corner
   - Size: 12mm
   - Text placeholder: "SIGAI" (to be replaced with actual logo)
   - Color: Accent light blue

2. **Event Title**
   - Bold, 16pt font
   - White text
   - Multi-line support
   - Max width: 150mm

3. **Organizer**
   - "Hosted by RAIT ACM SIGAI Student Chapter"
   - Light gray, 8pt font

4. **Event Details** (NEW)
   - Date, Time, Location
   - Accent light blue color
   - 7pt font
   - Bullet separator (•) between items
   - Multi-line if location is long

5. **Divider Line**
   - Horizontal gray line
   - Separates header from attendee info

6. **Attendee Section**
   - Label: "ATTENDEE" (accent blue)
   - Full name: White, 12pt bold
   - Branch, Year, Roll combined: Light gray, 8pt
   - Format: "Branch • Year • Roll: Number"

7. **QR Code Section** (Bottom-left)
   - Label: "ATTENDANCE QR CODE"
   - Subtitle: "Scan at event entrance"
   - QR Size: 28mm × 28mm
   - Colors: Blue (#3B82F6) on dark background

8. **Left Edge Accent**
   - Blue stripe: 3mm wide, full height

### Ticket Stub (Right - Light Theme)
**Background**: #F3F4F6 (Light gray-100)

**Contents** (Top to bottom, all centered):
1. **SIGAI Logo**
   - Text: "SIGAI"
   - Blue color
   - 9pt bold font

2. **Registration ID**
   - Label: "REGISTRATION ID" (6pt, gray)
   - Value: First 10 chars, uppercase (9pt bold, dark)

3. **Roll Number**
   - Label: "ROLL NUMBER" (6pt, gray)
   - Value: 11pt bold, dark

4. **Attendee Name** (NEW)
   - Label: "ATTENDEE" (6pt, gray)
   - Value: 9pt bold, dark
   - Truncated if > 20 chars

5. **Transaction ID**
   - Format: "TXN: XXXXXXXXXX"
   - 5pt font, light gray
   - First 10 characters only

6. **Amount Paid**
   - Format: ₹{amount}
   - 10pt bold, blue accent

7. **Right Edge Accent**
   - Blue stripe: 3mm wide, full height

### Perforation Line
- Visual separator between sections
- Dotted circles (0.5mm radius)
- Spaced 3mm apart
- Gray color

## 2. REGISTRATION DETAILS SECTION (NEW)

**Position**: Below ticket (12mm gap)
**Width**: Same as ticket (240mm)

### Section Title
- "REGISTRATION DETAILS"
- 9pt bold, light gray
- Left-aligned

### Details Layout (3 Columns)

**Column 1** (X = ticketX):
- Email (label + value)
- Phone (label + value)

**Column 2** (X = ticketX + 80mm):
- Branch (label + value)
- Year & Division (label + combined value)

**Column 3** (X = ticketX + 160mm):
- ACM Member (label + Yes/No)
- Membership ID (if applicable)

**Registration Date** (Below columns):
- "Registered on: {date & time}"
- Format: DD MMM YYYY, HH:MM

### Styling
- Labels: 7pt, gray (#A0A0A0)
- Values: 7pt, lighter gray (#C8C8C8)
- Vertical spacing: 9mm between rows

## 3. FOOTER NOTE

**Position**: Bottom of page (15mm from bottom)
**Alignment**: Center
**Font**: 7pt italic
**Color**: #8C8C8C (medium gray)

**Text**:
```
Note: If you have trouble scanning your QR code at the venue, please don't worry.
Our team will be available to assist you with manual check-in.
```

## Data Structure

### RegistrationData Interface (Updated)
```typescript
interface RegistrationData {
  eventTitle: string;
  eventDate?: string;        // NEW
  eventTime?: string;         // NEW
  eventLocation?: string;     // NEW
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
```

## Color Palette

### Dark Theme (Main Ticket)
```
Background:     #111827 (Gray-900)
Primary Text:   #FFFFFF (White)
Secondary Text: #9CA3AF (Gray-400)
Labels:         #93C5FD (Blue-300)
Accent:         #3B82F6 (Blue-500)
Border:         #4B5563 (Gray-600)
```

### Light Theme (Stub)
```
Background:     #F3F4F6 (Gray-100)
Primary Text:   #1F2937 (Gray-800)
Secondary Text: #9CA3AF (Gray-400)
Accent:         #3B82F6 (Blue-500)
```

### Page Background
```
Background:     #000000 (Black)
Details Text:   #C8C8C8 (Light gray)
Details Label:  #A0A0A0 (Gray)
Footer Text:    #8C8C8C (Medium gray)
```

## Features Summary

### ✅ Implemented Features
1. **Complete Event Information**
   - Title, Date, Time, Location displayed on ticket
   - Organizer information

2. **Full Attendee Details**
   - Name, Roll number on both sections
   - Branch, Year, Division
   - ACM membership status
   - Email and phone in details section

3. **Payment Information**
   - Transaction ID (alphanumeric)
   - Amount paid
   - ACM membership ID (if applicable)

4. **QR Code**
   - Large, scannable (28mm)
   - Blue branded color
   - High error correction
   - Clear instructions

5. **SIGAI Branding**
   - Logo placeholder in ticket
   - Logo in stub
   - Organizer credit
   - Professional design

6. **Registration Details Section**
   - Complete information below ticket
   - Three-column layout
   - All registration metadata
   - Timestamp

7. **Footer Reassurance Note**
   - Reduces attendee anxiety
   - Clear assistance message

8. **Professional Design**
   - Modern two-tone ticket
   - Black background page
   - Proper hierarchy
   - Print-ready

## Technical Details

### PDF Generation
- Library: jsPDF
- QR Code: qrcode library
- Format: A4 Landscape
- Units: Millimeters (mm)
- Output: Buffer (server-side)

### Logo Integration
The SIGAI logo (`public/img/sigai-logo-transparent.png`) can be integrated using:

```typescript
// In generatePDF.ts, add logo loading
import fs from 'fs';
import path from 'path';

// Load logo as base64
const logoPath = path.join(process.cwd(), 'public', 'img', 'sigai-logo-transparent.png');
const logoBase64 = fs.readFileSync(logoPath, 'base64');
const logoDataUrl = `data:image/png;base64,${logoBase64}`;

// Add to main section
doc.addImage(logoDataUrl, 'PNG', ticketX + 8, ticketY + 5, logoSize, logoSize);

// Add to stub (smaller)
doc.addImage(logoDataUrl, 'PNG', stubCenterX - 6, ticketY + 6, 12, 12);
```

### Export Options

#### 1. PDF (Current Implementation)
- Complete document with black background
- Print-ready
- Downloadable from browser
- Best for printing or official records

#### 2. PNG Export (Future Enhancement)
To export as PNG with transparent background:

```typescript
// Frontend implementation needed
import html2canvas from 'html2canvas';

// Create HTML version of ticket
// Render to canvas
// Export as PNG with transparency
```

## File Updates

### Modified Files
1. `src/lib/generatePDF.ts`
   - Complete redesign
   - Added event details support
   - Added registration details section
   - Logo placeholders
   - Improved layout

2. `src/app/events/[id]/page.tsx`
   - Added eventDate, eventTime, eventLocation to payload
   - Passes complete event data to API

3. `src/app/api/register/route.ts`
   - Accepts event details
   - Passes through to PDF generation
   - Updated response structure

## Usage

### Testing
1. Navigate to any event page
2. Click "Random Fill Test" button (fills all fields)
3. Continue to payment
4. Enter/use pre-filled transaction ID
5. Submit registration
6. PDF automatically downloads with all details

### Production
- Users register for events
- Complete event and attendee information included
- Professional ticket for event entry
- Detailed record for verification

## Future Enhancements

### Potential Additions
1. **Actual Logo Integration**
   - Replace text placeholders with actual SIGAI logo
   - Proper sizing and positioning

2. **PNG Export**
   - Add button to download as PNG
   - Transparent background option
   - Phone wallpaper friendly

3. **Email Integration**
   - Attach PDF to confirmation email
   - Include both PDF and PNG versions

4. **Color Themes**
   - Event-specific color schemes
   - Category-based styling

5. **Multi-language Support**
   - Hindi/Marathi translations
   - Dynamic language selection

6. **Batch Generation**
   - Generate multiple tickets at once
   - Group registration support

## Notes

- All measurements in millimeters (mm)
- Font sizes in points (pt)
- RGB color values for consistency
- Server-side PDF generation
- Logo placeholders use text temporarily
- Transparent PNG logo recommended
- Black background enhances ticket appearance
- Professional design suitable for official events
