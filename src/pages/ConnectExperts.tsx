import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Star, MapPin, Briefcase, GraduationCap } from "lucide-react";

const ConnectExperts = () => {
  const experts = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Senior Software Engineer",
      company: "Google",
      major: "Computer Science",
      minor: "Data Science",
      university: "Stanford University",
      rating: 4.9,
      sessions: 127,
      location: "San Francisco, CA",
      expertise: ["Software Engineering", "Technical Interviews", "Career Growth"],
      bio: "5+ years at Google, specialized in helping CS majors transition to big tech companies.",
      price: "$50/session"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Investment Banking VP",
      company: "Goldman Sachs",
      major: "Finance",
      minor: "Economics", 
      university: "University of Pennsylvania",
      rating: 4.8,
      sessions: 89,
      location: "New York, NY",
      expertise: ["Investment Banking", "Financial Analysis", "Networking"],
      bio: "Former analyst turned VP, expert in finance career paths and Wall Street transitions.",
      price: "$75/session"
    },
    {
      id: 3,
      name: "Dr. Emily Johnson",
      role: "Product Manager",
      company: "Microsoft",
      major: "Psychology",
      minor: "Business Administration",
      university: "Harvard University", 
      rating: 4.9,
      sessions: 156,
      location: "Seattle, WA",
      expertise: ["Product Management", "User Research", "Career Pivoting"],
      bio: "Psychology major who transitioned to tech PM. Helps students leverage diverse backgrounds.",
      price: "$60/session"
    }
  ];

  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Connect with Experts
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Get personalized guidance from professionals who share your academic background
            and career aspirations. Connect with experts in your field who have the same
            major and minor combinations to receive targeted mentorship and advice.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge variant="secondary" className="text-sm py-2 px-4">
              Same Major/Minor Match
            </Badge>
            <Badge variant="secondary" className="text-sm py-2 px-4">
              Industry Experts
            </Badge>
            <Badge variant="secondary" className="text-sm py-2 px-4">
              1-on-1 Mentorship
            </Badge>
          </div>
        </div>

        {/* Expert Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {experts.map((expert) => (
            <Card key={expert.id} className="bg-card/80 backdrop-blur-sm border-border/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={`/api/placeholder/64/64`} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {expert.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-xl text-foreground">{expert.name}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {expert.role} at {expert.company}
                    </CardDescription>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        <span className="text-sm font-semibold text-foreground">{expert.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({expert.sessions} sessions)</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground">{expert.university}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground">{expert.major}</span>
                    {expert.minor && (
                      <span className="text-sm text-muted-foreground">• {expert.minor}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground">{expert.location}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-foreground">Expertise:</h4>
                  <div className="flex flex-wrap gap-2">
                    {expert.expertise.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{expert.bio}</p>

                <div className="flex items-center justify-between pt-4">
                  <span className="text-lg font-bold text-accent">{expert.price}</span>
                  <Button size="sm" className="gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Connect
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How It Works Section */}
        <div className="bg-card/50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            How Expert Matching Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Share Your Profile
              </h3>
              <p className="text-muted-foreground">
                Tell us your major, minor, university, and career goals to find the perfect expert match.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Get Matched
              </h3>
              <p className="text-muted-foreground">
                Our algorithm connects you with experts who have your exact academic background and career path.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Schedule & Chat
              </h3>
              <p className="text-muted-foreground">
                Book 1-on-1 sessions for personalized mentorship, career advice, and networking opportunities.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Connect with Your Mentor?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students who have accelerated their career growth through expert mentorship.
          </p>
          <Button size="lg" className="text-lg py-6 px-12">
            Find My Expert Match
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConnectExperts;