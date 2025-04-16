
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X, Play, Code, Clock, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import CodingEditor from '@/components/coding/CodingEditor';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';

// Sample coding questions data
const codingQuestions = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
    You may assume that each input would have exactly one solution, and you may not use the same element twice.
    Example:
    Input: nums = [2, 7, 11, 15], target = 9
    Output: [0, 1]
    Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].`,
    starterCode: `function twoSum(nums, target) {
  // Your code here
  
}`,
    solutionTests: `
// Test cases
function runTests() {
  let passed = true;
  let results = [];
  
  // Test case 1
  let result1 = twoSum([2, 7, 11, 15], 9);
  let test1Passed = (result1[0] === 0 && result1[1] === 1) || (result1[0] === 1 && result1[1] === 0);
  results.push({ test: "twoSum([2, 7, 11, 15], 9)", expected: "[0, 1]", actual: JSON.stringify(result1), passed: test1Passed });
  passed = passed && test1Passed;
  
  // Test case 2
  let result2 = twoSum([3, 2, 4], 6);
  let test2Passed = (result2[0] === 1 && result2[1] === 2) || (result2[0] === 2 && result2[1] === 1);
  results.push({ test: "twoSum([3, 2, 4], 6)", expected: "[1, 2]", actual: JSON.stringify(result2), passed: test2Passed });
  passed = passed && test2Passed;
  
  // Test case 3
  let result3 = twoSum([3, 3], 6);
  let test3Passed = (result3[0] === 0 && result3[1] === 1) || (result3[0] === 1 && result3[1] === 0);
  results.push({ test: "twoSum([3, 3], 6)", expected: "[0, 1]", actual: JSON.stringify(result3), passed: test3Passed });
  passed = passed && test3Passed;
  
  return { passed, results };
}
`,
    timeComplexity: "O(n)",
    category: "Arrays & Hashing"
  },
  {
    id: 2,
    title: "Valid Palindrome",
    difficulty: "Easy",
    description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.
    Alphanumeric characters include letters and numbers.
    Given a string s, return true if it is a palindrome, or false otherwise.
    Example:
    Input: s = "A man, a plan, a canal: Panama"
    Output: true
    Explanation: "amanaplanacanalpanama" is a palindrome.`,
    starterCode: `function isPalindrome(s) {
  // Your code here
  
}`,
    solutionTests: `
// Test cases
function runTests() {
  let passed = true;
  let results = [];
  
  // Test case 1
  let result1 = isPalindrome("A man, a plan, a canal: Panama");
  results.push({ test: "isPalindrome('A man, a plan, a canal: Panama')", expected: "true", actual: result1.toString(), passed: result1 === true });
  passed = passed && result1 === true;
  
  // Test case 2
  let result2 = isPalindrome("race a car");
  results.push({ test: "isPalindrome('race a car')", expected: "false", actual: result2.toString(), passed: result2 === false });
  passed = passed && result2 === false;
  
  // Test case 3
  let result3 = isPalindrome(" ");
  results.push({ test: "isPalindrome(' ')", expected: "true", actual: result3.toString(), passed: result3 === true });
  passed = passed && result3 === true;
  
  return { passed, results };
}
`,
    timeComplexity: "O(n)",
    category: "Strings"
  },
  {
    id: 3,
    title: "Valid Anagram",
    difficulty: "Easy",
    description: `Given two strings s and t, return true if t is an anagram of s, and false otherwise.
    An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.
    Example:
    Input: s = "anagram", t = "nagaram"
    Output: true`,
    starterCode: `function isAnagram(s, t) {
  // Your code here
  
}`,
    solutionTests: `
// Test cases
function runTests() {
  let passed = true;
  let results = [];
  
  // Test case 1
  let result1 = isAnagram("anagram", "nagaram");
  results.push({ test: "isAnagram('anagram', 'nagaram')", expected: "true", actual: result1.toString(), passed: result1 === true });
  passed = passed && result1 === true;
  
  // Test case 2
  let result2 = isAnagram("rat", "car");
  results.push({ test: "isAnagram('rat', 'car')", expected: "false", actual: result2.toString(), passed: result2 === false });
  passed = passed && result2 === false;
  
  // Test case 3
  let result3 = isAnagram("a", "a");
  results.push({ test: "isAnagram('a', 'a')", expected: "true", actual: result3.toString(), passed: result3 === true });
  passed = passed && result3 === true;
  
  return { passed, results };
}
`,
    timeComplexity: "O(n)",
    category: "Strings"
  }
];

