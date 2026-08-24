export type UserRole = 'owner' | 'manager' | 'scanner_staff';

export type ViewType = 
  | 'showcase'
  | 'overview' 
  | 'builder' 
  | 'guests' 
  | 'seating' 
  | 'messages' 
  | 'checkin' 
  | 'analytics' 
  | 'settings';

export type RsvpStatus = 'attending' | 'declined' | 'awaiting' | 'not_sent';

export interface Companion {
  name: string;
  meal?: 'beef' | 'salmon' | 'vegetarian';
  allergies?: string;
}

export interface Guest {
  id: string;
  token: string;
  nameAr: string;
  nameEn: string;
  phone: string;
  groupAr: string;
  groupEn: string;
  isFamily: boolean;
  allowedSeats: number;
  attendingCount: number;
  rsvpStatus: RsvpStatus;
  familyMembers: string[];
  companions: Companion[];
  mealChoice: 'beef' | 'salmon' | 'vegetarian' | null;
  dietaryNotes: string;
  tableNo: string;
  inviteSent: boolean;
  inviteSentAt: string | null;
  reminderSent: boolean;
  checkedIn: boolean;
  checkedInAt: string | null;
  checkedInBy?: string | null;
  privateNotes: string;
  wishes: string;
  isVIP?: boolean;
  isTestGuest?: boolean;
  opened?: boolean;
  openedAt?: string;
  updatedAt?: number;
}

export interface Table {
  id: string;
  number: string;
  nameAr: string;
  nameEn: string;
  capacity: number;
  type: 'vip' | 'family' | 'friends' | 'general';
  shape?: 'round' | 'banquet';
}

export interface VideoOverlay {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
  variable?: string;
  position: 'center' | 'top-center' | 'bottom-center';
  animation: 'fade' | 'soft-rise' | 'scale';
  fontStyle: 'serif' | 'sans';
  color: string;
  isHighlight?: boolean;
}

export interface EventDetails {
  id: string;
  titleAr: string;
  titleEn: string;
  coupleNamesAr: string;
  coupleNamesEn: string;
  groomAr: string;
  brideAr: string;
  dateIso: string;
  dateFormattedAr: string;
  dateFormattedEn: string;
  timeAr: string;
  timeEn: string;
  venueAr: string;
  venueEn: string;
  addressAr: string;
  addressEn: string;
  googleMapsUrl: string;
  appleMapsUrl: string;
  rsvpDeadline: string;
  activeTheme: 'royal-arabic' | 'modern-editorial' | 'romantic-garden' | 'saudi-elegance' | 'night-ceremony';
  openingStyle: 'hanging-card' | 'video-hanging-card' | 'video-card' | 'video' | 'card-reveal' | 'couple-reveal' | 'none';
  hangingCard: {
    animationIntensity: 'cinematic' | 'calm' | 'static';
    ribbonStyle: string;
    showGrommet: boolean;
  };
  videoInvitation: {
    sourceType: 'template' | 'upload';
    templateId: string;
    customVideoUrl: string;
    posterUrl: string;
    videoUrl: string;
    duration: number;
    aspectRatio: string;
    mutedStart: boolean;
    skipEnabled: boolean;
    transition: string;
    overlays: VideoOverlay[];
  };
  coverImage: string;
  welcomePhoto: string;
  blessingVerseAr: string;
  blessingVerseEn: string;
  settings: {
    allowPlusOne: boolean;
    enableMeals: boolean;
    enableSongs: boolean;
    enableGallery: boolean;
    requireRsvpConfirmation: boolean;
    showCountdown: boolean;
    showDressCode: boolean;
    showTimeline: boolean;
    allowRsvpEdit: boolean;
  };
}

export interface Block {
  id: string;
  type: string;
  enabled: boolean;
  data: Record<string, any>;
}

export interface ActivityItem {
  id: string;
  type: 'rsvp_yes' | 'rsvp_no' | 'checkin' | 'invite_sent' | 'note';
  guestName: string;
  time: string;
  textAr: string;
  textEn: string;
  tableNo?: string;
}
