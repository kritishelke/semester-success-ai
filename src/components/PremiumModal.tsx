import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Crown, Star, Users, Briefcase } from "lucide-react";

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  trigger: "sneak-peek" | "task-click" | "completion";
}

const PremiumModal = ({ isOpen, onClose, trigger }: PremiumModalProps) => {
  const getModalContent = () => {
    switch (trigger) {
      case "sneak-peek":
        return {
          title: "👀 Sneak Peek: Want to see the full roadmap ahead?",
          description: "You've got the roadmap for this term — but your future is waiting. Premium gives you:",
          features: [
            "Full visibility into all semesters & summers",
            "Adaptive re-planning based on your progress", 
            "Early access to internships, conferences, and mentors"
          ]
        };
      case "task-click":
        return {
          title: "Unlock Your Next Semester",
          description: "Premium unlocks all future semesters, adaptive updates, and expert connections.",
          features: [
            "Complete roadmap visibility",
            "AI-powered task recommendations",
            "Connect with industry experts",
            "Curated opportunity marketplace"
          ]
        };
      case "completion":
        return {
          title: "Ready for What's Next?",
          description: "Great job checking off your tasks! Unlock your next steps to keep momentum going.",
          features: [
            "See your upcoming semester tasks",
            "Track progress across all terms",
            "Get personalized recommendations"
          ]
        };
      default:
        return {
          title: "Upgrade to Premium",
          description: "Unlock the full Timeline experience",
          features: ["Full roadmap access", "Progress tracking", "Expert connections"]
        };
    }
  };

  const content = getModalContent();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-card to-card/80 border-primary/20">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {content.title}
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            {content.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-3">
            {content.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Star className="w-3 h-3 text-primary" />
                </div>
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Plan smarter, not harder. Premium gives you the full roadmap, adaptive updates, and expert connections — all in one place.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <Button 
            variant="default" 
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold"
          >
            <Crown className="w-4 h-4 mr-2" />
            Upgrade to Premium
          </Button>
          <Button 
            variant="ghost" 
            onClick={onClose}
            className="w-full text-muted-foreground hover:text-foreground"
          >
            Not now — I'll stick with the sneak peek
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumModal;