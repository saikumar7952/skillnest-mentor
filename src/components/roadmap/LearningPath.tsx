
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, BookOpen, Code, Coffee, Lightbulb } from 'lucide-react';

const LearningPath = () => {
  const [expandedModule, setExpandedModule] = useState<number | null>(0);

  // This would come from the AI-based assessment in a real app
  const learningPath = [
    {
      id: 1,
      title: "Frontend Foundations",
      description: "Master the core technologies of modern web development",
      estimatedTime: "4 weeks",
      progress: 75,
      content: [
        { type: "course", title: "Advanced JavaScript Concepts", completed: true },
        { type: "course", title: "React Deep Dive", completed: true },
        { type: "project", title: "Build an Interactive Dashboard", completed: false },
        { type: "assessment", title: "Frontend Architecture Quiz", completed: false },
      ]
    },
    {
      id: 2,
      title: "UI/UX Design Principles",
      description: "Learn to create intuitive and beautiful user experiences",
      estimatedTime: "3 weeks",
      progress: 30,
      content: [
        { type: "course", title: "Design Systems Fundamentals", completed: true },
        { type: "course", title: "User Research Methods", completed: false },
        { type: "project", title: "Redesign a Popular App", completed: false },
        { type: "assessment", title: "Usability Testing Practical", completed: false },
      ]
    },
    {
      id: 3,
      title: "Backend Integration",
      description: "Connect your frontend to powerful backend services",
      estimatedTime: "5 weeks",
      progress: 0,
      content: [
        { type: "course", title: "RESTful API Design", completed: false },
        { type: "course", title: "GraphQL Fundamentals", completed: false },
        { type: "project", title: "Full-Stack CRUD Application", completed: false },
        { type: "assessment", title: "API Security Best Practices", completed: false },
      ]
    },
    {
      id: 4,
      title: "Career Preparation",
      description: "Get ready for the job market with portfolios and interviews",
      estimatedTime: "2 weeks",
      progress: 0,
      content: [
        { type: "course", title: "Technical Interview Preparation", completed: false },
        { type: "project", title: "Personal Portfolio Website", completed: false },
        { type: "assessment", title: "Mock Technical Interview", completed: false },
        { type: "course", title: "Resume Workshop", completed: false },
      ]
    }
  ];

  const getContentIcon = (type: string) => {
    switch(type) {
      case 'course':
        return <BookOpen className="h-4 w-4" />;
      case 'project':
        return <Code className="h-4 w-4" />;
      case 'assessment':
        return <Coffee className="h-4 w-4" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Learning Path</CardTitle>
          <CardDescription>
            AI-curated curriculum based on your career goals and current skills
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Frontend Developer Career Path</h3>
                <p className="text-sm text-muted-foreground">Estimated completion: 14 weeks</p>
              </div>
              <Button size="sm">Update Path</Button>
            </div>
            
            <div className="space-y-4">
              {learningPath.map((module, index) => (
                <div key={module.id} className="border rounded-lg overflow-hidden">
                  <div 
                    className="flex items-center justify-between p-4 cursor-pointer bg-card"
                    onClick={() => setExpandedModule(expandedModule === index ? null : index)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        module.progress === 100 
                          ? 'bg-green-500' 
                          : module.progress > 0 
                            ? 'bg-primary' 
                            : 'bg-muted'
                      }`}>
                        {module.progress === 100 ? (
                          <Check className="h-5 w-5 text-white" />
                        ) : (
                          <span className="text-sm font-medium text-white">{module.progress}%</span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{module.title}</h4>
                        <p className="text-sm text-muted-foreground">{module.estimatedTime}</p>
                      </div>
                    </div>
                    <ArrowRight className={`h-5 w-5 transition-transform ${
                      expandedModule === index ? 'rotate-90' : ''
                    }`} />
                  </div>
                  
                  {expandedModule === index && (
                    <div className="p-4 bg-accent/20 border-t">
                      <p className="mb-4 text-sm">{module.description}</p>
                      <div className="space-y-2">
                        {module.content.map((item, i) => (
                          <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-background">
                            <div className={`p-1.5 rounded-md ${
                              item.completed ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'
                            }`}>
                              {getContentIcon(item.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className={item.completed ? 'line-through text-muted-foreground' : ''}>
                                  {item.title}
                                </span>
                                <span className="text-xs text-muted-foreground capitalize">{item.type}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t flex justify-end">
                        <Button size="sm">
                          {module.progress > 0 ? 'Continue' : 'Start'} Module
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Recommended Resources</CardTitle>
          <CardDescription>
            Additional materials to enhance your learning journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border rounded-lg flex flex-col">
              <div className="font-medium mb-1">React Performance Optimization</div>
              <p className="text-sm text-muted-foreground mb-4">
                Learn advanced techniques for optimizing React applications
              </p>
              <div className="mt-auto flex justify-between items-center">
                <span className="text-xs bg-secondary px-2 py-1 rounded">Course</span>
                <Button variant="outline" size="sm">View</Button>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg flex flex-col">
              <div className="font-medium mb-1">Frontend System Design</div>
              <p className="text-sm text-muted-foreground mb-4">
                Architecture patterns for scalable frontend applications
              </p>
              <div className="mt-auto flex justify-between items-center">
                <span className="text-xs bg-secondary px-2 py-1 rounded">E-Book</span>
                <Button variant="outline" size="sm">View</Button>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg flex flex-col">
              <div className="font-medium mb-1">Web Accessibility Masterclass</div>
              <p className="text-sm text-muted-foreground mb-4">
                Building inclusive web experiences for all users
              </p>
              <div className="mt-auto flex justify-between items-center">
                <span className="text-xs bg-secondary px-2 py-1 rounded">Workshop</span>
                <Button variant="outline" size="sm">View</Button>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg flex flex-col">
              <div className="font-medium mb-1">Frontend Developer Roadmap 2023</div>
              <p className="text-sm text-muted-foreground mb-4">
                Comprehensive guide to becoming a frontend developer
              </p>
              <div className="mt-auto flex justify-between items-center">
                <span className="text-xs bg-secondary px-2 py-1 rounded">Guide</span>
                <Button variant="outline" size="sm">View</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningPath;
