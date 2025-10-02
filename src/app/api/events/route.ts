import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  is_featured?: boolean;
  registration_link?: string;
  category: string;
  created_at: string;
  updated_at: string;
  end_date: string;
  registration_fee: number;
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'events_rows.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const events: Event[] = JSON.parse(fileContents);
    
    const today = new Date().toISOString().split('T')[0];
    
    // Get upcoming events
    const upcomingEvents = events
      .filter(event => event.date >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Get past events
    const pastEvents = events
      .filter(event => event.date < today)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json({
      upcoming: upcomingEvents || [],
      past: pastEvents || []
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST() {
  // Since we're moving away from Supabase, we'll disable registration for now
  return NextResponse.json(
    { error: 'Online registration is currently not available. Please check back later.' },
    { status: 501 } // Not Implemented
  );
}
