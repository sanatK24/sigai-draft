# MongoDB Atlas Setup for Event Registration

# MongoDB Atlas Setup for Event Registration

## Environment Variables

The MongoDB connection string has been added to `.env.local`:

```env
# Password @ is URL-encoded as %40 (@ symbol must be encoded in MongoDB URIs)
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster_name>.6em67mb.mongodb.net/?retryWrites=true&w=majority&appName=events
MONGODB_DB=registeration
```

**Important:** Special characters in MongoDB passwords must be URL-encoded:
- `@` becomes `%40`
- `:` becomes `%3A`
- `/` becomes `%2F`
- `?` becomes `%3F`
- `#` becomes `%23`
- `[` becomes `%5B`
- `]` becomes `%5D`
- `%` becomes `%25`

## Database Structure

### Cluster: `events`
### Database: `registeration`
### Collections: **Dynamic** - One collection per event

Each event gets its own collection, named after the event title (sanitized).

#### Collection Naming Convention
- Event title is sanitized (non-alphanumeric characters replaced with `_`)
- Converted to lowercase
- Examples:
  - "Build Your 1st AI MODEL" → `build_your_1st_ai_model`
  - "SYNARA 2025" → `synara_2025`
  - "Web Development Workshop" → `web_development_workshop`

#### Document Structure

```typescript
{
  _id: ObjectId,
  eventId: string,
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
  attendanceHash: string, // SHA256 hash for QR code verification
  attendance: boolean,    // FALSE by default, TRUE when scanned
  attendanceMarkedAt: Date | null, // Timestamp when attendance was marked
  status: 'registered' | 'attended',
  createdAt: Date,
  updatedAt: Date,
  ipAddress: string
}
```
  isACMMember: boolean,
  transactionId: string,
  registrationFee: number,
  registrationHash: string, // SHA256 hash for attendance
  status: "pending" | "confirmed" | "attended",
  createdAt: Date,
  updatedAt: Date
}
```

## Usage

### Import the MongoDB client:

```typescript
import clientPromise from '@/lib/mongodb';

// In your API route
export async function POST(request: Request) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const collection = db.collection('registrations');
  
  // Your database operations here
  const result = await collection.insertOne(data);
  
  return Response.json({ success: true, id: result.insertedId });
}
```

## Security Notes

⚠️ **Important**: The `.env.local` file contains sensitive credentials and is gitignored. Never commit it to version control.

- The connection string contains the password `@First12`
- For production, consider using environment variables in your deployment platform (Vercel, Netlify, etc.)
- Implement rate limiting on registration endpoints
- Validate all input data before inserting into database

## Next Steps

1. ✅ MongoDB URI configured
2. ✅ Connection utility created (`src/lib/mongodb.ts`)
3. 🔲 Create API route for registration (`/api/register`)
4. 🔲 Implement SHA256 hash generation
5. 🔲 Set up email notifications (optional)
6. 🔲 Create attendance scanning system

## MongoDB Atlas Dashboard

Access your database at: https://cloud.mongodb.com/

- Database: `events`
- Cluster: `events`
- Region: Auto-selected

## Testing Connection

Run the development server and the MongoDB connection will be established automatically:

```bash
npm run dev
```

Check the console for any connection errors.
