import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, Clock, Users, Briefcase, GraduationCap, AlertCircle, Zap, Star, ExternalLink, Crown } from "lucide-react";
import { useState, useEffect } from "react";
import TaskNotesView from "./TaskNotesView";

interface HorizontalTimelineProps {
  roadmapData?: {
    majors: string[];
    minors: string[];
    year: string;
    career: string;
    university: string;
    preProfessional?: string;
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
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [taskNotes, setTaskNotes] = useState<TaskNote[]>([]);
  const [newTaskContent, setNewTaskContent] = useState("");
  const [isAddingTask, setIsAddingTask] = useState<string | null>(null);
  const [roadmapSemesters, setRoadmapSemesters] = useState<any[]>([]);

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
    
    // University-specific course mappings
    const universityCourses = {
      "University of Virginia": {
        "Physics": {
          "PDE": "MATH 4220 - Partial Differential Equations",
          "Data Science": "CS 4774 - Machine Learning, STAT 4995 - Applied Statistics", 
          "Probability": "STAT 3120 - Probability and Statistics",
          "Advanced Physics": "PHYS 3620 - Mathematical Physics, PHYS 4720 - Quantum Mechanics"
        },
        "Computer Science": {
          "Algorithms": "CS 4102 - Algorithms, CS 3102 - Theory of Computation",
          "Data Science": "CS 4774 - Machine Learning, CS 4501-2 - Data Science",
          "Systems": "CS 4414 - Operating Systems, CS 4480 - Computer Networks"
        },
        "Data Science": {
          "Statistics": "STAT 4995 - Applied Statistics, STAT 5120 - Statistical Methods",
          "Programming": "CS 2150 - Program and Data Representation, CS 4774 - Machine Learning",
          "Math": "MATH 4220 - PDE, MATH 3354 - Linear Algebra"
        }
      }
    };

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
      } else {
        // Future years
        remainingSemesters.push({
          semester: `${currentYear} Year`,
          year: `${currentYear} Fall & Spring`,
          status: "future",
          tasks: generateFutureTasks(data, currentYear)
        });
      }
    }

    return remainingSemesters;
  };

  const generateCurrentTasks = (data: any, year: string) => {
    const tasks = [];
    const major = data.majors[0];
    const university = data.university;
    
    // Academic courses based on major and university
    if (major === "Physics" && university === "University of Virginia") {
      tasks.push({
        id: `task-${Date.now()}-1`,
        priority: "critical",
        type: "academic",
        title: "Complete Core Physics Courses",
        description: "PHYS 3620 - Mathematical Physics, focus on analytical methods",
        icon: GraduationCap
      });
      
      tasks.push({
        id: `task-${Date.now()}-2`, 
        priority: "high",
        type: "academic",
        title: "Take PDE Course",
        description: "MATH 4220 - Partial Differential Equations (Spring offering)",
        icon: GraduationCap
      });
    } else if (major === "Computer Science") {
      tasks.push({
        id: `task-${Date.now()}-3`,
        priority: "critical",
        type: "academic", 
        title: "Complete Algorithms Course",
        description: "CS 4102 - Algorithms, essential for technical interviews",
        icon: GraduationCap
      });
    }

    // Career-specific tasks
    if (data.career === "Data Scientist") {
      tasks.push({
        id: `task-${Date.now()}-4`,
        priority: "high",
        type: "skill",
        title: "Data Science Coursework",
        description: university === "University of Virginia" ? "CS 4774 - Machine Learning, STAT 4995 - Applied Statistics" : "Take machine learning and statistics courses",
        icon: Clock
      });
      
      tasks.push({
        id: `task-${Date.now()}-5`,
        priority: "medium", 
        type: "skill",
        title: "LeetCode Practice",
        description: "Practice 2-3 problems daily, focus on arrays and dynamic programming",
        icon: Zap
      });
    }

    return tasks;
  };

  const generateUpcomingTasks = (data: any, year: string) => {
    const tasks = [];
    
    tasks.push({
      id: `task-${Date.now()}-6`,
      priority: "critical",
      type: "internship", 
      title: "Apply for Summer Internships",
      description: "Target 15-20 applications in your field",
      icon: Briefcase,
      isPremium: true
    });

    if (data.career === "Data Scientist") {
      tasks.push({
        id: `task-${Date.now()}-7`,
        priority: "high",
        type: "skill",
        title: "Build Data Science Portfolio",
        description: "Create 3-4 projects showcasing different skills",
        icon: Clock
      });
    }

    return tasks;
  };

  const generateFutureTasks = (data: any, year: string) => {
    const tasks = [];
    
    if (year === "Junior") {
      tasks.push({
        id: `task-${Date.now()}-8`,
        priority: "critical",
        type: "experience",
        title: "Research Experience", 
        description: "Join a research lab in your field",
        icon: Star
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

  // Handle task click to show notes
  const handleTaskClick = (task: Task) => {
    setSelectedTask(task.id);
  };

  // Add custom task
  const addCustomTask = (semesterIndex: number, taskContent: string) => {
    const newTask: Task = {
      id: `custom-${Date.now()}`,
      priority: "medium",
      type: "custom",
      title: taskContent,
      description: "Custom task added by user",
      icon: Star,
      isCustom: true
    };

    const updatedSemesters = [...roadmapSemesters];
    updatedSemesters[semesterIndex].tasks.push(newTask);
    setRoadmapSemesters(updatedSemesters);
    
    // Generate AI suggestion
    const suggestion = generateAISuggestion(taskContent, roadmapData?.majors[0] || "", roadmapData?.career || "");
    const newNote: TaskNote = {
      id: `note-${Date.now()}`,
      taskId: newTask.id,
      content: "",
      aiSuggestion: suggestion,
      createdAt: new Date().toISOString()
    };
    
    saveTaskNotes([...taskNotes, newNote]);
    setNewTaskContent("");
    setIsAddingTask(null);
  };

  // Delete custom task
  const deleteTask = (semesterIndex: number, taskId: string) => {
    const updatedSemesters = [...roadmapSemesters];
    updatedSemesters[semesterIndex].tasks = updatedSemesters[semesterIndex].tasks.filter(task => task.id !== taskId);
    setRoadmapSemesters(updatedSemesters);
    
    // Remove associated notes
    const updatedNotes = taskNotes.filter(note => note.taskId !== taskId);
    saveTaskNotes(updatedNotes);
  };

  if (selectedTask) {
    return <TaskNotesView 
      taskId={selectedTask} 
      taskNotes={taskNotes}
      saveTaskNotes={saveTaskNotes}
      generateAISuggestion={generateAISuggestion}
      roadmapData={roadmapData}
      onBack={() => setSelectedTask(null)}
    />;
  }

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

        {/* Horizontal Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {roadmapSemesters.map((semester, index) => (
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
                        <div 
                          key={taskIndex} 
                          className="p-3 rounded-lg bg-muted/20 border border-muted/30 cursor-pointer hover:bg-muted/30 transition-colors"
                          onClick={() => handleTaskClick(task)}
                        >
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
                                {task.isCustom && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-xs h-6 px-1 text-destructive hover:text-destructive"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteTask(index, task.id);
                                    }}
                                  >
                                    ×
                                  </Button>
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
                                      onClick={(e) => e.stopPropagation()}
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
                      
                      {/* Add Task Button */}
                      {isAddingTask === `semester-${index}` ? (
                        <div className="p-3 rounded-lg bg-muted/20 border-2 border-dashed border-primary/30">
                          <input
                            type="text"
                            placeholder="Add a custom task..."
                            value={newTaskContent}
                            onChange={(e) => setNewTaskContent(e.target.value)}
                            className="w-full p-2 bg-background border border-border rounded text-sm"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' && newTaskContent.trim()) {
                                addCustomTask(index, newTaskContent.trim());
                              }
                            }}
                          />
                          <div className="flex gap-2 mt-2">
                            <Button
                              size="sm"
                              onClick={() => {
                                if (newTaskContent.trim()) {
                                  addCustomTask(index, newTaskContent.trim());
                                }
                              }}
                              className="text-xs h-6"
                            >
                              Add
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setIsAddingTask(null);
                                setNewTaskContent("");
                              }}
                              className="text-xs h-6"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-xs h-8 border-dashed"
                          onClick={() => setIsAddingTask(`semester-${index}`)}
                        >
                          + Add Custom Task
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-lg">
            💡 Click on any task to add personal notes and get AI recommendations
          </p>
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