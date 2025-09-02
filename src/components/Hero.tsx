import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary-light/20 to-secondary-light/30">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Students planning their careers"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/60"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground leading-tight">
            Your Career Roadmap
            <span className="block text-4xl md:text-6xl bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
              Starts Here
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Stop wandering through countless websites. Get a personalized, semester-by-semester plan 
            that guides you from your major to your dream career with clear, actionable steps.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Button variant="accent" size="lg" className="text-lg px-8 py-4 h-auto">
              Create My Roadmap
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10">
              See How It Works
            </Button>
          </div>
          
          <div className="pt-12">
            <p className="text-primary-foreground/70 text-sm mb-4">
              Trusted by students at 200+ universities
            </p>
            <div className="flex justify-center space-x-8 opacity-60">
              {/* University logos would go here */}
              <div className="w-16 h-8 bg-primary-foreground/20 rounded"></div>
              <div className="w-16 h-8 bg-primary-foreground/20 rounded"></div>
              <div className="w-16 h-8 bg-primary-foreground/20 rounded"></div>
              <div className="w-16 h-8 bg-primary-foreground/20 rounded"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;