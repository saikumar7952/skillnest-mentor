
import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const InsightsSidebar: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Challenge Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Difficulty Levels</h3>
          <div className="flex gap-2">
            <Badge className="bg-green-100 text-green-800">Easy</Badge>
            <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
            <Badge className="bg-red-100 text-red-800">Hard</Badge>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Popular Categories</h3>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ArrowRight className="h-3 w-3 text-muted-foreground" />
              <span className="text-sm">Arrays & Hashing</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowRight className="h-3 w-3 text-muted-foreground" />
              <span className="text-sm">Strings</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowRight className="h-3 w-3 text-muted-foreground" />
              <span className="text-sm">Linked Lists</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowRight className="h-3 w-3 text-muted-foreground" />
              <span className="text-sm">Dynamic Programming</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Tips for Success</h3>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Break down the problem before coding</li>
            <li>• Consider edge cases in your solution</li>
            <li>• Optimize for time & space complexity</li>
            <li>• Test your code with examples</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline" size="sm" onClick={() => navigate('/coding-challenges')}>
          <Play className="h-4 w-4 mr-1" />
          Start Random Challenge
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InsightsSidebar;
