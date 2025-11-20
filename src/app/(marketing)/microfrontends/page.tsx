"use client";

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Search,
  ExternalLink,
  Code,
  Smartphone,
  Network,
  MessageSquare,
  Puzzle,
  Filter,
  Globe,
  Database
} from 'lucide-react';


import Ribbon from '@/components/ui/ribbon';

interface Microfrontend {
  id: string;
  name: string;
  description: string;
  framework: 'Next.js' | 'Flutter' | 'Node.js';
  status: 'running' | 'stopped' | 'maintenance';
  url?: string;
  github?: string;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const microfrontends: Microfrontend[] = [
  {
    id: 'emotion-tracker',
    name: 'Emotion Tracker',
    description: 'AI-powered emotion tracking and analysis with real-time sentiment monitoring',
    framework: 'Flutter',
    status: 'maintenance',
    github: 'https://github.com/rohanbatrain/emotion_tracker',
    features: ['AI Sentiment Analysis', 'Real-time Tracking', 'Voice Integration', 'Offline Support'],
    icon: Smartphone
  },
  {
    id: 'ipam',
    name: 'IPAM',
    description: 'Intelligent IP Address Management with hierarchical allocation and monitoring',
    framework: 'Next.js',
    status: 'running',
    url: 'https://ipam.secondbraindatabase.com',
    github: 'https://github.com/rohanbatrain/IPAM',
    features: ['Hierarchical Allocation', 'Real-time Monitoring', 'Audit Trails', 'Network Analytics'],
    icon: Network
  },
  {
    id: 'chat',
    name: 'Second Brain Chat',
    description: 'Advanced chat interface with AI orchestration and MCP tool integration',
    framework: 'Next.js',
    status: 'maintenance',
    github: 'https://github.com/rohanbatrain/second-brain-database-chat',
    features: ['AI Orchestration', 'MCP Tools', 'Real-time Communication', 'Voice Integration'],
    icon: MessageSquare
  },
  {
    id: 'landing-page',
    name: 'Landing Page',
    description: 'Main landing page and documentation hub for Second Brain Database - This website is part of the same project',
    framework: 'Next.js',
    status: 'running',
    url: 'https://secondbraindatabase.com',
    github: 'https://github.com/rohanbatrain/second_brain_database/tree/main/submodules/sbd-landing-page',
    features: ['Documentation', 'Architecture Overview', 'Demo Access', 'Community Links'],
    icon: Globe
  },
  {
    id: 'n8n-nodes',
    name: 'N8N Integration',
    description: 'Custom N8N nodes for workflow automation with Second Brain Database',
    framework: 'Node.js',
    status: 'maintenance',
    github: 'https://github.com/rohanbatrain/n8n-nodes-second-brain-database',
    features: ['Workflow Automation', 'API Integration', 'Custom Nodes', 'Event Triggers'],
    icon: Puzzle
  }
];

const frameworkColors = {
  'Next.js': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Flutter': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'Node.js': 'bg-green-500/20 text-green-400 border-green-500/30'
};

const statusColors = {
  running: 'bg-green-500/20 text-green-400 border-green-500/30',
  stopped: 'bg-red-500/20 text-red-400 border-red-500/30',
  maintenance: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  development: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
};

export default function MicrofrontendsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFramework, setSelectedFramework] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredMicrofrontends = useMemo(() => {
    return microfrontends.filter(mf => {
      const matchesSearch = mf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mf.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mf.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesFramework = selectedFramework === 'all' || mf.framework === selectedFramework;

      // Treat 'maintenance' as part of the 'development' group for cleaner UX
      const displayStatus = mf.status === 'maintenance' ? 'development' : mf.status;
      const matchesStatus = selectedStatus === 'all' || selectedStatus === displayStatus;

      return matchesSearch && matchesFramework && matchesStatus;
    });
  }, [searchTerm, selectedFramework, selectedStatus]);

  const frameworkCounts = useMemo(() => {
    const counts = { 'Next.js': 0, 'Flutter': 0, 'Node.js': 0 };
    microfrontends.forEach(mf => {
      counts[mf.framework]++;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#040508] via-[#0C0F15] to-[#040508] p-4">

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4">
            <Database className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Microfrontends</h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Explore all the microfrontends that make up the Second Brain Database ecosystem.
            Each component is designed for specific functionality while maintaining seamless integration.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                placeholder="Search microfrontends..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/40"
              />
            </div>

            {/* Framework Filter */}
            <div className="flex gap-2">
              <Button
                variant={selectedFramework === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedFramework('all')}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                All ({microfrontends.length})
              </Button>
              <Button
                variant={selectedFramework === 'Next.js' ? 'default' : 'outline'}
                onClick={() => setSelectedFramework('Next.js')}
                className="bg-blue-500/20 border-blue-500/30 text-blue-400 hover:bg-blue-500/30"
              >
                <Code className="w-4 h-4 mr-2" />
                Next.js ({frameworkCounts['Next.js']})
              </Button>
              <Button
                variant={selectedFramework === 'Flutter' ? 'default' : 'outline'}
                onClick={() => setSelectedFramework('Flutter')}
                className="bg-cyan-500/20 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/30"
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Flutter ({frameworkCounts['Flutter']})
              </Button>
            </div>

            {/* Status Filter (dropdown for cleaner UX) */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="appearance-none bg-white/10 border border-white/20 text-white rounded-md pl-10 pr-3 py-2 focus:outline-none"
                >
                  <option value="all">Status: All</option>
                  <option value="running">Status: Running</option>
                  <option value="development">Status: Development</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <p className="text-white/70">
            Showing {filteredMicrofrontends.length} of {microfrontends.length} microfrontends
          </p>
        </motion.div>

        {/* Microfrontends Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredMicrofrontends.map((mf, index) => (
            <motion.div
              key={mf.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="relative bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 h-full overflow-visible">
                {mf.id === 'landing-page' && (
                  // inset ribbon fits inside the card corner without overflowing
                  <Ribbon color="bg-purple-600" inset>
                    This website
                  </Ribbon>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                        <mf.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-lg">{mf.name}</CardTitle>
                        <div className="flex gap-2 mt-2">
                          <Badge className={frameworkColors[mf.framework]}>
                            {mf.framework}
                          </Badge>
                          {(() => {
                            const displayStatus = mf.status === 'maintenance' ? 'development' : mf.status;
                            return (
                              <Badge className={statusColors[displayStatus as keyof typeof statusColors]}>
                                {displayStatus}
                              </Badge>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-white/70">
                    {mf.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Features */}
                  <div>
                    <h4 className="text-white font-medium mb-2">Key Features</h4>
                    <div className="flex flex-wrap gap-1">
                      {mf.features.slice(0, 3).map((feature) => (
                        <Badge key={feature} variant="secondary" className="bg-white/10 text-white/80 text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {mf.features.length > 3 && (
                        <Badge variant="secondary" className="bg-white/10 text-white/80 text-xs">
                          +{mf.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    {mf.url && (
                      <Button
                        size="sm"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => window.open(mf.url, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit
                      </Button>
                    )}
                    {mf.github && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                        onClick={() => window.open(mf.github, '_blank')}
                      >
                        <Code className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredMicrofrontends.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-white/40" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No microfrontends found</h3>
            <p className="text-white/70">Try adjusting your search or filter criteria.</p>
          </motion.div>
        )}

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-2">Microfrontend Architecture</h3>
            <p className="text-white/70 text-sm mb-4">
              Each microfrontend is independently deployable and communicates with the central Second Brain Database API.
              This architecture ensures scalability, maintainability, and clean separation of concerns.
            </p>
            <div className="flex justify-center gap-4 text-sm text-white/60">
              <span>• Independent Deployment</span>
              <span>• API-Driven Communication</span>
              <span>• Technology Agnostic</span>
              <span>• Centralized Data</span>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}