const CodingChallenges = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('challenges');
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [userCode, setUserCode] = useState('');
  const [testResults, setTestResults] = useState<any>(null);
  const [attemptStatus, setAttemptStatus] = useState<'idle' | 'running' | 'passed' | 'failed'>('idle');
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const renderQuestionsList = () => (
    <div className="space-y-4">
      {codingQuestions.map((question) => (
        <div 
          key={question.id} 
          className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-muted ${selectedQuestion === question.id ? 'border-primary' : ''}`}
          onClick={() => handleSelectQuestion(question.id)}
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

  const renderSelectedQuestion = () => {
    if (!selectedQuestion) return null;
    
    const question = codingQuestions.find(q => q.id === selectedQuestion);
    if (!question) return null;
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => setSelectedQuestion(null)} 
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
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-muted p-2 border-b flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span className="text-sm font-medium">Code Editor</span>
            </div>
            <Button onClick={runCode} size="sm" disabled={attemptStatus === 'running'}>
              {attemptStatus === 'running' ? 'Running...' : 'Run Code'}
            </Button>
          </div>
          <div className="min-h-[400px] bg-black p-2 font-mono text-sm">
            <textarea
              value={userCode}
              onChange={(e) => handleCodeChange(e.target.value)}
              className="w-full h-full min-h-[400px] bg-black text-white p-2 font-mono resize-none focus:outline-none"
            />
          </div>
        </div>
        
        {testResults && (
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted p-2 border-b flex items-center gap-2">
              <span className={attemptStatus === 'passed' ? 'text-green-600' : 'text-red-600'}>
                {attemptStatus === 'passed' ? (
                  <Check className="h-4 w-4 inline" />
                ) : (
                  <X className="h-4 w-4 inline" />
                )}
              </span>
              <span className="text-sm font-medium">
                {attemptStatus === 'passed' ? 'All Tests Passed' : 'Tests Failed'}
              </span>
            </div>
            <div className="p-4 space-y-2">
              {testResults.error ? (
                <div className="text-red-600">{testResults.error}</div>
              ) : (
                testResults.results.map((result: any, index: number) => (
                  <div key={index} className="border p-2 rounded">
                    <div className="flex items-center gap-2">
                      {result.passed ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <X className="h-4 w-4 text-red-600" />
                      )}
                      <span className="font-mono text-sm">{result.test}</span>
                    </div>
                    {!result.passed && (
                      <div className="mt-1 ml-6 text-sm">
                        <span className="text-muted-foreground">Expected: </span>
                        <span className="font-mono">{result.expected}</span>
                        <span className="text-muted-foreground ml-2">Got: </span>
                        <span className="font-mono">{result.actual}</span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    );
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
                {selectedQuestion ? renderSelectedQuestion() : renderQuestionsList()}
              </TabsContent>
              
              <TabsContent value="solutions">
                <Card>
                  <CardHeader>
                    <CardTitle>My Solutions</CardTitle>
                    <CardDescription>
                      View and review your previous solutions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">
                        You haven't submitted any solutions yet. Start solving challenges to build your portfolio.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="progress">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Learning Progress</CardTitle>
                    <CardDescription>
                      Track your coding journey and skills development
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-6">
                      <div className="border rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-primary mb-1">{userStats.solved}</div>
                        <div className="text-sm text-muted-foreground">Problems Solved</div>
                      </div>
                      <div className="border rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-primary mb-1">{userStats.attempted}</div>
                        <div className="text-sm text-muted-foreground">Total Attempts</div>
                      </div>
                      <div className="border rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-primary mb-1">{userStats.streak}</div>
                        <div className="text-sm text-muted-foreground">Day Streak</div>
                      </div>
                      <div className="border rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-primary mb-1">{userStats.lastActive}</div>
                        <div className="text-sm text-muted-foreground">Last Active</div>
                      </div>
                    </div>
                    
                    <h3 className="font-medium mb-3">Category Progress</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Arrays & Hashing</span>
                          <span>1/20</span>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                          <div className="bg-primary h-full rounded-full" style={{ width: '5%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Strings</span>
                          <span>0/15</span>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                          <div className="bg-primary h-full rounded-full" style={{ width: '0%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Linked Lists</span>
                          <span>0/10</span>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                          <div className="bg-primary h-full rounded-full" style={{ width: '0%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="md:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle>Challenge Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Difficulty Levels</h3>
                  <div className="flex gap-2">
                    <Badge className="bg-green-100 text-green-800">Easy</Badge>
                    <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
                    <Badge className="bg-red-100 text-red-800">Hard</Badge>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Popular Categories</h3>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">Arrays & Hashing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">Strings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">Linked Lists</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">Dynamic Programming</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Tips for Success</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Break down the problem before coding</li>
                    <li>• Consider edge cases in your solution</li>
                    <li>• Optimize for time & space complexity</li>
                    <li>• Test your code with examples</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline" size="sm" onClick={() => navigate('/coding-challenges')}>
                  <Play className="h-4 w-4 mr-1" />
                  Start Random Challenge
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CodingChallenges;
