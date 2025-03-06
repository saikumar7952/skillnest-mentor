
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bot, Code, FileText, Briefcase, Video, MessageSquare } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

const AIAgents = () => {
  const navigate = useNavigate();
  const [userQuestion, setUserQuestion] = useState('');
  
  // In a real app, these would connect to your AI backend
  const handleSendQuestion = () => {
    if (!userQuestion.trim()) return;
    console.log('Sending question to AI:', userQuestion);
    // This would connect to your multi-agent system
    setUserQuestion('');
  };
  
  const agents = [
    {
      id: 'coding-mentor',
      name: 'Coding Mentor',
      icon: <Code className="h-5 w-5" />,
      description: 'Evaluates code and suggests improvements',
      capabilities: ['Code review', 'Best practices', 'Debugging help', 'Algorithm optimization'],
      color: 'bg-blue-500'
    },
    {
      id: 'interview-coach',
      name: 'Interview Coach',
      icon: <Video className="h-5 w-5" />,
      description: 'Conducts mock interviews and provides feedback',
      capabilities: ['Technical interviews', 'Behavioral questions', 'Delivery feedback', 'Follow-up questions'],
      color: 'bg-green-500'
    },
    {
      id: 'resume-expert',
      name: 'Resume Expert',
      icon: <FileText className="h-5 w-5" />,
      description: 'Analyzes resumes and suggests improvements',
      capabilities: ['ATS optimization', 'Content improvement', 'Keyword analysis', 'Formatting suggestions'],
      color: 'bg-purple-500'
    },
    {
      id: 'career-advisor',
      name: 'Career Advisor',
      icon: <Briefcase className="h-5 w-5" />,
      description: 'Creates personalized career development plans',
      capabilities: ['Skill gap analysis', 'Industry insights', 'Learning paths', 'Career progression'],
      color: 'bg-amber-500'
    },
    {
      id: 'ai-guide',
      name: 'AI Guide',
      icon: <Bot className="h-5 w-5" />,
      description: 'Helps you navigate the platform and discover features',
      capabilities: ['Feature discovery', 'Personalized tours', 'Setting goals', 'Progress tracking'],
      color: 'bg-red-500'
    }
  ];
  
  // Sample conversation history (in a real app this would be dynamic)
  const conversationHistory = [
    {
      id: 1,
      agentId: 'ai-guide',
      message: "Welcome to SkillNest! I'm your AI Guide. What career goal are you working towards?",
      timestamp: '10:23 AM'
    },
    {
      id: 2,
      agentId: 'user',
      message: "I'm trying to become a senior frontend developer.",
      timestamp: '10:24 AM'
    },
    {
      id: 3,
      agentId: 'career-advisor',
      message: "I see you're interested in frontend development! Based on industry trends, I recommend focusing on React, TypeScript, and state management libraries. Would you like me to create a personalized learning path?",
      timestamp: '10:24 AM'
    },
    {
      id: 4,
      agentId: 'user',
      message: "Yes, please create a learning path for me. I already know basic React.",
      timestamp: '10:25 AM'
    },
    {
      id: 5,
      agentId: 'coding-mentor',
      message: "Great! To assess your current React skills, would you like to take a coding challenge? This will help me tailor challenges to your skill level.",
      timestamp: '10:26 AM'
    }
  ];
  
  const getAgentAvatar = (agentId) => {
    if (agentId === 'user') {
      return (
        <Avatar>
          <AvatarFallback className="bg-primary/20">US</AvatarFallback>
        </Avatar>
      );
    }
    
    const agent = agents.find(a => a.id === agentId);
    if (!agent) return null;
    
    return (
      <Avatar>
        <AvatarFallback className={agent.color + ' text-white'}>
          {agent.icon}
        </AvatarFallback>
      </Avatar>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container-custom max-w-screen-lg py-8 flex-1">
        <button 
          onClick={() => navigate('/roadmap')} 
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Roadmap
        </button>
        
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-3xl font-medium mb-2">Multi-Agent AI System</h1>
          <p className="text-muted-foreground max-w-2xl">
            Interact with our specialized AI agents that work together to help you achieve your career goals
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>AI Assistant Chat</CardTitle>
                <CardDescription>
                  Ask questions to our AI agents who collaborate to provide the best assistance
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                  {conversationHistory.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.agentId === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-3 max-w-[80%] ${message.agentId === 'user' ? 'flex-row-reverse' : ''}`}>
                        {getAgentAvatar(message.agentId)}
                        <div>
                          <div 
                            className={`rounded-lg p-3 ${
                              message.agentId === 'user' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-secondary'
                            }`}
                          >
                            {message.message}
                          </div>
                          <div className={`text-xs text-muted-foreground mt-1 ${message.agentId === 'user' ? 'text-right' : ''}`}>
                            {message.timestamp}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input 
                    placeholder="Ask the AI agents a question..." 
                    value={userQuestion}
                    onChange={(e) => setUserQuestion(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendQuestion()}
                  />
                  <Button onClick={handleSendQuestion}>
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Available AI Agents</CardTitle>
                <CardDescription>
                  Specialized AI agents that collaborate to assist you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {agents.map((agent) => (
                  <div key={agent.id} className="border rounded-lg p-3">
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar>
                        <AvatarFallback className={agent.color + ' text-white'}>
                          {agent.icon}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{agent.name}</h3>
                        <p className="text-xs text-muted-foreground">{agent.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {agent.capabilities.map((capability, index) => (
                        <span key={index} className="text-xs px-2 py-0.5 bg-secondary rounded-full">
                          {capability}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>How Our Multi-Agent System Works</CardTitle>
            <CardDescription>
              Our AI agents collaborate to provide comprehensive assistance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <h3 className="font-medium mb-1">Intelligent Routing</h3>
                <p className="text-sm text-muted-foreground">
                  When you ask a question, our system automatically determines which agent or combination
                  of agents is best suited to help you, based on the context and your needs.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <h3 className="font-medium mb-1">Agent Collaboration</h3>
                <p className="text-sm text-muted-foreground">
                  Our agents share information and insights to provide comprehensive assistance.
                  For example, the Interview Coach might collaborate with the Resume Expert to help you
                  prepare for specific interview questions based on your resume.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <h3 className="font-medium mb-1">Continuous Learning</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI system improves over time based on your interactions, learning your preferences
                  and adapting to provide increasingly personalized assistance for your career journey.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                4
              </div>
              <div>
                <h3 className="font-medium mb-1">Seamless Transitions</h3>
                <p className="text-sm text-muted-foreground">
                  Move smoothly between different aspects of your career development as our agents
                  work together to provide a cohesive experience across coding, interviewing, resume
                  building, and career planning.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default AIAgents;
