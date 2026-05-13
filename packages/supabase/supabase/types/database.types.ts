export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.5';
  };
  public: {
    Tables: {
      activities: {
        Row: {
          avg_speed_kmh: number;
          competitive_points_earned: number;
          created_at: string;
          detected_anomalies: string | null;
          distance_km: number;
          duration_seconds: number;
          ended_at: string;
          gps_point_count: number | null;
          id: string;
          max_speed_kmh: number | null;
          route: unknown;
          started_at: string;
          user_id: string;
          validation_reason: string | null;
          validation_status: Database['public']['Enums']['activity_validation_status'];
          wallet_credits_earned: number;
        };
        Insert: {
          avg_speed_kmh: number;
          competitive_points_earned?: number;
          created_at?: string;
          detected_anomalies?: string | null;
          distance_km: number;
          duration_seconds: number;
          ended_at: string;
          gps_point_count?: number | null;
          id?: string;
          max_speed_kmh?: number | null;
          route?: unknown;
          started_at: string;
          user_id: string;
          validation_reason?: string | null;
          validation_status?: Database['public']['Enums']['activity_validation_status'];
          wallet_credits_earned?: number;
        };
        Update: {
          avg_speed_kmh?: number;
          competitive_points_earned?: number;
          created_at?: string;
          detected_anomalies?: string | null;
          distance_km?: number;
          duration_seconds?: number;
          ended_at?: string;
          gps_point_count?: number | null;
          id?: string;
          max_speed_kmh?: number | null;
          route?: unknown;
          started_at?: string;
          user_id?: string;
          validation_reason?: string | null;
          validation_status?: Database['public']['Enums']['activity_validation_status'];
          wallet_credits_earned?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'activities_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          created_at: string;
          id: string;
          onboarding_completed_at: string | null;
          team_id: string | null;
          updated_at: string;
          username: string | null;
          wallet_balance: number;
        };
        Insert: {
          created_at?: string;
          id: string;
          onboarding_completed_at?: string | null;
          team_id?: string | null;
          updated_at?: string;
          username?: string | null;
          wallet_balance?: number;
        };
        Update: {
          created_at?: string;
          id?: string;
          onboarding_completed_at?: string | null;
          team_id?: string | null;
          updated_at?: string;
          username?: string | null;
          wallet_balance?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_team_id_fkey';
            columns: ['team_id'];
            isOneToOne: false;
            referencedRelation: 'teams';
            referencedColumns: ['id'];
          },
        ];
      };
      teams: {
        Row: {
          accent_color: string;
          created_at: string;
          description: string | null;
          id: string;
          is_active: boolean;
          logo_url: string | null;
          motto: string;
          name: string;
          primary_color: string;
          slug: string;
        };
        Insert: {
          accent_color: string;
          created_at?: string;
          description?: string | null;
          id?: string;
          is_active?: boolean;
          logo_url?: string | null;
          motto: string;
          name: string;
          primary_color: string;
          slug: string;
        };
        Update: {
          accent_color?: string;
          created_at?: string;
          description?: string | null;
          id?: string;
          is_active?: boolean;
          logo_url?: string | null;
          motto?: string;
          name?: string;
          primary_color?: string;
          slug?: string;
        };
        Relationships: [];
      };
      transactions: {
        Row: {
          amount: number;
          created_at: string;
          description: string | null;
          id: string;
          ref_activity_id: string | null;
          type: Database['public']['Enums']['transaction_type'];
          user_id: string;
        };
        Insert: {
          amount: number;
          created_at?: string;
          description?: string | null;
          id?: string;
          ref_activity_id?: string | null;
          type: Database['public']['Enums']['transaction_type'];
          user_id: string;
        };
        Update: {
          amount?: number;
          created_at?: string;
          description?: string | null;
          id?: string;
          ref_activity_id?: string | null;
          type?: Database['public']['Enums']['transaction_type'];
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'transactions_ref_activity_id_fkey';
            columns: ['ref_activity_id'];
            isOneToOne: false;
            referencedRelation: 'activities';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'transactions_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      zone_scores: {
        Row: {
          score: number;
          team_id: string;
          updated_at: string;
          zone_h3_index: string;
        };
        Insert: {
          score?: number;
          team_id: string;
          updated_at?: string;
          zone_h3_index: string;
        };
        Update: {
          score?: number;
          team_id?: string;
          updated_at?: string;
          zone_h3_index?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'zone_scores_team_id_fkey';
            columns: ['team_id'];
            isOneToOne: false;
            referencedRelation: 'teams';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'zone_scores_zone_h3_index_fkey';
            columns: ['zone_h3_index'];
            isOneToOne: false;
            referencedRelation: 'zones';
            referencedColumns: ['h3_index'];
          },
          {
            foreignKeyName: 'zone_scores_zone_h3_index_fkey';
            columns: ['zone_h3_index'];
            isOneToOne: false;
            referencedRelation: 'zones_with_scores';
            referencedColumns: ['h3_index'];
          },
        ];
      };
      zones: {
        Row: {
          boundary: unknown;
          centroid: unknown;
          created_at: string;
          h3_index: string;
          owner_team_id: string | null;
          updated_at: string;
        };
        Insert: {
          boundary: unknown;
          centroid: unknown;
          created_at?: string;
          h3_index: string;
          owner_team_id?: string | null;
          updated_at?: string;
        };
        Update: {
          boundary?: unknown;
          centroid?: unknown;
          created_at?: string;
          h3_index?: string;
          owner_team_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'zones_owner_team_id_fkey';
            columns: ['owner_team_id'];
            isOneToOne: false;
            referencedRelation: 'teams';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      zones_with_scores: {
        Row: {
          boundary: unknown;
          centroid: unknown;
          h3_index: string | null;
          owner_team_id: string | null;
          team_scores: Json | null;
          updated_at: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'zones_owner_team_id_fkey';
            columns: ['owner_team_id'];
            isOneToOne: false;
            referencedRelation: 'teams';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      activity_validation_status: 'pending' | 'valid' | 'invalid';
      transaction_type:
        | 'activity_reward'
        | 'manual_adjustment'
        | 'team_change_fee'
        | 'marketplace_spend';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      activity_validation_status: ['pending', 'valid', 'invalid'],
      transaction_type: [
        'activity_reward',
        'manual_adjustment',
        'team_change_fee',
        'marketplace_spend',
      ],
    },
  },
} as const;
