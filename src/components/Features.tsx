
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { Brain, BookOpen, Code, MessageSquare, FileCode, Rocket } from 'lucide-react';

const FeatureItem = ({ icon, title, description, active, onClick, index }) => {
  return (
    <div 
      className={cn(
        "p-6 rounded-xl transition-all duration-300 cursor-pointer",
        active ? "bg-primary/10" : "hover:bg-secondary"
      )}
      onClick={() => onClick(index)}
    >
      <div className="flex items-center gap-4">
        <div className={cn(
          "p-3 rounded-md transition-colors", 
          active ? "bg-primary text-white" : "bg-secondary text-primary"
        )}>
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-medium mb-1">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};

const FeatureDetail = ({ feature }) => {
  const [isVisible, setIsVisible] = useState(false);
  const detailRef = useRef(null);
  
  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [feature]);
  
  return (
    <div ref={detailRef} className="h-full flex items-center">
      <div className={cn(
        "transition-all duration-500 transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}>
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 mb-4">
          <span className="text-xs font-medium text-primary">{feature.tag}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-medium mb-4">{feature.detailTitle}</h3>
        <p className="text-muted-foreground mb-6 max-w-lg">{feature.detailDescription}</p>
        <div className="space-y-4">
          {feature.bullets.map((bullet, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="p-1 bg-primary/10 rounded-full mt-1">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              </div>
              <p className="text-sm">{bullet}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const features = [
    {
      icon: <Brain className="h-5 w-5" />,
      title: "Adaptive AI Tutor",
      description: "Personalized learning based on your needs",
      tag: "SMART LEARNING",
      detailTitle: "AI that adapts to your learning style",
      detailDescription: "Our AI analyzes your learning patterns, strengths, and weaknesses to create custom educational pathways that evolve as you progress.",
      bullets: [
        "Real-time adjustments based on performance metrics",
        "Identifies and targets knowledge gaps with precision",
        "Optimizes content difficulty to keep you in the learning 'flow state'",
        "Provides metacognitive insights to improve your learning approach"
      ]
    },
    {
      icon: <Code className="h-5 w-5" />,
      title: "Coding Challenges",
      description: "Practice with AI-generated problems",
      tag: "SKILL DEVELOPMENT",
      detailTitle: "Build technical skills with custom challenges",
      detailDescription: "Practice with programming challenges tailored to your skill level and learning goals, with real-time feedback and guidance.",
      bullets: [
        "AI generates unique problems matching your skill level",
        "Receive line-by-line code reviews with improvement suggestions",
        "Learn industry best practices and design patterns",
        "Track your progress with detailed performance analytics"
      ]
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: "Mock Interviews",
      description: "Practice with AI interview simulations",
      tag: "CAREER PREPARATION",
      detailTitle: "Master interviews with AI-powered practice",
      detailDescription: "Prepare for job interviews with our AI that simulates real interview scenarios, provides feedback, and helps you refine your responses.",
      bullets: [
        "Realistic interview simulations for technical and behavioral questions",
        "Personalized feedback on your communication style and content",
        "Industry-specific question sets for targeted preparation",
        "Video analysis option for non-verbal communication improvement"
      ]
    },
    {
      icon: <FileCode className="h-5 w-5" />,
      title: "Resume Feedback",
      description: "Get AI analysis on your resume",
      tag: "CAREER TOOLS",
      detailTitle: "Optimize your resume with AI analysis",
      detailDescription: "Our AI reviews your resume against industry standards and target job descriptions to help you stand out to recruiters and ATS systems.",
      bullets: [
        "ATS compatibility checking and optimization suggestions",
        "Keyword analysis based on your target job descriptions",
        "Content gap identification for skills and experiences",
        "Language improvements for clarity and impact"
      ]
    },
    {
      icon: <Rocket className="h-5 w-5" />,
      title: "Career Roadmap",
      description: "Personalized career guidance",
      tag: "CAREER STRATEGY",
      detailTitle: "Chart your professional journey with precision",
      detailDescription: "Receive data-driven career guidance with customized learning paths and skill development strategies based on your goals and industry trends.",
      bullets: [
        "Personalized skill gap analysis against your target roles",
        "Step-by-step learning paths with timeline estimates",
        "Industry trend analysis to future-proof your career",
        "Networking and professional development recommendations"
      ]
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: "Multi-Agent System",
      description: "Specialized AI mentors for different domains",
      tag: "ADVANCED TECHNOLOGY",
      detailTitle: "Learn from a team of specialized AI mentors",
      detailDescription: "Access a network of domain-specific AI mentors, each specialized in different aspects of your learning and career development journey.",
      bullets: [
        "Subject matter experts for specialized technical knowledge",
        "Industry insiders with up-to-date professional insights",
        "Academic coaches for theoretical and fundamental concepts",
        "Career strategists for professional development guidance"
      ]
    }
  ];

  const handleFeatureClick = (index) => {
    setActiveFeature(index);
  };

  return (
    <section id="features" className="section bg-secondary">
      <div className="container-custom">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 mb-4">
            <span className="text-xs font-medium text-primary">KEY FEATURES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light mb-4">
            AI-Powered Tools for Your <span className="text-primary font-normal">Learning Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl text-balance">
            SkillNest combines cutting-edge AI technologies to create a comprehensive learning and career development ecosystem.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          <div className="lg:col-span-2 space-y-4">
            {features.map((feature, index) => (
              <FeatureItem 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                active={activeFeature === index}
                onClick={handleFeatureClick}
                index={index}
              />
            ))}
          </div>
          
          <div className="lg:col-span-3 min-h-[350px] relative">
            <div className="absolute top-0 left-0 w-full h-full bg-white rounded-xl border border-border p-8">
              <FeatureDetail feature={features[activeFeature]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
