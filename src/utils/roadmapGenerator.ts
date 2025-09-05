import { 
  TaskTemplate, 
  baseTasks, 
  majorTasks, 
  careerTasks, 
  generateDefaultCareerTasks 
} from '@/data/taskTemplates';

export interface RoadmapData {
  majors: string[];
  minors: string[];
  year: string;
  career: string;
  university: string;
  preProfessional?: string;
  futureGoal?: string;
  graduateDegree?: string;
}

export interface GeneratedTask {
  id: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  type: string;
  title: string;
  description: string;
  icon: any;
  isPremium?: boolean;
  isCustom?: boolean;
}

export interface Semester {
  semester: string;
  year: string;
  status: 'current' | 'upcoming' | 'future';
  tasks: GeneratedTask[];
}

export class RoadmapGenerator {
  private roadmapData: RoadmapData;
  
  constructor(roadmapData: RoadmapData) {
    this.roadmapData = roadmapData;
  }

  generateRoadmap(): Semester[] {
    const yearIndex = ["Freshman", "Sophomore", "Junior", "Senior"].indexOf(this.roadmapData.year);
    const remainingSemesters: Semester[] = [];
    
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
          tasks: this.generateTasksForSemester('current', currentYear)
        });
        
        // Next semester
        remainingSemesters.push({
          semester: "Next",
          year: `${currentYear} ${new Date().getMonth() >= 8 ? 'Spring' : 'Fall'}`,
          status: "upcoming", 
          tasks: this.generateTasksForSemester('next', currentYear)
        });
        
        // Summer after current year
        remainingSemesters.push({
          semester: "Summer",
          year: `Summer ${new Date().getFullYear() + (i - yearIndex) + 1}`,
          status: "upcoming",
          tasks: this.generateTasksForSemester('summer', currentYear)
        });
      } else {
        // Future years - Fall
        remainingSemesters.push({
          semester: `${currentYear} Fall`,
          year: `${currentYear} Fall Semester`,
          status: "future",
          tasks: this.generateTasksForSemester('fall', currentYear)
        });
        
        // Future years - Spring
        remainingSemesters.push({
          semester: `${currentYear} Spring`,
          year: `${currentYear} Spring Semester`,
          status: "future",
          tasks: this.generateTasksForSemester('spring', currentYear)
        });
        
        // Future summers
        if (i < 3) { // Don't add summer after senior year
          remainingSemesters.push({
            semester: "Summer",
            year: `Summer ${new Date().getFullYear() + (i - yearIndex) + 1}`,
            status: "future",
            tasks: this.generateTasksForSemester('summer', currentYear)
          });
        }
      }
    }

    return remainingSemesters;
  }

  private generateTasksForSemester(semester: 'current' | 'next' | 'summer' | 'fall' | 'spring', yearLevel: string): GeneratedTask[] {
    const tasks: GeneratedTask[] = [];
    const major = this.roadmapData.majors[0];
    const career = this.roadmapData.career;

    // Add major-specific tasks
    if (majorTasks[major]) {
      const relevantMajorTasks = majorTasks[major].filter(task => 
        task.semester === semester || 
        (semester === 'fall' && task.semester === 'current') ||
        (semester === 'spring' && task.semester === 'next')
      );
      
      relevantMajorTasks.forEach(task => {
        if (!task.yearLevel || task.yearLevel.includes(yearLevel)) {
          tasks.push(this.convertTemplateToTask(task));
        }
      });
    }

    // Add career-specific tasks
    if (careerTasks[career]) {
      const relevantCareerTasks = careerTasks[career].filter(task => 
        task.semester === semester ||
        (semester === 'fall' && task.semester === 'current') ||
        (semester === 'spring' && task.semester === 'next')
      );
      
      relevantCareerTasks.forEach(task => {
        if (!task.yearLevel || task.yearLevel.includes(yearLevel)) {
          tasks.push(this.convertTemplateToTask(task));
        }
      });
    } else {
      // Generate default tasks for unknown careers
      const defaultTasks = generateDefaultCareerTasks(career, major);
      const relevantDefaultTasks = defaultTasks.filter(task => 
        task.semester === semester ||
        (semester === 'fall' && task.semester === 'current') ||
        (semester === 'spring' && task.semester === 'next')
      );
      
      relevantDefaultTasks.forEach(task => {
        tasks.push(this.convertTemplateToTask(task, true));
      });
    }

    // Add base tasks that apply to everyone
    const relevantBaseTasks = baseTasks.filter(task => 
      task.semester === semester ||
      (semester === 'fall' && task.semester === 'current') ||
      (semester === 'spring' && task.semester === 'next')
    );
    
    relevantBaseTasks.forEach(task => {
      tasks.push(this.convertTemplateToTask(task));
    });

    // Add semester-specific tasks
    tasks.push(...this.generateSemesterSpecificTasks(semester, yearLevel));

    // Sort by priority: critical -> high -> medium -> low
    const priorityOrder = { 'critical': 0, 'high': 1, 'medium': 2, 'low': 3 };
    return tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }

  private generateSemesterSpecificTasks(semester: string, yearLevel: string): GeneratedTask[] {
    const tasks: GeneratedTask[] = [];
    const career = this.roadmapData.career;

    // Senior year specific tasks
    if (yearLevel === 'Senior') {
      if (semester === 'fall' || semester === 'current') {
        tasks.push({
          id: `senior-job-apps-${Date.now()}`,
          priority: 'critical',
          type: 'career',
          title: `Apply to Full-Time ${career} Positions`,
          description: 'Target top companies in your field with strong applications',
          icon: require('lucide-react').Briefcase,
          isPremium: true
        });

        tasks.push({
          id: `senior-interview-prep-${Date.now()}`,
          priority: 'critical', 
          type: 'skill',
          title: 'Intensive Interview Preparation',
          description: 'Practice technical interviews, behavioral questions, and case studies',
          icon: require('lucide-react').Zap
        });
      }
    }

    // Junior year specific tasks
    if (yearLevel === 'Junior') {
      if (semester === 'spring' || semester === 'next') {
        tasks.push({
          id: `junior-internship-${Date.now()}`,
          priority: 'critical',
          type: 'internship',
          title: 'Secure Summer Internship',
          description: 'Focus on competitive internships that can lead to full-time offers',
          icon: require('lucide-react').Briefcase,
          isPremium: true
        });
      }
    }

    return tasks;
  }

  private convertTemplateToTask(template: TaskTemplate, isCustom = false): GeneratedTask {
    return {
      id: `${template.id}-${Date.now()}-${Math.random()}`,
      priority: template.priority,
      type: template.type,
      title: template.title,
      description: this.personalizeDescription(template.description),
      icon: template.icon,
      isPremium: template.isPremium,
      isCustom
    };
  }

  private personalizeDescription(description: string): string {
    const { majors, career, university } = this.roadmapData;
    const major = majors[0];
    
    return description
      .replace(/\{major\}/g, major)
      .replace(/\{career\}/g, career)
      .replace(/\{university\}/g, university);
  }
}