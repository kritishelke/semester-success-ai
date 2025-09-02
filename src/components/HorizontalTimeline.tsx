import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, Clock, Users, Briefcase, GraduationCap, AlertCircle, Zap, Star, ExternalLink, Crown } from "lucide-react";

interface HorizontalTimelineProps {
  roadmapData?: {
    major: string;
    secondMajor?: string;
    minor: string;
    secondMinor?: string;
    year: string;
    career: string;
    university: string;
    preProfessional?: string;
  };
}

interface Task {
  priority: 'critical' | 'high' | 'medium' | 'low';
  type: string;
  title: string;
  description: string;
  icon: any;
  isPremium?: boolean;
  links?: string[];
}

const HorizontalTimeline = ({ roadmapData }: HorizontalTimelineProps) => {
  // Enhanced roadmap data with priority system and premium features
  const sampleRoadmap = [
    {
      semester: "Current",
      year: "Sophomore Fall",
      status: "current",
      tasks: [
        { 
          priority: "critical", 
          type: "academic", 
          title: "Complete Core CS Courses", 
          description: "Data Structures, Algorithms", 
          icon: GraduationCap 
        },
        { 
          priority: "high", 
          type: "skill", 
          title: "Learn Python & SQL", 
          description: "Essential for data science roles", 
          icon: Clock 
        },
        { 
          priority: "medium", 
          type: "networking", 
          title: "Join Computer Science Club", 
          description: "Build peer connections", 
          icon: Users 
        },
        { 
          priority: "low", 
          type: "experience", 
          title: "Start Personal Projects", 
          description: "Build portfolio foundation", 
          icon: Briefcase 
        },
      ]
    },
    {
      semester: "Next",
      year: "Sophomore Spring", 
      status: "upcoming",
      tasks: [
        { 
          priority: "critical", 
          type: "internship", 
          title: "Apply for Summer Internships", 
          description: "Target 15-20 applications", 
          icon: Briefcase,
          isPremium: true,
          links: ["TechCorp Internships", "StartupJobs", "University Career Center"]
        },
        { 
          priority: "high", 
          type: "skill", 
          title: "Build Portfolio Website", 
          description: "Showcase your projects", 
          icon: Clock 
        },
        { 
          priority: "medium", 
          type: "academic", 
          title: "Take Statistics Course", 
          description: "Foundation for data analysis", 
          icon: GraduationCap 
        },
        { 
          priority: "medium", 
          type: "networking", 
          title: "Attend Tech Conferences", 
          description: "Connect with industry professionals", 
          icon: Users,
          isPremium: true,
          links: ["Bay Area Tech Summit", "AI Conference 2024", "Student Developer Days"]
        },
      ]
    },
    {
      semester: "Summer",
      year: "Between Sophomore & Junior",
      status: "future", 
      tasks: [
        { 
          priority: "critical", 
          type: "internship", 
          title: "Complete Software Internship", 
          description: "Gain real-world experience", 
          icon: Briefcase 
        },
        { 
          priority: "high", 
          type: "skill", 
          title: "Learn React & JavaScript", 
          description: "Full-stack development skills", 
          icon: Clock 
        },
        { 
          priority: "medium", 
          type: "networking", 
          title: "Connect with Mentors", 
          description: "Find industry guidance", 
          icon: Users 
        },
      ]
    },
    {
      semester: "Junior Year",
      year: "Junior Fall & Spring",
      status: "future",
      tasks: [
        { 
          priority: "critical", 
          type: "academic", 
          title: "Advanced CS Coursework", 
          description: "Machine Learning, Database Systems", 
          icon: GraduationCap 
        },
        { 
          priority: "high", 
          type: "skill", 
          title: "Contribute to Open Source", 
          description: "Build GitHub presence", 
          icon: Clock 
        },
        { 
          priority: "medium", 
          type: "experience", 
          title: "Lead Student Projects", 
          description: "Develop leadership skills", 
          icon: Star 
        },
        { 
          priority: "low", 
          type: "networking", 
          title: "Alumni Network Events", 
          description: "Connect with graduates", 
          icon: Users 
        },
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "current": return <CheckCircle className="w-6 h-6 text-secondary" />;
      case "upcoming": return <Clock className="w-6 h-6 text-accent" />;
      default: return <Circle className="w-6 h-6 text-muted-foreground" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-500/10 text-red-500 border-red-500/20";
      case "high": return "bg-accent/10 text-accent border-accent/20";
      case "medium": return "bg-secondary/10 text-secondary border-secondary/20";
      case "low": return "bg-primary/10 text-primary border-primary/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "critical": return <AlertCircle className="w-4 h-4" />;
      case "high": return <Zap className="w-4 h-4" />;
      case "medium": return <Star className="w-4 h-4" />;
      case "low": return <Circle className="w-4 h-4" />;
      default: return <Circle className="w-4 h-4" />;
    }
  };

  return (
    <div className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {roadmapData && (
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Your Personalized Career Roadmap
            </h2>
            <p className="text-xl text-muted-foreground">
              {roadmapData.major} 
              {roadmapData.secondMajor && ` + ${roadmapData.secondMajor}`} → {roadmapData.career}
            </p>
            <div className="flex justify-center gap-2 mt-4 flex-wrap">
              <Badge variant="outline">Current: {roadmapData.year}</Badge>
              <Badge variant="outline">University: {roadmapData.university}</Badge>
              {roadmapData.minor !== "None" && (
                <Badge variant="outline">Minor: {roadmapData.minor}</Badge>
              )}
              {roadmapData.secondMinor && (
                <Badge variant="outline">Second Minor: {roadmapData.secondMinor}</Badge>
              )}
              {roadmapData.preProfessional !== "None" && roadmapData.preProfessional && (
                <Badge variant="outline">Track: {roadmapData.preProfessional}</Badge>
              )}
            </div>
          </div>
        )}

        {/* Horizontal Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sampleRoadmap.map((semester, index) => (
              <div key={index} className="relative">
                {/* Timeline node */}
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-background border-4 border-border rounded-full p-2 z-10">
                  {getStatusIcon(semester.status)}
                </div>
                
                {/* Content */}
                <Card className="mt-20 bg-card/80 backdrop-blur-sm border-border/20 shadow-md hover:shadow-lg transition-all duration-300">
                  <CardHeader className="text-center">
                    <CardTitle className="text-lg">{semester.semester}</CardTitle>
                    <CardDescription className="text-sm font-medium">{semester.year}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {semester.tasks
                        .sort((a, b) => {
                          const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
                          return priorityOrder[a.priority] - priorityOrder[b.priority];
                        })
                        .map((task, taskIndex) => (
                        <div key={taskIndex} className="p-3 rounded-lg bg-muted/20 border border-muted/30">
                          <div className="flex items-start gap-2 mb-2">
                            <task.icon className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge className={`text-xs ${getPriorityColor(task.priority)} px-2 py-0.5 flex items-center gap-1`}>
                                  {getPriorityIcon(task.priority)}
                                  {task.priority}
                                </Badge>
                                {task.isPremium && (
                                  <Badge className="text-xs bg-gradient-to-r from-accent to-primary text-white px-2 py-0.5 flex items-center gap-1">
                                    <Crown className="w-3 h-3" />
                                    Premium
                                  </Badge>
                                )}
                              </div>
                              <h4 className="font-medium text-sm text-foreground">{task.title}</h4>
                              <p className="text-xs text-muted-foreground">{task.description}</p>
                              
                              {task.links && (
                                <div className="mt-2 space-y-1">
                                  {task.links.map((link, linkIndex) => (
                                    <Button
                                      key={linkIndex}
                                      variant="outline"
                                      size="sm"
                                      className="text-xs h-6 px-2 w-full justify-between"
                                    >
                                      {link}
                                      <ExternalLink className="w-3 h-3" />
                                    </Button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Expert Section */}
        <div className="mt-20">
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                <Users className="w-6 h-6 text-primary" />
                Connect with Industry Experts
              </CardTitle>
              <CardDescription>
                Get guidance from professionals who've walked your path
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-lg bg-card/50">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <GraduationCap className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Sarah Chen</h3>
                  <p className="text-sm text-muted-foreground mb-2">Senior Software Engineer at Google</p>
                  <Badge className="text-xs mb-2">Computer Science • Stanford</Badge>
                  <Button variant="outline" size="sm" className="w-full">Connect</Button>
                </div>
                
                <div className="text-center p-4 rounded-lg bg-card/50">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Briefcase className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="font-semibold mb-2">Michael Rodriguez</h3>
                  <p className="text-sm text-muted-foreground mb-2">Data Scientist at Meta</p>
                  <Badge className="text-xs mb-2">CS + Statistics • MIT</Badge>
                  <Button variant="outline" size="sm" className="w-full">Connect</Button>
                </div>
                
                <div className="text-center p-4 rounded-lg bg-card/50">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">Emily Johnson</h3>
                  <p className="text-sm text-muted-foreground mb-2">Principal PM at Microsoft</p>
                  <Badge className="text-xs mb-2">Business + CS • Berkeley</Badge>
                  <Button variant="outline" size="sm" className="w-full">Connect</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HorizontalTimeline;