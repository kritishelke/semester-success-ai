import { GraduationCap, Clock, Users, Briefcase, Star, Zap } from "lucide-react";

export interface TaskTemplate {
  id: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  type: string;
  title: string;
  description: string;
  icon: any;
  isPremium?: boolean;
  semester: 'current' | 'next' | 'summer' | 'fall' | 'spring';
  yearLevel?: string[];
}

// Base tasks that apply to most majors/careers
export const baseTasks: TaskTemplate[] = [
  {
    id: 'base-internship',
    priority: 'critical',
    type: 'internship',
    title: 'Apply for Summer Internships',
    description: 'Target 15-20 applications in your field',
    icon: Briefcase,
    isPremium: true,
    semester: 'next'
  },
  {
    id: 'base-projects',
    priority: 'high',
    type: 'skill',
    title: 'Build Personal Projects',
    description: 'Create 2-3 substantial projects for your portfolio',
    icon: Star,
    semester: 'summer'
  },
  {
    id: 'base-networking',
    priority: 'medium',
    type: 'networking',
    title: 'Professional Networking',
    description: 'Connect with industry professionals and attend events',
    icon: Users,
    semester: 'summer'
  }
];

// Tasks by major
export const majorTasks = {
  "Computer Science": [
    {
      id: 'cs-algorithms',
      priority: 'critical' as const,
      type: 'academic',
      title: 'Complete Data Structures & Algorithms Course',
      description: 'Master fundamental CS concepts essential for technical interviews',
      icon: GraduationCap,
      semester: 'current' as const
    },
    {
      id: 'cs-systems',
      priority: 'high' as const,
      type: 'academic',
      title: 'Computer Systems & OS Course',
      description: 'Understanding low-level systems programming',
      icon: GraduationCap,
      semester: 'next' as const
    },
    {
      id: 'cs-database',
      priority: 'high' as const,
      type: 'academic',
      title: 'Database Systems Course',
      description: 'SQL, NoSQL, and database design principles',
      icon: GraduationCap,
      semester: 'next' as const
    }
  ],
  "Physics": [
    {
      id: 'physics-math',
      priority: 'critical' as const,
      type: 'academic',
      title: 'Mathematical Physics Course',
      description: 'Advanced mathematics for physics applications',
      icon: GraduationCap,
      semester: 'current' as const
    },
    {
      id: 'physics-quantum',
      priority: 'high' as const,
      type: 'academic',
      title: 'Quantum Mechanics',
      description: 'Fundamental quantum physics principles',
      icon: GraduationCap,
      semester: 'next' as const
    }
  ],
  "Business Administration": [
    {
      id: 'business-finance',
      priority: 'critical' as const,
      type: 'academic',
      title: 'Corporate Finance Course',
      description: 'Financial decision making and capital structure',
      icon: GraduationCap,
      semester: 'current' as const
    },
    {
      id: 'business-strategy',
      priority: 'high' as const,
      type: 'academic',
      title: 'Strategic Management',
      description: 'Business strategy and competitive analysis',
      icon: GraduationCap,
      semester: 'next' as const
    }
  ]
};

