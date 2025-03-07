
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import CareerRoadmap from "./pages/CareerRoadmap";
import Payment from "./pages/Payment";
import CodingChallenges from "./pages/CodingChallenges";
import MockInterviews from "./pages/MockInterviews";
import ResumeAnalysis from "./pages/ResumeAnalysis";
import LearningPath from "./pages/LearningPath";
import AIAgents from "./pages/AIAgents";
import DoubtSolver from "./pages/DoubtSolver";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/roadmap" element={<CareerRoadmap />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/coding-challenges" element={<CodingChallenges />} />
            <Route path="/mock-interviews" element={<MockInterviews />} />
            <Route path="/resume-analysis" element={<ResumeAnalysis />} />
            <Route path="/learning-path" element={<LearningPath />} />
            <Route path="/ai-agents" element={<AIAgents />} />
            <Route path="/doubt-solver" element={<DoubtSolver />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
