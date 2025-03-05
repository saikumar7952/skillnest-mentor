
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight, Brain, RocketIcon, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center pt-16 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-subtle-float"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-subtle-float animation-delay-400"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-subtle-float animation-delay-200"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary border border-border mb-6 animate-fade-in">
            <span className="text-xs font-medium">AI-Powered Mentorship Platform</span>
          </div>
          
          <h1 className="font-light mb-6 animate-fade-up">
            <span className="text-foreground">AI-driven mentorship for </span>
            <span className="text-primary font-normal">skill mastery</span>
            <span className="text-foreground"> & </span>
            <span className="text-primary font-normal">career success</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-3xl mb-8 text-balance animate-fade-up animation-delay-200">
            SkillNest combines artificial intelligence with personalized learning paths to help you master in-demand skills and accelerate your career growth.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-up animation-delay-400">
            <Button size="lg" className="group" asChild>
              <Link to="/payment">
                Get Early Access
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              See How It Works
            </Button>
          </div>
          
          {/* Feature preview cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {[
              { 
                icon: <Brain className="h-6 w-6 text-primary" />, 
                title: "Adaptive AI Tutor", 
                description: "Personalized learning paths based on your unique strengths and weaknesses.",
                delay: 0
              },
              { 
                icon: <RocketIcon className="h-6 w-6 text-primary" />, 
                title: "Career Roadmap", 
                description: "AI-driven guidance for upskilling and job readiness in your field.",
                delay: 200
              },
              { 
                icon: <MessageSquare className="h-6 w-6 text-primary" />, 
                title: "Mock Interviews", 
                description: "Practice with AI that simulates real interview scenarios for your target roles.",
                delay: 400
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={cn(
                  "feature-card animate-fade-up",
                  feature.delay ? `animation-delay-${feature.delay}` : ""
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2 bg-primary/10 rounded-md">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-subtle-float">
        <span className="text-xs text-muted-foreground mb-2">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center p-1">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full animate-[bounce_1.5s_infinite]"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
