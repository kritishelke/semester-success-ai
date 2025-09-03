import { useState, useEffect } from "react";

interface TaskProgress {
  [taskId: string]: boolean;
}

export const useTaskProgress = () => {
  const [taskProgress, setTaskProgress] = useState<TaskProgress>({});

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('task-progress');
    if (savedProgress) {
      setTaskProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Save progress to localStorage whenever it changes
  const saveProgress = (progress: TaskProgress) => {
    setTaskProgress(progress);
    localStorage.setItem('task-progress', JSON.stringify(progress));
  };

  const toggleTask = (taskId: string) => {
    const newProgress = {
      ...taskProgress,
      [taskId]: !taskProgress[taskId]
    };
    saveProgress(newProgress);
  };

  const getTaskCompletion = (taskId: string): boolean => {
    return taskProgress[taskId] || false;
  };

  const getSemesterProgress = (tasks: any[]): number => {
    if (!tasks || tasks.length === 0) return 0;
    
    const completedTasks = tasks.filter(task => taskProgress[task.id]);
    return (completedTasks.length / tasks.length) * 100;
  };

  const getCriticalTasksProgress = (tasks: any[]): number => {
    if (!tasks || tasks.length === 0) return 0;
    
    const criticalTasks = tasks.filter(task => task.priority === 'critical');
    if (criticalTasks.length === 0) return 100;
    
    const completedCritical = criticalTasks.filter(task => taskProgress[task.id]);
    return (completedCritical.length / criticalTasks.length) * 100;
  };

  const getCompletedTasksCount = (tasks: any[]): { completed: number; total: number } => {
    if (!tasks || tasks.length === 0) return { completed: 0, total: 0 };
    
    const completed = tasks.filter(task => taskProgress[task.id]).length;
    return { completed, total: tasks.length };
  };

  return {
    taskProgress,
    toggleTask,
    getTaskCompletion,
    getSemesterProgress,
    getCriticalTasksProgress,
    getCompletedTasksCount
  };
};