
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, FileText, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const ResumeAnalysis = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [targetJob, setTargetJob] = useState('');
  
  // Mock analysis results - in a real app this would come from the AI backend
  const analysisResults = {
    score: 78,
    atsCompatibility: 'High',
    keywordMatch: '72%',
    improvements: [
      'Quantify your achievements with metrics and results',
      'Add more keywords related to cloud technologies',
      'Strengthen your professional summary',
      'Include a dedicated skills section'
    ],
    strengths: [
      'Well-organized experience section',
      'Clear job progression shown',
      'Education section is properly formatted',
      'Appropriate length and conciseness'
    ],
    missingKeywords: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Azure']
  };
  
  const handleResumeUpload = (e) => {
    e.preventDefault();
    // This would handle the file upload in a real app
    setResumeUploaded(true);
    toast({
      title: "Resume Uploaded",
      description: "Your resume has been successfully uploaded for AI analysis."
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
    
    // Simulate AI analysis time
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisComplete(true);
      toast({
        title: "Analysis Complete",
        description: "Your resume has been analyzed by our AI engine."
      });
    }, 3000);
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
          <h1 className="text-3xl font-medium mb-2">AI Resume Analyzer</h1>
          <p className="text-muted-foreground max-w-2xl">
            Our AI analyzes your resume against job descriptions, provides ATS compatibility scores, 
            and suggests targeted improvements.
          </p>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Resume Analysis</CardTitle>
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
                    <span className="font-medium">Resume_John_Smith.pdf uploaded successfully</span>
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
                    {analyzing ? 'AI Analyzing Resume...' : 'Analyze My Resume'}
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
                      <h4 className="font-medium mb-2">Suggested Improvements</h4>
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
                      <h4 className="font-medium mb-2">Resume Strengths</h4>
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
                        <p>• Avoid tables, images, and excessive formatting</p>
                        <p>• Use a single-column layout for better parsing</p>
                        <p>• Include exact keywords from the job description</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
                  <Button variant="outline">Download Analysis Report</Button>
                  <Button>Generate Optimized Resume</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>How Our AI Analyzes Your Resume</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <h3 className="font-medium mb-1">Natural Language Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI uses advanced NLP to extract skills, experiences, and achievements from your resume, 
                  understanding the context and relevance of each element.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <h3 className="font-medium mb-1">ATS Simulation</h3>
                <p className="text-sm text-muted-foreground">
                  We simulate how Applicant Tracking Systems will parse your resume, identifying potential
                  formatting issues that could prevent your resume from being properly read.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <h3 className="font-medium mb-1">Job Description Matching</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI compares your resume against thousands of job descriptions for your target role,
                  identifying key skills and qualifications that recruiters are looking for.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                4
              </div>
              <div>
                <h3 className="font-medium mb-1">Content Optimization</h3>
                <p className="text-sm text-muted-foreground">
                  We provide specific suggestions to improve your content, including better action verbs,
                  achievement quantification, and keyword placement for maximum impact.
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

export default ResumeAnalysis;
