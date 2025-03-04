
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Play, Calendar, MessageSquare, Video, Clock, CheckCircle } from 'lucide-react';

const MockInterviews = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('technical');
  
  const technicalQuestions = [
    {
      id: 1,
      question: "Explain the concept of closures in JavaScript and provide an example.",
      difficulty: "Medium",
      category: "JavaScript Fundamentals",
      estimatedTime: "5-10 minutes"
    },
    {
      id: 2,
      question: "How would you optimize performance in a React application?",
      difficulty: "Medium",
      category: "React",
      estimatedTime: "10-15 minutes"
    },
    {
      id: 3,
      question: "Implement a function to check if a string is a palindrome.",
      difficulty: "Easy",
      category: "Algorithms",
      estimatedTime: "5-10 minutes"
    },
    {
      id: 4,
      question: "Describe the box model in CSS and how it affects layout.",
      difficulty: "Easy",
      category: "CSS",
      estimatedTime: "5-10 minutes"
    },
    {
      id: 5,
      question: "Explain how you would implement authentication in a React application.",
      difficulty: "Hard",
      category: "Security",
      estimatedTime: "15-20 minutes"
    }
  ];
  
  const behavioralQuestions = [
    {
      id: 1,
      question: "Tell me about a time when you had to meet a tight deadline. How did you handle it?",
      category: "Time Management",
      estimatedTime: "5-10 minutes"
    },
    {
      id: 2,
      question: "Describe a situation where you had to work with a difficult team member or client.",
      category: "Conflict Resolution",
      estimatedTime: "5-10 minutes"
    },
    {
      id: 3,
      question: "Tell me about a project you're particularly proud of. What was your role and what did you achieve?",
      category: "Achievements",
      estimatedTime: "10-15 minutes"
    },
    {
      id: 4,
      question: "How do you prioritize your work when you have multiple deadlines?",
      category: "Organization",
      estimatedTime: "5-10 minutes"
    },
    {
      id: 5,
      question: "Describe a situation where you identified a problem and took the initiative to fix it.",
      category: "Problem Solving",
      estimatedTime: "10-15 minutes"
    }
  ];
  
  const upcomingInterviews = [
    {
      id: 1,
      company: "TechCorp Inc.",
      position: "Senior Frontend Developer",
      date: "May 15, 2023",
      time: "2:00 PM",
      type: "Technical",
      status: "Scheduled"
    },
    {
      id: 2,
      company: "WebSolutions Ltd.",
      position: "UI Engineer",
      date: "May 18, 2023",
      time: "11:30 AM",
      type: "Technical + Behavioral",
      status: "Pending Confirmation"
    }
  ];
  
  const pastInterviews = [
    {
      id: 1,
      company: "DevStudio",
      position: "React Developer",
      date: "April 28, 2023",
      type: "Technical",
      feedback: "Strong technical skills. Could improve system design explanations.",
      rating: 4
    },
    {
      id: 2,
      company: "CreativeApps",
      position: "Frontend Engineer",
      date: "April 22, 2023",
      type: "Behavioral",
      feedback: "Good communication. Provide more specific examples in answers.",
      rating: 3
    }
  ];
  
  const startMockInterview = (questionType) => {
    toast({
      title: "Mock Interview Started",
      description: `Starting a ${questionType} interview session.`
    });
  };
  
  const scheduleInterview = () => {
    toast({
      title: "Interview Scheduled",
      description: "Your mock interview has been scheduled."
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Practice Interview Questions</CardTitle>
          <CardDescription>
            Prepare for interviews with AI-powered question and answer practice
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 mb-6">
            <Button 
              variant={activeTab === 'technical' ? 'default' : 'outline'} 
              onClick={() => setActiveTab('technical')}
            >
              Technical Questions
            </Button>
            <Button 
              variant={activeTab === 'behavioral' ? 'default' : 'outline'} 
              onClick={() => setActiveTab('behavioral')}
            >
              Behavioral Questions
            </Button>
          </div>
          
          <div className="space-y-4">
            {(activeTab === 'technical' ? technicalQuestions : behavioralQuestions).map((item) => (
              <div key={item.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium mb-2">{item.question}</h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-1"
                    onClick={() => startMockInterview(activeTab)}
                  >
                    <Play className="h-3 w-3" />
                    Practice
                  </Button>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    {item.category}
                  </span>
                  {activeTab === 'technical' && (
                    <span className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${
                        item.difficulty === 'Easy' ? 'bg-green-500' : 
                        item.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      {item.difficulty}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {item.estimatedTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Button onClick={() => startMockInterview('full')}>
              Start Full Mock Interview
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Interviews</CardTitle>
            <CardDescription>
              Scheduled mock interviews with AI interviewers
            </CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingInterviews.length > 0 ? (
              <div className="space-y-4">
                {upcomingInterviews.map((interview) => (
                  <div key={interview.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">{interview.position}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        interview.status === 'Scheduled' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {interview.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{interview.company}</p>
                    <div className="flex gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {interview.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {interview.time}
                      </span>
                    </div>
                    <div className="flex justify-end gap-2 mt-3">
                      <Button variant="outline" size="sm">Reschedule</Button>
                      <Button size="sm">Join</Button>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full" onClick={scheduleInterview}>
                  Schedule New Interview
                </Button>
              </div>
            ) : (
              <div className="text-center py-6">
                <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-medium mb-2">No upcoming interviews</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Schedule a mock interview with our AI interviewer
                </p>
                <Button onClick={scheduleInterview}>
                  Schedule an Interview
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Past Interviews & Feedback</CardTitle>
            <CardDescription>
              Review your performance in previous mock interviews
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pastInterviews.length > 0 ? (
              <div className="space-y-4">
                {pastInterviews.map((interview) => (
                  <div key={interview.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">{interview.position}</h3>
                      <div className="flex">
                        {Array.from({length: 5}).map((_, i) => (
                          <CheckCircle 
                            key={i} 
                            className={`h-4 w-4 ${
                              i < interview.rating ? 'text-primary' : 'text-muted'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{interview.company}</p>
                    <div className="flex gap-4 text-xs text-muted-foreground mb-3">
                      <span>{interview.date}</span>
                      <span>{interview.type}</span>
                    </div>
                    <div className="bg-muted p-3 rounded text-sm mb-2">
                      "{interview.feedback}"
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Video className="h-3 w-3" />
                        Watch Recording
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <MessageSquare className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-medium mb-2">No interview history</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Complete a mock interview to see feedback
                </p>
                <Button variant="outline" onClick={() => startMockInterview('full')}>
                  Start Mock Interview
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MockInterviews;
