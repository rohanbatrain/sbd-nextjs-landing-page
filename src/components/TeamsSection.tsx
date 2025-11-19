'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Plus, Crown } from 'lucide-react';
import { getMyWorkspaces } from '@/lib/api/teams';
import { useAuthStore } from '@/lib/store/auth-store';
import type { WorkspaceResponse } from '@/lib/types/api';

export function TeamsSection() {
  const [teams, setTeams] = useState<WorkspaceResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await getMyWorkspaces();
        setTeams(data);
      } catch (err) {
        console.error('Failed to load teams:', err);
        setError('Failed to load teams');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="w-5 h-5" />
            Teams
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="w-5 h-5" />
            Teams
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/70 text-center py-4">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5" />
              Teams
            </CardTitle>
            <CardDescription className="text-white/70">
              Your collaborative workspaces
            </CardDescription>
          </div>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => {
              // TODO: Implement create team functionality
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Team
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {teams.length === 0 ? (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-white/30 mx-auto mb-4" />
            <p className="text-white/70 mb-4">No teams yet</p>
            <p className="text-white/50 text-sm">Create your first team to start collaborating</p>
          </div>
        ) : (
          <div className="space-y-3">
            {teams.map((team) => (
              <div
                key={team.workspace_id}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => {
                  // TODO: Navigate to team details
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{team.name}</h3>
                    <p className="text-white/60 text-sm">
                      {team.members.length} member{team.members.length !== 1 ? 's' : ''}
                      {team.description && ` • ${team.description}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {team.owner_id === user?.id && (
                    <div className="w-4 h-4 text-yellow-500" title="Owner">
                      <Crown className="w-4 h-4" />
                    </div>
                  )}
                  <div className="text-white/50 text-sm">
                    {new Date(team.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}