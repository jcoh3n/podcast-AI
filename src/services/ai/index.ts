import { getMockResponse } from './mockResponses';

export const askQuestionAboutPodcast = async (
  podcastId: string,
  question: string
): Promise<string> => {
  try {
    const answer = await getMockResponse(question);
    return answer;
  } catch (error) {
    console.error('Error asking question:', error);
    throw error;
  }
};
