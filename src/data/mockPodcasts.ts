import { auth } from "config/firebase";

export const mockPodcasts = [
  {
    id: "1",
    title: "Introduction to AI",
    author: "Tech Insights",
    coverUrl: "https://picsum.photos/400/400?random=1",
    duration: "45:30",
    category: "featured",
    description: "A deep dive into artificial intelligence fundamentals",
    audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav",
    publishDate: "2024-03-14",
    totalDuration: 2730,
    episodeNumber: 1,
    fileSize: "24.5 MB"
  },
  {
    id: "2",
    title: "Nature Sounds",
    author: "Meditation Channel",
    coverUrl: "https://picsum.photos/400/400?random=2",
    duration: "05:00",
    category: "meditation",
    description: "Relaxing nature sounds for meditation",
    audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand60.wav",
    publishDate: "2024-03-14",
    totalDuration: 300,
    episodeNumber: 2,
    fileSize: "5.2 MB"
  }
];
