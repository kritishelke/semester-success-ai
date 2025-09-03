import { cn } from "@/lib/utils";

interface ProgressRingProps {
  progress: number; // 0-100
  size?: "sm" | "md" | "lg";
  className?: string;
  showPercentage?: boolean;
}

const ProgressRing = ({ progress, size = "md", className, showPercentage = false }: ProgressRingProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16"
  };
  
  const strokeWidths = {
    sm: 2,
    md: 3,
    lg: 4
  };
  
  const radii = {
    sm: 14,
    md: 18,
    lg: 24
  };
  
  const strokeWidth = strokeWidths[size];
  const radius = radii[size];
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  const getProgressColor = (progress: number) => {
    if (progress === 0) return "stroke-muted-foreground/30";
    return "stroke-green-500";
  };

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      <svg
        className="w-full h-full transform -rotate-90"
        viewBox="0 0 40 40"
      >
        {/* Background circle */}
        <circle
          cx="20"
          cy="20"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-muted/20"
        />
        
        {/* Progress circle */}
        <circle
          cx="20"
          cy="20"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={cn(
            "transition-all duration-500 ease-out",
            getProgressColor(progress)
          )}
        />
      </svg>
      
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn(
            "font-semibold text-foreground",
            size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base"
          )}>
            {Math.round(progress)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default ProgressRing;