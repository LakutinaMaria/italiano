import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:8899';

export interface Course {
  id: string;
  name: string;
  level: string;
  active: boolean;
}

export interface UserCourse {
  userId: string;
  courseId: string;
  course: Course;
  enrolledAt: string;
  completedLessons: number;
  totalLessons: number;
  progressPercentage: number;
  lastAccessedAt: string;
}

export interface CourseProgress {
  courseId: string;
  courseName: string;
  completedLessons: number;
  totalLessons: number;
  progressPercentage: number;
  timeSpent: number; // in minutes
  lastStudiedAt: string;
}

class CourseService {
  private api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
  });

  // Check if user has an active course
  async getUserActiveCourse(userId: string): Promise<UserCourse | null> {
    try {
      const response: AxiosResponse<UserCourse> = await this.api.get(`/api/v1/user-progress/${userId}/course`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null; // No active course
      }
      throw error;
    }
  }

  // Get all available courses
  async getAllCourses(): Promise<Course[]> {
    try {
      const response: AxiosResponse<Course[]> = await this.api.get('/api/v1/courses');
      return response.data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  }

  // Assign a course to user
  async assignCourse(userId: string, courseId: string): Promise<UserCourse> {
    try {
      const response: AxiosResponse<UserCourse> = await this.api.post(`/api/v1/user-progress/${userId}/course/${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Error assigning course:', error);
      throw error;
    }
  }

  // Get user's course progress (for progress statistics)
  async getUserProgress(userId: string, courseId: string): Promise<CourseProgress> {
    try {
      const response: AxiosResponse<CourseProgress> = await this.api.get(`/api/v1/user-progress/${userId}/course/${courseId}/progress`);
      return response.data;
    } catch (error) {
      console.error('Error fetching progress:', error);
      throw error;
    }
  }
}

export const courseService = new CourseService();