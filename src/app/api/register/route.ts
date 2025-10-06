import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import crypto from 'crypto';

// Rate limiting map (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5; // 5 registrations per hour per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

// Validation functions
function validateName(name: string): boolean {
  return /^[A-Za-z]+$/.test(name);
}

function validateRollNumber(rollNo: string): boolean {
  return /^[A-Za-z0-9]+$/.test(rollNo);
}

function validatePhone(phone: string): boolean {
  return /^[0-9]{10}$/.test(phone);
}

function validateTransactionId(txnId: string): boolean {
  return /^[A-Za-z0-9]+$/.test(txnId);
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitizeString(str: string): string {
  // Remove all whitespace
  return str.replace(/\s+/g, '');
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many registration attempts. Please try again later.' 
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const {
      eventId,
      eventTitle,
      eventDate,
      eventTime,
      eventLocation,
      firstName,
      lastName,
      email,
      phone,
      rollNumber,
      branch,
      year,
      division,
      isAcmMember,
      membershipId,
      transactionId,
      feeAmount
    } = body;

    // Validate required fields
    if (!eventId || !eventTitle || !firstName || !lastName || !email || 
        !phone || !rollNumber || !branch || !year || !transactionId || !feeAmount) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Sanitize inputs (remove whitespace)
    const sanitizedFirstName = sanitizeString(firstName);
    const sanitizedLastName = sanitizeString(lastName);
    const sanitizedRollNumber = sanitizeString(rollNumber);
    const sanitizedEmail = sanitizeString(email);
    const sanitizedPhone = sanitizeString(phone);
    const sanitizedTransactionId = sanitizeString(transactionId);

    // Validate formats
    if (!validateName(sanitizedFirstName)) {
      return NextResponse.json(
        { success: false, error: 'First name must contain only letters' },
        { status: 400 }
      );
    }

    if (!validateName(sanitizedLastName)) {
      return NextResponse.json(
        { success: false, error: 'Last name must contain only letters' },
        { status: 400 }
      );
    }

    if (!validateRollNumber(sanitizedRollNumber)) {
      return NextResponse.json(
        { success: false, error: 'Roll number must be alphanumeric' },
        { status: 400 }
      );
    }

    if (!validateEmail(sanitizedEmail)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (!validatePhone(sanitizedPhone)) {
      return NextResponse.json(
        { success: false, error: 'Phone number must be 10 digits' },
        { status: 400 }
      );
    }

    if (!validateTransactionId(sanitizedTransactionId)) {
      return NextResponse.json(
        { success: false, error: 'Transaction ID must be alphanumeric' },
        { status: 400 }
      );
    }

    // Create hash string: firstName + rollNo + lastName + email (no spaces)
    const hashString = sanitizedFirstName + sanitizedRollNumber + sanitizedLastName + sanitizedEmail;
    
    // Generate SHA256 hash
    const attendanceHash = crypto
      .createHash('sha256')
      .update(hashString)
      .digest('hex');

    // Connect to MongoDB
    // Cluster: events, Database: registeration, Collection: event name (dynamic)
    const client = await clientPromise;
    const db = client.db('registeration');
    
    // Use event title as collection name (sanitized)
    const collectionName = eventTitle.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    const collection = db.collection(collectionName);

    // Check for duplicate registration (same email for this event)
    const existingRegistration = await collection.findOne({
      email: sanitizedEmail
    });

    if (existingRegistration) {
      return NextResponse.json(
        { success: false, error: 'You have already registered for this event' },
        { status: 409 }
      );
    }

    // Prepare registration document
    const registrationDoc = {
      eventId,
      eventTitle,
      firstName: sanitizedFirstName,
      lastName: sanitizedLastName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      rollNumber: sanitizedRollNumber,
      branch,
      year,
      division: division || '',
      isAcmMember: Boolean(isAcmMember),
      membershipId: isAcmMember ? membershipId : null,
      transactionId: sanitizedTransactionId,
      feeAmount: Number(feeAmount),
      attendanceHash, // SHA256 hash for QR code
      attendance: false, // Set to false by default, update to true when scanned
      status: 'registered', // registered, attended
      createdAt: new Date(),
      updatedAt: new Date(),
      ipAddress: ip
    };

    // Insert into database
    const result = await collection.insertOne(registrationDoc);

    if (!result.insertedId) {
      throw new Error('Failed to insert registration');
    }

    // Return success with hash for PDF generation
    return NextResponse.json({
      success: true,
      message: 'Registration successful!',
      data: {
        registrationId: result.insertedId.toString(),
        attendanceHash,
        registrationData: {
          eventTitle,
          eventDate,
          eventTime,
          eventLocation,
          firstName: sanitizedFirstName,
          lastName: sanitizedLastName,
          email: sanitizedEmail,
          phone: sanitizedPhone,
          rollNumber: sanitizedRollNumber,
          branch,
          year,
          division: division || '',
          isAcmMember: Boolean(isAcmMember),
          membershipId: isAcmMember ? membershipId : null,
          transactionId: sanitizedTransactionId,
          feeAmount: Number(feeAmount),
          registrationDate: new Date().toISOString()
        }
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process registration. Please try again.' 
      },
      { status: 500 }
    );
  }
}
