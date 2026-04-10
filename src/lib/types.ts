export interface Profile {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  subscription_status: 'inactive' | 'active' | 'canceled' | 'past_due';
  subscription_id: string | null;
  created_at: string;
}

export interface Page {
  id: string;
  user_id: string;
  username: string;
  title: string;
  bio: string | null;
  theme: string;
  is_published: boolean;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Link {
  id: string;
  page_id: string;
  title: string;
  url: string;
  icon: string | null;
  position: number;
  clicks: number;
  is_active: boolean;
  created_at: string;
}

export interface Theme {
  id: string;
  name: string;
  slug: string;
  colors: {
    background: string;
    text: string;
    accent: string;
    card: string;
    cardText: string;
  };
}

export interface AnalyticsEvent {
  id: string;
  page_id: string;
  link_id: string | null;
  event_type: 'view' | 'click';
  country: string | null;
  device: string | null;
  created_at: string;
}
