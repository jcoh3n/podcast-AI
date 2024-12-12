// src/services/firebase/podcasts.ts
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  setDoc,
  doc,
  serverTimestamp,
  limit 
} from 'firebase/firestore';
import { db, auth } from '../../config/firebase';
import { Podcast } from '../../types/podcast';

// Subscribe to all podcasts
export const subscribeToPodcasts = (onUpdate: (podcasts: Podcast[]) => void) => {
  const podcastsRef = collection(db, 'podcasts');
  
  return onSnapshot(podcastsRef, (snapshot) => {
    const podcasts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Podcast[];
    onUpdate(podcasts);
  });
};

// Subscribe to user's liked podcasts
export const subscribeToUserPodcasts = (onUpdate: (podcasts: string[]) => void) => {
  const userId = auth.currentUser?.uid;
  if (!userId) return () => {};

  const userPodcastsRef = collection(db, 'userPodcasts', userId, 'podcasts');
  const q = query(userPodcastsRef, where('liked', '==', true));
  
  return onSnapshot(q, (snapshot) => {
    const podcastIds = snapshot.docs.map(doc => doc.id);
    onUpdate(podcastIds);
  });
};

// Subscribe to recently played podcasts
export const subscribeToRecentPodcasts = (onUpdate: (podcasts: Podcast[]) => void) => {
  const userId = auth.currentUser?.uid;
  if (!userId) return () => {};

  const userPodcastsRef = collection(db, 'userPodcasts', userId, 'podcasts');
  const q = query(
    userPodcastsRef,
    where('lastPlayed', '!=', null),
    orderBy('lastPlayed', 'desc'),
    limit(5)
  );
  
  return onSnapshot(q, (snapshot) => {
    const podcasts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Podcast[];
    onUpdate(podcasts);
  });
};

// Toggle like status
export const togglePodcastLike = async (podcastId: string, liked: boolean) => {
  const userId = auth.currentUser?.uid;
  if (!userId) return;

  const podcastRef = doc(db, 'userPodcasts', userId, 'podcasts', podcastId);
  await setDoc(podcastRef, {
    liked,
    updatedAt: serverTimestamp()
  }, { merge: true });
};

// Update podcast progress
export const updatePodcastProgress = async (podcastId: string, progress: number) => {
  const userId = auth.currentUser?.uid;
  if (!userId) return;

  const podcastRef = doc(db, 'userPodcasts', userId, 'podcasts', podcastId);
  await setDoc(podcastRef, {
    progress,
    lastPlayed: serverTimestamp()
  }, { merge: true });
};