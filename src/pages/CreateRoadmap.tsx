import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import Timeline from "@/components/Timeline";

const CreateRoadmap = () => {
  const navigate = useNavigate();
  const [major, setMajor] = useState("");
  const [minor, setMinor] = useState("");
  const [year, setYear] = useState("");
  const [career, setCareer] = useState("");
  const [roadmapData, setRoadmapData] = useState(null);
  const [showTimeline, setShowTimeline] = useState(false);

  const majors = [
    "Computer Science", "Business Administration", "Psychology", "Engineering", 
    "Biology", "English", "Economics", "Marketing", "Political Science", "Chemistry"
  ];

  const minors = [
    "None", "Data Science", "Creative Writing", "Philosophy", "Statistics", 
    "Art History", "Music", "Foreign Language", "Environmental Studies", "Theater"
  ];

  const years = ["Freshman", "Sophomore", "Junior", "Senior"];

  const careers = [
    "Software Engineer", "Product Manager", "Data Scientist", "Marketing Manager",
    "Financial Analyst", "UX Designer", "Management Consultant", "Research Scientist",
    "Investment Banker", "Digital Marketing Specialist"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (major && year && career) {
      const data = { major, minor, year, career };
      setRoadmapData(data);
      setShowTimeline(true);
    }
  };

  if (showTimeline && roadmapData) {
    return (
      <div className="pt-20 min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <Button 
              variant="outline" 
              onClick={() => setShowTimeline(false)}
              className="mb-6"
            >
              ← Back to Form
            </Button>
          </div>
          <Timeline roadmapData={roadmapData} />
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Create Your Roadmap
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tell us about your academic path and career goals, and we'll create a detailed 
            semester-by-semester plan to get you there.
          </p>
        </div>

        <Card className="bg-card/90 backdrop-blur-sm border-border/30 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Let's Get Started</CardTitle>
            <CardDescription className="text-lg">
              Fill out the information below to generate your custom career roadmap
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="major" className="text-lg font-medium">Major *</Label>
                  <Select value={major} onValueChange={setMajor}>
                    <SelectTrigger className="h-12 text-lg">
                      <SelectValue placeholder="Select your major" />
                    </SelectTrigger>
                    <SelectContent>
                      {majors.map((m) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="minor" className="text-lg font-medium">Minor</Label>
                  <Select value={minor} onValueChange={setMinor}>
                    <SelectTrigger className="h-12 text-lg">
                      <SelectValue placeholder="Select your minor (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {minors.map((m) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="year" className="text-lg font-medium">Current Year *</Label>
                  <Select value={year} onValueChange={setYear}>
                    <SelectTrigger className="h-12 text-lg">
                      <SelectValue placeholder="Select your current year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((y) => (
                        <SelectItem key={y} value={y}>{y}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="career" className="text-lg font-medium">Dream Career *</Label>
                  <Select value={career} onValueChange={setCareer}>
                    <SelectTrigger className="h-12 text-lg">
                      <SelectValue placeholder="Select your target career" />
                    </SelectTrigger>
                    <SelectContent>
                      {careers.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-8">
                <Button 
                  type="submit" 
                  variant="accent" 
                  size="lg" 
                  className="w-full text-xl py-6 h-auto font-semibold"
                  disabled={!major || !year || !career}
                >
                  Generate My Career Roadmap
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateRoadmap;