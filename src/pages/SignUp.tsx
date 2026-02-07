import { useState, useRef, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Mail, 
  Lock, 
  Upload, 
  FileText, 
  X, 
  MapPin, 
  Briefcase,
  Sparkles,
  Plus,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const availabilityOptions = [
  { value: "student", label: "Student" },
  { value: "professional", label: "Professional" },
  { value: "open-to-team", label: "Open to Team" },
];

const roleOptions = [
  { value: "ml-engineer", label: "ML Engineer" },
  { value: "data-scientist", label: "Data Scientist" },
  { value: "backend-developer", label: "Backend Developer" },
  { value: "frontend-developer", label: "Frontend Developer" },
  { value: "fullstack-developer", label: "Fullstack Developer" },
  { value: "mobile-developer", label: "Mobile App Developer" },
  { value: "game-developer", label: "Game Developer" },
  { value: "devops-engineer", label: "DevOps Engineer" },
  { value: "cloud-engineer", label: "Cloud Engineer" },
  { value: "cybersecurity-engineer", label: "Cybersecurity Engineer" },
  { value: "blockchain-developer", label: "Blockchain Developer" },
  { value: "embedded-systems", label: "Embedded Systems Engineer" },
  { value: "iot-engineer", label: "IoT Engineer" },
  { value: "systems-engineer", label: "Systems Engineer" },
  { value: "automation-engineer", label: "Automation Engineer" },
  { value: "ar-vr-developer", label: "AR/VR Developer" },
  { value: "ui-ux-designer", label: "UI/UX Designer" },
  { value: "product-manager", label: "Product Manager" },
  { value: "technical-writer", label: "Technical Writer" },
];

export default function SignUp() {
  const navigate = useNavigate();
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [email, setEmail] = useState("");
  const [accountContinued, setAccountContinued] = useState(false);
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [availability, setAvailability] = useState("");
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or DOC file",
          variant: "destructive",
        });
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      setResumeFile(file);
    }
  };

  const handleAddSkill = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      const newSkill = skillInput.trim();
      if (!skills.includes(newSkill)) {
        setSkills([...skills, newSkill]);
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleContinue = () => {
    if (!email || !password) {
      toast({
        title: "Missing required fields",
        description: "Please fill in email and password to continue",
        variant: "destructive",
      });
      return;
    }
    setAccountContinued(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !fullName) {
      toast({
        title: "Missing required fields",
        description: "Please fill in email, password, and full name",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Profile created!",
      description: "Welcome to HackPilot",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Create Your Developer Profile</h1>
          <p className="text-muted-foreground mt-2">Join the community and start building amazing projects</p>
        </div>

        <Card className="border-0 shadow-xl shadow-primary/5 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section 1 - Account Credentials */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                  <Mail className="w-4 h-4 text-primary" />
                  <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                    Account Credentials
                  </h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-11 rounded-lg"
                        disabled={accountContinued}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 h-11 rounded-lg"
                        disabled={accountContinued}
                      />
                    </div>
                  </div>
                </div>
                {!accountContinued && (
                  <Button
                    type="button"
                    onClick={handleContinue}
                    className="w-full h-11 rounded-lg gap-2"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {/* Section 2 - Personal Information */}
              <div className={cn("space-y-4 transition-opacity duration-300", !accountContinued && "opacity-50 pointer-events-none")}>
                <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                    Personal Information
                  </h2>
                  {!accountContinued && (
                    <span className="ml-auto text-xs text-muted-foreground">Complete credentials to unlock</span>
                  )}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="h-11 rounded-lg"
                      disabled={!accountContinued}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="location"
                        placeholder="San Francisco, CA"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="pl-10 h-11 rounded-lg"
                        disabled={!accountContinued}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="headline">Professional Headline</Label>
                  <Input
                    id="headline"
                    placeholder="ML Engineer | Computer Vision"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="h-11 rounded-lg"
                    disabled={!accountContinued}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself, your interests, and what you're passionate about..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="min-h-[100px] rounded-lg resize-none"
                    disabled={!accountContinued}
                  />
                </div>
              </div>

              {/* Section 3 - Media Uploads */}
              <div className={cn("space-y-4 transition-opacity duration-300", !accountContinued && "opacity-50 pointer-events-none")}>
                <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                  <Upload className="w-4 h-4 text-primary" />
                  <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                    Media Uploads
                  </h2>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Avatar Upload */}
                  <div className="space-y-3">
                    <Label>Profile Avatar</Label>
                    <div className="flex items-center gap-4">
                      <Avatar className="w-20 h-20 border-2 border-dashed border-border">
                        {avatarPreview ? (
                          <AvatarImage src={avatarPreview} alt="Avatar preview" />
                        ) : (
                          <AvatarFallback className="bg-muted">
                            <Mail className="w-8 h-8 text-muted-foreground" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className="flex-1">
                        <input
                          ref={avatarInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarUpload}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => avatarInputRef.current?.click()}
                          className="w-full"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Photo
                        </Button>
                        <p className="text-xs text-muted-foreground mt-1">
                          JPG, PNG up to 5MB
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Resume Upload */}
                  <div className="space-y-3">
                    <Label>Resume</Label>
                    <div className="flex flex-col gap-2">
                      <input
                        ref={resumeInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => resumeInputRef.current?.click()}
                        className="h-20 border-dashed flex-col gap-2"
                      >
                        <FileText className="w-6 h-6 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {resumeFile ? resumeFile.name : "Upload PDF or DOC"}
                        </span>
                      </Button>
                      {resumeFile && (
                        <div className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                          <span className="text-sm truncate">{resumeFile.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => setResumeFile(null)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4 - Professional Details */}
              <div className={cn("space-y-4 transition-opacity duration-300", !accountContinued && "opacity-50 pointer-events-none")}>
                <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                    Professional Details
                  </h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Current Availability</Label>
                    <Select value={availability} onValueChange={setAvailability}>
                      <SelectTrigger className="h-11 rounded-lg">
                        <SelectValue placeholder="Select your status" />
                      </SelectTrigger>
                      <SelectContent>
                        {availabilityOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Primary Role</Label>
                    <Select value={role} onValueChange={setRole}>
                      <SelectTrigger className="h-11 rounded-lg">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roleOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Section 5 - Skills */}
              <div className={cn("space-y-4 transition-opacity duration-300", !accountContinued && "opacity-50 pointer-events-none")}>
                <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                    Skills
                  </h2>
                </div>
                <div className="space-y-3">
                  <div className="relative">
                    <Plus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Type a skill and press Enter (e.g., Python, React, TensorFlow)"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={handleAddSkill}
                      className="pl-10 h-11 rounded-lg"
                    />
                  </div>
                  {skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 p-3 bg-muted/30 rounded-lg min-h-[60px]">
                      {skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="px-3 py-1.5 gap-1.5 text-sm font-medium"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="ml-1 hover:text-destructive transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 text-base font-semibold rounded-lg"
                >
                  Create Profile
                </Button>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="text-primary hover:underline font-medium"
                    onClick={() => navigate("/")}
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
