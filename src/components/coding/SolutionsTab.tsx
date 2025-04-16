
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SolutionsTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Solutions</CardTitle>
        <CardDescription>
          View and review your previous solutions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-6">
          <p className="text-muted-foreground">
            You haven't submitted any solutions yet. Start solving challenges to build your portfolio.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SolutionsTab;
