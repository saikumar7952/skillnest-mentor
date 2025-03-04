
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Briefcase, MapPin, Building, DollarSign, BookOpen, Target, Users } from 'lucide-react';

const JobMatching = () => {
  const [jobSearchQuery, setJobSearchQuery] = useState('');
  
  // Mock job recommendations data
  const recommendedJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechInnovate",
      location: "San Francisco, CA (Remote)",
      salary: "$120,000 - $150,000",
      matchScore: 92,
      skills: ["React", "TypeScript", "Redux", "Responsive Design"],
      posted: "2 days ago",
      applicants: 45
    },
    {
      id: 2,
      title: "UI Engineer",
      company: "DesignSystems Inc.",
      location: "New York, NY (Hybrid)",
      salary: "$110,000 - $135,000",
      matchScore: 88,
      skills: ["React", "CSS", "Design Systems", "Accessibility"],
      posted: "1 week ago",
      applicants: 76
    },
    {
      id: 3,
      title: "Frontend Team Lead",
      company: "SaaS Platform",
      location: "Remote",
      salary: "$140,000 - $180,000",
      matchScore: 85,
      skills: ["React", "Team Management", "JavaScript", "Architecture"],
      posted: "3 days ago",
      applicants: 38
    },
    {
      id: 4,
      title: "React Developer",
      company: "StartupX",
      location: "Austin, TX (On-site)",
      salary: "$90,000 - $120,000",
      matchScore: 82,
      skills: ["React", "Node.js", "MongoDB", "GraphQL"],
      posted: "Just now",
      applicants: 12
    }
  ];
  
  // Mock networking suggestions
  const networkingSuggestions = [
    {
      id: 1,
      name: "React Developer Community",
      type: "Online Community",
      members: "15,000+",
      description: "Connect with React developers worldwide to share knowledge and job opportunities."
    },
    {
      id: 2,
      name: "TechConf 2023",
      type: "Conference",
      date: "June 15-17, 2023",
      description: "Annual tech conference featuring sessions on frontend development and career growth."
    },
    {
      id: 3,
      name: "Frontend Masters Meetup",
      type: "Local Meetup",
      location: "San Francisco, CA",
      description: "Monthly meetup for frontend developers to network and learn from industry experts."
    }
  ];
  
  // Mock job application tracking
  const applicationTracking = [
    {
      id: 1,
      company: "WebTech Solutions",
      position: "Senior Frontend Developer",
      applied: "April 25, 2023",
      status: "Interview Scheduled",
      nextStep: "Technical Interview on May 10"
    },
    {
      id: 2,
      company: "DataVisual Inc.",
      position: "UI Engineer",
      applied: "April 20, 2023",
      status: "Application Reviewed",
      nextStep: "Waiting for callback"
    },
    {
      id: 3,
      company: "InnovateApp",
      position: "React Developer",
      applied: "April 15, 2023",
      status: "Rejected",
      nextStep: "N/A"
    }
  ];
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'Interview Scheduled':
        return 'text-green-600 bg-green-50';
      case 'Application Reviewed':
        return 'text-blue-600 bg-blue-50';
      case 'Rejected':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Job Matching</CardTitle>
          <CardDescription>
            AI-recommended job opportunities based on your skills and career goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <Label htmlFor="job-search" className="sr-only">Search Jobs</Label>
                <Input 
                  id="job-search" 
                  placeholder="Search for jobs, companies, or skills..." 
                  value={jobSearchQuery}
                  onChange={(e) => setJobSearchQuery(e.target.value)}
                />
              </div>
              <Button>Search</Button>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3">Recommended for You</h3>
              <div className="space-y-4">
                {recommendedJobs.map((job) => (
                  <div key={job.id} className="border rounded-lg overflow-hidden">
                    <div className="flex justify-between p-4">
                      <div>
                        <h4 className="font-medium mb-1">{job.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Building className="h-3 w-3" />
                          <span>{job.company}</span>
                          <span>•</span>
                          <MapPin className="h-3 w-3" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {job.matchScore}% Match
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {job.posted} • {job.applicants} applicants
                        </div>
                      </div>
                    </div>
                    
                    <div className="px-4 pb-4">
                      <div className="flex items-center gap-1 text-sm mb-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>{job.salary}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {job.skills.map((skill, index) => (
                          <span 
                            key={index} 
                            className="inline-block px-2 py-1 text-xs bg-secondary rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">Save Job</Button>
                        <Button size="sm">Apply Now</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <Button variant="outline">View More Jobs</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Networking Strategies</CardTitle>
            <CardDescription>
              Connect with industry professionals to enhance your job search
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {networkingSuggestions.map((item) => (
                <div key={item.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{item.name}</h3>
                    <span className="text-xs bg-secondary px-2 py-1 rounded">{item.type}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {item.members && (
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {item.members}
                      </span>
                    )}
                    {item.date && (
                      <span className="flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        {item.date}
                      </span>
                    )}
                    {item.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {item.location}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              
              <div className="text-center pt-2">
                <Button variant="outline" size="sm">Find More Networking Opportunities</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Application Tracking</CardTitle>
            <CardDescription>
              Monitor your job applications and next steps
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applicationTracking.map((application) => (
                <div key={application.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{application.position}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(application.status)}`}>
                      {application.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm mb-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>{application.company}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Applied: {application.applied}</span>
                    <span>Next: {application.nextStep}</span>
                  </div>
                </div>
              ))}
              
              <div className="text-center pt-2">
                <Button variant="outline" size="sm">Track New Application</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Job Application Strategy</CardTitle>
          <CardDescription>
            AI-powered recommendations to improve your job search success
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex flex-col items-center text-center">
                <BookOpen className="h-10 w-10 text-primary mb-3" />
                <h3 className="font-medium mb-1">Keywords Optimization</h3>
                <p className="text-sm text-muted-foreground">
                  Customize your resume with keywords from each job description before applying.
                </p>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex flex-col items-center text-center">
                <Target className="h-10 w-10 text-primary mb-3" />
                <h3 className="font-medium mb-1">Application Timing</h3>
                <p className="text-sm text-muted-foreground">
                  Apply within 48 hours of job posting for 34% higher interview chance.
                </p>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex flex-col items-center text-center">
                <Users className="h-10 w-10 text-primary mb-3" />
                <h3 className="font-medium mb-1">Follow-up Strategy</h3>
                <p className="text-sm text-muted-foreground">
                  Send a follow-up email one week after applying to increase visibility by 22%.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobMatching;
