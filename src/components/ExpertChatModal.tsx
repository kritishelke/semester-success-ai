import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Crown, Calendar, ExternalLink, Star, Users, X, MessageCircle } from "lucide-react";
import PremiumModal from "./PremiumModal";

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

interface Message {
  id: string;
  sender: 'user' | 'expert' | 'system';
  content: string;
  timestamp: Date;
  type: 'text' | 'system';
}

interface ExpertChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  expert: Expert | null;
  userProfile: {
    majors: string[];
    career: string;
    university: string;
    year: string;
  };
}

const ExpertChatModal = ({ isOpen, onClose, expert, userProfile }: ExpertChatModalProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [hasInitialConnection, setHasInitialConnection] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize conversation when expert changes
  useEffect(() => {
    if (expert && isOpen) {
      const welcomeMessages: Message[] = [
        {
          id: '1',
          sender: 'system',
          content: `You're now connected with ${expert.name}`,
          timestamp: new Date(),
          type: 'system'
        },
        {
          id: '2', 
          sender: 'expert',
          content: `Hi! I'm ${expert.name.split(' ')[0]}, ${expert.title} at ${expert.company}. I see you're a ${userProfile.year} ${userProfile.majors.join('/')} major interested in ${userProfile.career}. I'd love to help you on your career journey! What questions do you have?`,
          timestamp: new Date(),
          type: 'text'
        }
      ];
      
      setMessages(welcomeMessages);
      setHasInitialConnection(true);
    }
  }, [expert, isOpen, userProfile]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !expert) return;

    // Check if premium message limit reached for non-premium experts
    if (!expert.isPremium && messages.filter(m => m.sender === 'user').length >= 3) {
      setShowPremiumModal(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: newMessage.trim(),
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate expert response
    setTimeout(() => {
      const responses = [
        "That's a great question! Based on my experience...",
        "I completely understand that challenge. When I was in your position...", 
        "Here's what I'd recommend based on what worked for me...",
        "That's exactly the kind of thinking that will serve you well in this field...",
        "I wish someone had told me this when I was a student...",
        "The key insight I've learned is...",
        "From my experience at {company}, I can tell you that...",
        "That's a common concern, and here's how I approached it..."
      ];

      const expertResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'expert',
        content: responses[Math.floor(Math.random() * responses.length)].replace('{company}', expert.company),
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, expertResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 2000);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!expert) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden bg-gradient-to-br from-card to-card/80">
          <DialogHeader className="border-b border-border/20 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={expert.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {getInitials(expert.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <DialogTitle className="text-lg flex items-center gap-2">
                    {expert.name}
                    {expert.isPremium && <Crown className="w-4 h-4 text-accent" />}
                  </DialogTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{expert.title} at {expert.company}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{expert.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  Schedule Call
                </Button>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>

          <div className="flex flex-1 overflow-hidden">
            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    message.type === 'system' ? (
                      <div key={message.id} className="text-center">
                        <Badge variant="secondary" className="text-xs">
                          {message.content}
                        </Badge>
                      </div>
                    ) : (
                      <div 
                        key={message.id} 
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md ${
                          message.sender === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted/50 text-foreground'
                        } rounded-lg px-4 py-2`}>
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === 'user' 
                              ? 'text-primary-foreground/70' 
                              : 'text-muted-foreground'
                          }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    )
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted/50 rounded-lg px-4 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Message Limits Warning */}
              {!expert.isPremium && messages.filter(m => m.sender === 'user').length >= 2 && (
                <div className="px-4 py-2 bg-muted/20 border-t border-border/20">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {3 - messages.filter(m => m.sender === 'user').length} messages remaining with {expert.name}
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs h-6"
                      onClick={() => setShowPremiumModal(true)}
                    >
                      <Crown className="w-3 h-3 mr-1" />
                      Upgrade for Unlimited
                    </Button>
                  </div>
                </div>
              )}

              {/* Message Input */}
              <div className="p-4 border-t border-border/20">
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Expert Info Sidebar */}
            <div className="w-80 border-l border-border/20 p-4 bg-muted/10">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">About {expert.name.split(' ')[0]}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{expert.bio}</p>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-1">
                    {expert.specialties.map(specialty => (
                      <Badge key={specialty} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">Background</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>• {expert.major} from {expert.university}</div>
                    <div>• {expert.title} at {expert.company}</div>
                    <div>• {expert.responseTime}</div>
                  </div>
                </div>

                <Card className="bg-card/50">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{expert.rating} rating</span>
                      </div>
                      <span className="text-muted-foreground">({expert.reviewCount} reviews)</span>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule 1:1 Call
                  </Button>
                  <Button variant="outline" className="w-full text-sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View LinkedIn
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <PremiumModal 
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        trigger="task-click"
      />
    </>
  );
};

export default ExpertChatModal;