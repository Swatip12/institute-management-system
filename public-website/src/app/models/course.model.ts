export interface Course {
  id?: number;
  name: string;
  description: string;
  duration?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  category?: string;
  price?: number;
  prerequisites?: string[];
  features?: string[];
  instructor?: string;
  rating?: number;
  studentsEnrolled?: number;
}