import { Brain, Lightbulb, ExternalLink, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AIRecommendation {
  type: 'skill' | 'resource' | 'networking' | 'project' | 'preparation';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
  links?: { title: string; url: string }[];
  estimatedTime?: string;
}

interface AIRecommendationEngineProps {
  taskTitle: string;
  taskType: string;
  userProfile: {
    majors: string[];
    career: string;
    university: string;
    year: string;
  };
  completedTasks?: string[];
}

const AIRecommendationEngine = ({ 
  taskTitle, 
  taskType, 
  userProfile,
  completedTasks = []
}: AIRecommendationEngineProps) => {
  
  const generateSmartRecommendations = (): AIRecommendation[] => {
    const { majors, career, university, year } = userProfile;
    const major = majors[0];
    
    // Context-aware recommendations based on task and user profile
    const recommendations: AIRecommendation[] = [];
    
    // Task-specific recommendations
    if (taskTitle.toLowerCase().includes('python')) {
      recommendations.push({
        type: 'skill',
        title: 'Master Python Data Structures',
        description: `Since you're a ${major} major targeting ${career}, focus on NumPy, Pandas, and SciPy. These are essential for quantitative analysis.`,
        priority: 'high',
        actionable: true,
        links: [
          { title: 'Python for Finance Course', url: '#' },
          { title: 'NumPy Official Tutorial', url: '#' }
        ],
        estimatedTime: '2-3 weeks'
      });
    }
    
    if (taskTitle.toLowerCase().includes('leetcode')) {
      recommendations.push({
        type: 'preparation',
        title: 'Strategic LeetCode Practice',
        description: `For ${career} roles, prioritize dynamic programming, graph algorithms, and probability problems over general coding challenges.`,
        priority: 'high',
        actionable: true,
        links: [
          { title: 'Quant Interview Questions', url: '#' },
          { title: 'Math Problem Sets', url: '#' }
        ],
        estimatedTime: '30 mins daily'
      });
    }
    
    if (taskTitle.toLowerCase().includes('networking') || taskTitle.toLowerCase().includes('club')) {
      recommendations.push({
        type: 'networking',
        title: `${university} Finance Connections`,
        description: `Join the ${university} Finance Club and Alumni Network. Target connections in ${career.toLowerCase()} roles at top firms.`,
        priority: 'medium',
        actionable: true,
        links: [
          { title: `${university} Career Services`, url: '#' },
          { title: 'LinkedIn Alumni Tool', url: '#' }
        ],
        estimatedTime: '1-2 hours weekly'
      });
    }
    
    if (taskTitle.toLowerCase().includes('internship')) {
      recommendations.push({
        type: 'preparation',
        title: 'Internship Application Strategy',
        description: `As a ${year}, focus on ${getInternshipTiming(year)} applications. Tailor your approach for ${career} positions.`,
        priority: 'high',
        actionable: true,
        links: [
          { title: 'Resume Templates for Quants', url: '#' },
          { title: 'Finance Interview Prep', url: '#' }
        ],
        estimatedTime: '10-15 applications'
      });
    }
    
    // University-specific recommendations
    if (university === 'University of Virginia') {
      recommendations.push({
        type: 'resource',
        title: 'UVA-Specific Resources',
        description: `Leverage UVA's McIntire Investment Institute and connect with the Quantitative Finance Society. Prof. Smith's office hours are valuable for ${major} students.`,
        priority: 'medium',
        actionable: true,
        links: [
          { title: 'McIntire Resources', url: '#' },
          { title: 'UVA Quant Society', url: '#' }
        ]
      });
    }
    
    // Career-specific recommendations
    if (career === 'Quantitative Analyst') {
      recommendations.push({
        type: 'skill',
        title: 'Quantitative Skills Roadmap',
        description: 'Build a portfolio showcasing Monte Carlo simulations, risk modeling, and derivatives pricing. This differentiates you from generic finance candidates.',
        priority: 'high',
        actionable: true,
        estimatedTime: '1-2 projects'
      });
    }
    
    // Progress-based recommendations
    if (completedTasks.length > 5) {
      recommendations.push({
        type: 'project',
        title: 'Showcase Your Progress',
        description: "You've completed several key tasks! Consider creating a portfolio piece that demonstrates your growing expertise.",
        priority: 'medium',
        actionable: true,
        estimatedTime: '1 week'
      });
    }
    
    return recommendations.slice(0, 3); // Limit to 3 most relevant
  };
  
  const getInternshipTiming = (year: string): string => {
    switch (year) {
      case 'Freshman': return 'summer research program';
      case 'Sophomore': return 'early sophomore summer';
      case 'Junior': return 'junior summer (critical year)';
      case 'Senior': return 'full-time position';
      default: return 'appropriate timing';
    }
  };
  
  const getTypeIcon = (type: AIRecommendation['type']) => {
    switch (type) {
      case 'skill': return Brain;
      case 'resource': return BookOpen;
      case 'networking': return ExternalLink;
      case 'project': return Lightbulb;
      case 'preparation': return Brain;
      default: return Lightbulb;
    }
  };
  
  const getTypeColor = (type: AIRecommendation['type']) => {
    switch (type) {
      case 'skill': return 'bg-primary/10 text-primary border-primary/20';
      case 'resource': return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'networking': return 'bg-accent/10 text-accent border-accent/20';
      case 'project': return 'bg-muted/10 text-muted-foreground border-muted/20';
      case 'preparation': return 'bg-primary/10 text-primary border-primary/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };
  
  const recommendations = generateSmartRecommendations();
  
  if (recommendations.length === 0) {
    return (
      <Card className="bg-muted/20 border-muted/30">
        <CardContent className="p-4 text-center">
          <Brain className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            Keep working on your tasks! AI recommendations will appear as you progress.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-4">
      {recommendations.map((rec, index) => {
        const IconComponent = getTypeIcon(rec.type);
        return (
          <Card key={index} className="bg-gradient-to-r from-card/80 to-card/60 border-border/30 hover:shadow-md transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${getTypeColor(rec.type)}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-sm font-semibold">{rec.title}</CardTitle>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        rec.priority === 'high' ? 'border-red-500/50 text-red-400' :
                        rec.priority === 'medium' ? 'border-yellow-500/50 text-yellow-400' :
                        'border-green-500/50 text-green-400'
                      }`}
                    >
                      {rec.priority} priority
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {rec.description}
                  </p>
                </div>
              </div>
            </CardHeader>
            
            {(rec.links || rec.estimatedTime) && (
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {rec.links?.map((link, linkIndex) => (
                      <Button
                        key={linkIndex}
                        variant="outline"
                        size="sm"
                        className="text-xs h-6 px-2"
                      >
                        {link.title}
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    ))}
                  </div>
                  {rec.estimatedTime && (
                    <Badge variant="secondary" className="text-xs">
                      {rec.estimatedTime}
                    </Badge>
                  )}
                </div>
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default AIRecommendationEngine;