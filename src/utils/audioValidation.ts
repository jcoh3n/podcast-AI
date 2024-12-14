export const isValidAudioUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && 
           (url.endsWith('.mp3') || url.endsWith('.wav') || url.endsWith('.m4a'));
  } catch {
    return false;
  }
};

export const getAudioExtension = (url: string): string | null => {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname;
    const match = path.match(/\.(mp3|wav|m4a)$/i);
    return match ? match[1].toLowerCase() : null;
  } catch {
    return null;
  }
};
