interface MockResponse {
  keywords: string[];
  response: string;
}

const mockResponses: MockResponse[] = [
  {
    keywords: ['what', 'about', 'topic', 'discussing', 'talk'],
    response: "This podcast episode discusses technology trends in 2024, focusing on artificial intelligence and its impact on daily life."
  },
  {
    keywords: ['who', 'speaker', 'host', 'guest'],
    response: "The host of this podcast is Alex Chen, and today's guest is Dr. Sarah Johnson, an AI researcher at Stanford University."
  },
  {
    keywords: ['when', 'time', 'date', 'year'],
    response: "This episode was recorded in early 2024, specifically on January 15th."
  },
  {
    keywords: ['how', 'explain', 'works', 'function'],
    response: "The technology works by processing large amounts of data through neural networks, which then learn patterns and make predictions based on the input received."
  },
  {
    keywords: ['why', 'reason', 'purpose'],
    response: "The main reason for this development is to improve user experience and make technology more accessible to everyone."
  },
  {
    keywords: ['example', 'instance', 'case'],
    response: "A good example mentioned in the podcast is how AI is being used in healthcare to detect diseases early and provide more accurate diagnoses."
  },
  {
    keywords: ['summary', 'summarize', 'brief'],
    response: "The key points discussed are: 1) The current state of AI technology, 2) Its applications in various industries, and 3) Future predictions for technological advancement."
  }
];

const defaultResponse = "Based on the podcast content, this topic wasn't explicitly covered. However, the discussion mainly focused on AI technology and its applications in various fields.";

export const getMockResponse = (question: string): Promise<string> => {
  const delay = Math.random() * 1000 + 500;
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowerQuestion = question.toLowerCase();
      const matchingResponse = mockResponses.find(mock => 
        mock.keywords.some(keyword => lowerQuestion.includes(keyword))
      );
      resolve(matchingResponse?.response || defaultResponse);
    }, delay);
  });
};
