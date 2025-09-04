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

interface HorizontalTimelineProps {
  roadmapData?: {
    majors: string[];
    minors: string[];
    year: string;
    career: string;
    university: string;
    preProfessional?: string;
    futureGoal?: string;
    graduateDegree?: string;
  };
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

  // Generate actual roadmap based on user data
  const generateRoadmap = (data: any) => {
    if (!data) return [];

    const yearIndex = ["Freshman", "Sophomore", "Junior", "Senior"].indexOf(data.year);
    const remainingSemesters = [];
    
    // Generate timeline based on current year
    for (let i = yearIndex; i < 4; i++) {
      const yearNames = ["Freshman", "Sophomore", "Junior", "Senior"];
      const currentYear = yearNames[i];
      
      if (i === yearIndex) {
        // Current semester
        remainingSemesters.push({
          semester: "Current",
          year: `${currentYear} ${new Date().getMonth() >= 8 ? 'Fall' : 'Spring'}`,
          status: "current",
          tasks: generateCurrentTasks(data, currentYear)
        });
        
        // Next semester
        remainingSemesters.push({
          semester: "Next",
          year: `${currentYear} ${new Date().getMonth() >= 8 ? 'Spring' : 'Fall'}`,
          status: "upcoming", 
          tasks: generateUpcomingTasks(data, currentYear)
        });
        
        // Summer after current year
        remainingSemesters.push({
          semester: "Summer",
          year: `Summer ${new Date().getFullYear() + (i - yearIndex) + 1}`,
          status: "upcoming",
          tasks: generateSummerTasks(data, currentYear)
        });
      } else {
        // Future years - Fall
        remainingSemesters.push({
          semester: `${currentYear} Fall`,
          year: `${currentYear} Fall Semester`,
          status: "future",
          tasks: generateFallTasks(data, currentYear)
        });
        
        // Future years - Spring
        remainingSemesters.push({
          semester: `${currentYear} Spring`,
          year: `${currentYear} Spring Semester`,
          status: "future",
          tasks: generateSpringTasks(data, currentYear)
        });
        
        // Future summers
        if (i < 3) { // Don't add summer after senior year
          remainingSemesters.push({
            semester: "Summer",
            year: `Summer ${new Date().getFullYear() + (i - yearIndex) + 1}`,
            status: "future",
            tasks: generateSummerTasks(data, currentYear)
          });
        }
      }
    }

    return remainingSemesters;
  };

