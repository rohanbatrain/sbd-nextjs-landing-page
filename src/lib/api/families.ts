import apiClient from './client';
import type { FamilyResponse } from '@/lib/types/api';

export async function getMyFamilies(): Promise<FamilyResponse[]> {
  try {
    const response = await apiClient.get<FamilyResponse[]>('/family/my-families');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch families:', error);
    throw error;
  }
}