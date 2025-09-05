import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, Clock, Users, Briefcase, GraduationCap, AlertCircle, Zap, Star, ExternalLink, Crown, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskNotesView from "./TaskNotesView";
import PremiumModal from "./PremiumModal";
import ProgressRing from "./ProgressRing";
import { useTaskProgress } from "@/hooks/useTaskProgress";
import { ChevronDown, ChevronUp } from "lucide-react";
import { RoadmapGenerator } from "@/utils/roadmapGenerator";
import type { RoadmapData } from "@/utils/roadmapGenerator";

interface HorizontalTimelineProps {
  roadmapData?: RoadmapData;
}

interface TaskNote {
  id: string;
  taskId: string;
  content: string;
  aiSuggestion?: string;
  createdAt: string;
}

interface Task {
  id: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  type: string;
  title: string;
  description: string;
  icon: any;
  isPremium?: boolean;
  links?: string[];
  isCustom?: boolean;
}

const HorizontalTimeline = ({ roadmapData }: HorizontalTimelineProps) => {
  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [taskNotes, setTaskNotes] = useState<TaskNote[]>([]);
  const [roadmapSemesters, setRoadmapSemesters] = useState<any[]>([]);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [premiumModalTrigger, setPremiumModalTrigger] = useState<"sneak-peek" | "task-click" | "completion">("sneak-peek");
  
  const { 
    taskProgress,
    toggleTask, 
    getTaskCompletion, 
    getSemesterProgress, 
    getCriticalTasksProgress,
    getCompletedTasksCount 
  } = useTaskProgress();

  // Generate roadmap when roadmapData changes
  useEffect(() => {
    if (roadmapData) {
      const generator = new RoadmapGenerator(roadmapData);
      const semesters = generator.generateRoadmap();
      setRoadmapSemesters(semesters);
    }
  }, [roadmapData]);

  // Load task notes from localStorage
  useEffect(() => {
    const storedNotes = localStorage.getItem('task-notes');
    if (storedNotes) {
      setTaskNotes(JSON.parse(storedNotes));
    }
  }, []);

  // Save task notes to localStorage
  const saveTaskNotes = (notes: TaskNote[]) => {
    setTaskNotes(notes);
    localStorage.setItem('task-notes', JSON.stringify(notes));
  };

  // Generate AI suggestion for a task
  const generateAISuggestion = (taskTitle: string, major: string, career: string) => {
    const suggestions = {
      "Complete Core Physics Courses": "Focus on Mathematical Physics (PHYS 3620) and Quantum Mechanics (PHYS 4720) - these are prerequisites for advanced courses.",
      "Take PDE Course": "MATH 4220 (Partial Differential Equations) is offered in Spring. Consider taking MATH 4210 (Advanced Calculus) first.",
      "Data Science Coursework": "CS 4774 (Machine Learning) and STAT 4995 (Applied Statistics) are excellent choices. Also consider CS 4501-2 (Data Science).",
      "LeetCode Practice": "Start with 2-3 problems daily. Focus on Dynamic Programming and Graph algorithms - common in physics simulation roles.",
      "Research Experience": "Contact Prof. Johnson in Condensed Matter Physics lab - they often need undergrads for computational modeling projects."
    };
    return suggestions[taskTitle] || `Consider connecting this with your ${major} major and ${career} career goals. Research specific requirements and prerequisites.`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "current": return <CheckCircle className="w-6 h-6 text-green-500" />;
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

  // Handle task click to show notes
  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  // Add custom task - removed since we navigate to detail page
  // const addCustomTask = (semesterIndex: number, taskContent: string) => {
  //   // Implementation removed
  // };

  // Delete custom task
  const deleteTask = (semesterIndex: number, taskId: string) => {
    const updatedSemesters = [...roadmapSemesters];
    updatedSemesters[semesterIndex].tasks = updatedSemesters[semesterIndex].tasks.filter(task => task.id !== taskId);
    setRoadmapSemesters(updatedSemesters);
    
    // Remove associated notes
    const updatedNotes = taskNotes.filter(note => note.taskId !== taskId);
    saveTaskNotes(updatedNotes);
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
              {roadmapData.majors.join(" + ")} → {roadmapData.career}
            </p>
            <div className="flex justify-center gap-2 mt-4 flex-wrap">
              <Badge variant="outline">Current: {roadmapData.year}</Badge>
              <Badge variant="outline">University: {roadmapData.university}</Badge>
              {roadmapData.minors.length > 0 && (
                <Badge variant="outline">Minors: {roadmapData.minors.join(", ")}</Badge>
              )}
              {roadmapData.preProfessional !== "None" && roadmapData.preProfessional && (
                <Badge variant="outline">Track: {roadmapData.preProfessional}</Badge>
              )}
            </div>
          </div>
        )}

        {/* Horizontal Timeline with Alternating Layout */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full transform -translate-y-1/2 z-0"></div>
          
          <div className="flex items-center justify-between gap-8 py-20">
            {roadmapSemesters.slice(0, 4).map((semester, index) => {
              const isAbove = index % 2 === 0;
              return (
                <div key={index} className="flex-1 relative">
                  {/* Timeline node */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background border-4 border-primary rounded-full p-3 z-10">
                    {getStatusIcon(semester.status)}
                  </div>
                  
                  {/* Content positioned above or below */}
                  <Card className={`
                    w-full transition-all duration-300 cursor-pointer
                    ${isAbove ? '-mt-48' : 'mt-16'}
                    ${semester.status === "future" 
                      ? "bg-card/20 backdrop-blur-sm border-border/20 shadow-sm opacity-30 grayscale blur-[2px]" 
                      : semester.status === "upcoming"
                      ? "bg-card/60 backdrop-blur-sm border-border/30 shadow-sm opacity-80 blur-[0.5px]"
                      : "bg-card/80 backdrop-blur-sm border-border/20 shadow-md hover:shadow-xl hover:scale-105"
                    }
                  `}
                  onClick={() => {
                    if (semester.status === "future") {
                      setPremiumModalTrigger("sneak-peek");
                      setShowPremiumModal(true);
                    } else if (semester.status === "current" || semester.status === "upcoming") {
                      const semesterType = semester.status === "current" ? "current" : "next";
                      navigate(`/semester/${semesterType}`);
                    }
                  }}
                  >
                    <CardHeader className="text-center p-4">
                      <div className="flex flex-col items-center gap-2 mb-2">
                        <CardTitle className="text-base font-bold">{semester.semester}</CardTitle>
                        {(semester.status === "current" || semester.status === "upcoming") && (
                          <ProgressRing 
                            progress={getSemesterProgress(semester.tasks)} 
                            size="sm" 
                            showPercentage={false}
                          />
                        )}
                      </div>
                      <CardDescription className="text-xs font-medium">{semester.year}</CardDescription>
                      
                      {(semester.status === "current" || semester.status === "upcoming") && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          {getCompletedTasksCount(semester.tasks).completed} of {getCompletedTasksCount(semester.tasks).total} tasks
                        </div>
                      )}
                    </CardHeader>
                    
                    <CardContent className={`p-4 ${semester.status === "future" ? "relative" : ""}`}>
                      {/* Future semester blur overlay */}
                      {semester.status === "future" && (
                        <div className="absolute inset-0 bg-background/40 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
                          <div className="text-center p-3">
                            <Crown className="w-6 h-6 text-primary mx-auto mb-2" />
                            <p className="text-xs font-medium text-foreground mb-1">Premium</p>
                            <Button 
                              size="sm" 
                              className="text-xs h-6"
                              onClick={(e) => {
                                e.stopPropagation();
                                setPremiumModalTrigger("sneak-peek");
                                setShowPremiumModal(true);
                              }}
                            >
                              Unlock
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {semester.status !== "future" && (
                        <div className="text-center text-xs text-muted-foreground">
                          Click to view details
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  {/* Connecting line to timeline */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-border z-0 ${
                    isAbove ? 'top-0 h-1/2 mt-4' : 'bottom-0 h-1/2 mb-4'
                  }`}></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 text-center space-y-4">
          <p className="text-muted-foreground text-lg">
            💡 Click on "Current" or "Next" semester cards to view detailed tasks and progress
          </p>
        </div>

        {/* Task Notes Modal */}
        {selectedTask && (
          <TaskNotesView
            isOpen={!!selectedTask}
            onClose={() => setSelectedTask(null)}
            task={selectedTask}
            userProfile={{
              majors: roadmapData?.majors || [],
              career: roadmapData?.career || "",
              university: roadmapData?.university || "",
              year: roadmapData?.year || ""
            }}
            completedTasks={Object.keys(taskProgress).filter(taskId => taskProgress[taskId])}
          />
        )}

        {/* Premium Modal */}
        <PremiumModal 
          isOpen={showPremiumModal}
          onClose={() => setShowPremiumModal(false)}
          trigger={premiumModalTrigger}
        />

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
