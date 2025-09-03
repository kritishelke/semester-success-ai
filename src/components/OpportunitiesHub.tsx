import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  ExternalLink, 
  Briefcase, 
  GraduationCap, 
  DollarSign, 
  Calendar,
  MapPin,
  Clock,
  Star,
  Bookmark,
  BookmarkCheck
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Opportunity {
  id: string;
  title: string;
  company: string;
  type: 'internship' | 'job' | 'scholarship' | 'course' | 'research' | 'competition';
  location: string;
  salary?: string;
  deadline: string;
  description: string;
  requirements: string[];
  tags: string[];
  relevanceScore: number;
  isBookmarked?: boolean;
  applyUrl?: string;
}

interface OpportunitiesHubProps {
  roadmapData?: {
    majors: string[];
    minors: string[];
    year: string;
    career: string;
    university: string;
    preProfessional?: string;
    futureGoal?: string;
    graduateDegree?: string;
  };
}

const OpportunitiesHub = ({ roadmapData }: OpportunitiesHubProps) => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Generate contextual opportunities based on roadmap data
  useEffect(() => {
    const generateOpportunities = () => {
      if (!roadmapData) return [];

      const major = roadmapData.majors[0];
      const career = roadmapData.career;
      const year = roadmapData.year;
      const university = roadmapData.university;

      const baseOpportunities: Opportunity[] = [
        // Internships
        {
          id: "intern-1",
          title: "Quantitative Analyst Summer Intern",
          company: "Two Sigma",
          type: "internship",
          location: "New York, NY",
          salary: "$8,000/month",
          deadline: "March 15, 2024",
          description: "Work on cutting-edge quantitative research and trading strategies using advanced mathematical models.",
          requirements: ["Strong math/physics background", "Python/R programming", "3.5+ GPA"],
          tags: ["Quantitative Finance", "Machine Learning", "Python"],
          relevanceScore: major === "Physics" && career === "Quantitative Analyst" ? 95 : 70,
          applyUrl: "https://careers.twosigma.com"
        },
        {
          id: "intern-2", 
          title: "Data Science Intern",
          company: "Google",
          type: "internship",
          location: "Mountain View, CA",
          salary: "$7,500/month",
          deadline: "February 28, 2024",
          description: "Apply machine learning techniques to solve real-world problems at scale.",
          requirements: ["CS/Data Science background", "Python/SQL", "ML experience"],
          tags: ["Data Science", "Machine Learning", "Big Tech"],
          relevanceScore: career === "Data Scientist" ? 90 : 75,
          applyUrl: "https://careers.google.com"
        },
        {
          id: "intern-3",
          title: "Physics Research Intern",
          company: "National Institute of Standards",
          type: "research",
          location: "Boulder, CO",
          salary: "$4,500/month",
          deadline: "April 1, 2024",
          description: "Conduct cutting-edge physics research in quantum computing and condensed matter.",
          requirements: ["Physics major", "Research experience", "3.7+ GPA"],
          tags: ["Physics", "Research", "Quantum Computing"],
          relevanceScore: major === "Physics" ? 85 : 40,
          applyUrl: "https://www.nist.gov/careers"
        },

        // Full-time jobs
        {
          id: "job-1",
          title: "Quantitative Researcher",
          company: "Citadel",
          type: "job",
          location: "Chicago, IL",
          salary: "$180,000 - $250,000",
          deadline: "Rolling",
          description: "Design and implement quantitative trading strategies using advanced statistical methods.",
          requirements: ["PhD in Physics/Math preferred", "5+ years experience", "Advanced programming"],
          tags: ["Quantitative Finance", "Trading", "Research"],
          relevanceScore: career === "Quantitative Analyst" && year === "Senior" ? 92 : 60,
          applyUrl: "https://careers.citadel.com"
        },
        {
          id: "job-2",
          title: "Senior Data Scientist",
          company: "Netflix",
          type: "job",
          location: "Los Gatos, CA", 
          salary: "$160,000 - $220,000",
          deadline: "Rolling",
          description: "Lead data-driven decision making to enhance user experience and content recommendations.",
          requirements: ["MS/PhD preferred", "3+ years DS experience", "Python, R, SQL"],
          tags: ["Data Science", "Machine Learning", "Streaming"],
          relevanceScore: career === "Data Scientist" && year === "Senior" ? 88 : 55,
          applyUrl: "https://jobs.netflix.com"
        },

        // Scholarships
        {
          id: "scholar-1",
          title: "National Science Foundation Fellowship",
          company: "NSF",
          type: "scholarship",
          location: "Nationwide",
          salary: "$37,000 stipend",
          deadline: "October 25, 2024",
          description: "Graduate research fellowship for students pursuing STEM PhD programs.",
          requirements: ["US Citizen", "Pursuing STEM PhD", "Strong academic record"],
          tags: ["Graduate School", "STEM", "Research"],
          relevanceScore: major === "Physics" && roadmapData.futureGoal?.includes("PhD") ? 90 : 45,
          applyUrl: "https://www.nsfgrfp.org"
        },
        {
          id: "scholar-2",
          title: "Goldwater Scholarship",
          company: "Goldwater Foundation",
          type: "scholarship",
          location: "Nationwide",
          salary: "$7,500",
          deadline: "January 27, 2024",
          description: "Premier undergraduate scholarship for future research careers in STEM.",
          requirements: ["Sophomore/Junior", "STEM major", "Research experience", "3.5+ GPA"],
          tags: ["Undergraduate", "STEM", "Research"],
          relevanceScore: major === "Physics" && (year === "Sophomore" || year === "Junior") ? 85 : 30,
          applyUrl: "https://goldwaterscholarship.gov"
        },

        // Courses & Certifications
        {
          id: "course-1",
          title: "Certificate in Quantitative Finance (CQF)",
          company: "CQF Institute",
          type: "course",
          location: "Online",
          salary: "$18,000",
          deadline: "Rolling admissions",
          description: "Comprehensive program covering mathematical finance, derivatives pricing, and risk management.",
          requirements: ["Math/Physics/Engineering background", "Programming skills"],
          tags: ["Finance", "Certification", "Online"],
          relevanceScore: career === "Quantitative Analyst" ? 80 : 35,
          applyUrl: "https://www.cqf.com"
        },
        {
          id: "course-2",
          title: "Machine Learning Specialization",
          company: "Stanford/Coursera",
          type: "course",
          location: "Online",
          salary: "$49/month",
          deadline: "Self-paced",
          description: "Comprehensive ML course covering supervised learning, neural networks, and practical applications.",
          requirements: ["Basic programming", "Linear algebra", "Calculus"],
          tags: ["Machine Learning", "Online", "Stanford"],
          relevanceScore: career === "Data Scientist" ? 75 : 60,
          applyUrl: "https://www.coursera.org/specializations/machine-learning"
        },

        // Competitions
        {
          id: "comp-1",
          title: "Kaggle Competition: Quantum ML Challenge",
          company: "Kaggle",
          type: "competition",
          location: "Online",
          salary: "$50,000 prize pool",
          deadline: "June 15, 2024",
          description: "Apply machine learning to quantum computing problems with real datasets.",
          requirements: ["ML experience", "Python", "Basic quantum computing knowledge"],
          tags: ["Competition", "Machine Learning", "Quantum"],
          relevanceScore: major === "Physics" && career === "Data Scientist" ? 88 : 65,
          applyUrl: "https://www.kaggle.com/competitions"
        }
      ];

      // Sort by relevance score
      return baseOpportunities.sort((a, b) => b.relevanceScore - a.relevanceScore);
    };

    const mockOpportunities = generateOpportunities();
    
    // Load bookmarked status from localStorage
    const savedBookmarks = localStorage.getItem('opportunity-bookmarks');
    const bookmarkedIds = savedBookmarks ? JSON.parse(savedBookmarks) : [];
    
    const opportunitiesWithBookmarks = mockOpportunities.map(opp => ({
      ...opp,
      isBookmarked: bookmarkedIds.includes(opp.id)
    }));
    
    setOpportunities(opportunitiesWithBookmarks);
    setLoading(false);
  }, [roadmapData]);

  // Filter opportunities
  useEffect(() => {
    let filtered = opportunities.filter(opp => {
      const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           opp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           opp.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesType = typeFilter === "all" || opp.type === typeFilter;
      const matchesLocation = locationFilter === "all" || opp.location.includes(locationFilter);
      const matchesBookmark = !bookmarkedOnly || opp.isBookmarked;
      
      return matchesSearch && matchesType && matchesLocation && matchesBookmark;
    });

    setFilteredOpportunities(filtered);
  }, [opportunities, searchTerm, typeFilter, locationFilter, bookmarkedOnly]);

  const toggleBookmark = (opportunityId: string) => {
    const updatedOpportunities = opportunities.map(opp => 
      opp.id === opportunityId 
        ? { ...opp, isBookmarked: !opp.isBookmarked }
        : opp
    );
    
    setOpportunities(updatedOpportunities);
    
    // Save to localStorage
    const bookmarkedIds = updatedOpportunities
      .filter(opp => opp.isBookmarked)
      .map(opp => opp.id);
    localStorage.setItem('opportunity-bookmarks', JSON.stringify(bookmarkedIds));
    
    toast({
      title: updatedOpportunities.find(opp => opp.id === opportunityId)?.isBookmarked 
        ? "Bookmarked!" 
        : "Bookmark removed",
      description: "You can view your bookmarked opportunities anytime."
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'internship':
      case 'job':
        return <Briefcase className="h-4 w-4" />;
      case 'scholarship':
        return <DollarSign className="h-4 w-4" />;
      case 'course':
        return <GraduationCap className="h-4 w-4" />;
      case 'research':
        return <Star className="h-4 w-4" />;
      case 'competition':
        return <Star className="h-4 w-4" />;
      default:
        return <Briefcase className="h-4 w-4" />;
    }
  };

  const getRelevanceBadge = (score: number) => {
    if (score >= 85) return <Badge variant="default" className="bg-primary">Perfect Match</Badge>;
    if (score >= 70) return <Badge variant="secondary">Great Fit</Badge>;
    if (score >= 50) return <Badge variant="outline">Good Match</Badge>;
    return null;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted animate-pulse rounded" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="h-64 animate-pulse">
              <div className="h-full bg-muted rounded" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Opportunities Hub</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover personalized internships, jobs, scholarships, and learning opportunities tailored to your roadmap
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="internship">Internships</SelectItem>
                <SelectItem value="job">Full-time Jobs</SelectItem>
                <SelectItem value="scholarship">Scholarships</SelectItem>
                <SelectItem value="course">Courses</SelectItem>
                <SelectItem value="research">Research</SelectItem>
                <SelectItem value="competition">Competitions</SelectItem>
              </SelectContent>
            </Select>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="New York">New York</SelectItem>
                <SelectItem value="California">California</SelectItem>
                <SelectItem value="Chicago">Chicago</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
                <SelectItem value="Online">Online</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant={bookmarkedOnly ? "default" : "outline"}
              onClick={() => setBookmarkedOnly(!bookmarkedOnly)}
              className="flex items-center gap-2"
            >
              {bookmarkedOnly ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
              Bookmarked
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Opportunities Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredOpportunities.map((opportunity) => (
          <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getTypeIcon(opportunity.type)}
                  <Badge variant="outline" className="capitalize">
                    {opportunity.type}
                  </Badge>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => toggleBookmark(opportunity.id)}
                  className="p-1 h-auto"
                >
                  {opportunity.isBookmarked ? (
                    <BookmarkCheck className="h-4 w-4 text-primary" />
                  ) : (
                    <Bookmark className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              <div className="space-y-2">
                <CardTitle className="text-lg leading-tight">{opportunity.title}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-medium">{opportunity.company}</span>
                  {getRelevanceBadge(opportunity.relevanceScore)}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <CardDescription className="line-clamp-2">
                {opportunity.description}
              </CardDescription>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{opportunity.location}</span>
                </div>
                
                {opportunity.salary && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>{opportunity.salary}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Deadline: {opportunity.deadline}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {opportunity.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1">
                  View Details
                </Button>
                {opportunity.applyUrl && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={opportunity.applyUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOpportunities.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground mb-4">
              <Search className="h-12 w-12 mx-auto opacity-50" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No opportunities found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search terms to find more opportunities.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OpportunitiesHub;