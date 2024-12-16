export interface AIState {
  asking: boolean;
  response: string | null;
  error: string | null;
}

export interface AIActions {
  askQuestion: (question: string) => Promise<void>;
  clearResponse: () => void;
}
