# Attendance Verification System

## Overview

The attendance system uses QR codes with SHA256 hashes to verify and mark attendance for events. Each event has its own collection in MongoDB for easy data management.

## MongoDB Structure

```
Cluster: events
└── Database: registeration
    ├── Collection: build_your_1st_ai_model
    │   └── Documents (registrations for this event)
    ├── Collection: synara_2025
    │   └── Documents (registrations for this event)
    └── Collection: [other_event_names]
        └── Documents (registrations)
```

## How It Works

### 1. **Registration**
When a user registers:
- A SHA256 hash is generated: `firstName + rollNumber + lastName + email` (no spaces)
- This hash is stored in the `attendanceHash` field
- `attendance` field is set to `false` by default
- Data is saved in event-specific collection

### 2. **QR Code Generation**
- The QR code contains the SHA256 `attendanceHash`
- Users receive PDF with the QR code
- QR code can be scanned at the event

### 3. **Attendance Verification**
When scanning the QR code:
- Extract the hash from QR code
- Send to API: `/api/verify-attendance`
- API checks if user exists (if not → error)
- API checks if `attendance` is already `true` (if yes → already marked)
- If `false` → update to `true` + add timestamp

## API Endpoints

### POST `/api/verify-attendance`

Mark attendance for a user.

**Request:**
```json
{
  "attendanceHash": "abc123...",
  "eventTitle": "Build Your 1st AI MODEL"
}
```

**Response (Success - First Time):**
```json
{
  "success": true,
  "message": "Attendance marked successfully",
  "attendance": true,
  "alreadyMarked": false,
  "userData": {
    "name": "John Doe",
    "rollNumber": "12345",
    "email": "john@example.com",
    "branch": "IT",
    "year": "FE",
    "markedAt": "2025-10-06T08:48:00.000Z"
  }
}
```

**Response (Already Marked):**
```json
{
  "success": true,
  "message": "Attendance already marked",
  "attendance": true,
  "alreadyMarked": true,
  "userData": {
    "name": "John Doe",
    "rollNumber": "12345",
    "email": "john@example.com",
    "markedAt": "2025-10-06T08:30:00.000Z"
  }
}
```

**Response (User Not Found):**
```json
{
  "success": false,
  "error": "User not found or invalid QR code",
  "attendance": false
}
```

### GET `/api/verify-attendance?hash=abc123&event=Build Your 1st AI MODEL`

Check attendance status without updating.

**Response:**
```json
{
  "success": true,
  "attendance": true,
  "userData": {
    "name": "John Doe",
    "rollNumber": "12345",
    "email": "john@example.com",
    "branch": "IT",
    "year": "FE",
    "markedAt": "2025-10-06T08:30:00.000Z"
  }
}
```

## Building Your Attendance App

### Step 1: QR Code Scanner
Use any QR scanning library (React Native, Expo Camera, etc.)

```javascript
// Example with expo-camera
import { BarCodeScanner } from 'expo-camera';

const handleBarCodeScanned = async ({ data }) => {
  const attendanceHash = data; // QR code contains the hash
  
  // Send to API
  const response = await fetch('/api/verify-attendance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      attendanceHash: attendanceHash,
      eventTitle: 'Build Your 1st AI MODEL'
    })
  });
  
  const result = await response.json();
  
  if (result.success) {
    if (result.alreadyMarked) {
      alert('Already marked: ' + result.userData.name);
    } else {
      alert('Success: ' + result.userData.name);
    }
  } else {
    alert('Error: ' + result.error);
  }
};
```

### Step 2: Event Selection
Allow organizers to select which event they're marking attendance for:

```javascript
const events = [
  'Build Your 1st AI MODEL',
  'SYNARA 2025',
  'Web Development Workshop'
];

const [selectedEvent, setSelectedEvent] = useState(events[0]);
```

### Step 3: Handle Responses
```javascript
if (result.success && !result.alreadyMarked) {
  // Show success screen with user details
  showSuccessScreen(result.userData);
} else if (result.alreadyMarked) {
  // Show warning: already marked
  showWarning(result.userData);
} else {
  // Show error: user not found
  showError(result.error);
}
```

## Database Queries (Direct MongoDB)

### Get all attendees for an event:
```javascript
db.registeration.build_your_1st_ai_model.find({ attendance: true })
```

### Get attendance count:
```javascript
db.registeration.build_your_1st_ai_model.countDocuments({ attendance: true })
```

### Get all registered users (not attended):
```javascript
db.registeration.build_your_1st_ai_model.find({ attendance: false })
```

### Export attendance list:
```javascript
db.registeration.build_your_1st_ai_model.find(
  { attendance: true },
  { firstName: 1, lastName: 1, rollNumber: 1, email: 1, attendanceMarkedAt: 1 }
)
```

## Advantages of This Structure

✅ **No Data Export Needed** - Simply update `attendance: true`
✅ **Event-Specific Collections** - Easy to manage and query
✅ **Fast Lookups** - Hash-based verification is instant
✅ **Already Marked Detection** - Prevents duplicate scans
✅ **Timestamps** - Know exactly when attendance was marked
✅ **Clean Data** - Each event has its own collection
✅ **Easy Reporting** - Query directly from MongoDB

## Security Considerations

1. **Hash Uniqueness**: SHA256(firstName + rollNumber + lastName + email)
   - Very unlikely to have collisions
   - Each registration has unique hash

2. **One-Time Marking**: Once `attendance: true`, it can't be changed by scanning again

3. **Event-Specific**: Hash is checked against specific event collection only

4. **Rate Limiting**: Consider adding rate limiting to prevent spam scanning

## Example Flow

```
1. Student registers → attendance: false
2. Student receives PDF with QR code (contains hash)
3. Student arrives at event
4. Organizer scans QR code with your app
5. App extracts hash from QR
6. App calls API with hash + event name
7. API finds user in event collection
8. If attendance: false → Update to true + timestamp
9. If attendance: true → Return "already marked"
10. If not found → Return error
```

## Next Steps

Build your attendance app with:
- QR code scanner
- Event selector dropdown
- Success/Error screens
- Attendance statistics dashboard
- Export functionality

No need to export/import data - just scan and update! 🎉
