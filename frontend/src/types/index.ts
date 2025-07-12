// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
  isOnboarded: boolean;
  profile: UserProfile;
}

export interface UserProfile {
  id: string;
  userId: string;
  skillsToTeach: Skill[];
  skillsToLearn: Skill[];
  availability: Availability[];
  questions: ProfileQuestion[];
  rating: number;
  totalSwaps: number;
  completedSwaps: number;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  description?: string;
}

export interface Availability {
  id: string;
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  timeSlot: 'morning' | 'afternoon' | 'evening' | 'night';
  isAvailable: boolean;
}

export interface ProfileQuestion {
  id: string;
  questionId: string;
  answer: string;
  question: Question;
}

export interface Question {
  id: string;
  text: string;
  category: 'personality' | 'skills' | 'preferences';
  order: number;
}

// Swap Types
export interface SwapRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  fromUser: User;
  toUser: User;
  skillToTeach: Skill;
  skillToLearn: Skill;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  message?: string;
  createdAt: string;
  updatedAt: string;
  scheduledDate?: string;
  location?: string;
}

export interface Swap {
  id: string;
  requestId: string;
  fromUserId: string;
  toUserId: string;
  fromUser: User;
  toUser: User;
  skillFrom: Skill;
  skillTo: Skill;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  scheduledDate: string;
  location?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  feedback?: Feedback;
}

export interface Feedback {
  id: string;
  swapId: string;
  fromUserId: string;
  toUserId: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

// Match Types
export interface Match {
  id: string;
  user1Id: string;
  user2Id: string;
  user1: User;
  user2: User;
  compatibilityScore: number;
  commonSkills: Skill[];
  potentialSwaps: PotentialSwap[];
  createdAt: string;
}

export interface PotentialSwap {
  skill1: Skill;
  skill2: Skill;
  user1Teaches: Skill;
  user2Teaches: Skill;
}

// Auth Types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface OnboardingFormData {
  skillsToTeach: Skill[];
  skillsToLearn: Skill[];
  availability: Availability[];
  questions: ProfileQuestion[];
  bio?: string;
  location?: string;
}

// UI Types
export interface SwipeDirection {
  direction: 'left' | 'right';
  userId: string;
}

export interface FilterOptions {
  skills?: string[];
  availability?: string[];
  location?: string;
  rating?: number;
}

// Component Props Types
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'number';
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
} 