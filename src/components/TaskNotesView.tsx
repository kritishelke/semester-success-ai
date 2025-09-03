import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, Save, MessageSquare, Brain, Lightbulb, ExternalLink, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import AIRecommendationEngine from "./AIRecommendationEngine";
import EnhancedTaskManager from "./EnhancedTaskManager";
import { useToast } from "@/hooks/use-toast";

interface TaskNotesViewProps {
  isOpen: boolean;
  onClose: () => void;
  task: {
    id: string;
    title: string;
    description: string;
    type: string;
    priority: string;
  } | null;
  userProfile: {
    majors: string[];
    career: string;
    university: string;
    year: string;
  };
  completedTasks?: string[];
}

const TaskNotesView = ({ isOpen, onClose, task, userProfile, completedTasks = [] }: TaskNotesViewProps) => {
  const [notes, setNotes] = useState("");
  const [savedNotes, setSavedNotes] = useState("");
  const [activeTab, setActiveTab] = useState<"notes" | "ai" | "tasks">("notes");
  const { toast } = useToast();

  // Load notes when task changes
  useEffect(() => {
    if (task) {
      const savedNotesData = JSON.parse(localStorage.getItem('task-notes') || '{}');
      const taskNotes = savedNotesData[task.id];
      if (taskNotes) {
        setNotes(taskNotes.content);
        setSavedNotes(taskNotes.content);
      } else {
        setNotes("");
        setSavedNotes("");
      }
    }
  }, [task]);

  const saveNotes = () => {
    if (!task) return;
    
    const savedNotesData = JSON.parse(localStorage.getItem('task-notes') || '{}');
    savedNotesData[task.id] = {
      content: notes,
      updatedAt: new Date().toISOString(),
      taskTitle: task.title
    };
    localStorage.setItem('task-notes', JSON.stringify(savedNotesData));
    setSavedNotes(notes);
    
    toast({
      title: "Notes Saved",
      description: `Notes for "${task.title}" have been saved.`
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden bg-gradient-to-br from-card to-card/80">
        <DialogHeader className="pb-4 border-b border-border/20">
          {task && (
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <DialogTitle className="text-xl font-bold text-foreground mb-2">
                  {task.title}
                </DialogTitle>
                <p className="text-sm text-muted-foreground">{task.description}</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline" className="text-xs capitalize">
                    {task.type}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={`text-xs capitalize ${
                      task.priority === 'critical' ? 'border-red-500/50 text-red-400' :
                      task.priority === 'high' ? 'border-orange-500/50 text-orange-400' :
                      task.priority === 'medium' ? 'border-yellow-500/50 text-yellow-400' :
                      'border-green-500/50 text-green-400'
                    }`}
                  >
                    {task.priority} priority
                  </Badge>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </DialogHeader>
        
        {/* Tab Navigation */}
        <div className="flex gap-1 p-1 bg-muted/20 rounded-lg">
          {[
            { id: "notes", label: "Notes", icon: MessageSquare },
            { id: "ai", label: "AI Recommendations", icon: Brain },
            { id: "tasks", label: "Task Manager", icon: Plus }
          ].map(tab => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-all ${
                  activeTab === tab.id
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/10'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
        
        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === "notes" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-foreground">Personal Notes</h3>
                  <Button 
                    size="sm" 
                    onClick={saveNotes}
                    disabled={notes === savedNotes}
                    className="text-xs"
                  >
                    <Save className="w-3 h-3 mr-1" />
                    Save Notes
                  </Button>
                </div>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add your personal notes, progress updates, resources, or any thoughts about this task..."
                  className="min-h-32 resize-none bg-background/50"
                />
                {savedNotes && savedNotes !== notes && (
                  <p className="text-xs text-muted-foreground">
                    You have unsaved changes. Click "Save Notes" to persist them.
                  </p>
                )}
              </div>
              
              {/* Quick Tips */}
              <Card className="bg-muted/10 border-muted/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-accent" />
                    Quick Tips for Effective Notes
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground space-y-1">
                  <p>• Track your progress and blockers</p>
                  <p>• Note useful resources and links</p>
                  <p>• Set mini-goals and deadlines</p>
                  <p>• Reflect on what you learned</p>
                </CardContent>
              </Card>
            </div>
          )}
          
          {activeTab === "ai" && task && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">AI Recommendations</h3>
              </div>
              <AIRecommendationEngine
                taskTitle={task.title}
                taskType={task.type}
                userProfile={userProfile}
                completedTasks={completedTasks}
              />
            </div>
          )}
          
          {activeTab === "tasks" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Plus className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Task Management</h3>
              </div>
              <EnhancedTaskManager
                semesterId="current" // This would be dynamic in real implementation
                onTaskAdded={(task) => {
                  toast({
                    title: "Task Added",
                    description: `"${task.title}" has been added to your roadmap.`
                  });
                }}
                onTaskUpdated={(task) => {
                  toast({
                    title: "Task Updated", 
                    description: `"${task.title}" has been updated.`
                  });
                }}
                onTaskDeleted={(taskId) => {
                  toast({
                    title: "Task Deleted",
                    description: "Task has been removed from your roadmap."
                  });
                }}
                existingTasks={[]} // This would be loaded from storage
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskNotesView;