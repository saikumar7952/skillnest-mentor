
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const DoubtSolver = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [language, setLanguage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState('');

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
        body: { prompt: question, language },
      });

      if (error) {
        throw new Error(error.message);
      }

      setAnswer(data.answer);
      toast.success('AI has answered your question');
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast.error('Failed to get a response. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
        
        <div className="max-w-3xl mx-auto bg-white rounded-xl border border-border p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
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
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <div className="w-5 h-5 relative">
                      <div className="absolute inset-0 bg-primary rounded-sm rotate-45 opacity-80"></div>
                      <div className="absolute inset-1 bg-white rounded-sm rotate-45"></div>
                    </div>
                  </div>
                  <div className="prose prose-sm max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: answer.replace(/\n/g, '<br/>') }} />
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
        
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
