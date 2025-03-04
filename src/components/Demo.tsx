
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Demo = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState('');
  
  const tabs = [
    { name: "AI Tutor", label: "Learning Experience" },
    { name: "Career Roadmap", label: "Career Planning" },
    { name: "Mock Interview", label: "Interview Prep" }
  ];
  
  const conversations = [
    [
      { type: 'user', message: "I'm struggling with understanding recursion in programming." },
      { type: 'ai', message: "Let's break down recursion step by step. Think of it as a function calling itself to solve smaller instances of the same problem. I'll create a visual example and walk you through it gradually." }
    ],
    [
      { type: 'user', message: "I want to become a machine learning engineer. What skills do I need?" },
      { type: 'ai', message: "Based on your background and the current industry demand, here's a personalized roadmap for becoming a Machine Learning Engineer. I'll start by recommending foundational skills in mathematics and programming, then guide you through specialized ML techniques." }
    ],
    [
      { type: 'user', message: "How would I approach a system design question in a tech interview?" },
      { type: 'ai', message: "Great question! For system design interviews, you should follow a structured approach. Let me walk you through the key steps: understanding requirements, defining scope, high-level architecture, and detailed component design. Let's practice with a real example." }
    ]
  ];
  
  useEffect(() => {
    setTypedText('');
    setIsTyping(true);
    
    let currentText = '';
    let index = 0;
    const currentMessage = conversations[activeTab][1].message;
    
    const typingInterval = setInterval(() => {
      if (index < currentMessage.length) {
        currentText += currentMessage[index];
        setTypedText(currentText);
        index++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 30);
    
    return () => clearInterval(typingInterval);
  }, [activeTab]);
  
  return (
    <section id="demo" className="section">
      <div className="container-custom">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 mb-4">
            <span className="text-xs font-medium text-primary">INTERACTIVE DEMO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light mb-4">
            Experience <span className="text-primary font-normal">SkillNest</span> in Action
          </h2>
          <p className="text-muted-foreground max-w-2xl text-balance">
            See how our AI mentorship works with these interactive previews of our key features.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {/* Demo tabs */}
          <div className="flex overflow-x-auto no-scrollbar gap-2 mb-8 justify-center">
            {tabs.map((tab, index) => (
              <Button
                key={index}
                variant={activeTab === index ? "default" : "outline"}
                className={cn(
                  "rounded-full text-sm",
                  activeTab === index ? "" : "border-primary/50 text-foreground"
                )}
                onClick={() => setActiveTab(index)}
              >
                {tab.name}
              </Button>
            ))}
          </div>
          
          {/* Demo display */}
          <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden perspective">
            {/* Demo header */}
            <div className="bg-secondary border-b border-border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-xs font-medium text-muted-foreground">
                    {tabs[activeTab].label}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <div className="text-xs text-muted-foreground">AI Active</div>
                </div>
              </div>
            </div>
            
            {/* Demo content */}
            <div className="p-6 max-h-[400px] overflow-y-auto">
              <div className="space-y-6">
                {/* User message */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium">You</span>
                  </div>
                  <div className="bg-secondary rounded-lg p-4 max-w-[80%]">
                    <p className="text-sm">{conversations[activeTab][0].message}</p>
                  </div>
                </div>
                
                {/* AI response */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <div className="w-5 h-5 relative">
                      <div className="absolute inset-0 bg-primary rounded-sm rotate-45 opacity-80"></div>
                      <div className="absolute inset-1 bg-white rounded-sm rotate-45"></div>
                    </div>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-4 max-w-[80%]">
                    <p className="text-sm">
                      {typedText}
                      {isTyping && (
                        <span className="inline-flex ml-1">
                          <span className="animate-ping h-1 w-1 rounded-full bg-primary opacity-75 mx-0.5"></span>
                          <span className="animate-ping h-1 w-1 rounded-full bg-primary opacity-75 animation-delay-200 mx-0.5"></span>
                          <span className="animate-ping h-1 w-1 rounded-full bg-primary opacity-75 animation-delay-400 mx-0.5"></span>
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Demo input */}
            <div className="border-t border-border p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Try typing your own question..."
                  className="w-full p-3 pr-24 rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-primary bg-secondary/50 text-sm"
                  disabled
                />
                <Button 
                  size="sm" 
                  className="absolute right-1.5 top-1/2 transform -translate-y-1/2"
                  disabled
                >
                  Send
                </Button>
              </div>
              <div className="text-xs text-center text-muted-foreground mt-2">
                This is a demo preview. Sign up for early access to use the full interactive version.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
