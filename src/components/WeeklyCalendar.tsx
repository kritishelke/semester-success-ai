import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, Plus } from "lucide-react";
import { useState } from "react";

interface Task {
  id: string;
  title: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  completed?: boolean;
}

interface WeeklyCalendarProps {
  tasks: Task[];
  onTaskToggle: (taskId: string) => void;
}

const WeeklyCalendar = ({ tasks, onTaskToggle }: WeeklyCalendarProps) => {
  const [weeklyTasks, setWeeklyTasks] = useState<{[key: string]: Task[]}>({});
  
  const daysOfWeek = [
    { key: 'monday', label: 'Mon', full: 'Monday' },
    { key: 'tuesday', label: 'Tue', full: 'Tuesday' }, 
    { key: 'wednesday', label: 'Wed', full: 'Wednesday' },
    { key: 'thursday', label: 'Thu', full: 'Thursday' },
    { key: 'friday', label: 'Fri', full: 'Friday' },
    { key: 'saturday', label: 'Sat', full: 'Saturday' },
    { key: 'sunday', label: 'Sun', full: 'Sunday' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-500/10 text-red-500 border-red-500/20";
      case "high": return "bg-accent/10 text-accent border-accent/20";
      case "medium": return "bg-secondary/10 text-secondary border-secondary/20";
      case "low": return "bg-primary/10 text-primary border-primary/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const assignTaskToDay = (task: Task, day: string) => {
    setWeeklyTasks(prev => ({
      ...prev,
      [day]: [...(prev[day] || []), task]
    }));
  };

  const removeTaskFromDay = (taskId: string, day: string) => {
    setWeeklyTasks(prev => ({
      ...prev,
      [day]: (prev[day] || []).filter(task => task.id !== taskId)
    }));
  };

  const getUnassignedTasks = () => {
    const assignedTaskIds = new Set(
      Object.values(weeklyTasks).flat().map(task => task.id)
    );
    return tasks.filter(task => !assignedTaskIds.has(task.id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Weekly Planner</h3>
        <p className="text-sm text-muted-foreground">Drag tasks to specific days to plan your week</p>
      </div>

      {/* Unassigned Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Available Tasks</CardTitle>
          <CardDescription>Click to assign tasks to specific days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {getUnassignedTasks().map(task => (
              <div
                key={task.id}
                className="p-3 rounded-lg bg-muted/20 border border-muted/30 cursor-move hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <button
                    onClick={() => onTaskToggle(task.id)}
                    className="w-4 h-4 rounded border-2 border-muted-foreground hover:border-primary transition-colors flex items-center justify-center"
                  >
                    {task.completed && (
                      <CheckCircle className="w-3 h-3 text-primary fill-current" />
                    )}
                  </button>
                  <Badge className={`text-xs ${getPriorityColor(task.priority)} px-2 py-0.5`}>
                    {task.priority}
                  </Badge>
                </div>
                <h4 className={`font-medium text-sm ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                  {task.title}
                </h4>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Grid */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {daysOfWeek.map(day => (
          <Card key={day.key} className="min-h-[200px]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-center">{day.full}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {(weeklyTasks[day.key] || []).map(task => (
                <div
                  key={task.id}
                  className="p-2 rounded-md bg-muted/20 border border-muted/30 group relative"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <button
                      onClick={() => onTaskToggle(task.id)}
                      className="w-3 h-3 rounded border border-muted-foreground hover:border-primary transition-colors flex items-center justify-center"
                    >
                      {task.completed && (
                        <CheckCircle className="w-2 h-2 text-primary fill-current" />
                      )}
                    </button>
                    <Badge className={`text-xs ${getPriorityColor(task.priority)} px-1 py-0`}>
                      {task.priority[0].toUpperCase()}
                    </Badge>
                  </div>
                  <p className={`text-xs ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {task.title}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-1 right-1 w-4 h-4 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                    onClick={() => removeTaskFromDay(task.id, day.key)}
                  >
                    ×
                  </Button>
                </div>
              ))}
              
              {getUnassignedTasks().length > 0 && (
                <div className="border-2 border-dashed border-muted/30 rounded-md p-2 text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-muted-foreground hover:text-foreground w-full h-auto p-1"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add Task
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WeeklyCalendar;