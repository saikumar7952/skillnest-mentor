
import React from 'react';
import { Check, X } from 'lucide-react';

interface TestResult {
  test: string;
  expected: string;
  actual: string;
  passed: boolean;
}

interface TestResultsProps {
  results: any;
  attemptStatus: 'idle' | 'running' | 'passed' | 'failed';
}

const TestResults: React.FC<TestResultsProps> = ({ results, attemptStatus }) => {
  if (!results) return null;

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-muted p-2 border-b flex items-center gap-2">
        <span className={attemptStatus === 'passed' ? 'text-green-600' : 'text-red-600'}>
          {attemptStatus === 'passed' ? (
            <Check className="h-4 w-4 inline" />
          ) : (
            <X className="h-4 w-4 inline" />
          )}
        </span>
        <span className="text-sm font-medium">
          {attemptStatus === 'passed' ? 'All Tests Passed' : 'Tests Failed'}
        </span>
      </div>
      <div className="p-4 space-y-2">
        {results.error ? (
          <div className="text-red-600">{results.error}</div>
        ) : (
          results.results.map((result: TestResult, index: number) => (
            <div key={index} className="border p-2 rounded">
              <div className="flex items-center gap-2">
                {result.passed ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <X className="h-4 w-4 text-red-600" />
                )}
                <span className="font-mono text-sm">{result.test}</span>
              </div>
              {!result.passed && (
                <div className="mt-1 ml-6 text-sm">
                  <span className="text-muted-foreground">Expected: </span>
                  <span className="font-mono">{result.expected}</span>
                  <span className="text-muted-foreground ml-2">Got: </span>
                  <span className="font-mono">{result.actual}</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TestResults;
