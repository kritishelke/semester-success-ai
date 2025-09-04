import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Users, Briefcase, GraduationCap, Crown, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useTaskProgress } from "@/hooks/useTaskProgress";
import ProgressRing from "@/components/ProgressRing";
import WeeklyCalendar from "@/components/WeeklyCalendar";
import TaskNotesView from "@/components/TaskNotesView";
import PremiumModal from "@/components/PremiumModal";

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

const SemesterDetail = () => {
  const { semesterType } = useParams();
  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [showWeeklyCalendar, setShowWeeklyCalendar] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  
  const { 
    taskProgress,
    toggleTask, 
    getTaskCompletion,
    getSemesterProgress,
    getCompletedTasksCount 
  } = useTaskProgress();

  // Mock data - in a real app this would come from props or context
  const mockTasks: Task[] = [
    {
      id: 'task-1',
      priority: 'critical',
      type: 'academic',
      title: 'Master Python & R Programming',
      description: 'Focus on NumPy, Pandas, SciPy, matplotlib for quantitative analysis',
      icon: GraduationCap
    },
    {
      id: 'task-2',
      priority: 'critical',
      type: 'academic',
      title: 'Linear Algebra & Calculus Review',
      description: 'Khan Academy, MIT OpenCourseWare - essential for quant work',
      icon: GraduationCap
    },
    {
      id: 'task-3',
      priority: 'high',
      type: 'skill',
      title: 'Start "Quantitative Finance" by Wilmott',
      description: 'Build theoretical foundation in mathematical finance',
      icon: Clock
    },
    {
      id: 'task-4',
      priority: 'medium',
      type: 'networking',
      title: 'Join Finance/Quant Clubs at School',
      description: 'Network and learn from peers in quantitative finance',
      icon: Users
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500/10 text-red-600 border-red-200';
      case 'high': return 'bg-orange-500/10 text-orange-600 border-orange-200';
      case 'medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-200';
      case 'low': return 'bg-blue-500/10 text-blue-600 border-blue-200';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSemesterTitle = () => {
    switch (semesterType) {
      case 'current': return 'Current Semester';
      case 'next': return 'Next Semester';
      default: return 'Semester Details';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/create-roadmap')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Timeline
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{getSemesterTitle()}</h1>
            <p className="text-muted-foreground">Track your progress and manage tasks</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side - Progress & Calendar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Progress Overview</span>
                  <ProgressRing 
                    progress={getSemesterProgress(mockTasks)} 
                    size="lg" 
                    showPercentage={true}
                  />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Total Tasks:</span>
                    <span className="font-medium">{getCompletedTasksCount(mockTasks).total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completed:</span>
                    <span className="text-green-600 font-medium">{getCompletedTasksCount(mockTasks).completed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Remaining:</span>
                    <span className="text-orange-600 font-medium">{getCompletedTasksCount(mockTasks).total - getCompletedTasksCount(mockTasks).completed}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Calendar (for current semester only) */}
            {semesterType === 'current' && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Weekly Planner</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowWeeklyCalendar(!showWeeklyCalendar)}
                    >
                      {showWeeklyCalendar ? 'Hide' : 'Show'} Calendar
                    </Button>
                  </div>
                </CardHeader>
                {showWeeklyCalendar && (
                  <CardContent>
                    <WeeklyCalendar 
                      tasks={mockTasks.map(task => ({
                        id: task.id,
                        title: task.title,
                        priority: task.priority,
                        completed: getTaskCompletion(task.id)
                      }))}
                      onTaskToggle={toggleTask}
                    />
                  </CardContent>
                )}
              </Card>
            )}
          </div>

          {/* Right Side - Tasks */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Tasks & Activities</CardTitle>
                <CardDescription>
                  Complete these tasks to stay on track with your goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                    <div className="space-y-4">
                      {mockTasks.map((task) => (
                        <div
                          key={task.id}
                          className="group p-4 rounded-lg bg-card hover:bg-muted/50 transition-colors cursor-pointer border"
                          onClick={() => {
                            if (task.isPremium) {
                              setShowPremiumModal(true);
                            } else {
                              setSelectedTask(task);
                            }
                          }}
                        >
                          <div className="flex gap-4">
                            {/* Left side - Icon and checkbox with proper spacing */}
                            <div className="flex flex-col items-center gap-3 pt-1">
                              <task.icon className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleTask(task.id);
                                }}
                                className="w-6 h-6 rounded border-2 border-muted-foreground hover:border-primary transition-colors flex items-center justify-center flex-shrink-0"
                              >
                                {getTaskCompletion(task.id) && (
                                  <CheckCircle className="w-5 h-5 text-green-500 fill-current" />
                                )}
                              </button>
                            </div>
                            
                            {/* Right side - Content with proper spacing */}
                            <div className="flex-1 min-w-0 pl-2">
                              <div className="flex items-center gap-2 mb-3 flex-wrap">
                                <Badge className={`text-xs ${getPriorityColor(task.priority)} flex-shrink-0`}>
                                  {task.priority}
                                </Badge>
                                {task.isPremium && (
                                  <Badge className="text-xs bg-gradient-to-r from-accent to-primary text-white flex-shrink-0">
                                    <Crown className="w-3 h-3 mr-1" />
                                    Premium
                                  </Badge>
                                )}
                              </div>
                              <h4 className={`font-medium text-base mb-2 ${getTaskCompletion(task.id) ? 'line-through text-muted-foreground' : 'text-foreground'} break-words`}>
                                {task.title}
                              </h4>
                              <p className="text-sm text-muted-foreground break-words leading-relaxed">{task.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Task Notes Modal */}
        {selectedTask && (
          <TaskNotesView
            isOpen={!!selectedTask}
            onClose={() => setSelectedTask(null)}
            task={selectedTask}
            userProfile={{
              majors: ['Physics'],
              career: 'Quantitative Analyst',
              university: 'University of Virginia',
              year: 'Sophomore'
            }}
            completedTasks={Object.keys(taskProgress).filter(taskId => taskProgress[taskId])}
          />
        )}

        {/* Premium Modal */}
        <PremiumModal 
          isOpen={showPremiumModal}
          onClose={() => setShowPremiumModal(false)}
          trigger="task-click"
        />
      </div>
    </div>
  );
};

export default SemesterDetail;