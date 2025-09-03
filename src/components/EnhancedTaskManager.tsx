import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Tag, Clock, AlertCircle, CheckCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CustomTask {
  id: string;
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  type: 'academic' | 'skill' | 'networking' | 'career' | 'project';
  deadline?: string;
  tags: string[];
  completed: boolean;
  createdAt: string;
  semesterId: string;
}

interface EnhancedTaskManagerProps {
  semesterId: string;
  onTaskAdded: (task: CustomTask) => void;
  onTaskUpdated: (task: CustomTask) => void;
  onTaskDeleted: (taskId: string) => void;
  existingTasks: CustomTask[];
}

const EnhancedTaskManager = ({ 
  semesterId, 
  onTaskAdded, 
  onTaskUpdated, 
  onTaskDeleted,
  existingTasks 
}: EnhancedTaskManagerProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingTask, setEditingTask] = useState<CustomTask | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    priority: 'critical' | 'high' | 'medium' | 'low';
    type: 'academic' | 'skill' | 'networking' | 'career' | 'project';
    deadline: string;
    tags: string[];
    newTag: string;
  }>({
    title: '',
    description: '',
    priority: 'medium',
    type: 'skill',
    deadline: '',
    tags: [],
    newTag: ''
  });
  
  const { toast } = useToast();
  
  const taskTypes = [
    { value: 'academic', label: 'Academic', color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
    { value: 'skill', label: 'Skill Building', color: 'bg-green-500/10 text-green-600 border-green-500/20' },
    { value: 'networking', label: 'Networking', color: 'bg-purple-500/10 text-purple-600 border-purple-500/20' },
    { value: 'career', label: 'Career Prep', color: 'bg-orange-500/10 text-orange-600 border-orange-500/20' },
    { value: 'project', label: 'Project', color: 'bg-pink-500/10 text-pink-600 border-pink-500/20' }
  ];
  
  const priorities = [
    { value: 'critical', label: 'Critical', color: 'bg-red-500/10 text-red-600 border-red-500/20' },
    { value: 'high', label: 'High', color: 'bg-orange-500/10 text-orange-600 border-orange-500/20' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
    { value: 'low', label: 'Low', color: 'bg-green-500/10 text-green-600 border-green-500/20' }
  ];
  
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      type: 'skill',
      deadline: '',
      tags: [],
      newTag: ''
    });
    setEditingTask(null);
    setIsCreating(false);
  };
  
  const handleSubmit = () => {
    if (!formData.title.trim()) {
      toast({
        title: "Title Required",
        description: "Please enter a task title.",
        variant: "destructive"
      });
      return;
    }
    
    const taskData: CustomTask = {
      id: editingTask?.id || `custom-${Date.now()}`,
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      type: formData.type,
      deadline: formData.deadline || undefined,
      tags: formData.tags,
      completed: editingTask?.completed || false,
      createdAt: editingTask?.createdAt || new Date().toISOString(),
      semesterId
    };
    
    if (editingTask) {
      onTaskUpdated(taskData);
      toast({
        title: "Task Updated",
        description: `"${taskData.title}" has been updated.`
      });
    } else {
      onTaskAdded(taskData);
      toast({
        title: "Task Added",
        description: `"${taskData.title}" has been added to your roadmap.`
      });
    }
    
    resetForm();
  };
  
  const handleEdit = (task: CustomTask) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      type: task.type,
      deadline: task.deadline || '',
      tags: task.tags,
      newTag: ''
    });
    setIsCreating(true);
  };
  
  const addTag = () => {
    if (formData.newTag.trim() && !formData.tags.includes(formData.newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: ''
      }));
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };
  
  const getTypeColor = (type: string) => {
    return taskTypes.find(t => t.value === type)?.color || 'bg-muted/10 text-muted-foreground border-muted/20';
  };
  
  const getPriorityColor = (priority: string) => {
    return priorities.find(p => p.value === priority)?.color || 'bg-muted/10 text-muted-foreground border-muted/20';
  };
  
  if (isCreating) {
    return (
      <Card className="bg-card/90 border-border/30 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Plus className="w-5 h-5" />
            {editingTask ? 'Edit Task' : 'Create Custom Task'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Learn advanced Python data structures"
              className="h-10"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Detailed description of what you need to accomplish..."
              className="min-h-20"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={formData.priority} onValueChange={(value: any) => setFormData(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map(priority => (
                    <SelectItem key={priority.value} value={priority.value}>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-3 h-3" />
                        {priority.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={formData.type} onValueChange={(value: any) => setFormData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {taskTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <Tag className="w-3 h-3" />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="deadline">Deadline (Optional)</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
              className="h-10"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                value={formData.newTag}
                onChange={(e) => setFormData(prev => ({ ...prev, newTag: e.target.value }))}
                placeholder="Add tag..."
                className="h-8 text-sm"
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
              />
              <Button size="sm" onClick={addTag} disabled={!formData.newTag.trim()}>
                Add
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {formData.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                    <button 
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button onClick={handleSubmit} className="flex-1">
              {editingTask ? 'Update Task' : 'Create Task'}
            </Button>
            <Button variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-4">
      <Button 
        onClick={() => setIsCreating(true)}
        variant="outline"
        className="w-full border-dashed h-10"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Custom Task
      </Button>
      
      {existingTasks.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Your Custom Tasks</h4>
          {existingTasks.map(task => (
            <Card key={task.id} className="bg-muted/20 border-muted/30">
              <CardContent className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className={`text-sm font-medium ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {task.title}
                      </h5>
                      <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </Badge>
                      <Badge className={`text-xs ${getTypeColor(task.type)}`}>
                        {taskTypes.find(t => t.value === task.type)?.label}
                      </Badge>
                    </div>
                    {task.description && (
                      <p className="text-xs text-muted-foreground mb-2">{task.description}</p>
                    )}
                    {task.deadline && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        Due: {new Date(task.deadline).toLocaleDateString()}
                      </div>
                    )}
                    {task.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {task.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(task)}
                      className="text-xs h-6 px-2"
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onTaskDeleted(task.id)}
                      className="text-xs h-6 px-2 text-destructive hover:text-destructive"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnhancedTaskManager;