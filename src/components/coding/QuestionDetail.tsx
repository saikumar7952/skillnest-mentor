
import React from 'react';
import { ArrowLeft, Code } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CodingEditor from '@/components/coding/CodingEditor';
import TestResults from '@/components/coding/TestResults';
import { CodingQuestion } from '@/types/coding';

interface QuestionDetailProps {
  question: CodingQuestion;
  userCode: string;
  onCodeChange: (code: string) => void;
  onRunCode: () => void;
  onBackClick: () => void;
  attemptStatus: 'idle' | 'running' | 'passed' | 'failed';
  testResults: any;
}

const QuestionDetail: React.FC<QuestionDetailProps> = ({
  question,
  userCode,
  onCodeChange,
  onRunCode,
  onBackClick,
  attemptStatus,
  testResults
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button 
          onClick={onBackClick} 
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Questions
        </button>
        <Badge className={getDifficultyColor(question.difficulty)}>
          {question.difficulty}
        </Badge>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-2">{question.title}</h2>
        <div className="bg-card border p-4 rounded-lg whitespace-pre-line">
          {question.description}
        </div>
      </div>
      
      <CodingEditor 
        code={userCode}
        onChange={onCodeChange}
        onRun={onRunCode}
        isRunning={attemptStatus === 'running'}
      />
      
      {testResults && (
        <TestResults results={testResults} attemptStatus={attemptStatus} />
      )}
    </div>
  );
};

export default QuestionDetail;
