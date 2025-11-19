'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Calendar, MessageSquare, Plus, Home } from 'lucide-react';

interface FamilyDashboardProps {
  workspaceId: string;
  workspaceName: string;
}

export function FamilyDashboard({ workspaceName }: FamilyDashboardProps) {
  const familyMood = {
    mom: 'Happy',
    dad: 'Calm',
    child1: 'Energetic',
    child2: 'Tired'
  };

  const familyMembers = [
    { name: 'Mom', status: 'Home', mood: familyMood.mom },
    { name: 'Dad', status: 'Work', mood: familyMood.dad },
    { name: 'Alex', status: 'School', mood: familyMood.child1 },
    { name: 'Sam', status: 'Home', mood: familyMood.child2 },
  ];

  const sharedNotes = [
    { id: 1, author: 'Mom', content: 'Remember to pick up groceries after work', timestamp: '2 hours ago' },
    { id: 2, author: 'Dad', content: 'Car maintenance due next week', timestamp: '1 day ago' },
    { id: 3, author: 'Alex', content: 'School project needs poster board', timestamp: '3 hours ago' },
  ];

  const getMoodColor = (mood: string) => {
    switch (mood.toLowerCase()) {
      case 'happy': return 'text-green-400';
      case 'calm': return 'text-blue-400';
      case 'stressed': return 'text-red-400';
      case 'tired': return 'text-gray-400';
      case 'energetic': return 'text-yellow-400';
      default: return 'text-white/60';
    }
  };

  const getMoodEmoji = (mood: string) => {
    switch (mood.toLowerCase()) {
      case 'happy': return '😊';
      case 'calm': return '😌';
      case 'stressed': return '😰';
      case 'tired': return '😴';
      case 'energetic': return '⚡';
      default: return '😐';
    }
  };

  return (
    <div className="space-y-6">
      {/* Family Vitals */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Family Vitals
          </CardTitle>
          <CardDescription className="text-white/70">
            How is everyone feeling in {workspaceName}?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {familyMembers.map((member) => (
              <div key={member.name} className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-2xl mb-2">{getMoodEmoji(member.mood)}</div>
                <div className="text-white font-medium">{member.name}</div>
                <div className={`text-sm ${getMoodColor(member.mood)}`}>{member.mood}</div>
                <div className="text-white/60 text-xs mt-1">{member.status}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Who's Home Status */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Home className="w-5 h-5" />
            Who&apos;s Home?
          </CardTitle>
          <CardDescription className="text-white/70">
            Current location status for family members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {familyMembers.map((member) => (
              <div key={member.name} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-white font-medium">{member.name}</span>
                </div>
                <span className="text-white/60 text-sm">{member.status}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Shared Message Board */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Family Message Board
              </CardTitle>
              <CardDescription className="text-white/70">
                Sticky notes and reminders for everyone
              </CardDescription>
            </div>
            <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Plus className="w-4 h-4 mr-2" />
              Add Note
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sharedNotes.map((note) => (
              <div key={note.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-white font-medium">{note.author}</span>
                  <span className="text-white/50 text-xs">{note.timestamp}</span>
                </div>
                <p className="text-white/80">{note.content}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Shared Calendar/Events */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Family Calendar
          </CardTitle>
          <CardDescription className="text-white/70">
            Upcoming events and important dates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div>
                <div className="text-white font-medium">Parent-Teacher Conference</div>
                <div className="text-white/60 text-sm">Tomorrow at 3:00 PM</div>
              </div>
              <span className="text-blue-400 text-sm">School</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div>
                <div className="text-white font-medium">Family Game Night</div>
                <div className="text-white/60 text-sm">Saturday at 7:00 PM</div>
              </div>
              <span className="text-green-400 text-sm">Home</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}