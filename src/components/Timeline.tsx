import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Clock, Users, Briefcase, GraduationCap } from "lucide-react";

interface TimelineProps {
  roadmapData?: {
    major: string;
    minor: string;
    year: string;
    career: string;
  };
}

const Timeline = ({ roadmapData }: TimelineProps) => {
  // Sample roadmap data - in real app this would come from AI
  const sampleRoadmap = [
    {
      semester: "Current Semester",
      year: "Sophomore Fall",
      status: "current",
      tasks: [
        { type: "academic", title: "Complete Core CS Courses", description: "Data Structures, Algorithms", icon: GraduationCap },
        { type: "skill", title: "Learn Python & SQL", description: "Essential for data science roles", icon: Clock },
        { type: "networking", title: "Join Computer Science Club", description: "Build peer connections", icon: Users },
      ]
    },
    {
      semester: "Next Semester",
      year: "Sophomore Spring",
      status: "upcoming",
      tasks: [
        { type: "internship", title: "Apply for Summer Internships", description: "Target 15-20 applications", icon: Briefcase },
        { type: "skill", title: "Build Portfolio Website", description: "Showcase your projects", icon: Clock },
        { type: "academic", title: "Take Statistics Course", description: "Foundation for data analysis", icon: GraduationCap },
      ]
    },
    {
      semester: "Summer Break",
      year: "Between Sophomore & Junior",
      status: "future",
      tasks: [
        { type: "internship", title: "Complete Software Internship", description: "Gain real-world experience", icon: Briefcase },
        { type: "skill", title: "Learn React & JavaScript", description: "Full-stack development skills", icon: Clock },
        { type: "networking", title: "Attend Tech Conferences", description: "Connect with industry professionals", icon: Users },
      ]
    },
    {
      semester: "Junior Year",
      year: "Junior Fall & Spring",
      status: "future",
      tasks: [
        { type: "academic", title: "Advanced CS Coursework", description: "Machine Learning, Database Systems", icon: GraduationCap },
        { type: "skill", title: "Contribute to Open Source", description: "Build GitHub presence", icon: Clock },
        { type: "networking", title: "Find Technical Mentor", description: "Industry guidance", icon: Users },
        { type: "internship", title: "Secure Return Offer", description: "From previous internship", icon: Briefcase },
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

  const getTaskColor = (type: string) => {
    switch (type) {
      case "academic": return "bg-primary/10 text-primary border-primary/20";
      case "skill": return "bg-secondary/10 text-secondary border-secondary/20";
      case "networking": return "bg-accent/10 text-accent border-accent/20";
      case "internship": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        {roadmapData && (
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Your Personalized Roadmap
            </h2>
            <p className="text-xl text-muted-foreground">
              {roadmapData.major} → {roadmapData.career}
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Badge variant="outline">Current: {roadmapData.year}</Badge>
              {roadmapData.minor !== "None" && (
                <Badge variant="outline">Minor: {roadmapData.minor}</Badge>
              )}
            </div>
          </div>
        )}

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-px"></div>
          
          <div className="space-y-12">
            {sampleRoadmap.map((semester, index) => (
              <div key={index} className="relative">
                {/* Timeline node */}
                <div className="absolute left-1 md:left-1/2 transform md:-translate-x-1/2 bg-background border-4 border-border rounded-full p-2">
                  {getStatusIcon(semester.status)}
                </div>
                
                {/* Content */}
                <div className={`ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-1/2 md:pr-8' : 'md:pl-1/2 md:pl-8'}`}>
                  <Card className="bg-card/80 backdrop-blur-sm border-border/20 shadow-md hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-xl">{semester.semester}</CardTitle>
                      <CardDescription className="text-lg font-medium">{semester.year}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {semester.tasks.map((task, taskIndex) => (
                          <div key={taskIndex} className="flex items-start gap-3 p-3 rounded-lg bg-muted/20">
                            <task.icon className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium text-foreground">{task.title}</h4>
                                <Badge className={`text-xs ${getTaskColor(task.type)} px-2 py-0.5`}>
                                  {task.type}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{task.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;