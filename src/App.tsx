import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import CreateRoadmap from "./pages/CreateRoadmap";
import ConnectExperts from "./pages/ConnectExperts";
import FeaturesPage from "./pages/FeaturesPage";
import NotFound from "./pages/NotFound";

import SemesterDetail from "./pages/SemesterDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/create-roadmap" element={<CreateRoadmap />} />
          <Route path="/connect-experts" element={<ConnectExperts />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/semester/:semesterType" element={<SemesterDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
