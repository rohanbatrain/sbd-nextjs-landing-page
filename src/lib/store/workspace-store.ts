import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WorkspaceStore {
    currentWorkspace: string;
    workspaceType: 'PERSONAL' | 'FAMILY' | 'TEAM';
    setWorkspace: (workspace: string) => void;
}

export const useWorkspaceStore = create<WorkspaceStore>()(
    persist(
        (set) => ({
            currentWorkspace: 'Personal',
            workspaceType: 'PERSONAL',
            setWorkspace: (workspace) => {
                let type: 'PERSONAL' | 'FAMILY' | 'TEAM' = 'PERSONAL';
                if (workspace === 'Personal' || workspace === 'Me (Indie Mode)') type = 'PERSONAL';
                else if (["The Smiths", "Parents' House"].includes(workspace)) type = 'FAMILY';
                else if (["Dev Team Alpha", "Marketing Squad"].includes(workspace)) type = 'TEAM';

                set({ currentWorkspace: workspace, workspaceType: type });
            },
        }),
        {
            name: 'sbd-workspace-storage',
        }
    )
);
