import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { UserCheck, Target, Calendar, TrendingUp } from "lucide-react";

const HowItWorks = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: UserCheck,
      title: "Tell Us About You",
      description: "Share your major, minor, current year, and dream career. Takes less than 2 minutes."
    },
    {
      icon: Target,
      title: "AI Creates Your Roadmap",
      description: "Our AI analyzes thousands of successful career paths to create your personalized plan."
    },
    {
      icon: Calendar,
      title: "Follow Semester Plans",
      description: "Get specific tasks for each semester: courses, skills, internships, and networking."
    },
    {
      icon: TrendingUp,
      title: "Track Your Progress",
      description: "Mark completed tasks and watch your career readiness score improve over time."
    }
  ];

  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            How CareerPath Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From confused college student to career-ready graduate in 4 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {steps.map((step, index) => (
            <Card key={index} className="bg-card/80 backdrop-blur-sm border-border/20 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                    <span className="text-accent font-bold">{index + 1}</span>
                  </div>
                </div>
                <CardTitle className="text-2xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg text-muted-foreground">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Example Timeline Preview */}
        <div className="bg-card/50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Example: Computer Science → Software Engineer</h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-background/50 rounded-lg">
              <div className="w-4 h-4 bg-primary rounded-full"></div>
              <div>
                <div className="font-semibold text-foreground">Freshman Fall</div>
                <div className="text-muted-foreground">Complete intro CS courses, join coding club, start building GitHub</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-background/50 rounded-lg">
              <div className="w-4 h-4 bg-secondary rounded-full"></div>
              <div>
                <div className="font-semibold text-foreground">Sophomore Spring</div>
                <div className="text-muted-foreground">Apply for summer internships, learn web development, create portfolio</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-background/50 rounded-lg">
              <div className="w-4 h-4 bg-accent rounded-full"></div>
              <div>
                <div className="font-semibold text-foreground">Junior Year</div>
                <div className="text-muted-foreground">Complete technical internship, contribute to open source, prepare for interviews</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of students who've successfully navigated their career path with our guidance.
          </p>
          <Button 
            variant="accent" 
            size="lg" 
            className="text-lg px-8 py-4 h-auto"
            onClick={() => navigate("/create-roadmap")}
          >
            Create My Roadmap Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;