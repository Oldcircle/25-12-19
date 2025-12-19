
export type SectionId = 'intro' | 'problem' | 'method' | 'main-results' | 'efficiency' | 'ablation' | 'semantic' | 'conclusion';

export interface NavItem {
  id: SectionId;
  label: string;
}

export interface SimulationStep {
  id: number;
  title: string;
  description: string;
  status: 'idle' | 'processing' | 'error' | 'success';
  details?: {
    path?: string;
    constraints?: string[];
    action?: string;
  };
}