
import { BookOpen, Code, MessageSquare, FileCode, Brain, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">How SkillNest Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform adapts to your learning style and career goals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  {step.icon}
                </div>
                <h3 className="text-xl font-medium">{step.title}</h3>
              </div>
              <p className="text-muted-foreground mb-4 flex-grow">{step.description}</p>
              <Link to={step.route} className="mt-auto">
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const steps = [
  {
    title: "Assessment",
    description: "Complete a quick skills assessment to help our AI understand your current level and learning goals.",
    icon: <Brain className="h-6 w-6" />,
    route: "/learning-path"
  },
  {
    title: "Personalized Plan",
    description: "Receive a customized learning path based on your assessment results and career objectives.",
    icon: <BookOpen className="h-6 w-6" />,
    route: "/roadmap"
  },
  {
    title: "Learn & Practice",
    description: "Access AI-powered lessons, coding challenges, and interactive tutorials tailored to your needs.",
    icon: <Code className="h-6 w-6" />,
    route: "/coding-challenges"
  },
  {
    title: "Get Support",
    description: "Ask questions and receive help from our AI assistant whenever you encounter difficulties.",
    icon: <MessageSquare className="h-6 w-6" />,
    route: "/doubt-solver"
  },
  {
    title: "Prepare for Jobs",
    description: "Practice mock interviews and get AI feedback on your resume to improve your job prospects.",
    icon: <FileCode className="h-6 w-6" />,
    route: "/resume-analysis"
  },
  {
    title: "Advance Your Career",
    description: "Track your progress and receive recommendations for further skill development to meet your career goals.",
    icon: <Rocket className="h-6 w-6" />,
    route: "/ai-agents"
  }
];

export default HowItWorks;
