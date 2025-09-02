import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { MapPin, Target, Users, TrendingUp, Shield, Zap, Clock, BookOpen, Award } from "lucide-react";

const FeaturesPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MapPin,
      title: "Semester-by-Semester Guidance",
      description: "Get clear, actionable steps for each semester from freshman year to graduation and beyond.",
      color: "text-primary"
    },
    {
      icon: Target,
      title: "Personalized Career Paths",
      description: "Tailored roadmaps based on your major, minor, and dream career goals.",
      color: "text-secondary"
    },
    {
      icon: Users,
      title: "Networking Opportunities",
      description: "Strategic networking guidance to connect with the right people at the right time.",
      color: "text-accent"
    },
    {
      icon: TrendingUp,
      title: "Skill Development Tracking",
      description: "Progressive skill building with clear milestones and industry-relevant competencies.",
      color: "text-primary"
    },
    {
      icon: Shield,
      title: "Internship Strategy",
      description: "Strategic internship planning with application timelines and preparation guidance.",
      color: "text-secondary"
    },
    {
      icon: Zap,
      title: "AI-Powered Insights",
      description: "Smart recommendations that adapt to industry trends and market demands.",
      color: "text-accent"
    },
    {
      icon: Clock,
      title: "Time Management",
      description: "Balanced schedules that consider academic workload and extracurricular activities.",
      color: "text-primary"
    },
    {
      icon: BookOpen,
      title: "Course Planning",
      description: "Strategic course selection aligned with your career goals and graduation requirements.",
      color: "text-secondary"
    },
    {
      icon: Award,
      title: "Achievement Goals",
      description: "Clear milestones and achievements to track your progress toward career readiness.",
      color: "text-accent"
    }
  ];

  const benefits = [
    {
      title: "Eliminates Career Planning Overwhelm",
      description: "No more endless Google searches or conflicting advice. Get one clear, structured path."
    },
    {
      title: "Transforms Vague Anxiety into Action",
      description: "Convert career worries into concrete, achievable tasks you can complete each semester."
    },
    {
      title: "Fills the 'How' Gap",
      description: "Bridge the gap between knowing what career you want and actually getting there."
    }
  ];

  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Powerful Features for Your Success
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive tools and guidance designed to transform your college experience 
            into a strategic path toward your dream career.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/80 backdrop-blur-sm border-border/20 shadow-lg hover:shadow-xl transition-all duration-300 group h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-muted/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-muted/30 transition-colors duration-300">
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-card/50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Why Students Choose CareerPath
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Proven Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50,000+</div>
              <div className="text-muted-foreground">Students Guided</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">200+</div>
              <div className="text-muted-foreground">Universities</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">95%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">4.9/5</div>
              <div className="text-muted-foreground">Student Rating</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Ready to Transform Your Career Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students who've successfully navigated their path from college to career with our guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="accent" 
              size="lg" 
              className="text-lg px-8 py-4 h-auto"
              onClick={() => navigate("/create-roadmap")}
            >
              Create My Roadmap
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-4 h-auto"
              onClick={() => navigate("/how-it-works")}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;