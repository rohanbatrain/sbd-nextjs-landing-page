import apiClient from './client';
import type { WorkspaceResponse } from '@/lib/types/api';

export async function getMyWorkspaces(): Promise<WorkspaceResponse[]> {
  try {
    const response = await apiClient.get<WorkspaceResponse[]>('/workspaces');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch workspaces:', error);
    throw error;
  }
}