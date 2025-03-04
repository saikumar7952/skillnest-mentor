
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import RoadmapAssessment from '@/components/roadmap/RoadmapAssessment';
import LearningPath from '@/components/roadmap/LearningPath';
import SkillValidation from '@/components/roadmap/SkillValidation';
import ResumeOptimization from '@/components/roadmap/ResumeOptimization';
import MockInterviews from '@/components/roadmap/MockInterviews';
import JobMatching from '@/components/roadmap/JobMatching';

const CareerRoadmap = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('assessment');
  const [userGoals, setUserGoals] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }

    // Fetch user goals from profile
    const fetchUserProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('goals')
          .eq('id', user.id)
          .single();
          
        if (data && !error) {
          setUserGoals(data.goals || []);
        }
      }
    };

    fetchUserProfile();
  }, [user, loading, navigate]);

  const roadmapTabs = [
    { id: 'assessment', label: 'Assessment', icon: '📌' },
    { id: 'learning', label: 'Learning Path', icon: '📚' },
    { id: 'skills', label: 'Skill Validation', icon: '💪' },
    { id: 'resume', label: 'Resume', icon: '📄' },
    { id: 'interviews', label: 'Interviews', icon: '🎤' },
    { id: 'jobs', label: 'Job Matching', icon: '💼' },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Career Roadmap</h1>
        <p className="text-muted-foreground">
          Your personalized journey to career success, powered by AI
        </p>
      </div>

      <Tabs 
        defaultValue="assessment" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-8"
      >
        <div className="bg-card p-1 rounded-lg border overflow-x-auto">
          <TabsList className="h-auto p-0 bg-transparent flex w-full">
            {roadmapTabs.map((tab) => (
              <TabsTrigger 
                key={tab.id}
                value={tab.id}
                className="py-2.5 px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md flex items-center gap-2 flex-1 whitespace-nowrap"
              >
                <span className="hidden sm:inline">{tab.icon}</span>
                <span>{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="assessment" className="space-y-6">
          <RoadmapAssessment userGoals={userGoals} />
        </TabsContent>

        <TabsContent value="learning" className="space-y-6">
          <LearningPath />
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <SkillValidation />
        </TabsContent>

        <TabsContent value="resume" className="space-y-6">
          <ResumeOptimization />
        </TabsContent>

        <TabsContent value="interviews" className="space-y-6">
          <MockInterviews />
        </TabsContent>

        <TabsContent value="jobs" className="space-y-6">
          <JobMatching />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CareerRoadmap;
