export interface PlayerState {
  isPlaying: boolean;
  progress: number;
  duration: number;
  isLoading: boolean;
  error: string | null;
}

export interface PlayerControls {
  play: () => Promise<void>;
  pause: () => Promise<void>;
  seekTo: (position: number) => Promise<void>;
  togglePlayback: () => Promise<void>;
}

export interface PlayerUIState {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}
