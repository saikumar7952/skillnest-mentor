
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface RoadmapAssessmentProps {
  userGoals: string[];
}

const RoadmapAssessment = ({ userGoals }: RoadmapAssessmentProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [educationLevel, setEducationLevel] = useState('');
  const [currentSkills, setCurrentSkills] = useState('');
  const [careerGoal, setCareerGoal] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [assessmentResults, setAssessmentResults] = useState<any>(null);

  const handleAssessmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, you would call an AI service here to analyze the inputs
      // For demo purposes, we'll simulate an AI assessment
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Save career goal to profile
      if (user) {
        const updatedGoals = [...userGoals];
        if (!updatedGoals.includes(careerGoal) && careerGoal.trim() !== '') {
          updatedGoals.push(careerGoal);
          
          const { error } = await supabase
            .from('profiles')
            .update({ 
              goals: updatedGoals 
            })
            .eq('id', user.id);
            
          if (error) {
            throw error;
          }
        }
      }

      // Simulate AI assessment results
      const simulatedResults = {
        recommendedIndustries: ['Technology', 'Data Science', 'Web Development'],
        recommendedRoles: ['Frontend Developer', 'UX Engineer', 'Product Manager'],
        skillGaps: ['React Native', 'GraphQL', 'System Design'],
        strengths: ['Problem Solving', 'Web Development', 'User Interface Design'],
        timeToGoal: '12-18 months'
      };
      
      setAssessmentResults(simulatedResults);
      setAssessmentComplete(true);
      
      toast({
        title: "Assessment Complete",
        description: "Your career assessment has been analyzed by our AI.",
      });
      
    } catch (error) {
      console.error('Error saving assessment:', error);
      toast({
        title: "Assessment Error",
        description: "There was a problem processing your assessment.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {!assessmentComplete ? (
        <Card>
          <CardHeader>
            <CardTitle>Self-Assessment & Goal Setting</CardTitle>
            <CardDescription>
              Tell us about yourself so we can create your personalized career roadmap
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAssessmentSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="education">Current Education Level</Label>
                <Input 
                  id="education"
                  placeholder="e.g., Bachelor's in Computer Science, Self-taught, Bootcamp"
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="skills">Your Current Skills</Label>
                <Input 
                  id="skills"
                  placeholder="e.g., JavaScript, React, HTML/CSS, UI Design"
                  value={currentSkills}
                  onChange={(e) => setCurrentSkills(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="goal">Career Goal</Label>
                <Input 
                  id="goal"
                  placeholder="e.g., Senior Frontend Developer, Data Scientist, Product Manager"
                  value={careerGoal}
                  onChange={(e) => setCareerGoal(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Analyzing...' : 'Analyze My Career Path'}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Your Career Assessment Results</CardTitle>
              <CardDescription>
                Based on your background and goals, here's our AI analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium text-lg mb-2">Recommended Industries</h3>
                <div className="flex flex-wrap gap-2">
                  {assessmentResults.recommendedIndustries.map((industry, index) => (
                    <div 
                      key={index} 
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {industry}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Recommended Roles</h3>
                <div className="flex flex-wrap gap-2">
                  {assessmentResults.recommendedRoles.map((role, index) => (
                    <div 
                      key={index} 
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                    >
                      {role}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-medium text-lg">Skills to Develop</h3>
                  <ul className="space-y-1">
                    {assessmentResults.skillGaps.map((skill, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium text-lg">Your Strengths</h3>
                  <ul className="space-y-1">
                    {assessmentResults.strengths.map((strength, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="text-center">
                  <span className="text-sm text-muted-foreground">Estimated Time to Reach Goal</span>
                  <p className="text-xl font-semibold text-primary">{assessmentResults.timeToGoal}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>Based on your assessment, we recommend exploring the following next steps:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto py-4 px-4 text-left flex flex-col items-start">
                    <span className="font-medium">Generate Learning Path</span>
                    <span className="text-sm text-muted-foreground">Get a customized curriculum</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 px-4 text-left flex flex-col items-start">
                    <span className="font-medium">Skill Validation Plan</span>
                    <span className="text-sm text-muted-foreground">Prove your abilities</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default RoadmapAssessment;
