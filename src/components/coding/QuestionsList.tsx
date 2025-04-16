
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CodingQuestion } from '@/types/coding';

interface QuestionsListProps {
  questions: CodingQuestion[];
  selectedQuestion: number | null;
  onSelectQuestion: (id: number) => void;
}

const QuestionsList: React.FC<QuestionsListProps> = ({ 
  questions, 
  selectedQuestion, 
  onSelectQuestion 
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
    <div className="space-y-4">
      {questions.map((question) => (
        <div 
          key={question.id} 
          className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-muted ${selectedQuestion === question.id ? 'border-primary' : ''}`}
          onClick={() => onSelectQuestion(question.id)}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium">{question.title}</h3>
            <Badge className={getDifficultyColor(question.difficulty)}>
              {question.difficulty}
            </Badge>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Badge variant="outline" className="font-normal">
              {question.category}
            </Badge>
            <span>Time: {question.timeComplexity}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionsList;
