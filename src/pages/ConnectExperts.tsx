import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ExpertsDirectory from "@/components/ExpertsDirectory";
import ExpertChatModal from "@/components/ExpertChatModal";
import { Users, Star, MessageCircle, Calendar, Crown, ArrowRight } from "lucide-react";

interface Expert {
  id: string;
  name: string;
  title: string;
  company: string;
  major: string;
  university: string;
  rating: number;
  reviewCount: number;
  responseTime: string;
  isPremium: boolean;
  avatar?: string;
  bio: string;
  specialties: string[];
}

const ConnectExperts = () => {
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [showChatModal, setShowChatModal] = useState(false);

  // Mock user profile - in real app this would come from auth context
  const userProfile = {
    majors: ["Physics", "Data Science"],
    minors: ["Mathematics"],
    career: "Quantitative Analyst",
    university: "University of Virginia",
    year: "Junior"
  };

  const handleExpertSelect = (expert: Expert) => {
    setSelectedExpert(expert);
    setShowChatModal(true);
  };

  const stats = [
    { label: "Industry Experts", value: "500+", icon: Users },
    { label: "Average Rating", value: "4.8", icon: Star },
    { label: "Response Time", value: "< 4hrs", icon: MessageCircle },
    { label: "Success Rate", value: "94%", icon: Crown }
  ];

  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            Connect with Industry Leaders
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Learn from Those Who've
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block">
              Made It
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Connect with alumni and industry professionals who share your academic background and career aspirations. 
            Get personalized guidance, insider tips, and mentorship from experts who've walked your path.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              <MessageCircle className="w-5 h-5 mr-2" />
              Start Connecting
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8">
              <Calendar className="w-5 h-5 mr-2" />
              Browse Mentors
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="bg-card/60 border-border/20 text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* How It Works */}
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20 mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">How Expert Connect Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">1. Browse Experts</h3>
                <p className="text-sm text-muted-foreground">
                  Find professionals who share your major, university, or career goals. Filter by industry, experience, and specialties.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="font-semibold mb-2">2. Start Conversations</h3>
                <p className="text-sm text-muted-foreground">
                  Send personalized messages to experts. Get advice on career paths, interview prep, and industry insights.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">3. Build Relationships</h3>
                <p className="text-sm text-muted-foreground">
                  Schedule calls, get resume reviews, and build long-term mentorship relationships that accelerate your career.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Success Story */}
        <Card className="bg-card/80 border-border/20 mb-16">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
                  Success Story
                </Badge>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  "Connected with my dream mentor in 24 hours"
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "As a UVA Physics major interested in quant finance, I was struggling to understand the career path. 
                  Through Timeline's expert network, I connected with Michael Rodriguez, a UVA alum now at Two Sigma. 
                  His guidance was invaluable - from course recommendations to interview prep. I just landed my dream internship!"
                </p>
                <div className="flex items-center gap-4">
                  <div>
                    <div className="font-semibold text-foreground">Sarah Kim</div>
                    <div className="text-sm text-muted-foreground">Junior, Physics Major</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="font-semibold text-foreground">Quantitative Analyst Intern</div>
                    <div className="text-sm text-muted-foreground">Jane Street Capital</div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-8 text-center">
                <div className="text-4xl font-bold text-primary mb-2">94%</div>
                <div className="text-sm text-muted-foreground mb-4">Success Rate</div>
                <div className="text-2xl font-bold text-secondary mb-2">&lt; 4 hours</div>
                <div className="text-sm text-muted-foreground mb-4">Average Response Time</div>
                <div className="text-2xl font-bold text-accent mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Industry Experts</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Premium Features Teaser */}
        <Card className="bg-gradient-to-r from-accent/5 to-primary/5 border-accent/20 mb-16">
          <CardContent className="p-8 text-center">
            <Crown className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-4">Unlock Premium Expert Access</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Premium members get unlimited messaging, priority responses, exclusive 1:1 video calls, 
              and access to our most elite professionals from top companies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90">
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Premium
              </Button>
              <Button variant="outline">
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Experts Directory */}
        <ExpertsDirectory 
          userProfile={userProfile}
          onExpertSelect={handleExpertSelect}
        />

        {/* Expert Chat Modal */}
        <ExpertChatModal
          isOpen={showChatModal}
          onClose={() => setShowChatModal(false)}
          expert={selectedExpert}
          userProfile={userProfile}
        />
      </div>
    </div>
  );
};

export default ConnectExperts;