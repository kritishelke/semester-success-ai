import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, GraduationCap, AlertCircle, Zap, Star, Crown, Circle, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import TaskNotesView from "./TaskNotesView";
import PremiumModal from "./PremiumModal";
import ProgressRing from "./ProgressRing";
import { useTaskProgress } from "@/hooks/useTaskProgress";
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
  priority: "critical" | "high" | "medium" | "low";
  type: string;
  title: string;
  description: string;
  icon: any;
  isPremium?: boolean;
  links?: string[];
  isCustom?: boolean;
}

const HorizontalTimeline = ({ roadmapData }: HorizontalTimelineProps) => {
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [taskNotes, setTaskNotes] = useState<TaskNote[]>([]);
  const [roadmapSemesters, setRoadmapSemesters] = useState<any[]>([]);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [premiumModalTrigger, setPremiumModalTrigger] =
    useState<"sneak-peek" | "task-click" | "completion">("sneak-peek");
  const [expandedSemester, setExpandedSemester] = useState<number | null>(null);

  const {
    taskProgress,
    toggleTask,
    getTaskCompletion,
    getSemesterProgress,
    getCompletedTasksCount,
  } = useTaskProgress();

  useEffect(() => {
    if (roadmapData) {
      const generator = new RoadmapGenerator(roadmapData);
      setRoadmapSemesters(generator.generateRoadmap());
    }
  }, [roadmapData]);

  useEffect(() => {
    const stored = localStorage.getItem("task-notes");
    if (stored) setTaskNotes(JSON.parse(stored));
  }, []);
  const saveTaskNotes = (notes: TaskNote[]) => {
    setTaskNotes(notes);
    localStorage.setItem("task-notes", JSON.stringify(notes));
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "critical":
        return <AlertCircle className="w-4 h-4" />;
      case "high":
        return <Zap className="w-4 h-4" />;
      case "medium":
        return <Star className="w-4 h-4" />;
      case "low":
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  const count = Math.min(roadmapSemesters.length, 4);
  const leftPct = (i: number) =>
    count > 1 ? `${(i / (count - 1)) * 100}%` : "50%";

  return (
    <div className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-6">
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
              {!!roadmapData.minors.length && (
                <Badge variant="outline">Minors: {roadmapData.minors.join(", ")}</Badge>
              )}
              {roadmapData.preProfessional &&
                roadmapData.preProfessional !== "None" && (
                  <Badge variant="outline">Track: {roadmapData.preProfessional}</Badge>
                )}
            </div>
          </div>
        )}

        {/* TIMELINE REGION */}
        <section className="relative mt-8 px-8 isolate overflow-visible min-h-[460px]">
          {/* Track (centered, behind everything) */}
          <div
            className="pointer-events-none absolute inset-x-8 top-1/2 -translate-y-1/2
                       h-[3px] rounded-full bg-gradient-to-r
                       from-primary via-secondary to-accent z-0"
          />

          {/* Stops (cards + stems + dots) */}
          <div className="relative z-10">
            {roadmapSemesters.slice(0, 4).map((semester, index) => {
              const isAbove = index % 2 === 0;
              return (
                <div
                  key={index}
                  className="absolute top-0 h-full w-64 -translate-x-1/2"
                  style={{ left: leftPct(index) }}
                >
                  {/* Dot on the track (highest) */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
                    <div className="h-3 w-3 rounded-full bg-background ring-2 ring-emerald-400" />
                  </div>

                  {/* Stem (above cards) */}
                  <div
                    className={`absolute left-1/2 -translate-x-[1px] w-[2px] bg-border z-30
                                ${isAbove ? "bottom-1/2 h-20" : "top-1/2 h-20"}`}
                  />

                  {/* Card container */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 w-64
                                ${isAbove ? "bottom-[calc(50%+80px)]" : "top-[calc(50%+80px)]"}`}
                  >
                    <Card
                      className={`relative z-20 transition-transform duration-300
                                  ${
                                    semester.status === "future"
                                      ? "bg-card/50 backdrop-blur-sm border-border/20 shadow-sm grayscale"
                                      : semester.status === "upcoming"
                                      ? "bg-card/70 backdrop-blur-sm border-border/30 shadow-sm"
                                      : "bg-card/80 backdrop-blur-sm border-border/20 shadow-md hover:shadow-xl hover:scale-105"
                                  }`}
                    >
                      <CardHeader className="text-center p-4">
                        <div className="flex flex-col items-center gap-2 mb-2">
                          <CardTitle className="text-base font-bold">
                            {semester.semester}
                          </CardTitle>
                          {(semester.status === "current" ||
                            semester.status === "upcoming") && (
                            <ProgressRing
                              progress={getSemesterProgress(semester.tasks)}
                              size="sm"
                              showPercentage={false}
                            />
                          )}
                        </div>
                        <CardDescription className="text-xs font-medium">
                          {semester.year}
                        </CardDescription>

                        {(semester.status === "current" ||
                          semester.status === "upcoming") && (
                          <div className="mt-2 text-xs text-muted-foreground">
                            {getCompletedTasksCount(semester.tasks).completed} of{" "}
                            {getCompletedTasksCount(semester.tasks).total} tasks
                          </div>
                        )}
                      </CardHeader>

                      <CardContent className={`p-4 ${semester.status === "future" ? "relative" : ""}`}>
                        {/* Premium overlay for future */}
                        {semester.status === "future" && (
                          <div className="absolute inset-0 rounded-lg bg-background/40 backdrop-blur-sm flex items-center justify-center">
                            <div className="text-center p-3">
                              <Crown className="w-6 h-6 text-primary mx-auto mb-2" />
                              <p className="text-xs font-medium text-foreground mb-1">
                                Premium
                              </p>
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
                          <div className="text-center">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedSemester(expandedSemester === index ? null : index);
                              }}
                              className="text-xs"
                            >
                              {expandedSemester === index ? (
                                <>
                                  <ChevronUp className="w-3 h-3 mr-1" />
                                  Hide Tasks
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="w-3 h-3 mr-1" />
                                  View Tasks
                                </>
                              )}
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Expanded tasks */}
                    {expandedSemester === index && semester.status !== "future" && (
                      <Card className="mt-4 bg-card/90 backdrop-blur-sm border-border/30 shadow-lg relative z-20">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            {(["critical", "high", "medium", "low"] as const).map((priority) => {
                              const group = semester.tasks.filter(
                                (t: Task) => t.priority === priority
                              );
                              if (!group.length) return null;
                              return (
                                <div key={priority} className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    {getPriorityIcon(priority)}
                                    <span className="text-sm font-medium capitalize">
                                      {priority}
                                    </span>
                                    <Badge variant="secondary" className="text-xs">
                                      {group.length}
                                    </Badge>
                                  </div>
                                  <div className="ml-6 space-y-1">
                                    {group.map((task: Task) => (
                                      <div key={task.id} className="flex items-center gap-2">
                                        <input
                                          type="checkbox"
                                          checked={getTaskCompletion(task.id)}
                                          onChange={() => toggleTask(task.id)}
                                          className="w-3 h-3 rounded border-border"
                                        />
                                        <span
                                          className={`text-xs ${
                                            getTaskCompletion(task.id)
                                              ? "line-through text-muted-foreground"
                                              : "text-foreground"
                                          }`}
                                        >
                                          {task.title}
                                        </span>
                                        {task.isPremium && (
                                          <Crown className="w-3 h-3 text-primary" />
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Instructions */}
        <div className="mt-12 text-center">
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
              year: roadmapData?.year || "",
            }}
            completedTasks={Object.keys(taskProgress).filter((id) => taskProgress[id])}
          />
        )}

        {/* Premium Modal */}
        <PremiumModal
          isOpen={showPremiumModal}
          onClose={() => setShowPremiumModal(false)}
          trigger={premiumModalTrigger}
        />

        {/* Experts (unchanged) */}
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

