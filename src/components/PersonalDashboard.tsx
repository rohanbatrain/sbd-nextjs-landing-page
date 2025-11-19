'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Plus, CheckCircle, Circle, Brain, Sparkles, ShoppingBag, ArrowRight, Clock } from 'lucide-react';
import { useState } from 'react';

export function PersonalDashboard() {
  const [mood, setMood] = useState<string | null>(null);
  const [quickNote, setQuickNote] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Review project proposal', completed: false },
    { id: 2, text: 'Call mom back', completed: true },
    { id: 3, text: 'Plan weekend activities', completed: false },
  ]);

  const moods = [
    { emoji: '😊', label: 'Happy', color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20' },
    { emoji: '😌', label: 'Calm', color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
    { emoji: '😰', label: 'Stressed', color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' },
    { emoji: '😴', label: 'Tired', color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20' },
    { emoji: '🤔', label: 'Focus', color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20' },
  ];

  const recentNotes = [
    { id: 1, title: 'Project Ideas', preview: 'AI integration with...', time: '2h ago' },
    { id: 2, title: 'Meeting Notes', preview: 'Discussed Q4 roadmap...', time: '5h ago' },
    { id: 3, title: 'Grocery List', preview: 'Milk, eggs, bread...', time: '1d ago' },
  ];

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Welcome Section with Mood Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border-white/10 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-400" />
              How are you feeling?
            </CardTitle>
            <CardDescription className="text-white/60">
              Track your emotional state to understand your patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-3">
              {moods.map((moodOption) => (
                <button
                  key={moodOption.label}
                  onClick={() => setMood(moodOption.label)}
                  className={`group relative p-3 rounded-xl border transition-all duration-200 ${mood === moodOption.label
                    ? `${moodOption.bg} ${moodOption.border} ring-1 ring-white/20`
                    : 'border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10'
                    }`}
                >
                  <div className="text-2xl mb-2 transform group-hover:scale-110 transition-transform duration-200">{moodOption.emoji}</div>
                  <div className={`text-xs font-medium ${moodOption.color}`}>
                    {moodOption.label}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              Daily Inspiration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="text-lg font-medium text-white/90 italic">
              &quot;The best way to predict the future is to create it.&quot;
            </blockquote>
            <p className="text-white/50 text-sm mt-4 text-right">- Peter Drucker</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Note Capture */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10 flex flex-col">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-400" />
              Quick Capture
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <textarea
              value={quickNote}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setQuickNote(e.target.value)}
              placeholder="Capture a thought..."
              className="w-full flex-1 bg-black/20 border border-white/10 text-white placeholder:text-white/30 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
            />
            <div className="flex justify-between items-center mt-4">
              <p className="text-white/30 text-xs">
                {quickNote.length} chars
              </p>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20"
                disabled={!quickNote.trim()}
              >
                Save Note
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Personal Tasks */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                Tasks
              </CardTitle>
              <Button size="icon" variant="ghost" className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="group flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => toggleTask(task.id)}
                >
                  <div className={`flex-shrink-0 transition-colors ${task.completed ? 'text-emerald-400' : 'text-white/20 group-hover:text-white/40'}`}>
                    {task.completed ? <CheckCircle className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                  </div>
                  <span className={`flex-1 text-sm ${task.completed ? 'text-white/40 line-through' : 'text-white/90'
                    }`}>
                    {task.text}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent & Shop Preview */}
        <div className="space-y-6">
          {/* Recent Notes */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-base flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400" />
                Recent Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentNotes.map((note) => (
                  <div key={note.id} className="p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">{note.title}</h4>
                      <span className="text-[10px] text-white/40">{note.time}</span>
                    </div>
                    <p className="text-xs text-white/60 truncate mt-0.5">{note.preview}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Shop Promo */}
          <Card className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 backdrop-blur-sm border-white/10 overflow-hidden relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="p-5 relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-lg bg-white/10 text-white">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-indigo-300 bg-indigo-500/10 px-2 py-1 rounded-full border border-indigo-500/20">New Arrivals</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">Digital Shop</h3>
              <p className="text-sm text-white/60 mb-3">Customize your experience with new themes and avatars.</p>
              <div className="flex items-center text-sm text-indigo-300 font-medium group-hover:translate-x-1 transition-transform">
                Browse Store <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}