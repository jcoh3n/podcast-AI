export interface Podcast {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  duration: string;
  description?: string;
  category?: string;
  audioUrl?: string;
}

export interface UserPodcastData {
  liked: boolean;
  lastPlayed?: Date;
  progress?: number;
}