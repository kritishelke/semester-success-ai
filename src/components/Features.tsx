import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Target, Users, TrendingUp, Shield, Zap } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: MapPin,
      title: "Semester-by-Semester Guidance",
      description: "Get clear, actionable steps for each semester from freshman year to graduation and beyond."
    },
    {
      icon: Target,
      title: "Personalized Career Paths",
      description: "Tailored roadmaps based on your major, minor, and dream career goals."
    },
    {
      icon: Users,
      title: "Networking Opportunities",
      description: "Strategic networking guidance to connect with the right people at the right time."
    },
    {
      icon: TrendingUp,
      title: "Skill Development Tracking",
      description: "Progressive skill building with clear milestones and industry-relevant competencies."
    },
    {
      icon: Shield,
      title: "Internship Strategy",
      description: "Strategic internship planning with application timelines and preparation guidance."
    },
    {
      icon: Zap,
      title: "AI-Powered Insights",
      description: "Smart recommendations that adapt to industry trends and market demands."
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Why Students Choose Our Platform
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stop feeling overwhelmed by career planning. Our comprehensive approach 
            eliminates guesswork and provides clear direction for your professional journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/80 backdrop-blur-sm border-border/20 shadow-md hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
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

        <div className="mt-16 text-center">
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/20 shadow-lg">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Join Thousands of Successful Students
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">50,000+</div>
                <div className="text-muted-foreground">Students Guided</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary mb-2">200+</div>
                <div className="text-muted-foreground">Universities</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-2">95%</div>
                <div className="text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;