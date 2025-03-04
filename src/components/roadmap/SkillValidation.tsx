
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Clock, Code, BookOpen } from 'lucide-react';

const SkillValidation = () => {
  const challenges = [
    {
      id: 1,
      title: "Build a Responsive Dashboard",
      category: "Frontend Development",
      difficulty: "Intermediate",
      estimatedTime: "3-4 hours",
      skills: ["React", "CSS Grid", "Data Visualization"],
      status: "completed"
    },
    {
      id: 2,
      title: "Create a REST API Client",
      category: "API Integration",
      difficulty: "Intermediate",
      estimatedTime: "2-3 hours",
      skills: ["Fetch API", "Async/Await", "Error Handling"],
      status: "in-progress"
    },
    {
      id: 3,
      title: "Implement Authentication Flow",
      category: "User Management",
      difficulty: "Advanced",
      estimatedTime: "4-5 hours",
      skills: ["Authentication", "JWT", "Protected Routes"],
      status: "not-started"
    },
    {
      id: 4,
      title: "State Management System",
      category: "Application Architecture",
      difficulty: "Advanced",
      estimatedTime: "5-6 hours",
      skills: ["Redux", "Context API", "State Patterns"],
      status: "not-started"
    }
  ];

  const assessments = [
    {
      id: 1,
      title: "Frontend Architecture Quiz",
      category: "Architecture",
      questions: 15,
      timeLimit: "30 minutes",
      status: "completed",
      score: 85
    },
    {
      id: 2,
      title: "JavaScript Algorithms Assessment",
      category: "Algorithms",
      questions: 10,
      timeLimit: "45 minutes",
      status: "not-started",
      score: null
    },
    {
      id: 3,
      title: "React Best Practices",
      category: "React",
      questions: 20,
      timeLimit: "40 minutes",
      status: "not-started",
      score: null
    }
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'completed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><Check className="mr-1 h-3 w-3" /> Completed</span>;
      case 'in-progress':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><Clock className="mr-1 h-3 w-3" /> In Progress</span>;
      case 'not-started':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Not Started</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Coding Challenges</CardTitle>
          <CardDescription>
            Prove your skills with real-world programming challenges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {challenges.map((challenge) => (
              <div 
                key={challenge.id} 
                className="p-4 border rounded-lg flex flex-col md:flex-row gap-4 justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Code className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">{challenge.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {challenge.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="inline-block px-2 py-1 text-xs bg-secondary rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{challenge.difficulty}</span>
                    <span>•</span>
                    <span>{challenge.estimatedTime}</span>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end">
                  <div>
                    {getStatusBadge(challenge.status)}
                  </div>
                  <Button 
                    variant={challenge.status === 'completed' ? 'outline' : 'default'} 
                    size="sm"
                  >
                    {challenge.status === 'completed' ? 'View Solution' : 
                     challenge.status === 'in-progress' ? 'Continue' : 'Start Challenge'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Skill Assessments</CardTitle>
          <CardDescription>
            Test your knowledge with comprehensive assessments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assessments.map((assessment) => (
              <div 
                key={assessment.id} 
                className="p-4 border rounded-lg flex flex-col md:flex-row gap-4 justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">{assessment.title}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{assessment.category}</span>
                    <span>•</span>
                    <span>{assessment.questions} questions</span>
                    <span>•</span>
                    <span>{assessment.timeLimit}</span>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end">
                  <div>
                    {assessment.status === 'completed' ? (
                      <div className="text-sm font-medium text-green-600">
                        Score: {assessment.score}%
                      </div>
                    ) : getStatusBadge(assessment.status)}
                  </div>
                  <Button 
                    variant={assessment.status === 'completed' ? 'outline' : 'default'} 
                    size="sm"
                  >
                    {assessment.status === 'completed' ? 'Review' : 'Take Assessment'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Skill Profile</CardTitle>
          <CardDescription>
            AI-validated skills based on your completed challenges and assessments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">React</div>
              <div className="flex justify-between items-center">
                <div className="font-medium">Advanced</div>
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-xs font-medium">85%</div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">JavaScript</div>
              <div className="flex justify-between items-center">
                <div className="font-medium">Advanced</div>
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-xs font-medium">90%</div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">CSS/HTML</div>
              <div className="flex justify-between items-center">
                <div className="font-medium">Intermediate</div>
                <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-800 flex items-center justify-center text-xs font-medium">75%</div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">API Design</div>
              <div className="flex justify-between items-center">
                <div className="font-medium">Intermediate</div>
                <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-800 flex items-center justify-center text-xs font-medium">68%</div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">State Management</div>
              <div className="flex justify-between items-center">
                <div className="font-medium">Beginner</div>
                <div className="w-8 h-8 rounded-full bg-red-100 text-red-800 flex items-center justify-center text-xs font-medium">40%</div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Testing</div>
              <div className="flex justify-between items-center">
                <div className="font-medium">Beginner</div>
                <div className="w-8 h-8 rounded-full bg-red-100 text-red-800 flex items-center justify-center text-xs font-medium">35%</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillValidation;
