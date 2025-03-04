
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Check, AlertTriangle, Download, FileText, Upload } from 'lucide-react';

const ResumeOptimization = () => {
  const { toast } = useToast();
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [targetJob, setTargetJob] = useState('');
  
  const handleResumeUpload = (e) => {
    e.preventDefault();
    // This would handle the file upload in a real app
    setResumeUploaded(true);
    toast({
      title: "Resume Uploaded",
      description: "Your resume has been successfully uploaded."
    });
  };
  
  const handleResumeAnalysis = () => {
    if (!targetJob.trim()) {
      toast({
        title: "Target Job Required",
        description: "Please enter a target job title for better analysis.",
        variant: "destructive"
      });
      return;
    }
    
    setAnalyzing(true);
    
    // Simulate analysis time
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisComplete(true);
      toast({
        title: "Analysis Complete",
        description: "Your resume has been analyzed by our AI."
      });
    }, 3000);
  };

  // Mock analysis data
  const analysisResults = {
    score: 72,
    atsCompatibility: 'Medium',
    keywordMatch: '65%',
    improvements: [
      'Add more quantifiable achievements',
      'Strengthen your skills section with relevant technologies',
      'Address employment gap between 2020-2021',
      'Include projects that demonstrate your React expertise'
    ],
    strengths: [
      'Clear work history with progression',
      'Good education section format',
      'Contact information is complete and professional',
      'Experience is relevant to target role'
    ],
    missingKeywords: ['React Native', 'CI/CD', 'System Design', 'TypeScript']
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Resume Optimization</CardTitle>
          <CardDescription>
            Get AI-powered feedback to improve your resume and stand out to recruiters
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!resumeUploaded ? (
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Upload Your Resume</h3>
              <p className="text-sm text-muted-foreground text-center mb-6 max-w-md">
                Upload your current resume in PDF or DOCX format to get AI-powered feedback and optimization suggestions.
              </p>
              <div className="flex gap-4">
                <Button className="gap-2" onClick={handleResumeUpload}>
                  <Upload className="h-4 w-4" />
                  Upload Resume
                </Button>
                <Button variant="outline">Use Sample Resume</Button>
              </div>
            </div>
          ) : !analysisComplete ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="font-medium">Resume_John_Doe.pdf uploaded successfully</span>
                </div>
                <Button variant="ghost" size="sm" className="h-8 gap-1">
                  <Upload className="h-3 w-3" />
                  Replace
                </Button>
              </div>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="target-job">Target Job Title</Label>
                  <Input 
                    id="target-job" 
                    placeholder="e.g., Senior Frontend Developer"
                    value={targetJob}
                    onChange={(e) => setTargetJob(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Specifying a target job helps our AI provide more relevant recommendations
                  </p>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={handleResumeAnalysis}
                  disabled={analyzing}
                >
                  {analyzing ? 'Analyzing Resume...' : 'Analyze My Resume'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Resume Analysis Results</h3>
                  <p className="text-sm text-muted-foreground">
                    For: {targetJob}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold">{analysisResults.score}</div>
                    <div className="text-xs text-muted-foreground">Overall Score</div>
                  </div>
                  <div className="w-px h-10 bg-muted"></div>
                  <div className="flex flex-col items-center">
                    <div className="text-lg font-medium">{analysisResults.atsCompatibility}</div>
                    <div className="text-xs text-muted-foreground">ATS Compatibility</div>
                  </div>
                  <div className="w-px h-10 bg-muted"></div>
                  <div className="flex flex-col items-center">
                    <div className="text-lg font-medium">{analysisResults.keywordMatch}</div>
                    <div className="text-xs text-muted-foreground">Keyword Match</div>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      Suggested Improvements
                    </h4>
                    <ul className="space-y-2">
                      {analysisResults.improvements.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="min-w-4 h-4 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs mt-0.5">
                            {index + 1}
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-2">
                    <h4 className="font-medium flex items-center gap-2 mb-2">
                      <Check className="h-4 w-4 text-green-500" />
                      Resume Strengths
                    </h4>
                    <ul className="space-y-2">
                      {analysisResults.strengths.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="min-w-4 h-4 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-xs mt-0.5">
                            ✓
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Missing Keywords</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Consider adding these keywords that are often found in {targetJob} job descriptions:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {analysisResults.missingKeywords.map((keyword, index) => (
                        <div key={index} className="bg-secondary px-3 py-1 rounded-full text-xs">
                          {keyword}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-2">
                    <h4 className="font-medium">ATS Optimization Tips</h4>
                    <div className="p-3 bg-muted rounded-lg text-sm space-y-2">
                      <p>• Use standard section headers (Experience, Education, Skills)</p>
                      <p>• Avoid excessive formatting and tables</p>
                      <p>• Use a clean, single-column layout</p>
                      <p>• Include exact keywords from the job description</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download Analysis
                </Button>
                <Button>Generate Optimized Resume</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {analysisComplete && (
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Recommendations</CardTitle>
            <CardDescription>
              Projects to consider adding to showcase your skills
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-1">E-commerce Product Page</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Build a responsive product page with filtering, sorting, and cart functionality using React and a state management library.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-secondary px-2 py-1 rounded">React</span>
                  <span className="text-xs bg-secondary px-2 py-1 rounded">Redux</span>
                  <span className="text-xs bg-secondary px-2 py-1 rounded">Responsive Design</span>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-1">Dashboard with Data Visualization</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Create an interactive dashboard with charts, graphs, and filters to showcase your data visualization skills.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-secondary px-2 py-1 rounded">D3.js</span>
                  <span className="text-xs bg-secondary px-2 py-1 rounded">Recharts</span>
                  <span className="text-xs bg-secondary px-2 py-1 rounded">Data Processing</span>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-1">Authentication System</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Implement a secure authentication system with social login, password reset, and protected routes.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-secondary px-2 py-1 rounded">JWT</span>
                  <span className="text-xs bg-secondary px-2 py-1 rounded">OAuth</span>
                  <span className="text-xs bg-secondary px-2 py-1 rounded">Security</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResumeOptimization;
