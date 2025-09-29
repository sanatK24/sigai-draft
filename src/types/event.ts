export interface Speaker {
  name: string;
  title: string;
  image?: string;
}

export interface EventDetails {
  overview: string;
  topics: string[];
  prerequisites?: string;
  whatToBring?: string;
}

export interface Event {
  id: number;
  title: string;
  slug: string;
  date: string;
  time: string;
  location: string;
  image: string;
  isNew?: boolean;
  description: string;
  speakers: Speaker[];
  details: EventDetails;
  registrationLink?: string;
  tags?: string[];
}