  const generateCurrentTasks = (data: any, year: string) => {
    const tasks = [];
    const major = data.majors[0];
    const career = data.career;
    const university = data.university;
    
    // Physics + Quantitative Analyst specific
    if (major === "Physics" && career === "Quantitative Analyst" && university === "University of Virginia") {
      tasks.push({
        id: `task-${Date.now()}-1`,
        priority: "critical",
        type: "academic",
        title: "Master Python & R Programming",
        description: "Focus on NumPy, Pandas, SciPy, matplotlib for quantitative analysis",
        icon: GraduationCap
      });
      
      tasks.push({
        id: `task-${Date.now()}-2`,
        priority: "critical", 
        type: "academic",
        title: "Linear Algebra & Calculus Review",
        description: "Khan Academy, MIT OpenCourseWare - essential for quant work",
        icon: GraduationCap
      });
      
      tasks.push({
        id: `task-${Date.now()}-3`,
        priority: "high",
        type: "skill",
        title: "Start 'Quantitative Finance' by Wilmott",
        description: "Build theoretical foundation in mathematical finance",
        icon: Clock
      });
      
      tasks.push({
        id: `task-${Date.now()}-4`,
        priority: "high",
        type: "networking",
        title: "Join Finance/Quant Clubs at School",
        description: "Network and learn from peers in quantitative finance",
        icon: Users
      });
      
      tasks.push({
        id: `task-${Date.now()}-5`,
        priority: "medium",
        type: "career",
        title: "Apply for Spring Finance Internships",
        description: "Target asset management and trading firms",
        icon: Briefcase
      });
      
      tasks.push({
        id: `task-${Date.now()}-6`,
        priority: "medium",
        type: "skill",
        title: "Practice Monte Carlo Simulations",
        description: "Learn to model financial scenarios and risk assessment",
        icon: Zap
      });
      
      tasks.push({
        id: `task-${Date.now()}-7`,
        priority: "low",
        type: "skill",
        title: "LeetCode Practice (Quant Focus)",
        description: "2-3 problems daily, focus on probability and algorithms",
        icon: Zap
      });
    } 
    // Physics + Data Scientist
    else if (major === "Physics" && career === "Data Scientist") {
      tasks.push({
        id: `task-${Date.now()}-8`,
        priority: "critical",
        type: "academic",
        title: "Complete Core Physics Courses",
        description: "PHYS 3620 - Mathematical Physics, PHYS 4720 - Quantum Mechanics",
        icon: GraduationCap
      });
      
      tasks.push({
        id: `task-${Date.now()}-9`,
        priority: "critical",
        type: "academic", 
        title: "Data Science Coursework",
        description: "CS 4774 - Machine Learning, STAT 4995 - Applied Statistics",
        icon: GraduationCap
      });
      
      tasks.push({
        id: `task-${Date.now()}-10`,
        priority: "high",
        type: "skill",
        title: "Master Python for Data Science",
        description: "Focus on scikit-learn, TensorFlow, and data visualization libraries",
        icon: Zap
      });
      
      tasks.push({
        id: `task-${Date.now()}-11`,
        priority: "medium",
        type: "skill",
        title: "LeetCode Practice",
        description: "Practice 2-3 problems daily, focus on arrays and dynamic programming",
        icon: Zap
      });
    }
    // Computer Science generic
    else if (major === "Computer Science") {
      tasks.push({
        id: `task-${Date.now()}-12`,
        priority: "critical",
        type: "academic",
        title: "Complete Algorithms Course", 
        description: "CS 4102 - Algorithms, essential for technical interviews",
        icon: GraduationCap
      });
      
      tasks.push({
        id: `task-${Date.now()}-13`,
        priority: "high",
        type: "skill",
        title: "Daily LeetCode Practice",
        description: "Solve 3-5 problems daily, focus on medium difficulty",
        icon: Zap
      });
      
      tasks.push({
        id: `task-${Date.now()}-14`,
        priority: "medium",
        type: "skill",
        title: "Build Personal Projects",
        description: "Create 2-3 substantial projects for your portfolio",
        icon: Star
      });
    }

    return tasks;
  };

  const generateUpcomingTasks = (data: any, year: string) => {
    const tasks = [];
    const major = data.majors[0];
    const career = data.career;
    
    // Physics + Quantitative Analyst
    if (major === "Physics" && career === "Quantitative Analyst") {
      tasks.push({
        id: `task-${Date.now()}-15`,
        priority: "critical",
        type: "academic",
        title: "Complete Probability & Statistics Course",
        description: "STAT 3120 - Focus on stochastic processes and time series",
        icon: GraduationCap
      });
      
      tasks.push({
        id: `task-${Date.now()}-16`,
        priority: "critical",
        type: "skill",
        title: "Learn SQL and Database Management",
        description: "Essential for handling financial data in quant roles",
        icon: Clock
      });
      
      tasks.push({
        id: `task-${Date.now()}-17`,
        priority: "critical",
        type: "portfolio",
        title: "Build 2-3 Quant Projects for Portfolio",
        description: "Portfolio optimization, backtesting, pricing models",
        icon: Star
      });
      
      tasks.push({
        id: `task-${Date.now()}-18`,
        priority: "high",
        type: "certification",
        title: "Start CQF or Similar Online Certification",
        description: "Certificate in Quantitative Finance for credibility",
        icon: GraduationCap,
        isPremium: true
      });
      
      tasks.push({
        id: `task-${Date.now()}-19`,
        priority: "medium",
        type: "networking",
        title: "Attend Finance Conferences/Webinars",
        description: "CFA Institute events, local finance meetups",
        icon: Users
      });
    }
    
    // Generic tasks for all paths
    tasks.push({
      id: `task-${Date.now()}-20`,
      priority: "critical",
      type: "internship",
      title: "Apply for Summer Internships",
      description: "Target 15-20 applications in your field",
      icon: Briefcase,
      isPremium: true
    });

    return tasks;
  };

