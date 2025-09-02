import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import HorizontalTimeline from "@/components/HorizontalTimeline";

const CreateRoadmap = () => {
  const navigate = useNavigate();
  const [major, setMajor] = useState("");
  const [secondMajor, setSecondMajor] = useState("");
  const [minor, setMinor] = useState("");
  const [secondMinor, setSecondMinor] = useState("");
  const [year, setYear] = useState("");
  const [career, setCareer] = useState("");
  const [university, setUniversity] = useState("");
  const [preProfessional, setPreProfessional] = useState("");
  const [roadmapData, setRoadmapData] = useState(null);
  const [showTimeline, setShowTimeline] = useState(false);

  const majors = [
    "Accounting", "Aerospace Engineering", "African Studies", "Agricultural Business", "Agricultural Science", 
    "American Studies", "Anthropology", "Applied Mathematics", "Architecture", "Art", "Art History", 
    "Asian Studies", "Astronomy", "Athletic Training", "Biochemistry", "Bioengineering", "Biology", 
    "Biomedical Engineering", "Business Administration", "Business Analytics", "Chemical Engineering", 
    "Chemistry", "Civil Engineering", "Classics", "Communication", "Computer Engineering", 
    "Computer Science", "Construction Management", "Criminal Justice", "Dance", "Data Science", 
    "Economics", "Education", "Electrical Engineering", "English", "Environmental Engineering", 
    "Environmental Science", "Exercise Science", "Film Studies", "Finance", "Fine Arts", 
    "Foreign Languages", "Forensic Science", "Geography", "Geology", "Graphic Design", "Health Sciences", 
    "History", "Human Resources", "Industrial Engineering", "Information Systems", "International Business", 
    "International Relations", "Journalism", "Kinesiology", "Liberal Arts", "Linguistics", "Management", 
    "Marketing", "Materials Engineering", "Mathematics", "Mechanical Engineering", "Media Studies", 
    "Medicine", "Music", "Neuroscience", "Nursing", "Nutrition", "Operations Management", "Philosophy", 
    "Physics", "Political Science", "Pre-Dentistry", "Pre-Law", "Pre-Medicine", "Pre-Veterinary", 
    "Psychology", "Public Administration", "Public Health", "Religious Studies", "Social Work", 
    "Sociology", "Software Engineering", "Statistics", "Supply Chain Management", "Theater", 
    "Urban Planning", "Women's Studies"
  ];

  const minors = [
    "None", "Accounting", "Anthropology", "Art", "Art History", "Biology", "Business", "Chemistry", 
    "Communication", "Computer Science", "Creative Writing", "Criminal Justice", "Data Science", 
    "Economics", "Education", "Engineering", "English", "Environmental Studies", "Ethics", 
    "Film Studies", "Finance", "Foreign Languages", "Geography", "Geology", "Graphic Design", 
    "Health Sciences", "History", "Human Resources", "Information Systems", "International Business", 
    "Journalism", "Leadership", "Linguistics", "Management", "Marketing", "Mathematics", "Music", 
    "Philosophy", "Physics", "Political Science", "Psychology", "Public Administration", 
    "Public Health", "Religious Studies", "Social Media", "Sociology", "Statistics", "Theater", 
    "Women's Studies"
  ];

  const years = ["Freshman", "Sophomore", "Junior", "Senior"];

  const preProfessionalTracks = [
    "None", "Pre-Medicine", "Pre-Dentistry", "Pre-Veterinary", "Pre-Law", "Pre-Pharmacy", 
    "Pre-Physical Therapy", "Pre-Optometry", "Pre-Health", "Pre-Engineering"
  ];

  const careers = [
    "Software Engineer", "Product Manager", "Data Scientist", "Marketing Manager", "Financial Analyst", 
    "UX Designer", "Management Consultant", "Research Scientist", "Investment Banker", 
    "Digital Marketing Specialist", "Physician", "Dentist", "Veterinarian", "Lawyer", "Teacher", 
    "Nurse", "Physical Therapist", "Pharmacist", "Architect", "Civil Engineer", "Mechanical Engineer", 
    "Electrical Engineer", "Chemical Engineer", "Biomedical Engineer", "Environmental Scientist", 
    "Psychologist", "Social Worker", "Journalist", "Graphic Designer", "Web Developer", 
    "Mobile App Developer", "Cybersecurity Analyst", "Database Administrator", "Systems Analyst", 
    "Business Analyst", "Operations Manager", "Human Resources Manager", "Sales Manager", 
    "Account Manager", "Brand Manager", "Content Creator", "Social Media Manager", "SEO Specialist", 
    "Public Relations Specialist", "Event Coordinator", "Non-Profit Director", "Policy Analyst", 
    "Urban Planner", "Environmental Consultant", "Sustainability Specialist", "Healthcare Administrator"
  ];

  const universities = [
    "Harvard University", "Stanford University", "MIT", "Yale University", "Princeton University", 
    "University of California - Berkeley", "University of California - Los Angeles", 
    "University of Michigan", "University of Texas at Austin", "Georgia Institute of Technology", 
    "Carnegie Mellon University", "University of Illinois", "University of Washington", 
    "New York University", "University of Southern California", "Boston University", 
    "Northwestern University", "Duke University", "Vanderbilt University", "Rice University", 
    "Emory University", "University of Notre Dame", "Georgetown University", "University of Virginia", 
    "University of North Carolina", "University of Florida", "Florida State University", 
    "Arizona State University", "University of Arizona", "University of Colorado", 
    "University of Wisconsin", "Ohio State University", "Pennsylvania State University", 
    "Rutgers University", "University of Maryland", "Virginia Tech", "North Carolina State University", 
    "Clemson University", "University of Georgia", "Auburn University", "University of Alabama", 
    "University of Tennessee", "University of Kentucky", "Louisiana State University", 
    "University of Arkansas", "University of Oklahoma", "University of Kansas", "Iowa State University", 
    "University of Nebraska", "University of Missouri", "University of Minnesota", "Other"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (major && year && career && university) {
      const data = { 
        major, 
        secondMajor, 
        minor, 
        secondMinor, 
        year, 
        career, 
        university, 
        preProfessional 
      };
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
          <HorizontalTimeline roadmapData={roadmapData} />
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
            semester-by-semester plan with prioritized tasks to get you there.
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
                  <Label htmlFor="university" className="text-lg font-medium">University *</Label>
                  <Select value={university} onValueChange={setUniversity}>
                    <SelectTrigger className="h-12 text-lg">
                      <SelectValue placeholder="Select your university" />
                    </SelectTrigger>
                    <SelectContent>
                      {universities.map((u) => (
                        <SelectItem key={u} value={u}>{u}</SelectItem>
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
                  <Label htmlFor="major" className="text-lg font-medium">Primary Major *</Label>
                  <Select value={major} onValueChange={setMajor}>
                    <SelectTrigger className="h-12 text-lg">
                      <SelectValue placeholder="Select your primary major" />
                    </SelectTrigger>
                    <SelectContent>
                      {majors.map((m) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="secondMajor" className="text-lg font-medium">Second Major</Label>
                  <Select value={secondMajor} onValueChange={setSecondMajor}>
                    <SelectTrigger className="h-12 text-lg">
                      <SelectValue placeholder="Select second major (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {majors.map((m) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="minor" className="text-lg font-medium">Primary Minor</Label>
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
                  <Label htmlFor="secondMinor" className="text-lg font-medium">Second Minor</Label>
                  <Select value={secondMinor} onValueChange={setSecondMinor}>
                    <SelectTrigger className="h-12 text-lg">
                      <SelectValue placeholder="Select second minor (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {minors.map((m) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="preProfessional" className="text-lg font-medium">Pre-Professional Track</Label>
                  <Select value={preProfessional} onValueChange={setPreProfessional}>
                    <SelectTrigger className="h-12 text-lg">
                      <SelectValue placeholder="Select pre-professional track (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {preProfessionalTracks.map((p) => (
                        <SelectItem key={p} value={p}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="career" className="text-lg font-medium">Career Goal *</Label>
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
                  disabled={!major || !year || !career || !university}
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