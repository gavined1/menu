export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      menu_categories: {
        Row: {
          client_id: string
          created_at: string | null
          description: string | null
          description_km: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          name_km: string | null
          slug: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          description?: string | null
          description_km?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          name_km?: string | null
          slug: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          description?: string | null
          description_km?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          name_km?: string | null
          slug?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "menu_categories_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "menu_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_client_members: {
        Row: {
          client_id: string
          created_at: string | null
          id: string
          role: string
          user_id: string
        }
        Insert: {
          client_id: string
          created_at?: string | null
          id?: string
          role: string
          user_id: string
        }
        Update: {
          client_id?: string
          created_at?: string | null
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "menu_client_members_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "menu_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_clients: {
        Row: {
          accent_color: string | null
          address: string | null
          city: string | null
          cover_image_url: string | null
          created_at: string | null
          currency: Database["public"]["Enums"]["menu_currency"] | null
          default_locale: Database["public"]["Enums"]["menu_locale"] | null
          description: string | null
          email: string | null
          exchange_rate: number | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          name: string
          opening_hours: Json | null
          owner_id: string | null
          phone: string | null
          primary_color: string | null
          settings: Json | null
          slug: string
          social_links: Json | null
          updated_at: string | null
        }
        Insert: {
          accent_color?: string | null
          address?: string | null
          city?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          currency?: Database["public"]["Enums"]["menu_currency"] | null
          default_locale?: Database["public"]["Enums"]["menu_locale"] | null
          description?: string | null
          email?: string | null
          exchange_rate?: number | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name: string
          opening_hours?: Json | null
          owner_id?: string | null
          phone?: string | null
          primary_color?: string | null
          settings?: Json | null
          slug: string
          social_links?: Json | null
          updated_at?: string | null
        }
        Update: {
          accent_color?: string | null
          address?: string | null
          city?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          currency?: Database["public"]["Enums"]["menu_currency"] | null
          default_locale?: Database["public"]["Enums"]["menu_locale"] | null
          description?: string | null
          email?: string | null
          exchange_rate?: number | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name?: string
          opening_hours?: Json | null
          owner_id?: string | null
          phone?: string | null
          primary_color?: string | null
          settings?: Json | null
          slug?: string
          social_links?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      menu_featured_items: {
        Row: {
          badge_text: string | null
          client_id: string
          created_at: string | null
          id: string
          image_url: string
          is_active: boolean | null
          item_id: string | null
          sort_order: number | null
          subtitle: string | null
          subtitle_km: string | null
          title: string
          title_km: string | null
          updated_at: string | null
        }
        Insert: {
          badge_text?: string | null
          client_id: string
          created_at?: string | null
          id?: string
          image_url: string
          is_active?: boolean | null
          item_id?: string | null
          sort_order?: number | null
          subtitle?: string | null
          subtitle_km?: string | null
          title: string
          title_km?: string | null
          updated_at?: string | null
        }
        Update: {
          badge_text?: string | null
          client_id?: string
          created_at?: string | null
          id?: string
          image_url?: string
          is_active?: boolean | null
          item_id?: string | null
          sort_order?: number | null
          subtitle?: string | null
          subtitle_km?: string | null
          title?: string
          title_km?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "menu_featured_items_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "menu_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "menu_featured_items_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_items: {
        Row: {
          badges: Database["public"]["Enums"]["menu_item_badge_type"][] | null
          category_id: string | null
          client_id: string
          created_at: string | null
          description: string | null
          description_km: string | null
          id: string
          image_url: string | null
          images: string[] | null
          is_available: boolean | null
          is_featured: boolean | null
          metadata: Json | null
          name: string
          name_km: string | null
          prep_time_minutes: number | null
          price: number | null
          slug: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          badges?: Database["public"]["Enums"]["menu_item_badge_type"][] | null
          category_id?: string | null
          client_id: string
          created_at?: string | null
          description?: string | null
          description_km?: string | null
          id?: string
          image_url?: string | null
          images?: string[] | null
          is_available?: boolean | null
          is_featured?: boolean | null
          metadata?: Json | null
          name: string
          name_km?: string | null
          prep_time_minutes?: number | null
          price?: number | null
          slug: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          badges?: Database["public"]["Enums"]["menu_item_badge_type"][] | null
          category_id?: string | null
          client_id?: string
          created_at?: string | null
          description?: string | null
          description_km?: string | null
          id?: string
          image_url?: string | null
          images?: string[] | null
          is_available?: boolean | null
          is_featured?: boolean | null
          metadata?: Json | null
          name?: string
          name_km?: string | null
          prep_time_minutes?: number | null
          price?: number
          slug?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "menu_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "menu_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "menu_items_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "menu_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_item_variants: {
        Row: {
          id: string
          item_id: string
          name: string
          name_km: string | null
          price: number
          sort_order: number
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          item_id: string
          name: string
          name_km?: string | null
          price: number
          sort_order?: number
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          item_id?: string
          name?: string
          name_km?: string | null
          price?: number
          sort_order?: number
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "menu_item_variants_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      menu_currency: "USD" | "KHR"
      menu_item_badge_type:
        | "vegan"
        | "vegetarian"
        | "spicy"
        | "gluten_free"
        | "new"
        | "best_seller"
        | "chef_special"
        | "seasonal"
      menu_locale: "en" | "km"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      menu_currency: ["USD", "KHR"],
      menu_item_badge_type: [
        "vegan",
        "vegetarian",
        "spicy",
        "gluten_free",
        "new",
        "best_seller",
        "chef_special",
        "seasonal",
      ],
      menu_locale: ["en", "km"],
    },
  },
} as const
