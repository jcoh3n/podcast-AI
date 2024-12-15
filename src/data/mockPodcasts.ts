import { Asset } from 'expo-asset';
import { getAudioDuration } from '../utils/getDuration';

const audioUri = Asset.fromModule(require('./test-podcast.mp3')).uri;

let mockPodcasts = [{
  id: 'test-1',
  title: 'Test Podcast 1',
  author: 'Test Author',
  coverUrl: 'https://picsum.photos/200',
  audioUrl: audioUri,
  duration: '0:00',
  totalDuration: 0,
  category: 'test'
}];

// Initialize duration asynchronously
getAudioDuration(audioUri).then(duration => {
  mockPodcasts[0].totalDuration = duration;
  mockPodcasts[0].duration = `${Math.floor(duration / 60)}:${String(duration % 60).padStart(2, '0')}`;
});

export { mockPodcasts };