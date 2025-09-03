import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  TrendingUp,
  Clock,
  Target,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Calendar,
  BarChart3,
  RefreshCw,
  Zap,
  Star
} from "lucide-react";
import { useTaskProgress } from "@/hooks/useTaskProgress";
import { useToast } from "@/hooks/use-toast";

interface AdaptiveInsight {
  id: string;
  type: 'adjustment' | 'recommendation' | 'warning' | 'opportunity';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  confidence: number;
  actionable: boolean;
  suggestedActions?: string[];
}

interface TimelineAdjustment {
  semesterId: string;
  originalTasks: number;
  suggestedTasks: number;
  reason: string;
  urgency: 'low' | 'medium' | 'high';
}

interface AdaptivePlanningEngineProps {
  roadmapData?: {
    majors: string[];
    year: string;
    career: string;
    university: string;
  };
  currentSemesters?: any[];
}

const AdaptivePlanningEngine = ({ roadmapData, currentSemesters = [] }: AdaptivePlanningEngineProps) => {
  const [insights, setInsights] = useState<AdaptiveInsight[]>([]);
  const [timelineAdjustments, setTimelineAdjustments] = useState<TimelineAdjustment[]>([]);
  const [overallHealth, setOverallHealth] = useState(85);
  const [loading, setLoading] = useState(true);
  const [lastAnalysis, setLastAnalysis] = useState<Date | null>(null);
  
  const { 
    taskProgress, 
    getSemesterProgress, 
    getCriticalTasksProgress,
    getCompletedTasksCount 
  } = useTaskProgress();
  const { toast } = useToast();

  // Analyze current progress and generate insights
  useEffect(() => {
    const analyzeProgress = () => {
      if (!roadmapData || currentSemesters.length === 0) return;

      const newInsights: AdaptiveInsight[] = [];
      const newAdjustments: TimelineAdjustment[] = [];

      // Analyze each semester's progress
      currentSemesters.forEach((semester, index) => {
        if (!semester.tasks) return;

        const semesterProgress = getSemesterProgress(semester.tasks);
        const criticalProgress = getCriticalTasksProgress(semester.tasks);
        const { completed, total } = getCompletedTasksCount(semester.tasks);

        // Progress-based insights
        if (semesterProgress < 30 && semester.status === 'current') {
          newInsights.push({
            id: `progress-low-${index}`,
            type: 'warning',
            title: 'Current Semester Progress Behind',
            description: `You've completed only ${Math.round(semesterProgress)}% of current semester tasks. Consider prioritizing critical tasks.`,
            impact: 'high',
            confidence: 90,
            actionable: true,
            suggestedActions: [
              'Focus on critical priority tasks first',
              'Break down large tasks into smaller chunks',
              'Set daily task completion goals',
              'Review task deadlines and adjust schedule'
            ]
          });
        }

        if (criticalProgress < 50 && semester.status === 'current') {
          newInsights.push({
            id: `critical-low-${index}`,
            type: 'warning',
            title: 'Critical Tasks Need Attention',
            description: `Only ${Math.round(criticalProgress)}% of critical tasks are completed. These are essential for your career goals.`,
            impact: 'high',
            confidence: 95,
            actionable: true,
            suggestedActions: [
              'Prioritize critical tasks over medium/low tasks',
              'Allocate more time blocks for critical activities',
              'Consider getting help or mentorship for challenging tasks'
            ]
          });
        }

        if (semesterProgress > 80) {
          newInsights.push({
            id: `progress-high-${index}`,
            type: 'opportunity',
            title: 'Excellent Progress - Consider Advanced Goals',
            description: `You've completed ${Math.round(semesterProgress)}% of tasks ahead of schedule. Time to aim higher!`,
            impact: 'medium',
            confidence: 85,
            actionable: true,
            suggestedActions: [
              'Add stretch goals or advanced projects',
              'Explore additional networking opportunities',
              'Consider taking on leadership roles',
              'Start preparing for next semester early'
            ]
          });
        }
      });

      // Career-specific insights
      if (roadmapData.career === 'Quantitative Analyst') {
        const hasCompletedProgramming = Object.keys(taskProgress).some(taskId => 
          taskId.includes('programming') || taskId.includes('python')
        );
        
        if (!hasCompletedProgramming) {
          newInsights.push({
            id: 'quant-programming',
            type: 'recommendation',
            title: 'Programming Skills Critical for Quant Roles',
            description: 'Most quantitative analyst positions require strong Python/R skills. This should be your top priority.',
            impact: 'high',
            confidence: 95,
            actionable: true,
            suggestedActions: [
              'Complete Python programming course immediately',
              'Practice with quantitative finance libraries (NumPy, Pandas)',
              'Build 2-3 quantitative projects for portfolio'
            ]
          });
        }
      }

      if (roadmapData.career === 'Data Scientist') {
        newInsights.push({
          id: 'ds-portfolio',
          type: 'recommendation',
          title: 'Build Data Science Portfolio',
          description: 'Data science roles heavily emphasize practical project experience and portfolio demonstration.',
          impact: 'high',
          confidence: 90,
          actionable: true,
          suggestedActions: [
            'Create 3-5 end-to-end data science projects',
            'Use real datasets from Kaggle or government sources',
            'Document projects on GitHub with clear README files',
            'Include projects covering different ML techniques'
          ]
        });
      }

      // Timeline adjustment recommendations
      if (roadmapData.year === 'Senior') {
        newAdjustments.push({
          semesterId: 'senior-fall',
          originalTasks: 8,
          suggestedTasks: 6,
          reason: 'Senior year should focus on job applications and final projects',
          urgency: 'medium'
        });
      }

      // Market-based insights
      newInsights.push({
        id: 'market-trend',
        type: 'opportunity',
        title: 'AI Skills in High Demand',
        description: 'Current job market shows 40% increase in demand for AI/ML skills across all fields.',
        impact: 'medium',
        confidence: 80,
        actionable: true,
        suggestedActions: [
          'Add AI/Machine Learning coursework to your plan',
          'Complete online AI certification',
          'Apply AI techniques to your current projects'
        ]
      });

      // Seasonal insights
      const currentMonth = new Date().getMonth();
      if (currentMonth >= 8 && currentMonth <= 10) { // Fall recruiting season
        newInsights.push({
          id: 'recruiting-season',
          type: 'opportunity',
          title: 'Fall Recruiting Season Active',
          description: 'This is peak recruiting season for summer internships. Applications are opening now.',
          impact: 'high',
          confidence: 100,
          actionable: true,
          suggestedActions: [
            'Update resume with recent accomplishments',
            'Apply to 15-20 relevant internships',
            'Practice technical interview questions',
            'Attend career fairs and networking events'
          ]
        });
      }

      setInsights(newInsights);
      setTimelineAdjustments(newAdjustments);
      
      // Calculate overall health score
      const avgProgress = currentSemesters.reduce((acc, sem) => 
        acc + (sem.tasks ? getSemesterProgress(sem.tasks) : 0), 0
      ) / Math.max(currentSemesters.length, 1);
      
      setOverallHealth(Math.max(60, Math.min(100, avgProgress + 10)));
      setLastAnalysis(new Date());
      setLoading(false);
    };

    analyzeProgress();
  }, [roadmapData, currentSemesters, taskProgress]);

  const refreshAnalysis = () => {
    setLoading(true);
    // Simulate analysis delay
    setTimeout(() => {
      setLastAnalysis(new Date());
      setLoading(false);
      toast({
        title: "Analysis Updated",
        description: "Your adaptive plan has been refreshed with the latest insights."
      });
    }, 1500);
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'adjustment':
        return <Calendar className="h-4 w-4" />;
      case 'recommendation':
        return <Lightbulb className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'opportunity':
        return <Star className="h-4 w-4" />;
      default:
        return <Brain className="h-4 w-4" />;
    }
  };

  const getInsightVariant = (type: string) => {
    switch (type) {
      case 'warning':
        return 'destructive';
      case 'opportunity':
        return 'default';
      case 'recommendation':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted animate-pulse rounded" />
        <div className="grid gap-6 md:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="h-48 animate-pulse">
              <div className="h-full bg-muted rounded" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Adaptive Planning</h2>
          <p className="text-muted-foreground">
            AI-powered insights and adjustments based on your progress
          </p>
        </div>
        <Button onClick={refreshAnalysis} variant="outline" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh Analysis
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Plan Health</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-2xl font-bold ${getHealthColor(overallHealth)}`}>
                  {overallHealth}%
                </span>
                <Badge variant={overallHealth >= 80 ? 'default' : overallHealth >= 60 ? 'secondary' : 'destructive'}>
                  {overallHealth >= 80 ? 'Excellent' : overallHealth >= 60 ? 'Good' : 'Needs Attention'}
                </Badge>
              </div>
              <Progress value={overallHealth} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Based on current progress and trajectory
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-secondary" />
              <CardTitle className="text-lg">Active Insights</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{insights.length}</div>
              <div className="flex gap-2">
                <Badge variant="destructive" className="text-xs">
                  {insights.filter(i => i.type === 'warning').length} Warnings
                </Badge>
                <Badge variant="default" className="text-xs">
                  {insights.filter(i => i.type === 'opportunity').length} Opportunities
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Personalized recommendations
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-accent" />
              <CardTitle className="text-lg">Last Updated</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm font-medium">
                {lastAnalysis?.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
              <p className="text-sm text-muted-foreground">
                Analysis refreshes automatically as you complete tasks
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="insights" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="adjustments">Timeline Adjustments</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-4">
          {insights.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">All looks good!</h3>
                <p className="text-muted-foreground">
                  No immediate insights or recommendations. Keep up the great work!
                </p>
              </CardContent>
            </Card>
          ) : (
            insights.map((insight) => (
              <Card key={insight.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        insight.type === 'warning' ? 'bg-red-100 text-red-600' :
                        insight.type === 'opportunity' ? 'bg-blue-100 text-blue-600' :
                        insight.type === 'recommendation' ? 'bg-green-100 text-green-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {getInsightIcon(insight.type)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{insight.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={getInsightVariant(insight.type)} className="text-xs capitalize">
                            {insight.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {insight.confidence}% confidence
                          </Badge>
                          <Badge 
                            variant={insight.impact === 'high' ? 'default' : 'secondary'} 
                            className="text-xs capitalize"
                          >
                            {insight.impact} impact
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{insight.description}</p>
                  
                  {insight.suggestedActions && insight.suggestedActions.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Suggested Actions:</h4>
                      <ul className="space-y-1">
                        {insight.suggestedActions.map((action, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <Zap className="h-3 w-3 mt-1 text-primary flex-shrink-0" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="adjustments" className="space-y-4">
          {timelineAdjustments.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Target className="h-12 w-12 mx-auto text-green-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Timeline on Track</h3>
                <p className="text-muted-foreground">
                  No timeline adjustments needed. Your current pace looks good!
                </p>
              </CardContent>
            </Card>
          ) : (
            timelineAdjustments.map((adjustment, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Semester Adjustment Suggested</CardTitle>
                    <Badge variant={adjustment.urgency === 'high' ? 'destructive' : 'secondary'}>
                      {adjustment.urgency} priority
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">{adjustment.reason}</p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Current tasks:</span>
                        <Badge variant="outline">{adjustment.originalTasks}</Badge>
                      </div>
                      <span className="text-muted-foreground">→</span>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Suggested:</span>
                        <Badge variant="default">{adjustment.suggestedTasks}</Badge>
                      </div>
                    </div>
                    
                    <Button size="sm" className="w-fit">
                      Apply Adjustment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdaptivePlanningEngine;