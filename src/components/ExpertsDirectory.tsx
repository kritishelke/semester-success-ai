import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MapPin, Calendar, Star, MessageCircle, Crown, Users, Briefcase, GraduationCap, Filter } from "lucide-react";

interface Expert {
  id: string;
  name: string;
  title: string;
  company: string;
  major: string;
  university: string;
  graduationYear: number;
  careerField: string;
  location: string;
  experience: number;
  rating: number;
  reviewCount: number;
  specialties: string[];
  bio: string;
  avatar?: string;
  isPremium: boolean;
  responseTime: string;
  menteeCount: number;
  linkedinUrl?: string;
  calendlyUrl?: string;
}

interface ExpertsDirectoryProps {
  userProfile: {
    majors: string[];
    minors: string[];
    career: string;
    university: string;
    year: string;
  };
  onExpertSelect: (expert: Expert) => void;
}

const ExpertsDirectory = ({ userProfile, onExpertSelect }: ExpertsDirectoryProps) => {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [filteredExperts, setFilteredExperts] = useState<Expert[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMajor, setFilterMajor] = useState("all");
  const [filterCareer, setFilterCareer] = useState("all");
  const [filterUniversity, setFilterUniversity] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");

  // Mock expert data - in real app this would come from API
  useEffect(() => {
    const mockExperts: Expert[] = [
      {
        id: "1",
        name: "Sarah Chen",
        title: "Senior Software Engineer",
        company: "Google",
        major: "Computer Science",
        university: "Stanford University",
        graduationYear: 2018,
        careerField: "Technology",
        location: "Mountain View, CA",
        experience: 6,
        rating: 4.9,
        reviewCount: 47,
        specialties: ["Machine Learning", "System Design", "Career Transitions"],
        bio: "Transitioned from Physics to Software Engineering. Passionate about helping students navigate technical careers and break into FAANG companies.",
        isPremium: false,
        responseTime: "Usually responds in 2-3 hours",
        menteeCount: 23,
        linkedinUrl: "https://linkedin.com/in/sarahchen",
        calendlyUrl: "https://calendly.com/sarahchen"
      },
      {
        id: "2", 
        name: "Michael Rodriguez",
        title: "Quantitative Analyst",
        company: "Two Sigma",
        major: "Physics",
        university: "University of Virginia",
        graduationYear: 2019,
        careerField: "Finance",
        location: "New York, NY", 
        experience: 5,
        rating: 4.8,
        reviewCount: 32,
        specialties: ["Quantitative Finance", "Risk Management", "Python Programming", "Interview Prep"],
        bio: "UVA Physics grad now working in quantitative finance. Specialize in helping physics majors transition to finance roles.",
        isPremium: true,
        responseTime: "Usually responds within 1 hour",
        menteeCount: 15,
        linkedinUrl: "https://linkedin.com/in/mrodriguez",
        calendlyUrl: "https://calendly.com/mrodriguez"
      },
      {
        id: "3",
        name: "Dr. Emily Johnson",
        title: "Principal Product Manager", 
        company: "Microsoft",
        major: "Data Science",
        university: "University of Virginia",
        graduationYear: 2016,
        careerField: "Technology",
        location: "Seattle, WA",
        experience: 8,
        rating: 4.9,
        reviewCount: 61,
        specialties: ["Product Strategy", "Data Analysis", "Leadership", "MBA Guidance"],
        bio: "UVA Data Science alumna who transitioned into product management. Help students understand PM career paths and develop business acumen.",
        isPremium: true,
        responseTime: "Usually responds within 4 hours",
        menteeCount: 31,
        linkedinUrl: "https://linkedin.com/in/emilyjohnson"
      },
      {
        id: "4",
        name: "James Park",
        title: "Data Scientist",
        company: "Netflix",
        major: "Statistics",
        university: "University of California - Berkeley",
        graduationYear: 2020,
        careerField: "Technology",
        location: "Los Gatos, CA",
        experience: 4,
        rating: 4.7,
        reviewCount: 28,
        specialties: ["Machine Learning", "A/B Testing", "SQL", "Python"],
        bio: "Berkeley Statistics grad working in streaming recommendation systems. Love helping students break into data science roles.",
        isPremium: false,
        responseTime: "Usually responds within 6 hours",
        menteeCount: 18
      },
      {
        id: "5",
        name: "Amanda Foster",
        title: "Investment Banking Analyst",
        company: "Goldman Sachs",
        major: "Economics",
        university: "University of Virginia", 
        graduationYear: 2021,
        careerField: "Finance",
        location: "New York, NY",
        experience: 3,
        rating: 4.6,
        reviewCount: 19,
        specialties: ["Investment Banking", "Financial Modeling", "Networking", "Interview Prep"],
        bio: "Recent UVA Econ grad in investment banking. Passionate about helping students understand finance career paths and prepare for recruiting.",
        isPremium: false,
        responseTime: "Usually responds within 8 hours", 
        menteeCount: 12
      },
      {
        id: "6",
        name: "Dr. Robert Kim",
        title: "Research Scientist",
        company: "OpenAI",
        major: "Physics",
        university: "MIT",
        graduationYear: 2015,
        careerField: "Research",
        location: "San Francisco, CA",
        experience: 9,
        rating: 5.0,
        reviewCount: 43,
        specialties: ["AI Research", "PhD Guidance", "Academic Writing", "Grant Applications"],
        bio: "MIT Physics PhD working on AI research. Help students navigate graduate school applications and research careers.",
        isPremium: true,
        responseTime: "Usually responds within 3 hours",
        menteeCount: 27
      }
    ];
    
    setExperts(mockExperts);
    setFilteredExperts(mockExperts);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...experts];
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(expert => 
        expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expert.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expert.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Major filter
    if (filterMajor !== "all") {
      filtered = filtered.filter(expert => expert.major === filterMajor);
    }
    
    // Career filter  
    if (filterCareer !== "all") {
      filtered = filtered.filter(expert => expert.careerField === filterCareer);
    }
    
    // University filter
    if (filterUniversity !== "all") {
      filtered = filtered.filter(expert => expert.university === filterUniversity);
    }
    
    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "experience":
          return b.experience - a.experience;
        case "reviews":
          return b.reviewCount - a.reviewCount;
        case "relevance":
        default:
          // Relevance: prioritize same university, major, career field
          let aScore = 0;
          let bScore = 0;
          
          if (a.university === userProfile.university) aScore += 3;
          if (b.university === userProfile.university) bScore += 3;
          
          if (userProfile.majors.includes(a.major)) aScore += 2;
          if (userProfile.majors.includes(b.major)) bScore += 2;
          
          if (a.careerField.toLowerCase().includes(userProfile.career.toLowerCase())) aScore += 1;
          if (b.careerField.toLowerCase().includes(userProfile.career.toLowerCase())) bScore += 1;
          
          return bScore - aScore;
      }
    });
    
    setFilteredExperts(filtered);
  }, [experts, searchTerm, filterMajor, filterCareer, filterUniversity, sortBy, userProfile]);

  const getUniqueValues = (key: keyof Expert) => {
    return Array.from(new Set(experts.map(expert => expert[key] as string))).sort();
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  };

  const getRelevanceScore = (expert: Expert) => {
    let score = 0;
    if (expert.university === userProfile.university) score += 3;
    if (userProfile.majors.includes(expert.major)) score += 2; 
    if (expert.careerField.toLowerCase().includes(userProfile.career.toLowerCase())) score += 1;
    return score;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Connect with Industry Experts</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Get personalized guidance from professionals who have walked your path. Filter by your major, career goals, and university.
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="bg-card/80 border-border/20">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search experts, companies, skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            {/* Major Filter */}
            <Select value={filterMajor} onValueChange={setFilterMajor}>
              <SelectTrigger>
                <SelectValue placeholder="Major" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Majors</SelectItem>
                {getUniqueValues('major').map(major => (
                  <SelectItem key={major} value={major}>{major}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Career Filter */}
            <Select value={filterCareer} onValueChange={setFilterCareer}>
              <SelectTrigger>
                <SelectValue placeholder="Career Field" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Fields</SelectItem>
                {getUniqueValues('careerField').map(field => (
                  <SelectItem key={field} value={field}>{field}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="experience">Experience</SelectItem>
                <SelectItem value="reviews">Reviews</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Filter Summary */}
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="w-4 h-4" />
            <span>Showing {filteredExperts.length} of {experts.length} experts</span>
            {(filterMajor !== "all" || filterCareer !== "all" || searchTerm) && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setSearchTerm("");
                  setFilterMajor("all");
                  setFilterCareer("all");
                  setFilterUniversity("all");
                }}
                className="text-xs h-6"
              >
                Clear filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Experts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperts.map((expert) => {
          const relevanceScore = getRelevanceScore(expert);
          
          return (
            <Card 
              key={expert.id} 
              className={`bg-card/80 border-border/20 hover:shadow-lg transition-all duration-300 ${
                relevanceScore >= 4 ? 'ring-2 ring-primary/20' : ''
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={expert.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {getInitials(expert.name)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground truncate">{expert.name}</h3>
                      {expert.isPremium && (
                        <Crown className="w-4 h-4 text-accent flex-shrink-0" />
                      )}
                      {relevanceScore >= 4 && (
                        <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                          Great Match
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm font-medium text-muted-foreground truncate">
                      {expert.title}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {expert.company}
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{expert.rating} ({expert.reviewCount})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{expert.menteeCount} mentees</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    <span>{expert.experience}y exp</span>
                  </div>
                </div>
                
                {/* Education & Location */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <GraduationCap className="w-3 h-3" />
                    <span>{expert.major}, {expert.university} '{expert.graduationYear.toString().slice(-2)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span>{expert.location}</span>
                  </div>
                </div>
                
                {/* Specialties */}
                <div className="flex flex-wrap gap-1">
                  {expert.specialties.slice(0, 3).map(specialty => (
                    <Badge key={specialty} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                  {expert.specialties.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{expert.specialties.length - 3} more
                    </Badge>
                  )}
                </div>
                
                {/* Bio */}
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {expert.bio}
                </p>
                
                {/* Response Time */}
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MessageCircle className="w-3 h-3" />
                  <span>{expert.responseTime}</span>
                </div>
                
                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    className="flex-1 text-xs"
                    onClick={() => onExpertSelect(expert)}
                  >
                    <MessageCircle className="w-3 h-3 mr-1" />
                    Connect
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {filteredExperts.length === 0 && (
        <Card className="bg-card/40 border-border/20">
          <CardContent className="p-12 text-center">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No experts found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find more experts.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ExpertsDirectory;