// Tasks by career
export const careerTasks = {
  "Software Engineer": [
    {
      id: 'swe-leetcode',
      priority: 'critical' as const,
      type: 'skill',
      title: 'Daily LeetCode Practice',
      description: 'Solve 3-5 problems daily, focus on medium/hard difficulty',
      icon: Zap,
      semester: 'current' as const
    },
    {
      id: 'swe-projects',
      priority: 'high' as const,
      type: 'skill',
      title: 'Build Full-Stack Applications',
      description: 'Create end-to-end web applications with modern frameworks',
      icon: Star,
      semester: 'current' as const
    },
    {
      id: 'swe-opensource',
      priority: 'medium' as const,
      type: 'skill',
      title: 'Contribute to Open Source',
      description: 'Make meaningful contributions to popular repositories',
      icon: Users,
      semester: 'next' as const
    },
    {
      id: 'swe-system-design',
      priority: 'high' as const,
      type: 'skill',
      title: 'Study System Design',
      description: 'Learn scalable system architecture for senior-level interviews',
      icon: Zap,
      semester: 'next' as const,
      yearLevel: ['Junior', 'Senior']
    }
  ],
  "Data Scientist": [
    {
      id: 'ds-python',
      priority: 'critical' as const,
      type: 'skill',
      title: 'Master Python for Data Science',
      description: 'Pandas, NumPy, Scikit-learn, TensorFlow/PyTorch',
      icon: Zap,
      semester: 'current' as const
    },
    {
      id: 'ds-statistics',
      priority: 'critical' as const,
      type: 'academic',
      title: 'Advanced Statistics & Machine Learning',
      description: 'Statistical inference, hypothesis testing, ML algorithms',
      icon: GraduationCap,
      semester: 'current' as const
    },
    {
      id: 'ds-portfolio',
      priority: 'high' as const,
      type: 'skill',
      title: 'Build Data Science Portfolio',
      description: 'Complete end-to-end ML projects with real datasets',
      icon: Star,
      semester: 'next' as const
    }
  ],
  "Quantitative Analyst": [
    {
      id: 'quant-math',
      priority: 'critical' as const,
      type: 'skill',
      title: 'Master Mathematical Finance',
      description: 'Stochastic calculus, option pricing models, risk management',
      icon: GraduationCap,
      semester: 'current' as const
    },
    {
      id: 'quant-programming',
      priority: 'critical' as const,
      type: 'skill',
      title: 'Python & R for Finance',
      description: 'NumPy, Pandas, QuantLib for financial modeling',
      icon: Zap,
      semester: 'current' as const
    },
    {
      id: 'quant-projects',
      priority: 'high' as const,
      type: 'skill',
      title: 'Build Quantitative Models',
      description: 'Portfolio optimization, backtesting, algorithmic trading',
      icon: Star,
      semester: 'next' as const
    }
  ],
  "Product Manager": [
    {
      id: 'pm-analysis',
      priority: 'critical' as const,
      type: 'skill',
      title: 'Learn Product Analytics',
      description: 'SQL, data analysis, A/B testing, user metrics',
      icon: Zap,
      semester: 'current' as const
    },
    {
      id: 'pm-framework',
      priority: 'high' as const,
      type: 'skill',
      title: 'Master PM Frameworks',
      description: 'Product strategy, roadmapping, prioritization methods',
      icon: GraduationCap,
      semester: 'current' as const
    },
    {
      id: 'pm-experience',
      priority: 'high' as const,
      type: 'skill',
      title: 'Gain Product Experience',
      description: 'Join startup, lead student projects, or create your own product',
      icon: Star,
      semester: 'next' as const
    }
  ],
  "Cybersecurity Analyst": [
    {
      id: 'cyber-fundamentals',
      priority: 'critical' as const,
      type: 'academic',
      title: 'Information Security Fundamentals',
      description: 'Network security, cryptography, risk assessment',
      icon: GraduationCap,
      semester: 'current' as const
    },
    {
      id: 'cyber-tools',
      priority: 'high' as const,
      type: 'skill',
      title: 'Security Tools & Technologies',
      description: 'Wireshark, Nmap, penetration testing frameworks',
      icon: Zap,
      semester: 'current' as const
    },
    {
      id: 'cyber-certification',
      priority: 'high' as const,
      type: 'certification',
      title: 'Security+ or CEH Certification',
      description: 'Industry-recognized cybersecurity certifications',
      icon: GraduationCap,
      semester: 'next' as const,
      isPremium: true
    }
  ]
};

// Generate default tasks for careers not in our predefined list
export const generateDefaultCareerTasks = (career: string, major: string) => {
  const careerLower = career.toLowerCase();
  const defaultTasks = [];

  // General skill building
  defaultTasks.push({
    id: `${careerLower}-skills`,
    priority: 'critical' as const,
    type: 'skill',
    title: `Develop ${career} Skills`,
    description: `Research and master key technical skills required for ${career} roles`,
    icon: Zap,
    semester: 'current' as const
  });

  // Industry research
  defaultTasks.push({
    id: `${careerLower}-research`,
    priority: 'high' as const,
    type: 'research',
    title: `Research ${career} Industry`,
    description: `Study industry trends, major companies, and career progression paths`,
    icon: Clock,
    semester: 'current' as const
  });

  // Networking
  defaultTasks.push({
    id: `${careerLower}-networking`,
    priority: 'medium' as const,
    type: 'networking',
    title: `Connect with ${career} Professionals`,
    description: `Join professional associations and connect with industry professionals on LinkedIn`,
    icon: Users,
    semester: 'next' as const
  });

  // Portfolio/Experience
  defaultTasks.push({
    id: `${careerLower}-experience`,
    priority: 'high' as const,
    type: 'skill',
    title: `Build ${career} Portfolio`,
    description: `Create projects and gain experience relevant to ${career} field`,
    icon: Star,
    semester: 'summer' as const
  });

  return defaultTasks;
};