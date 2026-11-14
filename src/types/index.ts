export interface Project {
  id: string;
  name: string;
  tag: string;
  category: 'systems' | 'ai' | 'web';
  liveUrl?: string;
  githubUrl?: string;
  problem: string;
  architecture: string;
  techStack: string[];
  keyDecisions: string[];
  whatBrokeAndFix: string[];
  outcome: string[];
  metrics?: string;
}

export interface ArsenalSkill {
  name: string;
  category: string;
  level?: string;
}

export interface Milestone {
  id: string;
  organization: string;
  roleOrAchievement: string;
  category: 'Cloud' | 'Leadership' | 'Work' | 'Certifications';
  date: string;
  badge: string;
  description: string;
  location?: string;
  imageUrl?: string;
  verifiedStats?: string;
}

export interface Chapter {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  era: string;
  tag: string;
  fileCode: string;
  memory: string;
  quote?: string;
  learnings: string[];
  techFocus: string[];
}

export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  icon: string;
}

export type ViewMode = 'modern' | 'os';

export type OSTheme = 'win98' | 'win11' | 'ubuntu';

export interface GhostCursor {
  id: string;
  name: string;
  role: string;
  color: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  isClicking: boolean;
}

export interface InterviewQnA {
  id: string;
  label: string;
  query: string;
  answer: string;
  tags: string[];
  keyPoints: string[];
}
