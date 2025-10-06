# Event Registration Flow Documentation

## Overview
Complete event registration system with MongoDB storage, validation, and automated PDF generation with QR codes.

## Flow Diagram
```
User fills form → API validates → MongoDB stores → PDF generates → Success
```

## Technical Stack
- **Frontend**: Next.js 14 App Router (Client Component)
- **Backend**: Next.js API Route (`/api/register`)
- **Database**: MongoDB Atlas (Free Tier)
- **PDF Generation**: jsPDF + qrcode (client-side)
- **Validation**: Server-side with regex patterns
- **Security**: SHA256 hashing, rate limiting (5/hour per IP)

## Step-by-Step Flow

### 1. User Registration Form (Step 1: Details)
**Location**: `/src/app/events/[id]/page.tsx`

**Fields Collected**:
- Email (email format)
- First Name (alphabetic only)
- Last Name (alphabetic only)
- WhatsApp Number (10 digits numeric)
- Branch (text)
- Year (FE/SE/TE/BE dropdown)
- Division (text)
- Roll Number (alphanumeric)
- ACM Member? (Yes/No radio)
- ACM Membership ID (if Yes selected)

**Fee Calculation**:
- Dynamically updates based on ACM membership status
- Member: `event.registration_fee_member`
- Non-member: `event.registration_fee_non_member`

### 2. Payment Step
**Location**: Same component, step 2

**Actions**:
- Display UPI QR code for payment
- User completes payment via UPI
- User enters Transaction ID
- User submits form

### 3. API Registration
**Endpoint**: `POST /api/register`
**Location**: `/src/app/api/register/route.ts`

**Request Payload**:
```json
{
  "eventId": "string",
  "eventTitle": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "rollNumber": "string",
  "branch": "string",
  "year": "string",
  "division": "string",
  "isAcmMember": boolean,
  "membershipId": "string | null",
  "transactionId": "string",
  "feeAmount": number
}
```

**Validation Process**:
1. **Input Sanitization**: Remove all whitespace from firstName, lastName, rollNumber, email, phone, transactionId
2. **Field Validation**:
   - `firstName`: Alphabetic characters only
   - `lastName`: Alphabetic characters only
   - `rollNumber`: Alphanumeric characters only
   - `phone`: Exactly 10 numeric digits
   - `transactionId`: Numeric characters only
   - `email`: Standard email format validation

3. **Rate Limiting**: 
   - Maximum 5 registrations per IP address per hour
   - Uses in-memory Map for tracking

4. **Duplicate Check**:
   - Query MongoDB for existing registration with same email + eventId
   - Return error if duplicate found

5. **Hash Generation**:
   - Formula: `SHA256(firstName + rollNumber + lastName + email)`
   - All values concatenated WITHOUT spaces (after sanitization)
   - Digest format: Hexadecimal string

6. **MongoDB Insertion**:
   ```javascript
   {
     eventId: string,
     eventTitle: string,
     firstName: string (sanitized),
     lastName: string (sanitized),
     email: string (sanitized),
     phone: string (sanitized),
     rollNumber: string (sanitized),
     branch: string,
     year: string,
     division: string,
     isAcmMember: boolean,
     membershipId: string | null,
     transactionId: string (sanitized),
     feeAmount: number,
     registrationDate: Date,
     attendanceHash: string (SHA256),
     status: 'pending',
     verifiedAt: null,
     attendedAt: null
   }
   ```

**Response**:
```json
{
  "success": true,
  "message": "Registration successful",
  "registrationId": "ObjectId string",
  "attendanceHash": "SHA256 hex string",
  "registrationData": { ...all submitted data }
}
```

**Error Response**:
```json
{
  "error": "Error message"
}
```

### 4. Client-Side PDF Generation
**Location**: `/src/lib/generatePDF.ts`
**Function**: `generateRegistrationPDF()`

**PDF Contents**:
1. **Header** (Blue background):
   - "Event Registration" title
   - Event title
   - Registration ID

2. **Success Message**:
   - Green checkmark
   - "Registration Successful!" text

3. **Student Information Section**:
   - Full Name
   - Email
   - Phone
   - Roll Number
   - Branch
   - Year
   - Division

