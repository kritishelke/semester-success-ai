import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const RoadmapForm = ({ onGenerateRoadmap }: { onGenerateRoadmap: (data: any) => void }) => {
  const [major, setMajor] = useState("");
  const [minor, setMinor] = useState("");
  const [year, setYear] = useState("");
  const [career, setCareer] = useState("");

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
      onGenerateRoadmap({ major, minor, year, career });
    }
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Build Your Personalized Roadmap
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tell us about your academic path and career goals, and we'll create a detailed 
            semester-by-semester plan to get you there.
          </p>
        </div>

        <Card className="bg-card/80 backdrop-blur-sm border-border/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Get Started</CardTitle>
            <CardDescription className="text-center">
              Fill out the information below to generate your custom career roadmap
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="major">Major *</Label>
                  <Select value={major} onValueChange={setMajor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your major" />
                    </SelectTrigger>
                    <SelectContent>
                      {majors.map((m) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minor">Minor</Label>
                  <Select value={minor} onValueChange={setMinor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your minor (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {minors.map((m) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Current Year *</Label>
                  <Select value={year} onValueChange={setYear}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your current year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((y) => (
                        <SelectItem key={y} value={y}>{y}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="career">Dream Career *</Label>
                  <Select value={career} onValueChange={setCareer}>
                    <SelectTrigger>
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

              <div className="pt-6">
                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full text-lg py-4 h-auto"
                  disabled={!major || !year || !career}
                >
                  Generate My Career Roadmap
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RoadmapForm;