
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface UserStats {
  solved: number;
  attempted: number;
  streak: number;
  lastActive: string;
}

interface ProgressTabProps {
  userStats: UserStats;
}

const ProgressTab: React.FC<ProgressTabProps> = ({ userStats }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Learning Progress</CardTitle>
        <CardDescription>
          Track your coding journey and skills development
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">{userStats.solved}</div>
            <div className="text-sm text-muted-foreground">Problems Solved</div>
          </div>
          <div className="border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">{userStats.attempted}</div>
            <div className="text-sm text-muted-foreground">Total Attempts</div>
          </div>
          <div className="border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">{userStats.streak}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </div>
          <div className="border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">{userStats.lastActive}</div>
            <div className="text-sm text-muted-foreground">Last Active</div>
          </div>
        </div>
        
        <h3 className="font-medium mb-3">Category Progress</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Arrays & Hashing</span>
              <span>1/20</span>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '5%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Strings</span>
              <span>0/15</span>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '0%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Linked Lists</span>
              <span>0/10</span>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '0%' }}></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressTab;
