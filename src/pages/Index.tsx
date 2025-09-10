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

type Task = {
  type: "academic" | "skill" | "networking" | "internship" | string;
  title: string;
  description: string;
  icon: any;
};

type Stage = {
  semester: string;
  year: string;
  status: "current" | "upcoming" | "future";
  tasks: Task[];
  locked?: boolean;
};

const sampleRoadmap: Stage[] = [
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
      { type: "internship", title: "Apply for Summer Internships", description: "Target 15–20 applications", icon: Briefcase },
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
    case "current":  return <CheckCircle className="w-5 h-5 text-secondary" />;
    case "upcoming": return <Clock className="w-5 h-5 text-accent" />;
    default:         return <Circle className="w-5 h-5 text-muted-foreground" />;
  }
};

const getTaskColor = (type: string) => {
  switch (type) {
    case "academic":   return "bg-primary/10 text-primary border-primary/20";
    case "skill":      return "bg-secondary/10 text-secondary border-secondary/20";
    case "networking": return "bg-accent/10 text-accent border-accent/20";
    case "internship": return "bg-destructive/10 text-destructive border-destructive/20";
    default:           return "bg-muted/10 text-muted-foreground border-muted/20";
  }
};

const Timeline = ({ roadmapData }: TimelineProps) => {
  const stages = sampleRoadmap; // swap with AI result when ready

  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        {roadmapData && (
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Your Personalized Roadmap</h2>
            <p className="text-xl text-muted-foreground">
              {roadmapData.major} → {roadmapData.career}
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Badge variant="outline">Current: {roadmapData.year}</Badge>
              {roadmapData.minor !== "None" && <Badge variant="outline">Minor: {roadmapData.minor}</Badge>}
            </div>
          </div>
        )}

        {/* HORIZONTAL TIMELINE */}
        <div className="relative w-full py-14">
          {/* The rail (the line) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-1/2 h-[3px] rounded-full
                       bg-gradient-to-r from-fuchsia-300 via-emerald-300 to-amber-300"
          />

          {/* Cards anchored along the rail */}
          <div className="relative flex items-start justify-between gap-6">
            {stages.map((stage, idx) => (
              <div key={idx} className="relative flex flex-col items-center basis-0 grow">
                {/* Connector dot that sits ON the rail */}
                <div
                  className="z-10 w-4 h-4 rounded-full bg-background border-2 border-border shadow
                             -mb-2 flex items-center justify-center"
                  title={stage.semester}
                >
                  {getStatusIcon(stage.status)}
                </div>

                {/* Card (touching/“attached” to the line) */}
                <Card className="z-10 w-[220px] md:w-[260px] bg-card/80 backdrop-blur-sm border-border/30 shadow-md hover:shadow-lg transition-all">
                  <CardHeader>
                    <CardTitle className="text-lg">{stage.semester}</CardTitle>
                    <CardDescription className="text-base font-medium">{stage.year}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {stage.tasks.map((task, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/20">
                          <task.icon className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-foreground">{task.title}</h4>
                              <Badge className={`text-xs ${getTaskColor(task.type)} px-2 py-0.5`}>{task.type}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Mobile fallback: stack vertically */}
          <div className="mt-6 text-center text-xs opacity-60 md:hidden">
            Tip: rotate your phone or use a larger screen to view the horizontal timeline.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
