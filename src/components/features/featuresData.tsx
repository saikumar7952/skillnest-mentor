
import { Brain, BookOpen, Code, MessageSquare, FileCode, Rocket } from 'lucide-react';
import { FeatureData } from './types';

export const featuresData: FeatureData[] = [
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
