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
          start_date: string
          end_date: string
          location: string | null
          image_url: string | null
          slug: string
          registration_url: string | null
          is_featured: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description?: string | null
          start_date: string
          end_date: string
          location?: string | null
          image_url?: string | null
          slug: string
          registration_url?: string | null
          is_featured?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string | null
          start_date?: string
          end_date?: string
          location?: string | null
          image_url?: string | null
          slug?: string
          registration_url?: string | null
          is_featured?: boolean
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
