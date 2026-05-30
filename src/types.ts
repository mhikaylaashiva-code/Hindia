export interface Song {
  id: string;
  title: string;
  albumId: string;
  artist: 'Hindia' | 'Feast' | 'Collab';
  duration: string;
  audioUrl: string; // Live streams, copyright-free instrumental, or synthetic beautiful retro lo-fi audio tracks
  lyrics: string[]; // Synchronized lyrics
  lyricTimes: number[]; // In seconds, e.g. [0, 4, 12, ...]
  story?: string; // Story behind the song
  themeColor: string; // The active visual backdrop spotlight color
}

export interface Album {
  id: string;
  title: string;
  year: number;
  artist: 'Hindia' | 'Feast';
  coverUrl: string;
  description: string;
  songs: Song[];
  spotifyUrl?: string;
  accentColor: string; // red, orange, grey etc.
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  artist: 'Hindia' | 'Feast' | 'Both';
  image?: string;
  category: 'album' | 'concert' | 'milestone';
}

export interface FanMessage {
  id: string;
  name: string;
  location: string;
  message: string;
  date: string;
  artistTarget: 'Hindia' | 'Feast' | 'Both';
  likes: number;
  moodColor: string;
}

export interface ConcertEvent {
  id: string;
  title: string;
  venue: string;
  city: string;
  date: string;
  time: string;
  ticketLink: string;
  soldOut: boolean;
  featured?: boolean;
}

export interface LyricQuote {
  text: string;
  song: string;
  artist: 'Hindia' | 'Feast';
  meaning: string;
}
