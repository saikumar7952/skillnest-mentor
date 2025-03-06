
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const CodingChallenges = () => {
  const navigate = useNavigate();
  const [userActivity, setUserActivity] = useState({
    timeSpent: 0,
    challengesAttempted: 0,
    completedChallenges: [],
  });

  // This would connect to your AI backend in a real implementation
  const trackUserBehavior = (action: string, data: any) => {
    console.log(`Tracked: ${action}`, data);
    // In a real app, this would send data to your backend for the AI model
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
          <h1 className="text-3xl font-medium mb-2">AI-Powered Coding Challenges</h1>
          <p className="text-muted-foreground max-w-2xl">
            Our AI dynamically adjusts challenge difficulty based on your performance and provides
            personalized hints when you need them.
          </p>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Your Adaptive Learning Journey</CardTitle>
            <CardDescription>
              The AI analyzes your coding patterns and adjusts challenges to maximize your learning
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">7</div>
                <div className="text-sm text-muted-foreground">Challenges Completed</div>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">Intermediate</div>
                <div className="text-sm text-muted-foreground">Current Skill Level</div>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">3</div>
                <div className="text-sm text-muted-foreground">Recommended Challenges</div>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <h3 className="font-medium">AI Insights</h3>
              <p className="text-sm">
                Based on your recent performance, our AI suggests focusing on algorithm efficiency and data structures. 
                You excel at problem-solving but could improve optimization techniques.
              </p>
            </div>
            
            <Button 
              onClick={() => trackUserBehavior('clicked_start_challenge', { source: 'dashboard' })}
              className="w-full"
            >
              Start Next Challenge
            </Button>
          </CardContent>
        </Card>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>How AI Personalizes Your Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-medium mb-1">Real-time Learning Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI tracks your coding patterns, time spent, and errors to build a
                    comprehensive profile of your strengths and weaknesses.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-medium mb-1">Adaptive Difficulty</h3>
                  <p className="text-sm text-muted-foreground">
                    Using reinforcement learning, the system adjusts challenge difficulty to keep you
                    in the optimal learning zone - not too easy, not too hard.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-medium mb-1">Smart Hints &amp; Guidance</h3>
                  <p className="text-sm text-muted-foreground">
                    When you're stuck, our AI provides contextual hints based on your specific 
                    approach to the problem, not generic solutions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Your Learning Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Skill Growth Areas</h3>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Algorithm Design</span>
                        <span>78%</span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Data Structures</span>
                        <span>65%</span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>System Design</span>
                        <span>42%</span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: '42%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Recent Performance</h3>
                  <div className="grid grid-cols-7 gap-1">
                    {[0.6, 0.8, 0.7, 0.9, 0.5, 0.7, 0.8].map((score, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div 
                          className="w-full bg-primary/20 rounded-sm" 
                          style={{ height: `${score * 60}px` }}
                        >
                          <div 
                            className="w-full bg-primary h-full rounded-sm" 
                            style={{ opacity: score }}
                          ></div>
                        </div>
                        <span className="text-xs mt-1">{i + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CodingChallenges;
