import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select as UISelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import HorizontalTimeline from "@/components/HorizontalTimeline";
import FutureGoalSelector from "@/components/FutureGoalSelector";
import OpportunitiesHub from "@/components/OpportunitiesHub";
import AdaptivePlanningEngine from "@/components/AdaptivePlanningEngine";
import ReactSelect from 'react-select';

const CreateRoadmap = () => {
  const navigate = useNavigate();
  const [majors, setMajors] = useState([]);
  const [minors, setMinors] = useState([]);
  const [year, setYear] = useState("");
  const [career, setCareer] = useState("");
  const [university, setUniversity] = useState("");
  const [preProfessional, setPreProfessional] = useState("");
  const [futureGoal, setFutureGoal] = useState("");
  const [graduateDegree, setGraduateDegree] = useState("");
  const [roadmapData, setRoadmapData] = useState(null);
  const [showTimeline, setShowTimeline] = useState(false);
  const [activePhase, setActivePhase] = useState<"roadmap" | "opportunities" | "adaptive">("roadmap");

  const majorsList = [
    "Accounting", "Aerospace Engineering", "African Studies", "Agricultural Business", 
    "Agricultural Science", "American Studies", "Anthropology", "Applied Mathematics", 
    "Architecture", "Art", "Art History", "Asian Studies", "Astronomy", "Athletic Training",
    "Biochemistry", "Bioengineering", "Biology", "Biomedical Engineering", "Business Administration", 
    "Business Analytics", "Chemical Engineering", "Chemistry", "Civil Engineering", "Classics", 
    "Communication", "Computer Engineering", "Computer Science", "Construction Management", 
    "Criminal Justice", "Cybersecurity", "Dance", "Data Science", "Digital Marketing",
    "Economics", "Education", "Electrical Engineering", "English", "Environmental Engineering", 
    "Environmental Science", "Exercise Science", "Film Studies", "Finance", "Financial Engineering",
    "Fine Arts", "Foreign Languages", "Forensic Science", "Geography", "Geology", 
    "Graphic Design", "Health Sciences", "History", "Human Resources", "Industrial Engineering", 
    "Information Systems", "Information Technology", "International Business", "International Relations", 
    "Journalism", "Kinesiology", "Liberal Arts", "Linguistics", "Management", "Marketing", 
    "Materials Engineering", "Mathematics", "Mechanical Engineering", "Media Studies", 
    "Medicine", "Music", "Neuroscience", "Nursing", "Nutrition", "Operations Management", 
    "Philosophy", "Physics", "Political Science", "Pre-Dentistry", "Pre-Law", "Pre-Medicine", 
    "Pre-Veterinary", "Psychology", "Public Administration", "Public Health", "Quantitative Finance",
    "Religious Studies", "Social Work", "Sociology", "Software Engineering", "Statistics", 
    "Supply Chain Management", "Theater", "Urban Planning", "Web Development", "Women's Studies"
  ].sort();

  const minorsList = [
    "Accounting", "Anthropology", "Art", "Art History", "Biology", "Business", "Chemistry", 
    "Communication", "Computer Science", "Creative Writing", "Criminal Justice", "Cybersecurity",
    "Data Science", "Digital Marketing", "Economics", "Education", "Engineering", "English", 
    "Environmental Studies", "Ethics", "Film Studies", "Finance", "Foreign Languages", 
    "Geography", "Geology", "Graphic Design", "Health Sciences", "History", "Human Resources", 
    "Information Systems", "International Business", "Journalism", "Leadership", "Linguistics", 
    "Management", "Marketing", "Mathematics", "Music", "Philosophy", "Physics", 
    "Political Science", "Psychology", "Public Administration", "Public Health", 
    "Quantitative Analysis", "Religious Studies", "Social Media", "Sociology", 
    "Statistics", "Theater", "Web Development", "Women's Studies"
  ].sort();

  const years = ["Freshman", "Sophomore", "Junior", "Senior"];

  const preProfessionalTracks = [
    "None", "Pre-Medicine", "Pre-Dentistry", "Pre-Veterinary", "Pre-Law", "Pre-Pharmacy", 
    "Pre-Physical Therapy", "Pre-Optometry", "Pre-Health", "Pre-Engineering"
  ];

  const careersList = [
    "Account Manager", "Aerospace Engineer", "AI Engineer", "Architect", "Biomedical Engineer", 
    "Brand Manager", "Business Analyst", "Chemical Engineer", "Civil Engineer", 
    "Content Creator", "Cybersecurity Analyst", "Data Scientist", "Database Administrator", 
    "Dentist", "Digital Marketing Specialist", "Electrical Engineer", "Environmental Consultant", 
    "Environmental Scientist", "Event Coordinator", "Financial Analyst", "Graphic Designer", 
    "Healthcare Administrator", "Human Resources Manager", "Investment Banker", "Journalist", 
    "Lawyer", "Management Consultant", "Marketing Manager", "Mechanical Engineer", 
    "Mobile App Developer", "Non-Profit Director", "Nurse", "Operations Manager", 
    "Pharmacist", "Physical Therapist", "Physician", "Policy Analyst", "Product Manager", 
    "Psychologist", "Public Relations Specialist", "Quantitative Analyst", "Research Scientist", 
    "Sales Manager", "SEO Specialist", "Social Media Manager", "Social Worker", 
    "Software Engineer", "Sustainability Specialist", "Systems Analyst", "Teacher", 
    "UX Designer", "Urban Planner", "Veterinarian", "Web Developer"
  ].sort();

  const universitiesList = [
    "Arizona State University", "Auburn University", "Boston University", "Carnegie Mellon University", 
    "Clemson University", "Duke University", "Emory University", "Florida State University", 
    "Georgetown University", "Georgia Institute of Technology", "Harvard University", 
    "Iowa State University", "Louisiana State University", "MIT", "New York University", 
    "North Carolina State University", "Northwestern University", "Ohio State University", 
    "Pennsylvania State University", "Princeton University", "Rice University", 
    "Rutgers University", "Stanford University", "University of Alabama", "University of Arizona", 
    "University of Arkansas", "University of California - Berkeley", "University of California - Los Angeles", 
    "University of Colorado", "University of Florida", "University of Georgia", 
    "University of Illinois", "University of Kansas", "University of Kentucky", 
    "University of Maryland", "University of Michigan", "University of Minnesota", 
    "University of Missouri", "University of Nebraska", "University of North Carolina", 
    "University of Notre Dame", "University of Oklahoma", "University of Southern California", 
    "University of Tennessee", "University of Texas at Austin", "University of Virginia", 
    "University of Washington", "University of Wisconsin", "Vanderbilt University", 
    "Virginia Tech", "Yale University", "Other"
  ].sort();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (majors.length > 0 && year && career && university) {
      const data = { 
        majors, 
        minors, 
        year, 
        career, 
        university, 
        preProfessional,
        futureGoal,
        graduateDegree
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
            
            {/* Phase Navigation */}
            <div className="flex justify-center gap-2 mb-6">
              <Button
                variant={activePhase === "roadmap" ? "default" : "outline"}
                onClick={() => setActivePhase("roadmap")}
                size="sm"
              >
                Roadmap
              </Button>
              <Button
                variant={activePhase === "opportunities" ? "default" : "outline"}
                onClick={() => setActivePhase("opportunities")}
                size="sm"
              >
                Opportunities Hub
              </Button>
              <Button
                variant={activePhase === "adaptive" ? "default" : "outline"}
                onClick={() => setActivePhase("adaptive")}
                size="sm"
              >
                Adaptive Planning
              </Button>
            </div>
          </div>
          
          {activePhase === "roadmap" && <HorizontalTimeline roadmapData={roadmapData} />}
          {activePhase === "opportunities" && <OpportunitiesHub roadmapData={roadmapData} />}
          {activePhase === "adaptive" && <AdaptivePlanningEngine roadmapData={roadmapData} />}
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
                  <ReactSelect
                    value={university ? { value: university, label: university } : null}
                    onChange={(selectedOption) => 
                      setUniversity(selectedOption ? selectedOption.value : "")
                    }
                    options={universitiesList.map(uni => ({ value: uni, label: uni }))}
                    placeholder="Search or select your university"
                    isSearchable={true}
                    className="text-lg"
                    styles={{
                      control: (base) => ({
                        ...base,
                        minHeight: '48px',
                        fontSize: '18px',
                        backgroundColor: 'hsl(var(--background))',
                        borderColor: 'hsl(var(--border))',
                        '&:hover': {
                          borderColor: 'hsl(var(--border))'
                        }
                      }),
                      menu: (base) => ({
                        ...base,
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused ? 'hsl(var(--muted))' : 'hsl(var(--background))',
                        color: 'hsl(var(--foreground))',
                        '&:hover': {
                          backgroundColor: 'hsl(var(--muted))'
                        }
                      }),
                      singleValue: (base) => ({
                        ...base,
                        color: 'hsl(var(--foreground))',
                      }),
                      placeholder: (base) => ({
                        ...base,
                        color: 'hsl(var(--muted-foreground))',
                      })
                    }}
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="year" className="text-lg font-medium">Current Year *</Label>
                  <UISelect value={year} onValueChange={setYear}>
                    <SelectTrigger className="h-12 text-lg">
                      <SelectValue placeholder="Select your current year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((y) => (
                        <SelectItem key={y} value={y}>{y}</SelectItem>
                      ))}
                    </SelectContent>
                   </UISelect>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="majors" className="text-lg font-medium">Majors *</Label>
                  <ReactSelect
                    isMulti
                    value={majors.map(major => ({ value: major, label: major }))}
                    onChange={(selectedOptions) => 
                      setMajors(selectedOptions ? selectedOptions.map(option => option.value) : [])
                    }
                    options={majorsList.map(major => ({ value: major, label: major }))}
                    placeholder="Select your majors"
                    className="text-lg"
                    styles={{
                      control: (base) => ({
                        ...base,
                        minHeight: '48px',
                        fontSize: '18px',
                        backgroundColor: 'hsl(var(--background))',
                        borderColor: 'hsl(var(--border))',
                        '&:hover': {
                          borderColor: 'hsl(var(--border))'
                        }
                      }),
                      menu: (base) => ({
                        ...base,
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused ? 'hsl(var(--muted))' : 'hsl(var(--background))',
                        color: 'hsl(var(--foreground))',
                        '&:hover': {
                          backgroundColor: 'hsl(var(--muted))'
                        }
                      }),
                      multiValue: (base) => ({
                        ...base,
                        backgroundColor: 'hsl(var(--primary))',
                      }),
                      multiValueLabel: (base) => ({
                        ...base,
                        color: 'hsl(var(--primary-foreground))',
                      }),
                      multiValueRemove: (base) => ({
                        ...base,
                        color: 'hsl(var(--primary-foreground))',
                        '&:hover': {
                          backgroundColor: 'hsl(var(--destructive))',
                          color: 'hsl(var(--destructive-foreground))',
                        }
                      })
                    }}
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="minors" className="text-lg font-medium">Minors</Label>
                  <ReactSelect
                    isMulti
                    value={minors.map(minor => ({ value: minor, label: minor }))}
                    onChange={(selectedOptions) => 
                      setMinors(selectedOptions ? selectedOptions.map(option => option.value) : [])
                    }
                    options={minorsList.map(minor => ({ value: minor, label: minor }))}
                    placeholder="Select your minors (optional)"
                    className="text-lg"
                    styles={{
                      control: (base) => ({
                        ...base,
                        minHeight: '48px',
                        fontSize: '18px',
                        backgroundColor: 'hsl(var(--background))',
                        borderColor: 'hsl(var(--border))',
                        '&:hover': {
                          borderColor: 'hsl(var(--border))'
                        }
                      }),
                      menu: (base) => ({
                        ...base,
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused ? 'hsl(var(--muted))' : 'hsl(var(--background))',
                        color: 'hsl(var(--foreground))',
                        '&:hover': {
                          backgroundColor: 'hsl(var(--muted))'
                        }
                      }),
                      multiValue: (base) => ({
                        ...base,
                        backgroundColor: 'hsl(var(--secondary))',
                      }),
                      multiValueLabel: (base) => ({
                        ...base,
                        color: 'hsl(var(--secondary-foreground))',
                      }),
                      multiValueRemove: (base) => ({
                        ...base,
                        color: 'hsl(var(--secondary-foreground))',
                        '&:hover': {
                          backgroundColor: 'hsl(var(--destructive))',
                          color: 'hsl(var(--destructive-foreground))',
                        }
                      })
                    }}
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="preProfessional" className="text-lg font-medium">Pre-Professional Track</Label>
                  <UISelect value={preProfessional} onValueChange={setPreProfessional}>
                    <SelectTrigger className="h-12 text-lg">
                      <SelectValue placeholder="Select pre-professional track (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {preProfessionalTracks.map((p) => (
                        <SelectItem key={p} value={p}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                   </UISelect>
                 </div>

                 <div className="space-y-3">
                   <Label htmlFor="career" className="text-lg font-medium">Career Goal *</Label>
                  <UISelect value={career} onValueChange={setCareer}>
                    <SelectTrigger className="h-12 text-lg">
                      <SelectValue placeholder="Select your target career" />
                    </SelectTrigger>
                    <SelectContent>
                      {careersList.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                   </UISelect>
                 </div>
               </div>

               <div className="border-t border-border/50 pt-8">
                 <FutureGoalSelector
                   futureGoal={futureGoal}
                   setFutureGoal={setFutureGoal}
                   graduateDegree={graduateDegree}
                   setGraduateDegree={setGraduateDegree}
                 />
               </div>

               <div className="pt-8">
                <Button 
                  type="submit" 
                  variant="accent" 
                  size="lg" 
                  className="w-full text-xl py-6 h-auto font-semibold"
                  disabled={majors.length === 0 || !year || !career || !university}
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