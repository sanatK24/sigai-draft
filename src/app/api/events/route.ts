import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    // Fetch upcoming events
    const { data: upcomingEvents, error: upcomingError } = await supabase
      .from('events')
      .select('*')
      .gte('date', today)
      .order('date', { ascending: true });

    // Fetch past events
    const { data: pastEvents, error: pastError } = await supabase
      .from('events')
      .select('*')
      .lt('date', today)
      .order('date', { ascending: false });

    if (upcomingError || pastError) {
      throw upcomingError || pastError;
    }

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

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    
    // Handle file upload if present
    if (formData.payment_proof) {
      const { data: fileData, error: uploadError } = await supabase.storage
        .from('event-registrations')
        .upload(
          `payments/${Date.now()}_${formData.name.replace(/\s+/g, '_')}`,
          formData.payment_proof
        );
      
      if (uploadError) throw uploadError;
      formData.payment_proof_url = fileData.path;
      delete formData.payment_proof; // Remove the file data from form data
    }

    const { data, error } = await supabase
      .from('event_registrations')
      .insert([formData])
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error submitting registration:', error);
    return NextResponse.json(
      { error: 'Failed to submit registration' },
      { status: 500 }
    );
  }
}
