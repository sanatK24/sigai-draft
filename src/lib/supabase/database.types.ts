export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string | null
          date: string  // Changed from start_date to date
          time: string
          location: string
          image: string | null  // Changed from image_url to image
          end_date?: string | null
          registration_link?: string | null  // Changed from registration_url
          is_featured: boolean
          category?: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description?: string | null
          date: string  // Changed from start_date to date
          time: string
          location: string
          image?: string | null  // Changed from image_url
          end_date?: string | null
          registration_link?: string | null  // Changed from registration_url
          is_featured?: boolean
          category?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string | null
          date?: string  // Changed from start_date to date
          time?: string
          location?: string
          image?: string | null  // Changed from image_url
          end_date?: string | null
          registration_link?: string | null  // Changed from registration_url
          is_featured?: boolean
          category?: string | null
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
