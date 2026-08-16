export type Language = 'en' | 'np';

export type PageRoute = 'home' | 'programs' | 'book' | 'contact' | 'blog' | 'gallery' | 'login' | 'dashboard';

export interface SessionSlot {
  time: string;
  title: {
    en: string;
    np: string;
  };
  instructor?: string;
}

export interface CurriculumDay {
  day: number;
  dayName?: {
    en: string;
    np: string;
  };
  title: {
    en: string;
    np: string;
  };
  description: {
    en: string;
    np: string;
  };
  timeRangeMorning?: string;
  timeRangeDaytime?: string;
  timeRange: string;
  location: string;
  sessionsMorning?: SessionSlot[];
  sessionsDaytime?: SessionSlot[];
  sessions: SessionSlot[];
  topics?: {
    en: string[];
    np: string[];
  };
}

export interface OnlineCourse {
  id: string;
  title: {
    en: string;
    np: string;
  };
  category: {
    en: string;
    np: string;
  };
  priceNpr: number;
  originalPriceNpr?: number;
  duration: string;
  level: {
    en: string;
    np: string;
  };
  rating: number;
  reviewCount: number;
  badge?: {
    en: string;
    np: string;
  };
  image: string;
  description: {
    en: string;
    np: string;
  };
}

export interface BlogPost {
  id: string;
  title: {
    en: string;
    np: string;
  };
  category: {
    en: string;
    np: string;
  };
  categorySlug: 'digital-marketing' | 'facebook-ads' | 'ai-tools' | 'branding';
  summary: {
    en: string;
    np: string;
  };
  content: {
    en: string;
    np: string;
  };
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  title: {
    en: string;
    np: string;
  };
  category: 'training' | 'workshops' | 'events' | 'students' | 'videos';
  image: string;
  aspect: 'portrait' | 'square' | 'landscape';
  videoUrl?: string;
  date: string;
}

export type SeatStatus = 'available' | 'selected' | 'booked' | 'vip';

export interface Seat {
  id: string;        // composite DB key e.g. "Kathmandu Hub-batch-A1"
  seatLabel: string; // short display label e.g. "A1"
  row: string;       // e.g. "A"
  number: number;    // e.g. 1
  status: SeatStatus;
  isVip?: boolean;
  priceNpr: number;
}

export interface ClassSession {
  id: string;
  name: { en: string; np: string };
  startDate: string;   // ISO date string YYYY-MM-DD
  endDate: string;
  city: string;
  batch: string;
  availableSeats: number;
  totalSeats: number;
}

export interface BookingState {
  city: string;
  batch: string;
  selectedSeatId: string | null;
  seatPrice: number;
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  paymentMethod: 'esewa' | 'khalti' | 'fonepay' | 'bank';
  isCompleted: boolean;
}

export interface Mentor {
  id: string;
  name: string;
  role: {
    en: string;
    np: string;
  };
  expertise: string[];
  avatar: string;
  bio: {
    en: string;
    np: string;
  };
}
