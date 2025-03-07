
import { useState } from 'react';
import { ArrowUpCircle, Loader2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const Prompt = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      toast.error('Please enter a question or prompt');
      return;
    }
    
    setIsLoading(true);
    setResponse('');
    
    try {
      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('ai-doubt-solver', {
        body: { 
          prompt: prompt,
          includeCode: true 
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.answer) {
        setResponse(data.answer);
        toast.success('AI mentor responded to your question');
      } else {
        throw new Error('No answer received');
      }
    } catch (error) {
      console.error('Error processing prompt:', error);
      toast.error('Failed to get a response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="prompt" className="section">
      <div className="container-custom">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 mb-4">
            <span className="text-xs font-medium text-primary">ASK OUR AI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light mb-4">
            Get Instant Help from <span className="text-primary font-normal">SkillNest</span> AI
          </h2>
          <p className="text-muted-foreground max-w-2xl text-balance">
            Ask our AI mentor any question about learning, career paths, or skill development.
            Get personalized guidance in seconds.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-white rounded-xl border border-border p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., 'What skills do I need to become a data scientist?' or 'Help me understand recursion in programming'"
                className="w-full min-h-[120px] p-4 rounded-lg border border-border bg-secondary/30 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                disabled={isLoading}
              />
              
              <Button 
                type="submit"
                size="icon"
                className={cn(
                  "absolute bottom-3 right-3 rounded-full transition-all",
                  isLoading ? "opacity-70" : "hover:scale-105"
                )}
                disabled={isLoading || !prompt.trim()}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <ArrowUpCircle className="h-5 w-5" />
                )}
              </Button>
            </div>
            
            {response && (
              <div className="mt-6 rounded-lg border border-border p-4 bg-secondary/20 transition-all animate-fade-down">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <div className="w-5 h-5 relative">
                      <div className="absolute inset-0 bg-primary rounded-sm rotate-45 opacity-80"></div>
                      <div className="absolute inset-1 bg-white rounded-sm rotate-45"></div>
                    </div>
                  </div>
                  <div>
                    <div 
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ 
                        __html: response
                          .replace(/\n/g, '<br/>')
                          .replace(/```([a-z]*)([\s\S]*?)```/g, (_, lang, code) => 
                            `<div class="bg-gray-800 text-gray-100 p-3 rounded-md my-2 overflow-x-auto font-mono text-sm"><div class="flex justify-between items-center mb-2"><span class="text-xs text-gray-400">${lang || 'code'}</span></div>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>`)
                      }}
                    />
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" className="text-xs rounded-full">
                        Tell me more
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs rounded-full">
                        Explain with examples
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs rounded-full">
                        Create a learning plan
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
          
          <div className="mt-6 text-center">
            <Link 
              to="/doubt-solver" 
              className="inline-flex items-center gap-1.5 text-primary font-medium hover:underline transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Try our full AI Doubt Solver for more advanced coding help
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prompt;
