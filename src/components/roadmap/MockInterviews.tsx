import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Play, Clock, BarChart } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  category: string;
  estimatedTime: string;
  difficulty: string;
}

const MockInterviews = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const interviewQuestions: Question[] = [
    {
      id: 1,
      question: "Tell me about a time you had to learn a new technology quickly. How did you approach it?",
      category: "behavioral",
      estimatedTime: "5-7 min",
      difficulty: "Medium"
    },
    {
      id: 2,
      question: "How would you design a URL shortening service like bit.ly?",
      category: "system",
      estimatedTime: "10-15 min",
      difficulty: "Hard"
    },
    {
      id: 3,
      question: "Implement a function to check if a binary tree is balanced.",
      category: "coding",
      estimatedTime: "15-20 min",
      difficulty: "Hard"
    },
    {
      id: 4,
      question: "What's the difference between cookies, local storage, and session storage?",
      category: "technical",
      estimatedTime: "3-5 min",
      difficulty: "Easy"
    },
    {
      id: 5,
      question: "Describe a situation where you had to make a difficult decision with limited information.",
      category: "behavioral",
      estimatedTime: "5-7 min",
      difficulty: "Medium"
    },
    {
      id: 6,
      question: "How would you implement a recommendation system for an e-commerce platform?",
      category: "system",
      estimatedTime: "10-15 min",
      difficulty: "Hard"
    }
  ];
  
  const filteredQuestions = selectedCategory === 'all' 
    ? interviewQuestions 
    : interviewQuestions.filter(q => q.category === selectedCategory);
  
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mock Interviews</CardTitle>
        <CardDescription>
          Practice with AI-powered interview simulations to improve your skills and confidence
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Questions</TabsTrigger>
            <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="coding">Coding</TabsTrigger>
            <TabsTrigger value="system">System Design</TabsTrigger>
          </TabsList>
          
          <TabsContent value={selectedCategory} className="space-y-4">
            {filteredQuestions.map((question) => (
              <div key={question.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium">{question.question}</h3>
                  <Badge className={getDifficultyColor(question.difficulty)}>
                    {question.difficulty}
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{question.estimatedTime}</span>
                  <Separator orientation="vertical" className="mx-2 h-4" />
                  <Badge variant="outline" className="capitalize">
                    {question.category}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="gap-1">
                    <Play className="h-4 w-4" />
                    Start Practice
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1">
                    <BarChart className="h-4 w-4" />
                    View Tips
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
        
        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-medium mb-2">Interview Performance Insights</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Complete mock interviews to receive AI-powered feedback on your communication style, 
            answer quality, and areas for improvement.
          </p>
          <Button variant="outline" className="w-full">View Performance Dashboard</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MockInterviews;
