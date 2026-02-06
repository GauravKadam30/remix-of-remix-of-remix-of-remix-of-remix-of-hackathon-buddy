import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AIProvider } from "@/contexts/AIContext";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import CreateTeam from "./pages/CreateTeam";
import UserProfile from "./pages/UserProfile";
import Messages from "./pages/Messages";
import Workspace from "./pages/Workspace";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AIProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/create-team" element={<CreateTeam />} />
            <Route path="/profile/:id" element={<UserProfile />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/workspace" element={<Workspace />} />
            <Route path="/signup" element={<SignUp />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AIProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
