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
  id: number | string;
  idx?: number;
  title: string;
  slug?: string;
  date: string;
  time: string;
  location: string;
  image: string;
  isNew?: boolean;
  description: string;
  speakers?: Speaker[];
  details?: EventDetails;
  registrationLink?: string;
  registration_link?: string | null;
  tags?: string[];
  category?: string;
  is_featured?: boolean;
  registration_fee?: number;
  end_date?: string;
  created_at?: string;
  updated_at?: string;
}
