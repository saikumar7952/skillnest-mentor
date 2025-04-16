
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { AttemptStatus } from '@/types/coding';
import QuestionsList from '@/components/coding/QuestionsList';
import QuestionDetail from '@/components/coding/QuestionDetail';
import InsightsSidebar from '@/components/coding/InsightsSidebar';
import ProgressTab from '@/components/coding/ProgressTab';
import SolutionsTab from '@/components/coding/SolutionsTab';
import { codingQuestions } from '@/components/coding/CodingData';

const CodingChallenges = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('challenges');
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [userCode, setUserCode] = useState('');
  const [testResults, setTestResults] = useState<any>(null);
  const [attemptStatus, setAttemptStatus] = useState<AttemptStatus>('idle');
  const [userStats, setUserStats] = useState({
    solved: 0,
    attempted: 0,
    streak: 3,
    lastActive: '2 days ago'
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleSelectQuestion = (id: number) => {
    const question = codingQuestions.find(q => q.id === id);
    if (question) {
      setSelectedQuestion(id);
      setUserCode(question.starterCode);
      setTestResults(null);
      setAttemptStatus('idle');
    }
  };

  const handleCodeChange = (code: string) => {
    setUserCode(code);
  };

  const runCode = () => {
    setAttemptStatus('running');
    const question = codingQuestions.find(q => q.id === selectedQuestion);
    
    if (!question) return;
    
    try {
      // Create a function to run the tests in an isolated scope
      const testRunner = new Function('userCode', `
        try {
          // Execute user code
          ${userCode}
          
          // Run tests
          ${question.solutionTests}
          
          return runTests();
        } catch (error) {
          return { passed: false, error: error.message, results: [] };
        }
      `);
      
      // Execute the test runner
      const results = testRunner();
      
      setTestResults(results);
      setAttemptStatus(results.passed ? 'passed' : 'failed');
      
      if (results.passed) {
        toast({
          title: "Success!",
          description: "All test cases passed. Great job!",
          variant: "default",
        });
        
        // Update user stats (in a real app, save to database)
        setUserStats(prev => ({
          ...prev,
          solved: prev.solved + 1
        }));
      } else if (results.error) {
        toast({
          title: "Error in your code",
          description: results.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Tests failed",
          description: "Some test cases failed. Check the results and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error running code:", error);
      setTestResults({ passed: false, error: "Error executing code" });
      setAttemptStatus('failed');
      toast({
        title: "Error",
        description: "There was an error running your code.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container max-w-screen-lg py-8 flex-1">
        <button 
          onClick={() => navigate('/roadmap')} 
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Roadmap
        </button>
        
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-3xl font-medium mb-2">AI-Powered Coding Challenges</h1>
          <p className="text-muted-foreground max-w-2xl">
            Practice with real-world coding problems and receive instant feedback to improve your skills.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-3/4">
            <Tabs defaultValue="challenges" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="challenges">Challenges</TabsTrigger>
                <TabsTrigger value="solutions">My Solutions</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
              </TabsList>
              
              <TabsContent value="challenges" className="space-y-4">
                {selectedQuestion ? (
                  <QuestionDetail 
                    question={codingQuestions.find(q => q.id === selectedQuestion)!}
                    userCode={userCode}
                    onCodeChange={handleCodeChange}
                    onRunCode={runCode}
                    onBackClick={() => setSelectedQuestion(null)}
                    attemptStatus={attemptStatus}
                    testResults={testResults}
                  />
                ) : (
                  <QuestionsList 
                    questions={codingQuestions}
                    selectedQuestion={selectedQuestion}
                    onSelectQuestion={handleSelectQuestion}
                  />
                )}
              </TabsContent>
              
              <TabsContent value="solutions">
                <SolutionsTab />
              </TabsContent>
              
              <TabsContent value="progress">
                <ProgressTab userStats={userStats} />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="md:w-1/4">
            <InsightsSidebar />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CodingChallenges;