4. **Payment Information Section**:
   - Transaction ID
   - Amount Paid (₹)
   - ACM Member status
   - Membership ID (if applicable)
   - Registration date & time

5. **QR Code Section**:
   - Large centered QR code (80mm x 80mm)
   - Contains: attendanceHash (SHA256 hex string)
   - High error correction level
   - Hash text displayed below QR (small font for reference)

6. **Footer**:
   - RAIT ACM SIGAI Student Chapter branding
   - "Keep this document for your records" message

**File Naming**:
- Format: `{EventTitle}_{RollNumber}.pdf`
- Special characters removed from event title
- Automatic browser download

### 5. Success State
**Display**:
- Green checkmark icon
- "Registration Complete!" message
- Confirmation that PDF has been downloaded
- "Done" button to reload page

## Database Schema

### Collection: `registrations`
```javascript
{
  _id: ObjectId,
  eventId: String,
  eventTitle: String,
  firstName: String,         // Sanitized (no whitespace)
  lastName: String,          // Sanitized
  email: String,             // Sanitized, lowercase
  phone: String,             // Sanitized, 10 digits
  rollNumber: String,        // Sanitized, alphanumeric
  branch: String,
  year: String,              // FE/SE/TE/BE
  division: String,
  isAcmMember: Boolean,
  membershipId: String?,
  transactionId: String,     // Sanitized, numeric
  feeAmount: Number,
  registrationDate: Date,
  attendanceHash: String,    // SHA256 hex
  status: String,            // 'pending' | 'verified' | 'attended'
  verifiedAt: Date?,
  attendedAt: Date?
}
```

### Indexes
- Compound index: `{ email: 1, eventId: 1 }` (unique)
- Index: `{ attendanceHash: 1 }`
- Index: `{ eventId: 1, registrationDate: -1 }`

## Environment Variables

### Required in `.env.local`:
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
MONGODB_DB=events
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Error Handling

### Frontend Errors:
- Display error message above payment form
- Red alert box with AlertCircle icon
- User can retry without losing form data

### API Errors:
- `400`: Validation failed (specific field error)
- `429`: Rate limit exceeded (5 registrations/hour)
- `409`: Duplicate registration detected
- `500`: Server error (database connection, etc.)

### PDF Generation Errors:
- Caught and logged to console
- User sees error message
- Registration still saved in database

## Future Enhancements

### Email Integration (Deferred)
- Send confirmation email with PDF attachment
- Use Resend or Brevo (free tier)
- Template: Event details + registration confirmation

### Attendance System
- Separate React app or admin dashboard
- QR code scanner using device camera
- Extract hash from QR code
- Query MongoDB for matching registration
- Mark status as 'attended'
- Update attendedAt timestamp
- Display student information for verification

### Payment Verification
- Manual verification by admin
- Update status from 'pending' to 'verified'
- Set verifiedAt timestamp
- Send verification email

## Testing Checklist

- [ ] Form validation (client-side)
- [ ] API validation (server-side)
- [ ] Duplicate registration prevention
- [ ] Rate limiting (5 attempts)
- [ ] Hash generation consistency
- [ ] MongoDB document creation
- [ ] PDF generation with correct data
- [ ] QR code contains correct hash
- [ ] PDF auto-downloads
- [ ] Success state displays
- [ ] Error handling (network failure)
- [ ] Error handling (validation failure)
- [ ] ACM member fee calculation
- [ ] Non-member fee calculation

## Security Considerations

1. **Input Sanitization**: All whitespace removed, only allowed characters
2. **Rate Limiting**: Prevents spam registrations
3. **Hash Algorithm**: SHA256 for secure attendance verification
4. **No Special Characters**: Prevents injection attacks
5. **Client-Side PDF**: No server-side file storage risk
6. **Duplicate Prevention**: Email + eventId uniqueness

## Support & Maintenance

- **Database**: MongoDB Atlas Free Tier (512MB storage)
- **Backups**: Automatic daily backups by MongoDB Atlas
- **Monitoring**: Check rate limit Map memory usage
- **Logs**: Check MongoDB logs for failed insertions
- **PDF Issues**: Check browser console for generation errors
