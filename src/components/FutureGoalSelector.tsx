import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { GraduationCap, Briefcase, MapPin } from "lucide-react";

interface FutureGoalSelectorProps {
  futureGoal: string;
  setFutureGoal: (goal: string) => void;
  graduateDegree: string;
  setGraduateDegree: (degree: string) => void;
}

const FutureGoalSelector = ({ 
  futureGoal, 
  setFutureGoal, 
  graduateDegree, 
  setGraduateDegree 
}: FutureGoalSelectorProps) => {
  const futureGoals = [
    { value: "direct-industry", label: "Direct to Industry", icon: Briefcase },
    { value: "graduate-studies", label: "Graduate Studies", icon: GraduationCap },
    { value: "gap-year", label: "Gap Year", icon: MapPin }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="futureGoal" className="text-lg font-medium">Future Goal After Graduation</Label>
        <Select value={futureGoal} onValueChange={setFutureGoal}>
          <SelectTrigger className="h-12 text-lg">
            <SelectValue placeholder="Select your post-graduation plan" />
          </SelectTrigger>
          <SelectContent>
            {futureGoals.map((goal) => {
              const IconComponent = goal.icon;
              return (
                <SelectItem key={goal.value} value={goal.value}>
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-4 h-4" />
                    {goal.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        
        <div className="text-sm text-muted-foreground">
          {futureGoal === "direct-industry" && "Your roadmap will emphasize interview prep, networking, and portfolio polish."}
          {futureGoal === "graduate-studies" && "Your roadmap will include grad school applications, research experience, and statement of purpose prep."}
          {futureGoal === "gap-year" && "Your roadmap will add fellowship applications, GRE prep, and short-term work options."}
        </div>
      </div>

      {futureGoal === "graduate-studies" && (
        <div className="space-y-3">
          <Label htmlFor="graduateDegree" className="text-lg font-medium">Graduate Degree/Field</Label>
          <Input
            id="graduateDegree"
            value={graduateDegree}
            onChange={(e) => setGraduateDegree(e.target.value)}
            placeholder="e.g., PhD in Physics, MBA, MS in Data Science"
            className="h-12 text-lg"
          />
          <div className="text-sm text-muted-foreground">
            Specify the graduate degree or field you're interested in pursuing.
          </div>
        </div>
      )}
    </div>
  );
};

export default FutureGoalSelector;