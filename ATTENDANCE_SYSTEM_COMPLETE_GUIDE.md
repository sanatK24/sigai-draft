# Complete Attendance Management System - Documentation

## 📚 Table of Contents

1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Database Structure](#database-structure)
4. [Attendance App Specification](#attendance-app-specification)
5. [API Documentation](#api-documentation)
6. [Data Model](#data-model)
7. [User Flows](#user-flows)
8. [Technical Requirements](#technical-requirements)
9. [Development Roadmap](#development-roadmap)
10. [Security & Best Practices](#security--best-practices)
11. [Testing Checklist](#testing-checklist)
12. [Quick Reference](#quick-reference)
13. [No-Code Builder Prompts](#no-code-builder-prompts)

---

## Overview

### What is This System?

A complete event registration and attendance management system for ACM student chapters (SIGAI, ACM-W, ACM SC) consisting of:

1. **Registration Website** (✅ Working)
   - Event listing and details
   - Student registration with payment verification
   - PDF ticket generation with QR code
   - MongoDB storage

2. **Attendance Management App** (🚧 To Build)
   - Mobile/Web app for committee heads
   - QR code scanner for attendance marking
   - Real-time attendee tracking
   - Yellow card system for problematic participants
   - Export reports (CSV/Excel)

### Target Users

- **Students**: Register for events, get PDF tickets
- **Committee Heads**: Manage attendance at events
- **Admins**: View reports, export data

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    STUDENTS / PARTICIPANTS                   │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  REGISTRATION WEBSITE                        │
│                  (Next.js + TypeScript)                      │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Event List   │→ │ Registration │→ │ PDF Download │     │
│  │ Page         │  │ Form         │  │ with QR      │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │   Next.js API Routes   │
              │                        │
              │  /api/register         │
              │  /api/generate-pdf     │
              │  /api/verify-attendance│
              └───────────┬────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                        MONGODB ATLAS                         │
│                        Cluster: events                       │
│                                                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐│
│  │ registeration   │  │    acm_w        │  │   acm_sc    ││
│  │  (ACM SIGAI)    │  │   (ACM-W)       │  │  (ACM SC)   ││
│  │                 │  │                 │  │             ││
│  │ • event_1       │  │ • event_1       │  │ • event_1   ││
│  │ • event_2       │  │ • event_2       │  │ • event_2   ││
│  └─────────────────┘  └─────────────────┘  └─────────────┘│
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              ATTENDANCE MANAGEMENT APP                       │
│              (Mobile/Web for Committee Heads)                │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Chapter      │→ │ Event        │→ │ Attendance   │     │
│  │ Selection    │  │ List         │  │ Management   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  Dual Screen Interface:                                     │
│  ┌─────────────────────────────────────────────┐           │
│  │  ┌──────────────┐  ┌──────────────────┐    │           │
│  │  │ 📷 QR        │  │ 📋 ATTENDEE      │    │           │
│  │  │ SCANNER      │  │ LIST             │    │           │
│  │  │              │  │                  │    │           │
│  │  │ [Camera]     │  │ 🟢 Attended      │    │           │
│  │  │              │  │ 🔴 Not yet       │    │           │
│  │  │ Scan → Mark  │  │ 🟡 Flagged       │    │           │
│  │  │              │  │ [Export]         │    │           │
│  │  └──────────────┘  └──────────────────┘    │           │
│  └─────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

---

## Database Structure

### MongoDB Atlas Configuration

**Cluster**: `events`

**Databases**:
1. **`registeration`** - ACM SIGAI events
2. **`acm_w`** - ACM-W events
3. **`acm_sc`** - ACM Student Chapter events

**Collections**: Dynamic (one per event)
- Collection name = Event title (sanitized, lowercase, underscores)
- Example: "Workshop on AI ML" → `workshop_on_ai_ml`

### Connection String Format
```
mongodb+srv://username:password@cluster.mongodb.net/
```

**Important**: URL-encode special characters in password (@ → %40)

---

## Data Model

### Registration Document Schema

```typescript
interface Registration {
  // MongoDB ID
  _id: ObjectId;
  
  // Event Information
  eventId: string;
  eventTitle: string;
  
  // Student Details
  firstName: string;
  lastName: string;
  email: string;
  phone: string;              // 10 digits
  rollNumber: string;
  branch: string;
  year: string;
  division: string;
  
  // ACM Membership
  isAcmMember: boolean;
  membershipId: string | null;
  
  // Payment Information
  transactionId: string;
  feeAmount: number;
  
  // Attendance Tracking
  attendanceHash: string;           // SHA256 hash for QR verification
  attendance: boolean;               // false by default, true when scanned
  attendanceMarkedAt: Date | null;  // Timestamp when attendance marked
  
  // Yellow Card System
  yellowCard: boolean;               // false by default, true if flagged
  yellowCardReason: string | null;  // Reason for yellow card
  yellowCardMarkedBy: string | null;// Committee head who issued it
  yellowCardMarkedAt: Date | null;  // Timestamp when yellow card issued
  
  // Status & Metadata
  status: 'registered' | 'attended' | 'flagged';
  createdAt: Date;
  updatedAt: Date;
  ipAddress: string;
}
```

### Attendance Hash Generation

```typescript
// Hash formula
const hashString = firstName + rollNumber + lastName + email; // No spaces
const attendanceHash = crypto.createHash('sha256').update(hashString).digest('hex');
```

### Sample Document

```json
{
  "_id": "6501234567890abcdef12345",
  "eventId": "evt123",
  "eventTitle": "Workshop on AI ML",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "9876543210",
  "rollNumber": "2024COMP001",
  "branch": "Computer Engineering",
  "year": "TE",
  "division": "A",
  "isAcmMember": true,
  "membershipId": "ACM123456",
  "transactionId": "TXN789012",
  "feeAmount": 500,
  "attendanceHash": "a1b2c3d4e5f6789012345678901234567890abcdef",
  "attendance": true,
  "attendanceMarkedAt": "2025-10-06T10:30:00Z",
  "yellowCard": false,
  "yellowCardReason": null,
  "yellowCardMarkedBy": null,
  "yellowCardMarkedAt": null,
  "status": "attended",
  "createdAt": "2025-10-01T12:00:00Z",
  "updatedAt": "2025-10-06T10:30:00Z",
  "ipAddress": "192.168.1.1"
}
```

---

## Attendance App Specification

### App Overview

**Purpose**: A modern, elegant mobile/web application for committee heads to manage event attendance

**Target Users**: Committee heads and senior organizers at workshops/events

**Key Principle**: QR scanner only, no manual attendance marking

### Features

#### 1. Chapter Selection Screen

**UI Elements**:
- Three elegant cards for chapter selection:
  - 🎓 **ACM SIGAI** → Database: `registeration`
  - 👩‍💻 **ACM-W** → Database: `acm_w`
  - 💻 **ACM SC** → Database: `acm_sc`

**Action**: 
- On selection → Fetch all collections (events) from database
- Navigate to Event List Screen

---

#### 2. Event List Screen

**Display**:
- List of all events for selected chapter
- Each event card shows:
  - Event name (formatted from collection name)
  - Total registrations count
  - Attended count / Total
  - Attendance percentage
  - Date (if available)

**Example**:
```
┌────────────────────────────┐
│ Workshop on AI ML          │
│ 150 registered             │
│ ✅ 87 attended (58%)       │
│ 🟡 2 yellow cards          │
└────────────────────────────┘
```

---

#### 3. Event Management Screen (Main Screen)

**Layout**: Dual-pane split screen interface

##### Left Pane: QR Scanner

**Functionality**:
- Real-time camera view
- Scans QR code from registration PDF
- Extracts `attendanceHash`
- Automatic database update (no confirmation needed)

**Scanner Workflow**:
```
QR Code Scanned
    ↓
Extract attendanceHash
    ↓
POST /api/verify-attendance
    ↓
Find registration in MongoDB
    ↓
IF found:
  - Update attendance = true
  - Set attendanceMarkedAt = now
  - Show success animation
  - Play success sound
  - Display user details
    ↓
IF not found:
  - Show error message
  - Display "Invalid QR Code"
```

**Scanner Rules** (CRITICAL):
- ✅ **Automatic marking only** - No manual override
- ✅ Instant database update
- ✅ Visual feedback (green checkmark)
- ✅ Audio feedback (success beep)
- ❌ **Cannot manually mark** attendance
- ❌ Cannot scan same QR twice

##### Right Pane: Attendee List

**Display**:
- Scrollable list of all registered participants
- Real-time updates when QR scanned
- Status indicators:
  - 🟢 **Green** = Attended (attendance: true)
  - 🔴 **Red** = Not attended (attendance: false)
  - 🟡 **Yellow** = Flagged (yellowCard: true)

**Participant Card Example**:
```
┌─────────────────────────────────────────────┐
│ 🟢 John Doe                        [🟡]     │
│    Roll: 2024COMP001                        │
│    📧 john.doe@example.com                  │
│    📱 +91 9876543210                        │
│    Branch: Computer • Year: TE              │
│    Status: ✅ Attended at 10:30 AM          │
└─────────────────────────────────────────────┘
```

**Filter Options**:
- All Participants
- ✅ Attended Only
- ⏳ Not Attended
- 🟡 Yellow Carded
- 🔍 Search (by name/roll/email)

**Sort Options**:
- By Name (A-Z)
- By Roll Number
- By Attendance Time
- By Registration Time

**Participant Actions** (tap/long-press):
1. **View Full Details** - Modal with complete info
2. **🟡 Issue Yellow Card** - Flag participant
3. **📧 Send Email** - Quick contact
4. **📞 Call** - Direct phone call

---

#### 4. Yellow Card System

**Purpose**: Flag participants for certificate denial or problematic behavior

**Yellow Card Workflow**:
```
Long-press on participant
    ↓
Select "Issue Yellow Card"
    ↓
Dialog appears:
  - Enter reason (required)
  - Confirm button
    ↓
POST /api/mark-yellow-card
    ↓
MongoDB Update:
  - yellowCard = true
  - yellowCardReason = entered reason
  - yellowCardMarkedBy = current user
  - yellowCardMarkedAt = timestamp
  - status = 'flagged'
    ↓
Visual Update:
  - Card shows yellow flag icon 🟡
  - Reason visible on tap
```

**Yellow Card Rules** (CRITICAL):
- 🟡 **Permanent** - Cannot be removed once issued
- 🟡 **No certificate** - Participant ineligible for certificate
- 🟡 **Reason required** - Must specify why flagged
- 🟡 **Audit trail** - Records who issued and when
- 🟡 **Still in list** - Shows in attendance reports

---

#### 5. Export Feature

**Location**: Top-right button on Event Management Screen

**Export Options**:

1. **Export All Attended**
   - Filter: `attendance === true`
   - Includes: All participants (including yellow cards)
   - Purpose: Complete attendance record

2. **Export Certificate-Eligible**
   - Filter: `attendance === true AND yellowCard === false`
   - Includes: Only eligible participants
   - Purpose: Certificate generation list

3. **Export Flagged Participants**
   - Filter: `yellowCard === true`
   - Includes: Only yellow-carded participants
   - Purpose: Problematic participants report

**Export Format**: CSV or Excel

**CSV Structure**:
```csv
Serial No,Name,Roll Number,Email,Phone,Branch,Year,Division,Attendance Time,Yellow Card,Yellow Card Reason,Transaction ID,Fee Amount,ACM Member,Membership ID
1,John Doe,2024COMP001,john@example.com,9876543210,Computer Engineering,TE,A,2025-10-06 10:30:00,No,-,TXN789012,500,Yes,ACM123456
```

---

## API Documentation

### Base URL
```
Production: https://yourdomain.com/api
Development: http://localhost:3000/api
```

### Authentication
All endpoints (except login) require JWT authentication.

**Header**:
```http
Authorization: Bearer <jwt_token>
```

---

### API Endpoints

#### 1. Authentication

##### POST `/api/auth/login`
**Description**: Authenticate committee head

**Request Body**:
```json
{
  "email": "head@example.com",
  "password": "securepassword"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user123",
    "name": "John Doe",
    "email": "head@example.com",
    "role": "committee_head",
    "chapters": ["registeration", "acm_w", "acm_sc"]
  }
}
```

---

#### 2. Chapter Management

##### GET `/api/chapters`
**Description**: Get list of all chapters

**Response** (200 OK):
```json
{
  "success": true,
  "chapters": [
    {
      "id": "registeration",
      "name": "ACM SIGAI",
      "database": "registeration",
      "totalEvents": 15,
      "activeEvents": 3
    },
    {
      "id": "acm_w",
      "name": "ACM-W",
      "database": "acm_w",
      "totalEvents": 8,
      "activeEvents": 1
    },
    {
      "id": "acm_sc",
      "name": "ACM Student Chapter",
      "database": "acm_sc",
      "totalEvents": 12,
      "activeEvents": 2
    }
  ]
}
```

---

##### GET `/api/chapters/{database}/events`
**Description**: Get all events for a chapter

**URL Parameters**:
- `database`: `registeration` | `acm_w` | `acm_sc`

**Response** (200 OK):
```json
{
  "success": true,
  "database": "registeration",
  "events": [
    {
      "eventName": "workshop_on_ai_ml",
      "displayName": "Workshop on AI ML",
      "totalRegistrations": 150,
      "attendedCount": 87,
      "attendancePercentage": 58,
      "yellowCardCount": 2,
      "createdAt": "2025-10-01T10:00:00Z",
      "lastUpdated": "2025-10-06T14:30:00Z"
    }
  ]
}
```

---

#### 3. Event Registrations

##### GET `/api/events/registrations`
**Description**: Get all registrations for an event

**Query Parameters**:
- `eventTitle`: Event collection name (required)
- `database`: Database name (required)
- `filter`: `all` | `attended` | `not_attended` | `yellow_card` (optional)
- `search`: Search term (optional)

**Example**:
```
GET /api/events/registrations?eventTitle=workshop_on_ai_ml&database=registeration&filter=all
```

**Response** (200 OK):
```json
{
  "success": true,
  "eventTitle": "Workshop on AI ML",
  "database": "registeration",
  "totalCount": 150,
  "filteredCount": 150,
  "registrations": [
    {
      "_id": "6501234567890abcdef12345",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "9876543210",
      "rollNumber": "2024COMP001",
      "branch": "Computer Engineering",
      "year": "TE",
      "attendance": true,
      "attendanceMarkedAt": "2025-10-06T10:30:00Z",
      "yellowCard": false
    }
  ]
}
```

---

#### 4. Attendance Verification (Scanner)

##### POST `/api/verify-attendance` ✅ Already Implemented
**Description**: Mark attendance by scanning QR code

**Request Body**:
```json
{
  "attendanceHash": "a1b2c3d4e5f6789012345678901234567890abcdef",
  "eventTitle": "workshop_on_ai_ml",
  "database": "registeration"
}
```

**Response** (200 OK - First Scan):
```json
{
  "success": true,
  "message": "Attendance marked successfully",
  "attendance": true,
  "alreadyMarked": false,
  "userData": {
    "registrationId": "6501234567890abcdef12345",
    "name": "John Doe",
    "rollNumber": "2024COMP001",
    "email": "john.doe@example.com",
    "phone": "9876543210",
    "branch": "Computer Engineering",
    "year": "TE",
    "yellowCard": false,
    "markedAt": "2025-10-06T10:30:00Z"
  }
}
```

**Response** (200 OK - Already Scanned):
```json
{
  "success": true,
  "message": "Attendance already marked",
  "attendance": true,
  "alreadyMarked": true,
  "userData": {
    "name": "John Doe",
    "rollNumber": "2024COMP001",
    "markedAt": "2025-10-06T10:30:00Z"
  }
}
```

**Error** (404 Not Found):
```json
{
  "success": false,
  "error": "User not found or invalid QR code",
  "attendance": false
}
```

---

#### 5. Yellow Card System

##### POST `/api/mark-yellow-card`
**Description**: Issue yellow card to participant

**Request Body**:
```json
{
  "registrationId": "6501234567890abcdef12345",
  "eventTitle": "workshop_on_ai_ml",
  "database": "registeration",
  "reason": "Disruptive behavior during workshop",
  "markedBy": "Committee Head Name"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Yellow card issued successfully",
  "userData": {
    "registrationId": "6501234567890abcdef12345",
    "name": "John Doe",
    "rollNumber": "2024COMP001",
    "yellowCard": true,
    "yellowCardReason": "Disruptive behavior during workshop",
    "yellowCardMarkedBy": "Committee Head Name",
    "yellowCardMarkedAt": "2025-10-06T14:30:00Z",
    "status": "flagged"
  }
}
```

---

##### GET `/api/yellow-cards`
**Description**: Get all yellow-carded participants

**Query Parameters**:
- `eventTitle`: Event name (required)
- `database`: Database name (required)

**Response** (200 OK):
```json
{
  "success": true,
  "eventTitle": "workshop_on_ai_ml",
  "count": 2,
  "yellowCards": [
    {
      "name": "John Doe",
      "rollNumber": "2024COMP001",
      "yellowCardReason": "Disruptive behavior",
      "yellowCardMarkedBy": "Committee Head",
      "yellowCardMarkedAt": "2025-10-06T14:30:00Z"
    }
  ]
}
```

---

#### 6. Export & Reports

##### GET `/api/export-attendance`
**Description**: Export attendance data as CSV/Excel

**Query Parameters**:
- `eventTitle`: Event name (required)
- `database`: Database name (required)
- `filter`: `all` | `eligible` | `flagged` (required)
- `format`: `csv` | `excel` (optional, default: `csv`)

**Filter Types**:
- `all`: All attended (including yellow cards)
- `eligible`: Certificate-eligible only (no yellow cards)
- `flagged`: Only yellow-carded participants

**Example**:
```
GET /api/export-attendance?eventTitle=workshop_on_ai_ml&database=registeration&filter=eligible&format=csv
```

**Response**: File download (CSV/Excel)

---

##### GET `/api/reports/summary`
**Description**: Get attendance summary statistics

**Query Parameters**:
- `eventTitle`: Event name (required)
- `database`: Database name (required)

**Response** (200 OK):
```json
{
  "success": true,
  "eventTitle": "Workshop on AI ML",
  "summary": {
    "totalRegistrations": 150,
    "attended": 87,
    "notAttended": 63,
    "attendancePercentage": 58,
    "yellowCards": 2,
    "certificateEligible": 85,
    "totalRevenue": 43500,
    "branchWise": {
      "Computer Engineering": 40,
      "IT": 25,
      "Electronics": 15
    },
    "yearWise": {
      "FE": 10,
      "SE": 25,
      "TE": 35,
      "BE": 17
    }
  }
}
```

---

### Error Responses

#### 400 Bad Request
```json
{
  "success": false,
  "error": "Missing required fields"
}
```

#### 401 Unauthorized
```json
{
  "success": false,
  "error": "Authentication required. Please login."
}
```

#### 403 Forbidden
```json
{
  "success": false,
  "error": "You don't have permission to access this chapter"
}
```

#### 404 Not Found
```json
{
  "success": false,
  "error": "Event not found"
}
```

#### 429 Too Many Requests
```json
{
  "success": false,
  "error": "Rate limit exceeded. Please try again later.",
  "retryAfter": 30
}
```

#### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Failed to process request. Please try again."
}
```

---

## User Flows

### 1. Registration Flow (Student)

```
Student visits event page
    ↓
Fills registration form
    ↓
Enters payment details
    ↓
Submits form
    ↓
Backend validates:
  • All fields present
  • Email format valid
  • Phone 10 digits
  • No duplicate email
  • Rate limit check
    ↓
Generate attendance hash
SHA256(firstName + rollNo + lastName + email)
    ↓
Insert into MongoDB:
  Database: registeration/acm_w/acm_sc
  Collection: event_name
  Document: {
    ...student details,
    attendanceHash,
    attendance: false,
    yellowCard: false
  }
    ↓
Generate PDF:
  • Event details
  • Student info
  • QR code (attendanceHash)
    ↓
Student downloads PDF ticket
```

---

### 2. Attendance Marking Flow (Committee Head)

```
Committee Head opens app
    ↓
Login with credentials
    ↓
Select Chapter
(SIGAI / ACM-W / ACM SC)
    ↓
View Event List
    ↓
Select Event
    ↓
Dual Screen Opens:
┌──────────────────┬──────────────────┐
│  QR SCANNER      │  ATTENDEE LIST   │
│  [Camera View]   │  [Live List]     │
└──────────────────┴──────────────────┘
    ↓
Student arrives with QR code
    ↓
Scanner reads QR code
    ↓
Extract attendanceHash
    ↓
POST /api/verify-attendance
    ↓
MongoDB query:
db.collection(event).findOne({
  attendanceHash: hash
})
    ↓
IF found AND attendance === false:
  • Update attendance = true
  • Set attendanceMarkedAt = now
  • Show success message
  • Update list in real-time
    ↓
IF found AND attendance === true:
  • Show "Already marked" message
  • Display previous timestamp
    ↓
IF not found:
  • Show error "Invalid QR code"
```

---

### 3. Yellow Card Flow

```
Committee Head on Event Management screen
    ↓
Long-press on participant in list
    ↓
Action menu appears:
  • View Details
  • Issue Yellow Card ← Select
  • Send Email
  • Call
    ↓
Yellow Card Dialog opens:
  • Shows participant name
  • Reason input (required)
  • Warning: Cannot be reversed
  • Confirm button
    ↓
Committee Head enters reason
    ↓
Clicks Confirm
    ↓
POST /api/mark-yellow-card
    ↓
MongoDB update:
{
  $set: {
    yellowCard: true,
    yellowCardReason: "...",
    yellowCardMarkedBy: "Head Name",
    yellowCardMarkedAt: now,
    status: "flagged"
  }
}
    ↓
UI updates:
  • Participant card shows 🟡
  • Status shows "Flagged"
  • Warning: Not certificate-eligible
```

---

### 4. Export Flow

```
Committee Head clicks Export button
    ↓
Export dialog appears:
  ○ All Attended (including yellow cards)
  ● Certificate Eligible (no yellow cards) ← Selected
  ○ Flagged Only (yellow carded)
  
  Format: [CSV ▼]
    ↓
Click Export
    ↓
GET /api/export-attendance?
  eventTitle=workshop_on_ai_ml&
  database=registeration&
  filter=eligible&
  format=csv
    ↓
Backend queries MongoDB:
db.collection(event).find({
  attendance: true,
  yellowCard: false
})
    ↓
Generate CSV file:
Serial,Name,Roll,Email,Phone,Branch,Year,...
1,John Doe,2024COMP001,john@...,9876543210,...
    ↓
File downloads to device
```

---

## Technical Requirements

### Frontend Stack (Recommended)

#### Mobile App (React Native)
```
Framework: React Native + Expo
Language: TypeScript
QR Scanner: react-native-camera
State: Zustand or React Context
UI: React Native Paper
Navigation: React Navigation
API: Axios with interceptors
Auth: JWT + AsyncStorage
```

#### Web App (Next.js)
```
Framework: Next.js 15
Language: TypeScript
QR Scanner: html5-qrcode
State: Zustand or React Context
UI: Tailwind CSS + shadcn/ui
API: fetch with custom hooks
Auth: JWT + localStorage
Real-time: Polling (3-5 sec) or WebSocket
```

---

### Backend Stack (Current)

```
Framework: Next.js 15.5.4
Language: TypeScript
Runtime: Node.js
Database: MongoDB Atlas
PDF: jsPDF + QRCode.js
Styling: Tailwind CSS
Authentication: JWT (to be implemented)
```

---

### Required Libraries

#### For QR Scanner
```bash
# Mobile
npm install react-native-camera
npm install react-native-qrcode-scanner

# Web
npm install html5-qrcode
npm install react-qr-scanner
```

#### For State Management
```bash
npm install zustand
# OR
npm install @tanstack/react-query
```

#### For UI Components
```bash
# Mobile
npm install react-native-paper

# Web (already installed)
npx shadcn-ui@latest init
```

---

### Performance Requirements

- ⚡ Scanner response time: < 1 second
- ⚡ List updates: Real-time (3-5 sec polling)
- ⚡ Supports 500+ registrations per event
- ⚡ Export generation: < 5 seconds
- ⚡ Offline mode: Cache list, sync when online
- ⚡ Optimized for slow networks

---

## Development Roadmap

### ✅ Phase 1: Registration System (COMPLETE)
- ✅ Event listing and details
- ✅ Registration form with validation
- ✅ MongoDB integration (dynamic collections)
- ✅ PDF generation with QR codes
- ✅ Attendance verification API
- ✅ Yellow card fields in database

---

### 🚧 Phase 2: Attendance App MVP (2-3 weeks)

**Week 1**:
- [ ] Set up project (React Native or Next.js)
- [ ] Implement authentication system
- [ ] Create chapter selection screen
- [ ] Create event list screen

**Week 2**:
- [ ] Implement QR scanner
- [ ] Create dual-pane attendance screen
- [ ] Integrate with `/api/verify-attendance`
- [ ] Add basic attendee list with filters

**Week 3**:
- [ ] Add real-time list updates
- [ ] Implement search functionality
- [ ] Polish UI/UX
- [ ] Testing and bug fixes

---

### 🚧 Phase 3: Advanced Features (1-2 weeks)

**Week 4**:
- [ ] Yellow card system UI
- [ ] Implement `/api/mark-yellow-card` endpoint
- [ ] Export functionality (all 3 filters)
- [ ] Contact features (email, call)

**Week 5**:
- [ ] Analytics dashboard
- [ ] Reports and statistics
- [ ] Remaining API endpoints
- [ ] Performance optimization

---

### 🚧 Phase 4: Polish & Deployment (1 week)

**Week 6**:
- [ ] Security hardening
- [ ] Error handling improvements
- [ ] Rate limiting implementation
- [ ] Testing (unit, integration, E2E)

**Week 7**:
- [ ] Documentation finalization
- [ ] Deployment setup
- [ ] Production testing
- [ ] Go live!

---

## Security & Best Practices

### Current Security (Registration System)

#### ✅ Implemented
- Rate limiting (5 registrations/hour/IP)
- Input validation and sanitization
- SQL injection protection
- Duplicate prevention
- SHA256 hashing for QR codes
- URL-encoded MongoDB passwords

---

### Required Security (Attendance App)

#### 🔲 To Implement

**Authentication**:
```typescript
// JWT token structure
{
  "userId": "user123",
  "email": "head@example.com",
  "role": "committee_head",
  "chapters": ["registeration"],
  "iat": 1696593600,
  "exp": 1696680000
}
```

**Authorization**:
- Role-based access control (RBAC)
- Chapter-level permissions
- Committee heads can only access their chapters
- Admins have full access

**Audit Logging**:
```typescript
{
  "action": "mark_attendance" | "issue_yellow_card",
  "userId": "user123",
  "userName": "Committee Head",
  "eventTitle": "workshop_on_ai_ml",
  "targetUser": "john.doe@example.com",
  "timestamp": "2025-10-06T10:30:00Z",
  "ipAddress": "192.168.1.1",
  "userAgent": "Mobile App v1.0"
}
```

**Data Protection**:
- HTTPS only (all API calls)
- Secure token storage (AsyncStorage/localStorage with encryption)
- Password hashing (bcrypt)
- Sensitive data encryption at rest

**Rate Limiting**:
- Scanner API: 60 requests/minute/IP
- Export API: 10 requests/minute/user
- Other APIs: 100 requests/minute/user

---

### Best Practices

#### Yellow Card System
- ✅ Always require reason
- ✅ Log who issued it
- ✅ Timestamp every action
- ❌ Never allow removal
- ❌ Never allow editing

#### Attendance Marking
- ✅ Only via QR scanner
- ✅ Instant database update
- ✅ Real-time list refresh
- ❌ No manual marking
- ❌ No override options

#### Data Handling
- ✅ Validate all inputs
- ✅ Sanitize user data
- ✅ Use prepared statements
- ✅ Encrypt sensitive data
- ✅ Regular backups

---

## Testing Checklist

### Unit Tests
- [ ] Registration form validation
- [ ] Attendance hash generation
- [ ] Yellow card issuance
- [ ] Export filtering logic
- [ ] Authentication flow

### Integration Tests
- [ ] MongoDB connection
- [ ] API endpoints
- [ ] PDF generation
- [ ] QR code scanning
- [ ] Real-time updates

### E2E Tests
- [ ] Complete registration flow
- [ ] Complete attendance marking flow
- [ ] Yellow card workflow
- [ ] Export functionality
- [ ] Multi-user scenarios

### Performance Tests
- [ ] 500+ registrations load
- [ ] Scanner response time
- [ ] List update latency
- [ ] Export generation time
- [ ] Concurrent user load

### Security Tests
- [ ] Authentication bypass attempts
- [ ] SQL injection tests
- [ ] XSS vulnerability tests
- [ ] Rate limiting effectiveness
- [ ] Token expiration handling

---

## Quick Reference

### Important Rules

#### ✅ DO
- Use QR scanner for attendance (only method)
- Issue yellow cards with valid reasons
- Export certificate-eligible list before awards
- Update list in real-time
- Log all critical actions

#### ❌ DON'T
- Allow manual attendance marking
- Remove yellow cards once issued
- Give certificates to flagged participants
- Allow duplicate QR scans
- Skip authentication checks

---

### Status Indicators

```
🟢 Green  = Attended (attendance: true)
🔴 Red    = Not attended (attendance: false)
🟡 Yellow = Flagged (yellowCard: true)
```

---

### Export Filter Types

| Filter | Criteria | Use Case |
|--------|----------|----------|
| `all` | `attendance: true` | Complete attendance record |
| `eligible` | `attendance: true` AND `yellowCard: false` | Certificate generation |
| `flagged` | `yellowCard: true` | Problem participants report |

---

### Common Issues & Solutions

#### Issue: QR code not scanning
**Solutions**:
- Increase QR size (currently 32mm)
- Improve lighting
- Use higher camera resolution
- Clean QR code area

#### Issue: List not updating in real-time
**Solutions**:
- Check polling interval (should be 3-5 sec)
- Verify WebSocket connection
- Check network connectivity
- Clear cache and reload

#### Issue: Yellow card can be removed
**Solution**: This is a BUG! Yellow cards MUST be permanent. Check backend logic.

#### Issue: Manual attendance marking possible
**Solution**: This is a BUG! Only QR scanner should mark attendance. Remove manual option.

---

### Quick Stats Formulas

```typescript
// Attendance percentage
attendancePercentage = (attendedCount / totalRegistrations) * 100

// Certificate eligible
certificateEligible = count where (attendance === true && yellowCard === false)

// Total revenue
totalRevenue = sum(feeAmount) for all registrations

// Yellow card rate
yellowCardRate = (yellowCardCount / attendedCount) * 100
```

---

## No-Code Builder Prompts

If you want to build the attendance management app using no-code platforms like **Bubble**, **FlutterFlow**, **Adalo**, **Glide**, or **AppGyver**, use these detailed prompts:

---

### 🎯 Prompt 1: Complete App Setup

```
I want to build an attendance management mobile app with these specifications:

APP PURPOSE:
- For committee heads to manage event attendance at ACM student chapter events
- Scans QR codes from registration PDFs to mark attendance
- Tracks participants in real-time with yellow card system for problematic behavior

SCREENS:
1. Login Screen (email + password authentication)
2. Chapter Selection (3 cards: ACM SIGAI, ACM-W, ACM SC)
3. Event List (shows all events with attendance stats)
4. Attendance Management (dual-pane: QR scanner + attendee list)

DATABASE STRUCTURE:
- MongoDB with 3 databases: "registeration", "acm_w", "acm_sc"
- Each database has multiple collections (one per event)
- Each document represents one registration with these fields:
  * Student: firstName, lastName, email, phone, rollNumber, branch, year
  * Attendance: attendanceHash (string), attendance (boolean), attendanceMarkedAt (date)
  * Yellow Card: yellowCard (boolean), yellowCardReason (string), yellowCardMarkedBy (string), yellowCardMarkedAt (date)
  * Status: status (enum: "registered", "attended", "flagged")

KEY FEATURES:
1. QR Code Scanner - Scans attendanceHash from PDF, automatically marks attendance
2. Real-time Attendee List - Shows green (attended), red (not attended), yellow (flagged)
3. Yellow Card System - Long-press participant to flag (permanent, cannot be removed)
4. Export - Download CSV with 3 filters: all attended, certificate-eligible, flagged only
5. Search & Filter - Search by name/roll, filter by status

CRITICAL RULES:
- ONLY QR scanner can mark attendance (no manual marking)
- Yellow cards are PERMANENT (cannot be removed once issued)
- Certificate eligibility = attendance is true AND yellowCard is false
- One scan per QR code (prevent duplicates)

COLOR SCHEME:
- Primary: #3B82F6 (Blue)
- Success: #10B981 (Green)
- Warning: #FBBF24 (Yellow)
- Danger: #EF4444 (Red)
- Background: #F9FAFB (Light Gray)

Please create this app with proper navigation flow and all screens.
```

---

### 🎯 Prompt 2: Database & API Configuration

```
Configure the database and API connections for my attendance app:

MONGODB CONNECTION:
- Cluster: "events"
- Databases: "registeration", "acm_w", "acm_sc"
- Collections: Dynamic (one per event, named after event title in lowercase with underscores)
- Example: "Workshop on AI" → collection name: "workshop_on_ai"

API ENDPOINTS NEEDED:

1. GET /api/chapters/{database}/events
   - Returns list of all events in a database
   - Response includes: eventName, totalRegistrations, attendedCount, attendancePercentage

2. GET /api/events/registrations?eventTitle={}&database={}
   - Returns all registrations for an event
   - Supports filters: all, attended, not_attended, yellow_card

3. POST /api/verify-attendance
   - Body: { attendanceHash, eventTitle, database }
   - Finds registration by hash and marks attendance = true
   - Returns user details on success

4. POST /api/mark-yellow-card
   - Body: { registrationId, eventTitle, database, reason, markedBy }
   - Updates yellowCard = true (permanent)
   - Returns updated user details

5. GET /api/export-attendance?eventTitle={}&database={}&filter={}
   - Filters: "all", "eligible" (no yellow cards), "flagged"
   - Returns CSV file download

AUTHENTICATION:
- JWT token-based authentication
- Login endpoint: POST /api/auth/login
- Token stored securely and included in all requests
- Header: "Authorization: Bearer {token}"

REAL-TIME UPDATES:
- Refresh attendee list every 3-5 seconds
- Show visual animation when new attendance marked
- Update statistics in real-time

Please set up all database connections, API integrations, and authentication flow.
```

---

### 🎯 Prompt 3: QR Scanner Screen Design

```
Create the main Attendance Management screen with these specifications:

LAYOUT:
- Dual-pane split screen (works on mobile and tablet)
- Left side: QR Scanner (40% width)
- Right side: Attendee List (60% width)

LEFT PANE - QR SCANNER:
- Live camera view showing QR code scanner
- Large "Scan QR Code" text at top
- Instructions: "Point camera at QR code on registration PDF"
- When QR scanned:
  * Extract "attendanceHash" from QR code
  * Send POST request to /api/verify-attendance
  * Show success overlay with:
    - Green checkmark animation
    - Student name and roll number
    - "Attendance Marked Successfully"
    - Success sound/vibration
    - Auto-dismiss after 2 seconds
  * If already marked: Show "Already Attended at {time}"
  * If invalid: Show red error "Invalid QR Code"

RIGHT PANE - ATTENDEE LIST:
- Top section:
  * Event name as header
  * Stats: "87 / 150 attended (58%)"
  * Search bar (search by name/roll/email)
  * Filter dropdown: All, Attended, Not Attended, Yellow Card
  
- List items design:
  * Status dot: 🟢 Green (attended), 🔴 Red (not yet), 🟡 Yellow (flagged)
  * Student name in bold
  * Roll number below name
  * Email and phone (smaller text)
  * Time attended (if applicable)
  * Yellow flag icon if flagged
  
- List interactions:
  * Tap: Show full details modal
  * Long-press: Show action menu:
    - View Details
    - Issue Yellow Card
    - Send Email
    - Call Phone

- Bottom: Export button (CSV download)

AUTO-REFRESH:
- List updates automatically every 3 seconds
- Show subtle loading indicator
- Highlight newly attended entries with animation

Please create this dual-pane interface with all interactive elements.
```

---

### 🎯 Prompt 4: Yellow Card System

```
Implement the Yellow Card system with these specifications:

TRIGGER:
- User long-presses on a participant in the attendee list
- Action menu appears with option "Issue Yellow Card"

YELLOW CARD DIALOG:
- Title: "Issue Yellow Card"
- Shows participant info:
  * Name: {firstName} {lastName}
  * Roll: {rollNumber}
  * Current status
  
- Warning message (red background):
  "⚠️ Warning: This action cannot be reversed.
   The participant will NOT be eligible for certificates."

- Required field: "Reason for Yellow Card"
  * Multi-line text input
  * Placeholder: "Enter reason (e.g., disruptive behavior)"
  * Minimum 10 characters

- Two buttons:
  * Cancel (gray, dismisses dialog)
  * Confirm (red, proceeds with action)

WHEN CONFIRMED:
1. Send POST request to /api/mark-yellow-card with:
   {
     "registrationId": "{id}",
     "eventTitle": "{event}",
     "database": "{db}",
     "reason": "{entered reason}",
     "markedBy": "{current user name}"
   }

2. Update database:
   - yellowCard = true
   - yellowCardReason = entered text
   - yellowCardMarkedBy = current user
   - yellowCardMarkedAt = current timestamp
   - status = "flagged"

3. Update UI:
   - Add yellow flag icon 🟡 to participant card
   - Change status text to "Flagged"
   - Show warning badge: "Not certificate-eligible"
   - Add to "Yellow Card" filter list

4. Show success toast: "Yellow card issued to {name}"

DISPLAY IN LIST:
- Yellow carded participants show:
  * Yellow dot 🟡 instead of green/red
  * Yellow flag icon next to name
  * Status: "Flagged: {short reason}"
  * Tap to see full reason in modal
  * Export filter: "Flagged Participants"

PERMANENT RULE:
- Once issued, yellow card CANNOT be removed
- No "Undo" or "Remove" option
- No way to mark as eligible again
- Reason cannot be edited
- Permanent record in database

Please implement this complete yellow card workflow.
```

---

### 🎯 Prompt 5: Export Functionality

```
Create the Export feature with these specifications:

EXPORT BUTTON:
- Location: Top-right corner of Attendance Management screen
- Icon: Download icon 📊
- Text: "Export"
- Style: Primary blue button

EXPORT DIALOG:
- Title: "Export Attendance Report"
- Event name displayed: "{Event Title}"

- Three radio button options:

  1. ○ Export All Attended
     - Subtitle: "All participants who attended (including yellow cards)"
     - Count: "87 participants"
     
  2. ● Export Certificate-Eligible (default selected)
     - Subtitle: "Only attended participants without yellow cards"
     - Count: "85 participants"
     - Badge: "Recommended for certificates"
     
  3. ○ Export Flagged Participants
     - Subtitle: "Only yellow-carded participants"
     - Count: "2 participants"

- Format selector:
  * Dropdown: CSV (default) or Excel
  
- Preview section:
  * Shows first 5 rows of data
  * Column headers visible

- Two buttons:
  * Cancel (gray)
  * Export (blue, primary)

CSV FILE STRUCTURE:
Columns:
- Serial No
- Name (Full)
- Roll Number
- Email
- Phone
- Branch
- Year
- Division
- ACM Member (Yes/No)
- Membership ID
- Transaction ID
- Fee Amount
- Attendance Time (if attended)
- Yellow Card (Yes/No)
- Yellow Card Reason (if applicable)

EXPORT LOGIC:
1. When "Export" clicked:
   - Show loading spinner
   - Send GET request: /api/export-attendance?eventTitle={}&database={}&filter={}
   - Filter parameter: "all", "eligible", or "flagged"

2. Receive CSV file from backend

3. Download file with name:
   - Format: "{event_name}_attendance_{filter}_{date}.csv"
   - Example: "workshop_on_ai_eligible_2025-10-06.csv"

4. Show success message: "Report exported successfully"

5. Close dialog

ERROR HANDLING:
- If no data: Show "No participants match this filter"
- If network error: Show "Failed to export. Check connection."
- If server error: Show "Export failed. Please try again."

Please implement this complete export workflow with all three filters.
```

---

### 🎯 Prompt 6: Authentication & Navigation

```
Set up the complete authentication and navigation flow:

LOGIN SCREEN:
- App logo at top
- Title: "Attendance Management"
- Subtitle: "Committee Head Access"

- Input fields:
  * Email (email validation)
  * Password (hidden, min 8 characters)
  
- "Remember Me" checkbox

- Login button (full width, blue)
  * On click: POST /api/auth/login
  * Request body: { email, password }
  * Response: { success, token, user: { id, name, email, role, chapters } }
  
- On success:
  * Store JWT token securely
  * Store user info
  * Navigate to Chapter Selection

- On error:
  * Show error message: "Invalid credentials"
  * Clear password field

- "Forgot Password?" link at bottom

NAVIGATION FLOW:
1. Login Screen
   ↓
2. Chapter Selection Screen
   - Show 3 cards based on user.chapters array
   - Each card shows:
     * Chapter logo/icon
     * Chapter name
     * Total events count
     * Active events count
   - On tap: Navigate to Event List (pass database name)
   ↓
3. Event List Screen
   - Header: Chapter name with back button
   - List of events with stats
   - On tap: Navigate to Attendance Management
   ↓
4. Attendance Management Screen (Main)
   - Header: Event name + back button + export button
   - Dual pane: Scanner + List
   - Bottom nav: Stats, Refresh, Settings

NAVIGATION BAR:
- Back button on all screens (except Chapter Selection)
- Logout button in top-right (all screens after login)
- On logout:
  * Clear token and user data
  * Navigate back to Login Screen
  * Show confirmation dialog

PROTECTED ROUTES:
- All screens except Login require authentication
- Check for valid JWT token
- If token expired: Auto-logout and show message
- If no token: Redirect to Login

BOTTOM TAB BAR (Attendance Management screen):
- Tab 1: Scanner (default)
- Tab 2: List View
- Tab 3: Statistics
- Tab 4: Settings

DEEP LINKING:
- Support direct links to events
- Format: app://event/{database}/{eventTitle}
- Requires authentication first

Please implement this complete navigation and authentication system.
```

---

### 🎯 Prompt 7: Real-Time Updates & Animations

```
Implement real-time updates and animations for the attendance app:

POLLING MECHANISM:
- Every 3 seconds, fetch updated data:
  * GET /api/events/registrations?eventTitle={}&database={}
  
- Compare with current data:
  * If new attendance marked: Show animation
  * If yellow card issued: Update UI
  * If no changes: Silent refresh

- Show subtle loading indicator during refresh:
  * Small spinner in top-right corner
  * Or progress bar at top

ANIMATIONS:

1. ATTENDANCE MARKED:
   When QR scanned successfully:
   - Scanner overlay slides up from bottom
   - Green checkmark scales in with bounce
   - Student name fades in
   - Success message fades in
   - Play success sound (beep)
   - Vibrate device (short pulse)
   - Auto-dismiss after 2 seconds with fade out
   
   In attendee list:
   - Newly attended participant highlighted (green glow)
   - Status dot changes from 🔴 to 🟢 with pulse
   - Time stamp appears with fade-in
   - Card briefly scales up (1.05x) then back
   - Glow persists for 5 seconds then fades

2. YELLOW CARD ISSUED:
   - Confirmation dialog slides down
   - Yellow flag icon appears with rotation
   - Status changes with color transition
   - Warning badge fades in
   - Card background briefly flashes yellow

3. LIST UPDATES:
   - New items slide in from top
   - Removed items slide out
   - Position changes animate smoothly
   - Search results fade in/out

4. EXPORT:
   - Export button shows spinner during processing
   - Progress bar for large exports
   - Success checkmark when complete
   - Download animation (arrow down)

5. ERROR STATES:
   - Error messages slide in from top (red background)
   - Shake animation for invalid inputs
   - Fade out after 3 seconds

PERFORMANCE:
- Use virtualized list for 500+ participants
- Lazy load images and avatars
- Debounce search input (300ms)
- Cancel previous API calls when new one starts
- Cache event data locally

OFFLINE MODE:
- Detect network status
- Show offline banner at top
- Cache last fetched data
- Allow viewing cached data
- Queue actions (attendance marking, yellow cards)
- Sync when back online
- Show sync status indicator

HAPTIC FEEDBACK:
- Light tap on button press
- Medium pulse on successful scan
- Error vibration on invalid QR
- Success vibration on yellow card issued

SOUND EFFECTS:
- Success beep on attendance marked
- Error sound on invalid QR
- Click sound on button press
- Notification sound on list update

Please implement all these real-time features and smooth animations.
```

---

### 🎯 Prompt 8: Statistics & Analytics Dashboard

```
Create a Statistics/Analytics screen showing attendance insights:

SCREEN LAYOUT:
- Header: "Event Analytics"
- Event name and date
- Export button (top-right)

OVERVIEW CARDS (Top Row):
- Card 1: Total Registrations
  * Large number: "150"
  * Icon: 👥
  * Subtitle: "Registered participants"

- Card 2: Attended
  * Large number: "87"
  * Percentage: "58%"
  * Icon: ✅
  * Progress bar (green)

- Card 3: Not Attended
  * Large number: "63"
  * Percentage: "42%"
  * Icon: ⏳
  * Progress bar (red)

- Card 4: Yellow Cards
  * Large number: "2"
  * Percentage: "1.3%"
  * Icon: 🟡
  * Subtitle: "Flagged participants"

ATTENDANCE TIMELINE:
- Chart: Attendance over time (hourly)
- X-axis: Time (10:00, 10:30, 11:00, etc.)
- Y-axis: Number of attendees
- Line graph showing attendance trend
- Peak time highlighted

BRANCH-WISE BREAKDOWN:
- Pie chart or bar chart
- Categories:
  * Computer Engineering: 40 (46%)
  * IT: 25 (29%)
  * Electronics: 15 (17%)
  * Others: 7 (8%)

YEAR-WISE BREAKDOWN:
- Horizontal bar chart
- Categories:
  * FE: 10 students
  * SE: 25 students
  * TE: 35 students
  * BE: 17 students

REVENUE SECTION:
- Total Revenue: ₹43,500
- ACM Members: ₹22,500 (45 × ₹500)
- Non-Members: ₹21,000 (42 × ₹500)

CERTIFICATE-ELIGIBLE:
- Large card with icon 🏆
- Number: "85 participants"
- Subtitle: "Eligible for certificates"
- Quick export button

YELLOW CARD SUMMARY:
- Collapsible section
- List of flagged participants:
  * Name and roll number
  * Reason (truncated)
  * Who issued
  * When issued
  * Tap to see full details

QUICK ACTIONS:
- Export All Data
- Email Report
- Download PDF Summary
- View Full List

REFRESH:
- Pull-to-refresh gesture
- Auto-refresh every 30 seconds
- Last updated timestamp

Please create this comprehensive analytics dashboard with all charts and statistics.
```

---

### 🎯 Complete Deployment Prompt

```
Final deployment checklist and configuration:

ENVIRONMENT VARIABLES:
- MONGODB_URI: MongoDB Atlas connection string
- MONGODB_DB: Database name (registeration/acm_w/acm_sc)
- JWT_SECRET: Secret key for JWT tokens
- API_BASE_URL: Backend API URL
- APP_VERSION: Version number

SECURITY CHECKLIST:
✓ All API calls use HTTPS
✓ JWT tokens stored securely (encrypted)
✓ Rate limiting on scanner (60 req/min)
✓ Input validation on all forms
✓ SQL injection protection
✓ XSS protection
✓ CSRF tokens
✓ Secure password storage (bcrypt)

TESTING CHECKLIST:
✓ Login/logout flow
✓ QR code scanning (valid, invalid, duplicate)
✓ Yellow card issuance (permanent)
✓ Export all 3 filter types
✓ Real-time list updates
✓ Offline mode
✓ 500+ participants performance
✓ Network error handling
✓ Multiple concurrent users

OPTIMIZATION:
✓ Image compression
✓ Lazy loading
✓ Code splitting
✓ Caching strategy
✓ Database indexing
✓ API response caching

DEPLOYMENT:
- Mobile App: Submit to App Store and Play Store
- Web App: Deploy to Vercel/Netlify
- Backend: Already running on Vercel
- Database: MongoDB Atlas (already set up)

MONITORING:
- Error tracking (Sentry)
- Analytics (Google Analytics/Mixpanel)
- Performance monitoring
- User feedback collection

Please configure all environment variables and deploy the app.
```

---

## � One-Shot Firebase Studio Prompt

Use this complete prompt to build the entire attendance app in Firebase Studio (or similar AI builders):

```
BUILD COMPLETE ATTENDANCE MANAGEMENT APP

PROJECT NAME: ACM Event Attendance Manager

=== APP OVERVIEW ===
Build a mobile app for committee heads to manage event attendance at ACM student chapter events using QR code scanning. The app connects to MongoDB Atlas and provides real-time attendance tracking with a yellow card system for problematic participants.

=== DATABASE SETUP ===
Backend: MongoDB Atlas
Cluster: "events"
Databases: 
  1. "registeration" (ACM SIGAI)
  2. "acm_w" (ACM-W)
  3. "acm_sc" (ACM Student Chapter)

Collections: Dynamic per event (e.g., "workshop_on_ai_ml")

Document Schema:
{
  _id: ObjectId,
  eventTitle: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  rollNumber: string,
  branch: string,
  year: string,
  division: string,
  isAcmMember: boolean,
  membershipId: string | null,
  transactionId: string,
  feeAmount: number,
  attendanceHash: string,           // SHA256 hash for QR code
  attendance: boolean,               // false → true when scanned
  attendanceMarkedAt: timestamp | null,
  yellowCard: boolean,               // false → true if flagged
  yellowCardReason: string | null,
  yellowCardMarkedBy: string | null,
  yellowCardMarkedAt: timestamp | null,
  status: "registered" | "attended" | "flagged",
  createdAt: timestamp,
  updatedAt: timestamp
}

=== API ENDPOINTS ===
Base URL: https://yourdomain.com/api

1. POST /api/auth/login
   Body: { email, password }
   Response: { success, token, user: { id, name, email, role, chapters[] } }

2. GET /api/chapters/{database}/events
   Returns: [{ eventName, displayName, totalRegistrations, attendedCount, attendancePercentage, yellowCardCount }]

3. GET /api/events/registrations?eventTitle={}&database={}&filter={}
   Filters: all | attended | not_attended | yellow_card
   Returns: Array of registration documents

4. POST /api/verify-attendance
   Body: { attendanceHash, eventTitle, database }
   Action: Marks attendance = true, sets timestamp
   Response: { success, message, alreadyMarked, userData }

5. POST /api/mark-yellow-card
   Body: { registrationId, eventTitle, database, reason, markedBy }
   Action: Sets yellowCard = true (PERMANENT)
   Response: { success, message, userData }

6. GET /api/export-attendance?eventTitle={}&database={}&filter={}
   Filters: all | eligible | flagged
   Returns: CSV file download

=== SCREEN 1: LOGIN ===
Layout:
  - App logo centered at top
  - Title: "Attendance Management"
  - Email input field (with validation)
  - Password input field (hidden, min 8 chars)
  - "Remember Me" checkbox
  - Blue "Login" button (full width)
  - "Forgot Password?" link

Actions:
  - On login: POST to /api/auth/login
  - Store JWT token securely
  - Navigate to Chapter Selection on success
  - Show error message on failure

=== SCREEN 2: CHAPTER SELECTION ===
Layout:
  - Header: "Select Chapter"
  - Three large cards in grid:
    
    Card 1: ACM SIGAI
    - Icon: 🎓
    - Database: "registeration"
    - Shows: Total events count
    - Tap: Navigate to Event List
    
    Card 2: ACM-W
    - Icon: 👩‍💻
    - Database: "acm_w"
    - Shows: Total events count
    - Tap: Navigate to Event List
    
    Card 3: ACM SC
    - Icon: 💻
    - Database: "acm_sc"
    - Shows: Total events count
    - Tap: Navigate to Event List

Actions:
  - Fetch events on mount: GET /api/chapters/{database}/events
  - Pass selected database to next screen
  - Logout button in header

=== SCREEN 3: EVENT LIST ===
Layout:
  - Header: "{Chapter Name}" with back button
  - Scrollable list of event cards
  
Each Event Card:
  - Event name (large, bold)
  - Total registrations count
  - Attendance stats: "87 / 150 attended (58%)"
  - Progress bar (green for attended %)
  - Yellow card count badge if any
  - Tap: Navigate to Attendance Management

Actions:
  - Fetch on mount: GET /api/chapters/{database}/events
  - Pull to refresh
  - Search bar at top
  - Sort options: Name, Date, Attendance %

=== SCREEN 4: ATTENDANCE MANAGEMENT (MAIN SCREEN) ===
Layout: DUAL PANE (50/50 split or tabs on mobile)

LEFT PANE - QR SCANNER:
  Components:
    - Live camera view (full pane)
    - Text overlay: "Point camera at QR code"
    - Scan frame indicator
    
  Scanner Logic:
    1. Continuously scan for QR codes
    2. When QR detected: Extract "attendanceHash"
    3. POST to /api/verify-attendance with:
       { attendanceHash, eventTitle, database }
    4. On success:
       - Show green overlay with checkmark ✅
       - Display: Name, Roll Number, "Attendance Marked!"
       - Play success sound + vibrate
       - Auto-dismiss after 2 seconds
    5. If already marked:
       - Show blue overlay: "Already attended at {time}"
    6. If invalid:
       - Show red overlay: "Invalid QR Code"
    7. Update right pane list in real-time

RIGHT PANE - ATTENDEE LIST:
  Header Section:
    - Event name
    - Stats: "87 / 150 attended (58%)"
    - Search bar (search name/roll/email)
    - Filter dropdown: All | Attended | Not Attended | Yellow Card
    - Sort dropdown: Name | Roll | Time
    - Export button (top-right)
    
  List Items:
    Each participant card shows:
    - Status dot: 
      * 🟢 Green = Attended
      * 🔴 Red = Not yet attended
      * 🟡 Yellow = Flagged
    - Name (bold, large)
    - Roll number
    - Email
    - Phone
    - Branch • Year
    - Time attended (if applicable)
    - Yellow flag icon 🟡 (if flagged)
    
  Card Actions:
    - Single tap: Show full details modal
    - Long press: Action menu
      * View Details
      * Issue Yellow Card 🟡
      * Send Email 📧
      * Call Phone 📞

  Auto-Refresh:
    - Poll every 3 seconds: GET /api/events/registrations
    - Highlight newly attended with green glow animation
    - Smooth transitions

=== YELLOW CARD DIALOG ===
Trigger: Long-press participant → Select "Issue Yellow Card"

Dialog Layout:
  - Title: "⚠️ Issue Yellow Card"
  - Participant info: Name, Roll Number
  - Warning (red background):
    "This action CANNOT be reversed. The participant will NOT be eligible for certificates."
  - Required field: "Reason for Yellow Card"
    * Multi-line text input
    * Placeholder: "e.g., disruptive behavior"
    * Min 10 characters
  - Two buttons:
    * Cancel (gray)
    * Confirm (red)

On Confirm:
  1. POST to /api/mark-yellow-card
     Body: { registrationId, eventTitle, database, reason, markedBy: currentUser }
  2. Update UI:
     - Add yellow dot 🟡
     - Show yellow flag icon
     - Change status to "Flagged"
     - Add "Not certificate-eligible" badge
  3. Show toast: "Yellow card issued to {name}"
  4. Refresh list

Rules:
  - Yellow card is PERMANENT (no undo)
  - Cannot be edited or removed
  - Always visible in list with reason

=== EXPORT DIALOG ===
Trigger: Click Export button

Dialog Layout:
  - Title: "Export Attendance Report"
  - Event name displayed
  
  Three radio options:
    ○ Export All Attended
      - Subtitle: "All participants who attended (including yellow cards)"
      - Count: "87 participants"
      
    ● Export Certificate-Eligible (default)
      - Subtitle: "Only attended without yellow cards"
      - Count: "85 participants"
      - Badge: "✓ Recommended for certificates"
      
    ○ Export Flagged Participants
      - Subtitle: "Only yellow-carded participants"
      - Count: "2 participants"
  
  - Format selector: CSV (default) | Excel
  - Preview: First 5 rows
  - Buttons: Cancel | Export

On Export:
  1. Show loading spinner
  2. GET /api/export-attendance?eventTitle={}&database={}&filter={}
  3. Download CSV file: "{event}_{filter}_{date}.csv"
  4. Show success message
  5. Close dialog

CSV Columns:
  Serial No, Name, Roll Number, Email, Phone, Branch, Year, Division, ACM Member, 
  Membership ID, Transaction ID, Fee Amount, Attendance Time, Yellow Card, Yellow Card Reason

=== STATISTICS SCREEN (Optional Tab) ===
Layout:
  - Overview Cards:
    * Total Registrations
    * Attended (with percentage)
    * Not Attended
    * Yellow Cards
  
  - Attendance Timeline (line chart)
    * X-axis: Time (hourly)
    * Y-axis: Attendance count
    * Shows peak times
  
  - Branch-wise Breakdown (pie chart)
  - Year-wise Breakdown (bar chart)
  - Total Revenue card
  - Certificate-eligible count
  - Quick export button

=== DESIGN SYSTEM ===
Colors:
  - Primary: #3B82F6 (Blue)
  - Success: #10B981 (Green)
  - Warning: #FBBF24 (Yellow)
  - Danger: #EF4444 (Red)
  - Background: #F9FAFB (Light Gray)
  - Text Dark: #111827
  - Text Light: #6B7280

Typography:
  - Headings: Bold, 18-24px
  - Body: Regular, 14-16px
  - Small: 12px
  - Monospace for IDs

Components:
  - Rounded buttons (8px radius)
  - Card shadows (subtle)
  - Smooth transitions (200ms)
  - Haptic feedback on actions

=== CRITICAL RULES ===
1. ✅ ONLY QR scanner can mark attendance - NO manual marking
2. 🟡 Yellow cards are PERMANENT - Cannot be removed
3. 🟡 Certificate eligibility = attendance: true AND yellowCard: false
4. ⚡ Real-time updates every 3 seconds
5. 🔒 All API calls require JWT token in header
6. 📱 Support offline mode (cache data, sync later)
7. 🔊 Success sound + vibration on scan
8. ✨ Animate new attendance with green glow

=== ANIMATIONS ===
1. Scan Success:
   - Green overlay slides up
   - Checkmark scales in with bounce
   - Success message fades in
   - Auto-dismiss with fade out
   - In list: Green glow for 5 seconds

2. Yellow Card Issued:
   - Yellow flag rotates in
   - Warning badge fades in
   - Card briefly flashes yellow

3. List Updates:
   - New items slide in from top
   - Status changes with color transition
   - Smooth sorting transitions

4. Loading States:
   - Skeleton screens while loading
   - Shimmer effect on cards
   - Spinner for API calls

=== ERROR HANDLING ===
- Network errors: Show banner, enable retry
- Invalid QR: Red error message, shake animation
- Already scanned: Blue info message
- API errors: Toast with error message
- Offline mode: Show offline banner, queue actions

=== AUTHENTICATION ===
- JWT token stored securely (encrypted storage)
- Include in all API calls: Header "Authorization: Bearer {token}"
- Auto-logout on token expiry
- Refresh token before expiry if possible

=== PERMISSIONS ===
- Camera: Required for QR scanner
- Network: Required for API calls
- Storage: For caching data
- Notifications: Optional (for updates)

=== TESTING SCENARIOS ===
1. Valid QR scan → Marks attendance
2. Duplicate QR scan → Shows "Already marked"
3. Invalid QR → Shows error
4. Yellow card issuance → Permanent flag
5. Export all 3 filters → Correct data
6. Offline mode → Queue actions
7. 500+ participants → Performance test
8. Real-time updates → List refreshes

=== DEPLOYMENT ===
- Environment Variables:
  * MONGODB_URI
  * API_BASE_URL
  * JWT_SECRET
  
- Build Settings:
  * Target: iOS 14+, Android 8+
  * Bundle ID: com.acm.attendance
  * Version: 1.0.0

- App Store Details:
  * Name: ACM Attendance Manager
  * Category: Productivity
  * Description: Event attendance management for ACM chapters

BUILD THIS COMPLETE APP WITH:
✓ All 4 screens with proper navigation
✓ MongoDB integration
✓ QR scanner with auto-marking
✓ Real-time attendee list with filters
✓ Yellow card system (permanent)
✓ Export with 3 filters
✓ Smooth animations and haptics
✓ Offline support
✓ Error handling
✓ Security (JWT authentication)

ENSURE:
✓ No manual attendance marking (QR only!)
✓ Yellow cards cannot be removed
✓ Real-time updates every 3 seconds
✓ Certificate-eligible filter excludes yellow cards
✓ Success feedback (sound + vibration + animation)
```

---

## �📋 Summary

This comprehensive guide contains everything needed to build the complete attendance management system:

### ✅ What's Already Built
- Registration website
- PDF generation with QR codes
- MongoDB database with yellow card fields
- Attendance verification API

### 🚧 What Needs Building
- Mobile/Web attendance app
- Remaining API endpoints
- Authentication system
- Analytics dashboard

### 📚 What's Documented
- Complete system architecture
- Database structure and data model
- All API endpoints with schemas
- User flows and wireframes
- Technical requirements
- Security best practices
- Testing checklist
- No-code builder prompts

---

**Ready to build!** 🚀

*Last Updated: October 6, 2025*  
*Version: 1.0*
