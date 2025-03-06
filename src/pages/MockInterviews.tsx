
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mic, Video, MessagesSquare } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MockInterviews = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('upcoming');
  
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
          <h1 className="text-3xl font-medium mb-2">AI-Driven Mock Interviews</h1>
          <p className="text-muted-foreground max-w-2xl">
            Practice with our AI interviewer that adapts questions based on your responses and provides
            detailed feedback on your delivery and content.
          </p>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Interview Analytics Dashboard</CardTitle>
            <CardDescription>
              Insights from your past AI interview sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">4</div>
                <div className="text-sm text-muted-foreground">Interviews Completed</div>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">76%</div>
                <div className="text-sm text-muted-foreground">Average Score</div>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">82%</div>
                <div className="text-sm text-muted-foreground">Content Quality</div>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">68%</div>
                <div className="text-sm text-muted-foreground">Delivery Score</div>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <h3 className="font-medium">AI Coach Feedback</h3>
              <p className="text-sm">
                Your technical explanations are strong, but our AI has detected frequent use of filler words
                and a tendency to speak too quickly when discussing complex topics. Consider practicing slower
                delivery on technical questions.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button>Schedule New Interview</Button>
              <Button variant="outline">View Detailed Feedback</Button>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="upcoming" value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
            <TabsTrigger value="past">Past Interviews</TabsTrigger>
            <TabsTrigger value="recommended">Recommended Practice</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center p-6">
                  <h3 className="text-lg font-medium mb-2">No Upcoming Interview Sessions</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Schedule a new mock interview with our AI interviewer to practice your skills
                  </p>
                  <Button>Schedule Interview</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="past" className="space-y-4">
            <div className="p-4 border rounded-lg flex flex-col md:flex-row gap-4 justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium">Frontend Developer Interview</h3>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">78% Score</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Focused on React, state management, and performance optimization
                </p>
                <div className="text-xs text-muted-foreground">June 12, 2023 • 45 minutes</div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">View Report</Button>
                <Button size="sm">Retry</Button>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg flex flex-col md:flex-row gap-4 justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium">System Design Interview</h3>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">65% Score</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Covered scalability, database design, and API architecture
                </p>
                <div className="text-xs text-muted-foreground">May 28, 2023 • 60 minutes</div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">View Report</Button>
                <Button size="sm">Retry</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="recommended" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Practice Sessions</CardTitle>
                <CardDescription>
                  Based on your past performance, our AI suggests these interview types
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 flex flex-col h-full">
                    <div className="mb-2">
                      <Video className="h-10 w-10 text-primary mb-2" />
                      <h3 className="font-medium">Behavioral Interview</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">
                      Practice answering questions about your past experiences and how you handle workplace situations.
                    </p>
                    <Button variant="outline" className="mt-auto">Start Session</Button>
                  </div>
                  
                  <div className="border rounded-lg p-4 flex flex-col h-full">
                    <div className="mb-2">
                      <Mic className="h-10 w-10 text-primary mb-2" />
                      <h3 className="font-medium">Technical Deep Dive</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">
                      Improve your ability to explain complex technical concepts clearly and concisely.
                    </p>
                    <Button variant="outline" className="mt-auto">Start Session</Button>
                  </div>
                  
                  <div className="border rounded-lg p-4 flex flex-col h-full">
                    <div className="mb-2">
                      <MessagesSquare className="h-10 w-10 text-primary mb-2" />
                      <h3 className="font-medium">Rapid Q&A</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">
                      Quick-fire questions to build your ability to think on your feet under pressure.
                    </p>
                    <Button variant="outline" className="mt-auto">Start Session</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>How AI Enhances Your Interview Practice</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <h3 className="font-medium mb-1">Speech Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI analyzes your speech patterns, including tone, pace, filler words, and confidence markers
                  to provide targeted feedback on your delivery.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <h3 className="font-medium mb-1">Adaptive Questioning</h3>
                <p className="text-sm text-muted-foreground">
                  The AI interviewer adjusts question difficulty and follow-ups based on your responses,
                  similar to how a real interviewer would probe deeper on certain topics.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <h3 className="font-medium mb-1">Comprehensive Feedback</h3>
                <p className="text-sm text-muted-foreground">
                  After each session, receive detailed feedback on both technical content and presentation skills,
                  with specific suggestions for improvement.
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

export default MockInterviews;
