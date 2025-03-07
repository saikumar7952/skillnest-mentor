
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Copy, Check, Save, Download, Code, Clipboard } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const DoubtSolver = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [language, setLanguage] = useState('');
  const [includeCode, setIncludeCode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState('');
  const [history, setHistory] = useState<Array<{question: string, answer: string}>>([]);
  const [copied, setCopied] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) {
      toast.error('Please enter a question');
      return;
    }
    
    setIsLoading(true);
    setAnswer('');
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-doubt-solver', {
        body: { prompt: question, language, includeCode },
      });

      if (error) {
        throw new Error(error.message);
      }

      setAnswer(data.answer);
      setHistory(prev => [...prev, { question, answer: data.answer }]);
      toast.success('AI has answered your question');
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast.error('Failed to get a response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (answerRef.current) {
      const textContent = answerRef.current.innerText;
      navigator.clipboard.writeText(textContent);
      setCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const saveAsTextFile = () => {
    if (!answer) return;
    
    const blob = new Blob([answer], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-solution-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Saved as text file');
  };
  
  const programmingLanguages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'cpp', label: 'C++' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'php', label: 'PHP' },
    { value: 'swift', label: 'Swift' },
    { value: 'go', label: 'Go' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'rust', label: 'Rust' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container-custom max-w-screen-lg py-8 flex-1">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>
        
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-3xl font-medium mb-2">AI Doubt Solver</h1>
          <p className="text-muted-foreground max-w-2xl">
            Ask any coding or tech question and get instant explanations from our AI assistant.
            The AI adapts to your needs and provides personalized responses.
          </p>
        </div>
        
        <Tabs defaultValue="ask" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="ask">Ask Question</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ask">
            <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Programming Language (Optional)</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a language (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any / General</SelectItem>
                        {programmingLanguages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2 flex items-end">
                    <div className="flex items-center space-x-2 w-full">
                      <Switch 
                        id="include-code" 
                        checked={includeCode}
                        onCheckedChange={setIncludeCode}
                      />
                      <Label htmlFor="include-code" className="cursor-pointer">
                        Include Code Examples
                      </Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="question">Your Question</Label>
                  <Textarea
                    id="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="e.g., 'How do I implement a binary search tree?' or 'Explain the concept of closures in JavaScript'"
                    className="min-h-[120px]"
                    disabled={isLoading}
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full"
                  disabled={isLoading || !question.trim()}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Getting Answer...
                    </>
                  ) : (
                    'Ask AI Assistant'
                  )}
                </Button>
                
                {answer && (
                  <div className="mt-6 rounded-lg border border-border p-4 bg-secondary/20 transition-all animate-fade-down">
                    <div className="flex justify-between items-start mb-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <div className="w-5 h-5 relative">
                          <div className="absolute inset-0 bg-primary rounded-sm rotate-45 opacity-80"></div>
                          <div className="absolute inset-1 bg-white rounded-sm rotate-45"></div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copyToClipboard}
                          className="flex items-center gap-1"
                        >
                          {copied ? (
                            <>
                              <Check className="h-3.5 w-3.5" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={saveAsTextFile}
                          className="flex items-center gap-1"
                        >
                          <Save className="h-3.5 w-3.5" />
                          <span>Save</span>
                        </Button>
                      </div>
                    </div>
                    
                    <div 
                      ref={answerRef}
                      className="prose prose-sm max-w-none dark:prose-invert"
                      dangerouslySetInnerHTML={{ 
                        __html: answer
                          .replace(/\n/g, '<br/>')
                          .replace(/```([a-z]*)([\s\S]*?)```/g, (_, lang, code) => 
                            `<div class="bg-gray-800 text-gray-100 p-3 rounded-md my-2 overflow-x-auto font-mono text-sm"><div class="flex justify-between items-center mb-2"><span class="text-xs text-gray-400">${lang || 'code'}</span><button class="text-xs bg-gray-700 px-2 py-1 rounded hover:bg-gray-600 copy-code-btn"><span class="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>Copy</span></button></div>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>`)
                      }}
                    />
                  </div>
                )}
              </form>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
              {history.length > 0 ? (
                <div className="space-y-6">
                  {history.map((item, index) => (
                    <div key={index} className="border-b pb-6 last:border-b-0">
                      <h3 className="font-medium text-lg mb-2">Q: {item.question}</h3>
                      <div 
                        className="prose prose-sm max-w-none dark:prose-invert ml-4 pl-3 border-l-2 border-primary/30"
                        dangerouslySetInnerHTML={{ 
                          __html: item.answer
                            .replace(/\n/g, '<br/>')
                            .replace(/```([a-z]*)([\s\S]*?)```/g, (_, lang, code) => 
                              `<div class="bg-gray-800 text-gray-100 p-3 rounded-md my-2 overflow-x-auto font-mono text-sm"><div class="flex justify-between items-center mb-2"><span class="text-xs text-gray-400">${lang || 'code'}</span><button class="text-xs bg-gray-700 px-2 py-1 rounded hover:bg-gray-600 copy-code-btn"><span class="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>Copy</span></button></div>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>`)
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-8">
                  <Clipboard className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium">No questions yet</h3>
                  <p className="text-muted-foreground">
                    Ask your first question to see your history here
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg border border-border">
            <h3 className="font-medium text-lg mb-2">Explain Complex Concepts</h3>
            <p className="text-sm text-muted-foreground">
              Get clear explanations of difficult programming concepts tailored to your skill level.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-border">
            <h3 className="font-medium text-lg mb-2">Debug Your Code</h3>
            <p className="text-sm text-muted-foreground">
              Paste your buggy code and get suggestions on how to fix it with detailed explanations.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-border">
            <h3 className="font-medium text-lg mb-2">Learn Best Practices</h3>
            <p className="text-sm text-muted-foreground">
              Discover industry-standard coding practices and improve your programming skills.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DoubtSolver;
