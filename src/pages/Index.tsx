import { useState } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import RoadmapForm from "@/components/RoadmapForm";
import Timeline from "@/components/Timeline";

const Index = () => {
  const [roadmapData, setRoadmapData] = useState(null);
  const [showTimeline, setShowTimeline] = useState(false);

  const handleGenerateRoadmap = (data: any) => {
    setRoadmapData(data);
    setShowTimeline(true);
    // Smooth scroll to timeline
    setTimeout(() => {
      document.getElementById('timeline')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 100);
  };

  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <RoadmapForm onGenerateRoadmap={handleGenerateRoadmap} />
      {showTimeline && (
        <div id="timeline">
          <Timeline roadmapData={roadmapData} />
        </div>
      )}
    </div>
  );
};

export default Index;
