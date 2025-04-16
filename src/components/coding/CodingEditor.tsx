
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, AlertCircle, Check } from 'lucide-react';

interface CodingEditorProps {
  code: string;
  onChange: (code: string) => void;
  onRun: () => void;
  isRunning: boolean;
}

const CodingEditor: React.FC<CodingEditorProps> = ({
  code,
  onChange,
  onRun,
  isRunning
}) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-muted p-2 border-b flex justify-between items-center">
        <span className="text-sm font-medium">JavaScript</span>
        <Button 
          onClick={onRun} 
          size="sm" 
          disabled={isRunning}
          className="flex items-center gap-1"
        >
          {isRunning ? (
            <>Running...</>
          ) : (
            <>
              <Play className="h-3 w-3" />
              Run Code
            </>
          )}
        </Button>
      </div>
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-[400px] bg-black text-white p-3 font-mono resize-none focus:outline-none"
        placeholder="// Write your code here"
      />
    </div>
  );
};

export default CodingEditor;
