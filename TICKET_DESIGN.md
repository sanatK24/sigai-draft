# Modern Event Ticket Design

## Overview
The event registration PDF has been completely redesigned as a modern, landscape-oriented ticket inspired by professional event tickets. The ticket features a two-part design with contrasting themes.

## Design Specifications

### Page Layout
- **Orientation**: Landscape (A4)
- **Background**: Black (#000000)
- **Ticket Size**: 240mm × 110mm (centered on page)
- **Format**: Two-part ticket with perforation line

### Part 1: Main Ticket Section (Left - Dark Theme)
**Width**: 175mm
**Background**: Dark Gray (#111827)

**Contents**:
1. **Event Title**
   - Bold, 18pt font
   - White text
   - Multi-line support for long titles

2. **Organizer**
   - "Hosted by RAIT ACM SIGAI Student Chapter"
   - Light gray text, 9pt font

3. **Attendee Information**
   - Label: "ATTENDEE" (accent color)
   - Full name: White, 14pt bold
   - Branch and Year: Light gray, 9pt

4. **Attendance QR Code**
   - Label: "ATTENDANCE QR CODE" (accent color)
   - Instruction: "Scan this code at the event for attendance"
   - QR Code: 32mm × 32mm
   - Colors: Blue (#3B82F6) on dark background
   - High error correction level

5. **Decorative Elements**
   - Blue accent stripe on left edge (3mm wide)

### Part 2: Ticket Stub (Right - Light Theme)
**Width**: 65mm
**Background**: Light Gray (#F3F4F6)

**Contents** (All centered):
1. **Registration ID**
   - Label: "REGISTRATION ID"
   - Value: First 10 characters, uppercase
   - 11pt bold font

2. **Roll Number**
   - Label: "ROLL NUMBER"
   - Value: 13pt bold font
   - Primary verification detail

3. **Transaction ID**
   - Prefix: "TXN: "
   - First 12 characters shown
   - 6pt font, light gray

4. **Amount Paid**
   - Format: ₹{amount}
   - Blue accent color
   - 10pt bold font

5. **Decorative Elements**
   - Blue accent stripe on right edge (3mm wide)

### Perforation Line
- Separates main section from stub
- Created with dotted circles every 3mm
- Gray color to indicate tearable section

### Footer Note
- Positioned below ticket (centered)
- Italic, 7pt font, gray
- Message: Reassurance about QR code scanning assistance

## Color Palette

```
Dark Theme (Main Section):
- Background: #111827 (Gray-900)
- Primary Text: #FFFFFF (White)
- Secondary Text: #9CA3AF (Gray-400)
- Accent: #3B82F6 (Blue-500)
- Accent Light: #93C5FD (Blue-300)

Light Theme (Stub):
- Background: #F3F4F6 (Gray-100)
- Primary Text: #1F2937 (Gray-800)
- Secondary Text: #9CA3AF (Gray-400)
- Accent: #3B82F6 (Blue-500)

Border/Perforation: #4B5563 (Gray-600)
```

## Key Features

### 1. Professional Appearance
- Modern two-tone design
- Clean typography hierarchy
- Proper use of whitespace

### 2. Scannable QR Code
- Large size (32mm) for easy scanning
- High error correction
- Blue branded color
- Clear scanning instructions

### 3. Quick Verification
- Key details on stub section
- Registration ID and Roll Number prominently displayed
- Easy to tear off for manual verification

### 4. User-Friendly
- All important information visible
- Clear visual hierarchy
- Reassuring footer note about assistance

### 5. Print-Ready
- Landscape orientation optimal for printing
- Black background creates professional look
- Sufficient contrast for readability

## Use Cases

### 1. Digital Storage
- Attendees can save PDF on phone
- Email-friendly file size
- Professional appearance in PDF viewers

### 2. Printing
- Optimal landscape orientation
- Clear printable ticket
- Easy to carry to event

### 3. Event Check-in
- Quick QR code scanning
- Manual verification via stub
- Registration ID for database lookup

## Technical Implementation

### Libraries Used
- **jsPDF**: PDF generation
- **qrcode**: QR code generation with customization

### Generated Elements
1. Black background page
2. Rounded rectangle containers
3. Text elements with various styles
4. QR code as PNG image
5. Decorative accent stripes
6. Perforation line effect

### Data Included
- Event title
- Attendee full name
- Branch and year
- Roll number
- Registration ID (shortened)
- Transaction ID (truncated)
- Amount paid
- Attendance hash (in QR code)

## Future Enhancements

### Potential Additions
1. **PNG Export**: Generate transparent background PNG for phone wallpapers
2. **Color Themes**: Event-specific color schemes
3. **Event Logo**: Add organization logo
4. **Date/Time**: Include event date and time on ticket
5. **Venue Map**: QR code to venue location
6. **Multiple Tickets**: Support for group registrations

### Accessibility
- High contrast ratios maintained
- Large, readable fonts
- Clear labels and instructions
- Simple, uncluttered design

## Notes

- Ticket is centered on black A4 landscape page
- All measurements in millimeters (mm)
- Font sizes in points (pt)
- RGB color values for consistency
- Buffer returned for server-side generation
- Reassurance note helps reduce check-in anxiety
