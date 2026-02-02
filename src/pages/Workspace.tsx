import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Plus,
  ChevronRight,
  Users,
  Search as SearchIcon,
  Lightbulb,
  FileText,
  Code,
  Sparkles,
  Clock,
  CheckCircle2,
  Circle
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";


interface Project {
  id: number;
  name: string;
  hackathon: string;
  stage: number;
  stageLabel: string;
  members: number;
  deadline: string;
  daysLeft: number;
  progress: number;
}

const initialProjects: Project[] = [
  {
    id: 1,
    name: "AI Mental Health Companion",
    hackathon: "AI Innovation Challenge 2026",
    stage: 3,
    stageLabel: "Ideation",
    members: 4,
    deadline: "Feb 15, 2026",
    daysLeft: 13,
    progress: 45,
  },
  {
    id: 2,
    name: "EcoTrack 2.0",
    hackathon: "Climate Tech Sprint",
    stage: 1,
    stageLabel: "Manage Team",
    members: 2,
    deadline: "Feb 28, 2026",
    daysLeft: 26,
    progress: 15,
  },
];

const stages = [
  { id: 1, name: "Manage Team", icon: Users, description: "Build your dream team" },
  { id: 2, name: "Research", icon: SearchIcon, description: "Gather insights" },
  { id: 3, name: "Ideation", icon: Lightbulb, description: "Brainstorm solutions" },
  { id: 4, name: "PRD", icon: FileText, description: "Define requirements" },
  { id: 5, name: "Implementation", icon: Code, description: "Build & ship" },
];

export default function Workspace() {
  const location = useLocation();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  // Handle new project from Explore page
  useEffect(() => {
    const state = location.state as { newProject?: { hackathonId: number; hackathonName: string; deadline: string; daysLeft: number } } | null;
    
    if (state?.newProject) {
      const { hackathonName, deadline, daysLeft } = state.newProject;
      
      // Create a new project
      const newProject: Project = {
        id: Date.now(),
        name: "New Project",
        hackathon: hackathonName,
        stage: 1,
        stageLabel: "Manage Team",
        members: 1,
        deadline,
        daysLeft,
        progress: 0,
      };
      
      setProjects(prev => [newProject, ...prev]);
      setSelectedProject(newProject.id);
      
      // Clear the navigation state to prevent re-creating on refresh
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.state, navigate, location.pathname]);

  if (selectedProject) {
    const project = projects.find(p => p.id === selectedProject);
    if (project) {
      return <ProjectWorkspace projectId={selectedProject} project={project} onBack={() => setSelectedProject(null)} />;
    }
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold mb-2"
            >
              AI <span className="text-gradient">Co-Pilot</span> Workspace
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground"
            >
              Manage your hackathon projects with AI-powered assistance
            </motion.p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              onClick={() => setSelectedProject(project.id)}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{project.hackathon}</p>
                </div>
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  {project.stageLabel}
                </Badge>
              </div>

              {/* Progress Stepper */}
              <div className="flex items-center gap-1 mb-4">
                {stages.map((stage, i) => (
                  <div key={stage.id} className="flex items-center flex-1">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0",
                      i + 1 < project.stage && "bg-success text-success-foreground",
                      i + 1 === project.stage && "bg-primary text-primary-foreground",
                      i + 1 > project.stage && "bg-secondary text-muted-foreground"
                    )}>
                      {i + 1 < project.stage ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        i + 1
                      )}
                    </div>
                    {i < stages.length - 1 && (
                      <div className={cn(
                        "h-0.5 flex-1 mx-1",
                        i + 1 < project.stage ? "bg-success" : "bg-secondary"
                      )} />
                    )}
                  </div>
                ))}
              </div>

              {/* Meta */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {project.members} members
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {project.daysLeft} days left
                  </span>
                </div>
                <Button variant="ghost" size="sm" className="gap-1 group-hover:text-primary">
                  Open
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </MainLayout>
  );
}

// Project Workspace Component
interface ProjectWorkspaceProps {
  projectId: number;
  project: Project;
  onBack: () => void;
}

