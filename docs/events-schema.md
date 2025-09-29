# Events Data Schema

This document describes the structure of the events data used in the RAIT ACM SIGAI website.

## Event Object

Each event in the `events.json` file should follow this structure:

```typescript
{
  // Unique identifier for the event (required)
  "id": number,
  
  // Event title (required)
  "title": string,
  
  // URL-friendly slug (required, lowercase with hyphens)
  "slug": string,
  
  // Event date in ISO format ("YYYY-MM-DD") (required)
  "date": string,
  
  // Event time range (e.g., "2:00 PM - 5:00 PM")
  "time": string,
  
  // Event venue/location
  "location": string,
  
  // Path to event image (should be in public directory)
  "image": string,
  
  // Flag to highlight new events
  "isNew": boolean,
  
  // Short description (max 200 chars recommended)
  "description": string,
  
  // Array of speaker objects
  "speakers": [
    {
      // Speaker's full name
      "name": string,
      
      // Speaker's title/position
      "title": string,
      
      // Path to speaker's photo (should be in public directory)
      "image": string
    }
  ],
  
  // Detailed event information
  "details": {
    // Long description
    "overview": string,
    
    // List of topics covered
    "topics": string[],
    
    // Required knowledge/skills
    "prerequisites": string,
    
    // Items participants should bring
    "whatToBring": string
  },
  
  // Optional registration URL
  "registrationLink"?: string,
  
  // Categories for filtering
  "tags": string[]
}
```

## Example Event

```json
{
  "id": 1,
  "title": "AI & Machine Learning Workshop",
  "slug": "ai-ml-workshop",
  "date": "2025-10-15",
  "time": "10:00 AM - 4:00 PM",
  "location": "RAIT Main Auditorium",
  "image": "/img/events/ai-workshop.jpg",
  "isNew": true,
  "description": "A hands-on workshop covering the fundamentals of AI and Machine Learning.",
  "speakers": [
    {
      "name": "Dr. Rajesh Sharma",
      "title": "AI Research Lead, TechCorp",
      "image": "/img/speakers/rajesh-sharma.jpg"
    }
  ],
  "details": {
    "overview": "This workshop will introduce participants to the core concepts of AI and Machine Learning...",
    "topics": [
      "Introduction to AI & ML",
      "Supervised vs Unsupervised Learning",
      "Neural Networks Basics"
    ],
    "prerequisites": "Basic programming knowledge in Python",
    "whatToBring": "Laptop with Python and required libraries installed"
  },
  "registrationLink": "https://example.com/register/ai-workshop",
  "tags": ["workshop", "ai", "machine learning"]
}
```

## Best Practices

1. Keep `description` concise (under 200 characters)
2. Use descriptive, URL-friendly slugs (lowercase, hyphens for spaces)
3. Optimize images for web before uploading
4. Keep speaker images square (1:1 aspect ratio)
5. Use consistent date format (YYYY-MM-DD)
6. Sort events by date (newest first) in the JSON array
7. Use the `isNew` flag to highlight recent events
8. Include relevant tags for filtering
