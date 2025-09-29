import { Event as EventType } from '@/types/event';

export async function getEvents(): Promise<EventType[]> {
  try {
    const response = await fetch('/data/events.json');
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    const data = await response.json();
    return data.events;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export async function getUpcomingEvents(limit: number = 6): Promise<EventType[]> {
  const events = await getEvents();
  const today = new Date();
  
  return events
    .filter(event => new Date(event.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, limit);
}

export async function getPastEvents(limit: number = 6): Promise<EventType[]> {
  const events = await getEvents();
  const today = new Date();
  
  return events
    .filter(event => new Date(event.date) < today)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}
