
export interface CodingQuestion {
  id: number;
  title: string;
  difficulty: string;
  description: string;
  starterCode: string;
  solutionTests: string;
  timeComplexity: string;
  category: string;
}

export type AttemptStatus = 'idle' | 'running' | 'passed' | 'failed';

export interface UserStats {
  solved: number;
  attempted: number;
  streak: number;
  lastActive: string;
}
