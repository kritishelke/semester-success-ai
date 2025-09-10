// src/pages/Index.tsx
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import RoadmapForm from "@/components/RoadmapForm";

const Index = () => {
  const handleGenerateRoadmap = (data: any) => {
    // Handle roadmap generation
  };

  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <RoadmapForm onGenerateRoadmap={handleGenerateRoadmap} />
    </div>
  );
};

export default Index;

