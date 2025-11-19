'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Users, Target, MessageSquare, Plus, CheckCircle } from 'lucide-react';

interface TeamDashboardProps {
  workspaceId: string;
  workspaceName: string;
}

export function TeamDashboard({ workspaceName }: TeamDashboardProps) {
  const teamMembers = [
    { name: 'Alice Johnson', role: 'Project Manager', status: 'Online' },
    { name: 'Bob Smith', role: 'Developer', status: 'In Meeting' },
    { name: 'Carol Davis', role: 'Designer', status: 'Offline' },
    { name: 'David Wilson', role: 'QA Engineer', status: 'Online' },
  ];

  const activeProjects = [
    { name: 'Website Redesign', progress: 75, dueDate: 'Dec 15', priority: 'High' },
    { name: 'Mobile App', progress: 45, dueDate: 'Jan 30', priority: 'Medium' },
    { name: 'API Integration', progress: 90, dueDate: 'Dec 5', priority: 'High' },
  ];

  const recentActivity = [
    { user: 'Alice', action: 'completed task', item: 'User authentication flow', time: '2 hours ago' },
    { user: 'Bob', action: 'commented on', item: 'Homepage design', time: '4 hours ago' },
    { user: 'Carol', action: 'uploaded', item: 'New wireframes', time: '6 hours ago' },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'online': return 'bg-green-400';
      case 'in meeting': return 'bg-yellow-400';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'text-red-400 border-red-400/20 bg-red-400/10';
      case 'medium': return 'text-yellow-400 border-yellow-400/20 bg-yellow-400/10';
      case 'low': return 'text-green-400 border-green-400/20 bg-green-400/10';
      default: return 'text-gray-400 border-gray-400/20 bg-gray-400/10';
    }
  };

  return (
    <div className="space-y-6">
      {/* Team Overview */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            {workspaceName} Overview
          </CardTitle>
          <CardDescription className="text-white/70">
            Team status and key metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-white mb-1">{teamMembers.length}</div>
              <div className="text-white/60 text-sm">Team Members</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-blue-400 mb-1">{activeProjects.length}</div>
              <div className="text-white/60 text-sm">Active Projects</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-green-400 mb-1">3</div>
              <div className="text-white/60 text-sm">Tasks Completed Today</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Members */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="w-5 h-5" />
            Team Members
          </CardTitle>
          <CardDescription className="text-white/70">
            Current team composition and availability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {teamMembers.map((member) => (
              <div key={member.name} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(member.status)}`}></div>
                  <div>
                    <div className="text-white font-medium">{member.name}</div>
                    <div className="text-white/60 text-sm">{member.role}</div>
                  </div>
                </div>
                <span className="text-white/60 text-sm">{member.status}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Projects */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5" />
                Active Projects
              </CardTitle>
              <CardDescription className="text-white/70">
                Current projects and their progress
              </CardDescription>
            </div>
            <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeProjects.map((project) => (
              <div key={project.name} className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-white font-medium">{project.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded border ${getPriorityColor(project.priority)}`}>
                        {project.priority}
                      </span>
                    </div>
                    <div className="text-white/60 text-sm">Due: {project.dueDate}</div>
                  </div>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <div className="text-white/60 text-sm">{project.progress}% complete</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Recent Activity
          </CardTitle>
          <CardDescription className="text-white/70">
            Latest updates from team members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <span className="text-white font-medium">{activity.user}</span>
                  <span className="text-white/80"> {activity.action} </span>
                  <span className="text-blue-400">&quot;{activity.item}&quot;</span>
                  <div className="text-white/50 text-xs mt-1">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}