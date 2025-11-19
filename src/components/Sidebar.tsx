'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  User,
  Home,
  Briefcase,
  Plus,
  ChevronDown,
  Settings,
  LogOut,
  LayoutDashboard,
  FileText,
  Brain,
  TrendingUp,
  ShoppingCart,
  Calendar,
  DollarSign,
  BarChart3,
  FolderOpen,
  Users,
  Search,
  ChevronLeft,
  ChevronRight,
  Store,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWorkspaceStore } from '@/lib/store/workspace-store';

interface SidebarProps {
  currentWorkspace?: string;
  onWorkspaceChange?: (workspace: string) => void;
  onLogout?: () => void;
}

export function Sidebar({ currentWorkspace = "Personal", onWorkspaceChange, onLogout }: SidebarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCreatePanelOpen, setIsCreatePanelOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { isCollapsed, setCollapsed } = useWorkspaceStore();

  const families = [
    "The Smiths",
    "Parents' House"
  ];

  const teams = [
    "Dev Team Alpha",
    "Marketing Squad"
  ];

  // Determine workspace type
  const getWorkspaceType = (workspace: string): 'PERSONAL' | 'FAMILY' | 'TEAM' => {
    if (workspace === 'Personal' || workspace === 'Me (Indie Mode)') return 'PERSONAL';
    if (families.includes(workspace)) return 'FAMILY';
    if (teams.includes(workspace)) return 'TEAM';
    return 'PERSONAL'; // default
  };

  // Get navigation items based on workspace type
  const getNavItems = (type: 'PERSONAL' | 'FAMILY' | 'TEAM') => {
    switch (type) {
      case 'PERSONAL':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', link: '/dashboard' },
          { icon: FileText, label: 'Daily Notes', link: '/notes' },
          { icon: Brain, label: 'Second Brain', link: '/knowledge' },
          { icon: TrendingUp, label: 'Moods', link: '/mood-tracker' },
          { icon: Store, label: 'Asset Shop', link: '/shop' },
          { icon: User, label: 'Profile', link: '/profile' }
        ];
      case 'FAMILY':
        return [
          { icon: Home, label: 'Family Home', link: '/family-home' },
          { icon: ShoppingCart, label: 'Grocery List', link: '/groceries' },
          { icon: Calendar, label: 'Calendar', link: '/calendar' },
          { icon: DollarSign, label: 'Budget', link: '/finance' },
          { icon: MessageSquare, label: 'Chat', link: '/chat' }
        ];
      case 'TEAM':
        return [
          { icon: BarChart3, label: 'Overview', link: '/team-overview' },
          { icon: FolderOpen, label: 'Projects', link: '/projects' },
          { icon: Users, label: 'Members', link: '/people' },
          { icon: MessageSquare, label: 'Chat', link: '/chat' }
        ];
      default:
        return [];
    }
  };

  const workspaceType = getWorkspaceType(currentWorkspace);
  const navItems = getNavItems(workspaceType);

  const getWorkspaceIcon = (workspace: string) => {
    const type = getWorkspaceType(workspace);
    switch (type) {
      case 'PERSONAL': return <User className="w-4 h-4" />;
      case 'FAMILY': return <Home className="w-4 h-4" />;
      case 'TEAM': return <Briefcase className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };



  return (
    <>
      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed left-0 top-0 bottom-0 flex flex-col bg-black/40 backdrop-blur-xl border-r border-white/10 transition-all duration-300 ease-in-out z-40",
          isCollapsed ? "w-20" : "w-72"
        )}
      >
        {/* Section A: Workspace Switcher */}
        <div className="p-4 border-b border-white/10">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-haspopup="menu"
            aria-expanded={isDropdownOpen}
            className={cn(
              "w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group",
              isCollapsed ? "justify-center" : "justify-between"
            )}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-900/20">
                {getWorkspaceIcon(currentWorkspace)}
              </div>
              {!isCollapsed && (
                <div className="flex flex-col items-start min-w-0">
                  <span className="text-sm font-medium text-white truncate w-full text-left">{currentWorkspace}</span>
                  <span className="text-xs text-white/50 truncate w-full text-left">{workspaceType} Workspace</span>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <ChevronDown className={cn(
                "w-4 h-4 text-white/40 group-hover:text-white/80 transition-transform duration-200",
                isDropdownOpen && "rotate-180"
              )} />
            )}
          </button>

          {/* Dropdown Overlay */}
          {isDropdownOpen && !isCollapsed && (
            <div className="absolute top-[72px] left-4 right-4 bg-[#0C0F16] rounded-xl border border-white/10 shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
              <div className="p-2 border-b border-white/10 bg-white/5">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-white/40" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Find workspace..."
                    className="w-full pl-8 pr-3 py-1.5 bg-black/20 rounded-md text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                  />
                </div>
              </div>

              <div className="max-h-[300px] overflow-y-auto py-1">
                <div className="px-2 py-1">
                  <button
                    onClick={() => {
                      onWorkspaceChange?.("Personal");
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/5 text-left group"
                  >
                    <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-white/60 group-hover:text-white group-hover:bg-white/20 transition-colors">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm text-white/80 group-hover:text-white">Me (Indie Mode)</span>
                  </button>
                </div>

                {families.length > 0 && (
                  <div className="px-2 py-1">
                    <div className="px-2 py-1 text-[10px] font-semibold text-white/30 uppercase tracking-wider">Families</div>
                    {families
                      .filter(f => f.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((family) => (
                        <button
                          key={family}
                          onClick={() => {
                            onWorkspaceChange?.(family);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/5 text-left group"
                        >
                          <div className="w-6 h-6 rounded bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                            <Home className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-sm text-white/80 group-hover:text-white">{family}</span>
                        </button>
                      ))}
                  </div>
                )}

                {teams.length > 0 && (
                  <div className="px-2 py-1">
                    <div className="px-2 py-1 text-[10px] font-semibold text-white/30 uppercase tracking-wider">Teams</div>
                    {teams
                      .filter(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((team) => (
                        <button
                          key={team}
                          onClick={() => {
                            onWorkspaceChange?.(team);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/5 text-left group"
                        >
                          <div className="w-6 h-6 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                            <Briefcase className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-sm text-white/80 group-hover:text-white">{team}</span>
                        </button>
                      ))}
                  </div>
                )}
              </div>

              <div className="p-2 border-t border-white/10 bg-white/5">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-white/60 hover:text-white hover:bg-white/5"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setIsCreatePanelOpen(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Workspace
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Section B: Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          {navItems.map((item) => (
            <Link key={item.label} href={item.link} className="block">
              <button
                title={isCollapsed ? item.label : undefined}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                  "hover:bg-white/10 text-white/60 hover:text-white",
                  isCollapsed ? "justify-center" : ""
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 transition-colors",
                  "group-hover:text-blue-400"
                )} />
                {!isCollapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </button>
            </Link>
          ))}
        </div>

        {/* Section C: Footer */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <button
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-white/60 hover:text-white hover:bg-white/10",
              isCollapsed ? "justify-center" : ""
            )}
            title="Settings"
          >
            <Settings className="w-5 h-5" />
            {!isCollapsed && <span className="text-sm font-medium">Settings</span>}
          </button>

          <button
            onClick={onLogout}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-red-400/80 hover:text-red-400 hover:bg-red-500/10",
              isCollapsed ? "justify-center" : ""
            )}
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!isCollapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#0C0F16] border border-white/20 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all shadow-lg z-50"
        >
          {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </aside>

      {/* Create Workspace Modal */}
      {isCreatePanelOpen && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#0C0F16] rounded-2xl border border-white/10 w-full max-w-2xl shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 className="text-xl font-semibold text-white">Create New Workspace</h2>
                <p className="text-sm text-white/60 mt-1">Set up a shared space for your family or team.</p>
              </div>
              <button
                onClick={() => setIsCreatePanelOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              >
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement & { name: { value: string }; type: { value: string }; description: { value: string } };
                const name = form.name.value.trim();
                if (!name) return;

                onWorkspaceChange?.(name);
                setIsCreatePanelOpen(false);
                setCollapsed(false);
              }}
              className="p-6 space-y-6"
            >
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-white/80 mb-2 block">Workspace Name</label>
                  <input
                    name="name"
                    required
                    placeholder="e.g., The Smith Family, Engineering Team"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white/80 mb-2 block">Workspace Type</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="relative group cursor-pointer">
                      <input type="radio" name="type" value="FAMILY" defaultChecked className="peer sr-only" />
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 peer-checked:border-blue-500/50 peer-checked:bg-blue-500/10 transition-all group-hover:border-white/20">
                        <Home className="w-6 h-6 text-purple-400 mb-3" />
                        <div className="font-medium text-white">Family</div>
                        <div className="text-xs text-white/50 mt-1">Shared calendar, groceries, and notes</div>
                      </div>
                    </label>
                    <label className="relative group cursor-pointer">
                      <input type="radio" name="type" value="TEAM" className="peer sr-only" />
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 peer-checked:border-blue-500/50 peer-checked:bg-blue-500/10 transition-all group-hover:border-white/20">
                        <Briefcase className="w-6 h-6 text-emerald-400 mb-3" />
                        <div className="font-medium text-white">Team</div>
                        <div className="text-xs text-white/50 mt-1">Projects, tasks, and collaboration</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-white/80 mb-2 block">Description <span className="text-white/40 font-normal">(Optional)</span></label>
                  <textarea
                    name="description"
                    placeholder="What's this workspace for?"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all min-h-[100px] resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsCreatePanelOpen(false)}
                  className="text-white/60 hover:text-white hover:bg-white/5"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg shadow-blue-900/20"
                >
                  Create Workspace
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}