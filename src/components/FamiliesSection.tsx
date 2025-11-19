'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Plus, Crown } from 'lucide-react';
import { getMyFamilies } from '@/lib/api/families';
import { useAuthStore } from '@/lib/store/auth-store';
import type { FamilyResponse } from '@/lib/types/api';

export function FamiliesSection() {
  const [families, setFamilies] = useState<FamilyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchFamilies = async () => {
      try {
        const data = await getMyFamilies();
        setFamilies(data);
      } catch (err) {
        console.error('Failed to load families:', err);
        setError('Failed to load families');
      } finally {
        setLoading(false);
      }
    };

    fetchFamilies();
  }, []);

  if (loading) {
    return (
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Families
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-2 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
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
            <Heart className="w-5 h-5" />
            Families
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
              <Heart className="w-5 h-5" />
              Families
            </CardTitle>
            <CardDescription className="text-white/70">
              Your family groups and shared resources
            </CardDescription>
          </div>
          <Button
            size="sm"
            className="bg-pink-600 hover:bg-pink-700 text-white"
            onClick={() => {
              // TODO: Implement create family functionality
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Family
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {families.length === 0 ? (
          <div className="text-center py-8">
            <Heart className="w-12 h-12 text-white/30 mx-auto mb-4" />
            <p className="text-white/70 mb-4">No families yet</p>
            <p className="text-white/50 text-sm">Create your first family to share resources</p>
          </div>
        ) : (
          <div className="space-y-3">
            {families.map((family) => (
              <div
                key={family.family_id}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => {
                  // TODO: Navigate to family details
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-600 to-rose-600 rounded-lg flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{family.name}</h3>
                    <p className="text-white/60 text-sm">
                      {family.member_count} member{family.member_count !== 1 ? 's' : ''}
                      {family.description && ` • ${family.description}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {family.admin_user_ids.includes(user?.id || '') && (
                    <div className="w-4 h-4 text-yellow-500" title="Admin">
                      <Crown className="w-4 h-4" />
                    </div>
                  )}
                  <div className="text-white/50 text-sm">
                    {new Date(family.created_at).toLocaleDateString()}
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