  const generateSummerTasks = (data: any, year: string) => {
    const tasks = [];
    const major = data.majors[0];
    const career = data.career;
    
    // Physics + Quantitative Analyst summer tasks
    if (major === "Physics" && career === "Quantitative Analyst") {
      tasks.push({
        id: `task-${Date.now()}-21`,
        priority: "critical",
        type: "internship",
        title: "Secure Finance Internship",
        description: "Investment banks, hedge funds, proprietary trading firms",
        icon: Briefcase,
        isPremium: true
      });
      
      tasks.push({
        id: `task-${Date.now()}-22`,
        priority: "critical",
        type: "skill",
        title: "If No Internship: Intensive Self-Study",
        description: "Complete 2 major quant projects, online courses",
        icon: Clock
      });
      
      tasks.push({
        id: `task-${Date.now()}-23`,
        priority: "high",
        type: "networking",
        title: "Network with Finance Professionals",
        description: "LinkedIn outreach, informational interviews",
        icon: Users
      });
      
      tasks.push({
        id: `task-${Date.now()}-24`,
        priority: "high",
        type: "skill",
        title: "Master Advanced Excel/VBA",
        description: "Still widely used in finance industry",
        icon: Zap
      });
      
      tasks.push({
        id: `task-${Date.now()}-25`,
        priority: "high",
        type: "skill",
        title: "Study Derivatives and Options Pricing",
        description: "Black-Scholes, Greeks, volatility models",
        icon: GraduationCap
      });
      
      tasks.push({
        id: `task-${Date.now()}-26`,
        priority: "medium",
        type: "skill",
        title: "Advanced Monte Carlo Methods",
        description: "Implement complex financial simulations",
        icon: Zap
      });
    }
    // Generic summer tasks for other paths
    else {
      tasks.push({
        id: `task-${Date.now()}-27`,
        priority: "critical",
        type: "internship",
        title: "Secure Summer Internship",
        description: "Gain practical experience in your field",
        icon: Briefcase,
        isPremium: true
      });
      
      tasks.push({
        id: `task-${Date.now()}-28`,
        priority: "high",
        type: "skill",
        title: "Build Summer Projects",
        description: "Work on 2-3 substantial projects to enhance your portfolio",
        icon: Star
      });
      
      tasks.push({
        id: `task-${Date.now()}-29`,
        priority: "medium",
        type: "networking",
        title: "Professional Networking",
        description: "Connect with industry professionals and attend events",
        icon: Users
      });
    }

    return tasks;
  };

