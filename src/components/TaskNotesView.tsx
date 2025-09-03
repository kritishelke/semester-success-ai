import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, Lightbulb, Edit3, Trash2 } from "lucide-react";

interface TaskNote {
  id: string;
  taskId: string;
  content: string;
  aiSuggestion?: string;
  createdAt: string;
}

interface TaskNotesViewProps {
  taskId: string;
  taskNotes: TaskNote[];
  saveTaskNotes: (notes: TaskNote[]) => void;
  generateAISuggestion: (taskTitle: string, major: string, career: string) => string;
  roadmapData?: any;
  onBack: () => void;
}

const TaskNotesView = ({ 
  taskId, 
  taskNotes, 
  saveTaskNotes, 
  generateAISuggestion, 
  roadmapData, 
  onBack 
}: TaskNotesViewProps) => {
  const [currentNote, setCurrentNote] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  
  const taskNote = taskNotes.find(note => note.taskId === taskId);
  
  useEffect(() => {
    if (taskNote) {
      setCurrentNote(taskNote.content);
    } else {
      setCurrentNote("");
    }
  }, [taskNote]);

  const handleSave = () => {
    const updatedNotes = [...taskNotes];
    const existingIndex = updatedNotes.findIndex(note => note.taskId === taskId);
    
    if (existingIndex >= 0) {
      updatedNotes[existingIndex] = {
        ...updatedNotes[existingIndex],
        content: currentNote,
      };
    } else {
      // Create new note with AI suggestion
      const newNote: TaskNote = {
        id: `note-${Date.now()}`,
        taskId,
        content: currentNote,
        aiSuggestion: generateAISuggestion("Task", roadmapData?.majors[0] || "", roadmapData?.career || ""),
        createdAt: new Date().toISOString()
      };
      updatedNotes.push(newNote);
    }
    
    saveTaskNotes(updatedNotes);
    setIsEditing(false);
  };

  const handleDelete = () => {
    const updatedNotes = taskNotes.filter(note => note.taskId !== taskId);
    saveTaskNotes(updatedNotes);
    onBack();
  };

  const handleGenerateAISuggestion = () => {
    const updatedNotes = [...taskNotes];
    const existingIndex = updatedNotes.findIndex(note => note.taskId === taskId);
    const suggestion = generateAISuggestion(currentNote || "General task", roadmapData?.majors[0] || "", roadmapData?.career || "");
    
    if (existingIndex >= 0) {
      updatedNotes[existingIndex] = {
        ...updatedNotes[existingIndex],
        aiSuggestion: suggestion,
      };
    } else {
      const newNote: TaskNote = {
        id: `note-${Date.now()}`,
        taskId,
        content: currentNote,
        aiSuggestion: suggestion,
        createdAt: new Date().toISOString()
      };
      updatedNotes.push(newNote);
    }
    
    saveTaskNotes(updatedNotes);
  };

  return (
    <div className="py-20 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="mb-6 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Timeline
          </Button>
          
          <h1 className="text-3xl font-bold text-foreground mb-2">Task Notes</h1>
          <p className="text-muted-foreground">Add your personal notes and get AI recommendations for this task</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Notes Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit3 className="w-5 h-5" />
                Your Notes
              </CardTitle>
              <CardDescription>
                Write down your thoughts, progress, and plans for this task
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isEditing && taskNote?.content ? (
                <div className="space-y-4">
                  <div className="p-4 bg-muted/20 rounded-lg border border-muted/30 min-h-[200px]">
                    <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                      {taskNote.content}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit Notes
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={handleDelete}
                      className="flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Textarea
                    placeholder="Write your notes for this task...

Examples:
• Current progress and next steps
• Resources you've found helpful
• Challenges you're facing
• Questions to research
• Deadlines and milestones
• People to contact"
                    value={currentNote}
                    onChange={(e) => setCurrentNote(e.target.value)}
                    className="min-h-[200px] text-base leading-relaxed"
                  />
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleSave}
                      className="flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save Notes
                    </Button>
                    {taskNote?.content && (
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setIsEditing(false);
                          setCurrentNote(taskNote.content);
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Recommendations Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-accent" />
                AI Recommendations
              </CardTitle>
              <CardDescription>
                Get personalized suggestions based on your major and career goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {taskNote?.aiSuggestion ? (
                  <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                    <Badge className="mb-3 bg-accent/10 text-accent border-accent/20">
                      AI Suggestion
                    </Badge>
                    <p className="text-foreground leading-relaxed">
                      {taskNote.aiSuggestion}
                    </p>
                  </div>
                ) : (
                  <div className="p-8 text-center border-2 border-dashed border-muted/30 rounded-lg">
                    <Lightbulb className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground mb-4">
                      No AI suggestions yet. Generate personalized recommendations for this task.
                    </p>
                  </div>
                )}
                
                <Button 
                  variant="outline"
                  onClick={handleGenerateAISuggestion}
                  className="w-full flex items-center gap-2"
                >
                  <Lightbulb className="w-4 h-4" />
                  {taskNote?.aiSuggestion ? "Regenerate AI Suggestion" : "Get AI Suggestion"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Task Context */}
        {roadmapData && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Task Context</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Major: {roadmapData.majors.join(", ")}</Badge>
                <Badge variant="outline">Career: {roadmapData.career}</Badge>
                <Badge variant="outline">University: {roadmapData.university}</Badge>
                <Badge variant="outline">Year: {roadmapData.year}</Badge>
                {roadmapData.minors.length > 0 && (
                  <Badge variant="outline">Minors: {roadmapData.minors.join(", ")}</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TaskNotesView;