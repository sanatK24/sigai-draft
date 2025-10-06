import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { attendanceHash, eventTitle } = body;

    if (!attendanceHash || !eventTitle) {
      return NextResponse.json(
        { success: false, error: 'Attendance hash and event title are required' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('registeration');
    
    // Use event title as collection name (sanitized)
    const collectionName = eventTitle.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    const collection = db.collection(collectionName);

    // Find user by attendance hash
    const registration = await collection.findOne({
      attendanceHash: attendanceHash
    });

    if (!registration) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'User not found or invalid QR code',
          attendance: false
        },
        { status: 404 }
      );
    }

    // Check if already marked attendance
    if (registration.attendance === true) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'Attendance already marked',
          attendance: true,
          alreadyMarked: true,
          userData: {
            name: `${registration.firstName} ${registration.lastName}`,
            rollNumber: registration.rollNumber,
            email: registration.email,
            markedAt: registration.attendanceMarkedAt || registration.updatedAt
          }
        },
        { status: 200 }
      );
    }

    // Update attendance to true
    const updateResult = await collection.updateOne(
      { attendanceHash: attendanceHash },
      { 
        $set: { 
          attendance: true,
          attendanceMarkedAt: new Date(),
          updatedAt: new Date()
        } 
      }
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Failed to mark attendance' },
        { status: 500 }
      );
    }

    // Return success with user data
    return NextResponse.json({
      success: true,
      message: 'Attendance marked successfully',
      attendance: true,
      alreadyMarked: false,
      userData: {
        name: `${registration.firstName} ${registration.lastName}`,
        rollNumber: registration.rollNumber,
        email: registration.email,
        branch: registration.branch,
        year: registration.year,
        markedAt: new Date()
      }
    });

  } catch (error) {
    console.error('Attendance verification error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to verify attendance. Please try again.',
        attendance: false
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check attendance status without updating
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const attendanceHash = searchParams.get('hash');
    const eventTitle = searchParams.get('event');

    if (!attendanceHash || !eventTitle) {
      return NextResponse.json(
        { success: false, error: 'Attendance hash and event title are required' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('registeration');
    
    // Use event title as collection name (sanitized)
    const collectionName = eventTitle.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    const collection = db.collection(collectionName);

    // Find user by attendance hash
    const registration = await collection.findOne({
      attendanceHash: attendanceHash
    });

    if (!registration) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'User not found',
          attendance: false
        },
        { status: 404 }
      );
    }

    // Return attendance status
    return NextResponse.json({
      success: true,
      attendance: registration.attendance || false,
      userData: {
        name: `${registration.firstName} ${registration.lastName}`,
        rollNumber: registration.rollNumber,
        email: registration.email,
        branch: registration.branch,
        year: registration.year,
        markedAt: registration.attendanceMarkedAt || null
      }
    });

  } catch (error) {
    console.error('Attendance check error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to check attendance.',
        attendance: false
      },
      { status: 500 }
    );
  }
}
