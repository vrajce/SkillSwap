import { apiService } from './api';
import { User, LoginCredentials, RegisterData, ApiResponse } from '@/types';

export interface AuthResponse {
  user: User;
  token: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/login', credentials);
    return response.data!;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/register', data);
    return response.data!;
  }

  async getCurrentUser(): Promise<User> {
    const response = await apiService.get<User>('/auth/me');
    return response.data!;
  }

  async updateProfile(profileData: Partial<User>): Promise<User> {
    const response = await apiService.put<User>('/auth/profile', profileData);
    return response.data!;
  }

  async changePassword(passwordData: {
    currentPassword: string;
    newPassword: string;
  }): Promise<{ message: string }> {
    const response = await apiService.post<{ message: string }>('/auth/change-password', passwordData);
    return response.data!;
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await apiService.post<{ message: string }>('/auth/forgot-password', { email });
    return response.data!;
  }

  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    const response = await apiService.post<{ message: string }>('/auth/reset-password', {
      token,
      newPassword,
    });
    return response.data!;
  }

  async verifyEmail(token: string): Promise<{ message: string }> {
    const response = await apiService.post<{ message: string }>('/auth/verify-email', { token });
    return response.data!;
  }

  async resendVerificationEmail(): Promise<{ message: string }> {
    const response = await apiService.post<{ message: string }>('/auth/resend-verification');
    return response.data!;
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}

export const authService = new AuthService(); 