function ProjectWorkspace({ project, onBack }: ProjectWorkspaceProps) {
  const [currentStage, setCurrentStage] = useState(project.stage);

  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{project.name}</h1>
            <p className="text-sm text-muted-foreground">{project.hackathon}</p>
          </div>
          <Badge className="gap-1 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-3 h-3" />
            AI Co-Pilot Active
          </Badge>
        </div>

        {/* Stage Stepper */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            {stages.map((stage, i) => {
              const StageIcon = stage.icon;
              const isCompleted = i + 1 < currentStage;
              const isCurrent = i + 1 === currentStage;
              
              return (
                <div key={stage.id} className="flex items-center flex-1">
                  <button
                    onClick={() => i + 1 <= currentStage && setCurrentStage(i + 1)}
                    disabled={i + 1 > currentStage}
                    className={cn(
                      "flex flex-col items-center gap-2 px-4 py-2 rounded-lg transition-all",
                      isCurrent && "bg-primary/10",
                      i + 1 <= currentStage && "cursor-pointer hover:bg-secondary",
                      i + 1 > currentStage && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center",
                      isCompleted && "bg-success text-success-foreground",
                      isCurrent && "bg-primary text-primary-foreground glow-primary",
                      !isCompleted && !isCurrent && "bg-secondary text-muted-foreground"
                    )}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <StageIcon className="w-5 h-5" />
                      )}
                    </div>
                    <div className="text-center">
                      <p className={cn(
                        "font-medium text-sm",
                        isCurrent && "text-primary"
                      )}>
                        {stage.name}
                      </p>
                      <p className="text-xs text-muted-foreground hidden sm:block">
                        {stage.description}
                      </p>
                    </div>
                  </button>
                  {i < stages.length - 1 && (
                    <div className={cn(
                      "h-0.5 flex-1 mx-2",
                      isCompleted ? "bg-success" : "bg-secondary"
                    )} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Stage Content */}
        <StageContent stage={currentStage} onAdvance={() => setCurrentStage(prev => Math.min(prev + 1, 5))} />
      </div>
    </MainLayout>
  );
}

interface StageContentProps {
  stage: number;
  onAdvance: () => void;
}

function StageContent({ stage, onAdvance }: StageContentProps) {
  switch (stage) {
    case 1:
      return <ManageTeamStage onAdvance={onAdvance} />;
    case 2:
      return <ResearchStage onAdvance={onAdvance} />;
    case 3:
      return <IdeationStage onAdvance={onAdvance} />;
    case 4:
      return <PRDStage onAdvance={onAdvance} />;
    case 5:
      return <ImplementationStage />;
    default:
      return null;
  }
}

// Stage 1: Manage Team
function ManageTeamStage({ onAdvance }: { onAdvance: () => void }) {
  const [showAnalysis, setShowAnalysis] = useState(false);

  const teamMembers = [
    { id: 1, name: "Alex Chen", role: "Full Stack Developer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex" },
    { id: 2, name: "Sarah Kim", role: "ML Engineer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah" },
    { id: 3, name: "Marcus Johnson", role: "Frontend Developer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus" },
    { id: 4, name: "Emily Zhang", role: "Backend Developer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily" },
  ];

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Team Members */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Team Members</h3>
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Member
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-medium text-sm">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Problem Statement */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold mb-4">Problem Statement</h3>
          <textarea
            placeholder="Define the problem you're solving..."
            className="w-full h-32 bg-secondary/50 border border-border rounded-lg p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
            defaultValue="Build an AI-powered mental health companion that provides personalized support and resources to users based on their emotional state and needs."
          />
        </div>

        <div className="flex items-center gap-4">
          <Button onClick={() => setShowAnalysis(true)} variant="outline" className="gap-2">
            <Sparkles className="w-4 h-4" />
            Analyze Team with AI
          </Button>
          <Button onClick={onAdvance} className="gap-2">
            Next Stage
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* AI Analysis Sidebar */}
      {showAnalysis && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">AI Analysis</h3>
          </div>
          
          <div className="space-y-4">
            <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
              <p className="text-sm font-medium text-success">Team Strengths</p>
              <p className="text-xs text-muted-foreground mt-1">Strong frontend and backend coverage. ML expertise present.</p>
            </div>
            
            <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <p className="text-sm font-medium text-warning">Missing Roles</p>
              <p className="text-xs text-muted-foreground mt-1">Consider adding a UX Designer for better user experience.</p>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Recommended Profiles</p>
              <div className="space-y-2">
                {[
                  { name: "David Park", role: "Product Designer" },
                  { name: "Lisa Wang", role: "UX Researcher" },
                ].map((rec) => (
                  <div key={rec.name} className="flex items-center justify-between p-2 bg-secondary/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-muted" />
                      <div>
                        <p className="text-sm font-medium">{rec.name}</p>
                        <p className="text-xs text-muted-foreground">{rec.role}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Invite</Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button onClick={onAdvance} className="w-full mt-6">
            Continue to Research
          </Button>
        </motion.div>
      )}
    </div>
  );
}

// Stage 2: Research
function ResearchStage({ onAdvance }: { onAdvance: () => void }) {
  const researchTasks = [
    { id: 1, member: "Alex Chen", topic: "Existing mental health apps analysis", completed: true },
    { id: 2, member: "Sarah Kim", topic: "NLP sentiment analysis techniques", completed: true },
    { id: 3, member: "Marcus Johnson", topic: "Accessibility standards for mental health apps", completed: false },
    { id: 4, member: "Emily Zhang", topic: "Data privacy and HIPAA compliance", completed: false },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-semibold mb-4">Research Tasks</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {researchTasks.map((task) => (
            <div key={task.id} className="p-4 bg-secondary/50 border border-border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center",
                  task.completed ? "bg-success" : "bg-muted"
                )}>
                  {task.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-success-foreground" />
                  ) : (
                    <Circle className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                <span className="text-sm font-medium">{task.member}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{task.topic}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">Upload PDF</Button>
                <Button variant="outline" size="sm" className="flex-1">View</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button onClick={onAdvance} className="gap-2">
          Continue to Ideation
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

// Stage 3: Ideation
function IdeationStage({ onAdvance }: { onAdvance: () => void }) {
  const questions = [
    { id: 1, question: "What is the core problem you're solving?", answer: "Many people lack access to affordable mental health support. We're building an AI companion that provides 24/7 personalized support." },
    { id: 2, question: "Who is your target audience?", answer: "Young adults (18-35) who experience anxiety, stress, or mild depression but may not have access to or cannot afford traditional therapy." },
    { id: 3, question: "What makes your solution unique?", answer: "" },
    { id: 4, question: "What are the key features?", answer: "" },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Questions Panel */}
      <div className="space-y-4">
        <h3 className="font-semibold">Brainstorming Questions</h3>
        {questions.map((q) => (
          <div key={q.id} className="bg-card border border-border rounded-xl p-4">
            <p className="text-sm font-medium mb-2">{q.id}. {q.question}</p>
            <textarea
              placeholder="Your answer..."
              defaultValue={q.answer}
              className="w-full h-24 bg-secondary/50 border border-border rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        ))}
      </div>

      {/* Project Pitch */}
      <div className="space-y-4">
        <h3 className="font-semibold">Project Pitch</h3>
        <div className="bg-card border border-border rounded-xl p-6 h-[calc(100%-2rem)]">
          <p className="text-sm text-muted-foreground mb-4">
            Summarize your complete project including architecture, tech stack, and user flow.
          </p>
          <textarea
            placeholder="Write your complete project pitch here..."
            className="w-full h-64 bg-secondary/50 border border-border rounded-lg p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <div className="flex gap-2 mt-4">
            <Button variant="outline" className="gap-2">
              <Sparkles className="w-4 h-4" />
              AI Suggestions
            </Button>
            <Button onClick={onAdvance} className="gap-2 ml-auto">
              Generate PRD
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stage 4: PRD
function PRDStage({ onAdvance }: { onAdvance: () => void }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold">Product Requirements Document</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Download</Button>
          <Button variant="outline" size="sm">Share</Button>
        </div>
      </div>
      
      <div className="prose prose-sm prose-invert max-w-none">
        <div className="bg-secondary/50 rounded-lg p-6 font-mono text-sm">
          <h4 className="text-primary font-bold mb-4"># AI Mental Health Companion - PRD</h4>
          
          <p className="text-muted-foreground mb-4">## Overview</p>
          <p className="mb-4">An AI-powered mental health companion app that provides personalized emotional support, coping strategies, and resources to users experiencing stress, anxiety, or mild depression.</p>
          
          <p className="text-muted-foreground mb-4">## Technical Architecture</p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Frontend: React + TypeScript + Tailwind CSS</li>
            <li>Backend: Node.js + Express + PostgreSQL</li>
            <li>AI: OpenAI GPT-4 API for NLP</li>
            <li>Infrastructure: Vercel + Supabase</li>
          </ul>
          
          <p className="text-muted-foreground mb-4">## Core Features</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>AI-powered chat interface with empathetic responses</li>
            <li>Mood tracking and sentiment analysis</li>
            <li>Personalized coping strategies</li>
            <li>Resource recommendations</li>
            <li>Progress tracking dashboard</li>
          </ul>
        </div>
      </div>
      
      <div className="flex justify-end mt-6">
        <Button onClick={onAdvance} className="gap-2">
          Start Implementation
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

// Stage 5: Implementation
function ImplementationStage() {
  const tasks = [
    { id: 1, member: "Alex Chen", role: "Full Stack", tasks: [
      { name: "Set up project structure", done: true },
      { name: "Configure authentication", done: true },
      { name: "Implement API routes", done: false },
    ]},
    { id: 2, member: "Sarah Kim", role: "ML Engineer", tasks: [
      { name: "Set up OpenAI integration", done: true },
      { name: "Implement sentiment analysis", done: false },
      { name: "Train custom prompts", done: false },
    ]},
    { id: 3, member: "Marcus Johnson", role: "Frontend", tasks: [
      { name: "Build chat UI", done: true },
      { name: "Create dashboard", done: true },
      { name: "Add animations", done: false },
    ]},
    { id: 4, member: "Emily Zhang", role: "Backend", tasks: [
      { name: "Design database schema", done: true },
      { name: "Set up Supabase", done: true },
      { name: "Implement RLS policies", done: false },
    ]},
  ];

  const totalTasks = tasks.reduce((acc, m) => acc + m.tasks.length, 0);
  const completedTasks = tasks.reduce((acc, m) => acc + m.tasks.filter(t => t.done).length, 0);
  const progress = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="space-y-6">
      {/* Progress Dashboard */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Team Progress</h3>
          <Badge className="bg-primary/10 text-primary border-primary/20">
            {progress}% Complete
          </Badge>
        </div>
        <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-primary to-success rounded-full"
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          {completedTasks} of {totalTasks} tasks completed
        </p>
      </div>

      {/* Task Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {tasks.map((member) => (
          <div key={member.id} className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.member.split(' ')[0].toLowerCase()}`} 
                alt={member.member} 
                className="w-10 h-10 rounded-full" 
              />
              <div>
                <p className="font-medium">{member.member}</p>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
              <Badge variant="secondary" className="ml-auto">
                {member.tasks.filter(t => t.done).length}/{member.tasks.length}
              </Badge>
            </div>
            <div className="space-y-2">
              {member.tasks.map((task, i) => (
                <div key={i} className="flex items-center gap-2 p-2 bg-secondary/50 rounded-lg">
                  <div className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                    task.done ? "bg-success" : "border border-muted-foreground"
                  )}>
                    {task.done && <CheckCircle2 className="w-3 h-3 text-success-foreground" />}
                  </div>
                  <span className={cn("text-sm", task.done && "line-through text-muted-foreground")}>
                    {task.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