  const generateFallTasks = (data: any, year: string) => {
    const tasks = [];
    const major = data.majors[0];
    const career = data.career;
    
    if (year === "Senior" && major === "Physics" && career === "Quantitative Analyst") {
      tasks.push({
        id: `task-${Date.now()}-30`,
        priority: "critical",
        type: "career",
        title: "Apply to Full-Time Quant Positions",
        description: "Target: Two Sigma, Citadel, Jane Street, DE Shaw",
        icon: Briefcase,
        isPremium: true
      });
      
      tasks.push({
        id: `task-${Date.now()}-31`,
        priority: "critical",
        type: "skill",
        title: "Prepare for Technical Interviews",
        description: "Brainteasers, coding challenges, probability problems",
        icon: Zap
      });
      
      tasks.push({
        id: `task-${Date.now()}-32`,
        priority: "high",
        type: "academic",
        title: "Complete Advanced Econometrics Course",
        description: "Time series analysis, ARCH/GARCH models",
        icon: GraduationCap
      });
      
      tasks.push({
        id: `task-${Date.now()}-33`,
        priority: "high",
        type: "skill",
        title: "Learn C++ Basics",
        description: "Required for high-frequency trading roles",
        icon: Zap
      });
      
      tasks.push({
        id: `task-${Date.now()}-34`,
        priority: "medium",
        type: "competition",
        title: "Participate in Trading Competitions",
        description: "Rotman, Wharton trading competitions",
        icon: Star
      });
    } else if (year === "Junior") {
      tasks.push({
        id: `task-${Date.now()}-35`,
        priority: "critical",
        type: "experience",
        title: "Join Research Lab",
        description: "Get hands-on research experience in your field",
        icon: Star
      });
      
      tasks.push({
        id: `task-${Date.now()}-36`,
        priority: "high",
        type: "academic",
        title: "Take Advanced Coursework",
        description: "Enroll in upper-level courses relevant to your career",
        icon: GraduationCap
      });
      
      tasks.push({
        id: `task-${Date.now()}-37`,
        priority: "medium",
        type: "leadership",
        title: "Take Leadership Role in Organizations",
        description: "Lead projects in relevant student organizations",
        icon: Users
      });
    }

    tasks.push({
      id: `task-${Date.now()}-38`,
      priority: "low",
      type: "skill",
      title: "Maintain Technical Skills",
      description: "Continue practicing coding and relevant technical skills",
      icon: Zap
    });

    return tasks;
  };

  const generateSpringTasks = (data: any, year: string) => {
    const tasks = [];
    const major = data.majors[0];
    const career = data.career;
    
    if (year === "Senior" && major === "Physics" && career === "Quantitative Analyst") {
      tasks.push({
        id: `task-${Date.now()}-39`,
        priority: "critical",
        type: "career",
        title: "Complete Interviews and Negotiate Offers",
        description: "Practice case studies, salary negotiation",
        icon: Briefcase,
        isPremium: true
      });
      
      tasks.push({
        id: `task-${Date.now()}-40`,
        priority: "high",
        type: "portfolio",
        title: "Maintain and Update Quantitative Portfolio",
        description: "Showcase latest projects and results",
        icon: Star
      });
      
      tasks.push({
        id: `task-${Date.now()}-41`,
        priority: "medium",
        type: "certification",
        title: "Consider CFA Level 1 Exam",
        description: "June exam date, if time permits",
        icon: GraduationCap
      });
      
      tasks.push({
        id: `task-${Date.now()}-42`,
        priority: "high",
        type: "preparation",
        title: "Prepare for Transition to Work",
        description: "Review key concepts, industry trends",
        icon: Clock
      });
      
      tasks.push({
        id: `task-${Date.now()}-43`,
        priority: "high",
        type: "networking",
        title: "Build Professional Network",
        description: "Maintain connections for future opportunities",
        icon: Users
      });
    } else {
      tasks.push({
        id: `task-${Date.now()}-44`,
        priority: "critical", 
        type: "academic",
        title: "Complete Spring Coursework", 
        description: "Focus on courses critical for your career path",
        icon: GraduationCap
      });
      
      tasks.push({
        id: `task-${Date.now()}-45`,
        priority: "high",
        type: "preparation",
        title: "Prepare for Summer Plans",
        description: "Get ready for internships or summer programs",
        icon: Clock
      });
      
      tasks.push({
        id: `task-${Date.now()}-46`,
        priority: "medium",
        type: "skill",
        title: "Continue Skill Development",
        description: "Work on technical and soft skills",
        icon: Zap
      });
    }

    return tasks;
  };

  // Generate roadmap when component mounts or roadmapData changes
  useEffect(() => {
    if (roadmapData) {
      const generatedRoadmap = generateRoadmap(roadmapData);
      setRoadmapSemesters(generatedRoadmap);
    }
  }, [roadmapData]);

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
