import apiClient from './client';
import type { LoginCredentials, LoginResponse, SignupCredentials, SignupResponse, AuthError, ResendVerificationResponse } from '@/lib/types/api';
import { AuthErrorCode } from '@/lib/types/api';

// Error parsing utility
function parseAuthError(error: any): AuthError {
  if (error?.response) {
    const { status, data } = error.response;

    if (status === 401) {
      const errorMessage = data?.message || data?.error || error.message;

      if (errorMessage?.toLowerCase().includes('user not found')) {
        return {
          success: false,
          error: 'Authentication Failed',
          message: 'No account found with this email address. Please check your email or sign up for a new account.',
          code: AuthErrorCode.USER_NOT_FOUND,
          details: data?.details
        };
      }

      if (errorMessage?.toLowerCase().includes('invalid credentials')) {
        return {
          success: false,
          error: 'Invalid Credentials',
          message: 'The email or password you entered is incorrect. Please try again.',
          code: AuthErrorCode.INVALID_CREDENTIALS,
          details: data?.details
        };
      }

      if (errorMessage?.toLowerCase().includes('not verified')) {
        return {
          success: false,
          error: 'Email Not Verified',
          message: 'Please verify your email address before signing in.',
          code: AuthErrorCode.EMAIL_NOT_VERIFIED,
          details: data?.details
        };
      }

      return {
        success: false,
        error: 'Authentication Failed',
        message: 'Invalid email or password. Please try again.',
        code: AuthErrorCode.INVALID_CREDENTIALS,
        details: data?.details
      };
    }

    if (status === 422) {
      const errorMessage = data?.message || data?.error || 'Invalid input data';
      return {
        success: false,
        error: 'Validation Error',
        message: errorMessage,
        code: AuthErrorCode.INVALID_EMAIL_FORMAT,
        details: data?.details
      };
    }

    if (status >= 500) {
      return {
        success: false,
        error: 'Server Error',
        message: 'A server error occurred. Please try again later.',
        code: AuthErrorCode.SERVER_ERROR,
        details: data?.details
      };
    }
  }

  if (error?.code === 'NETWORK_ERROR' || !error?.response) {
    return {
      success: false,
      error: 'Connection Error',
      message: 'Unable to connect to the server. Please check your internet connection.',
      code: AuthErrorCode.NETWORK_ERROR,
      details: { originalError: error }
    };
  }

  const fallbackResult: AuthError = {
    success: false,
    error: 'Authentication Error',
    message: (error as any)?.message || 'An unexpected error occurred. Please try again.',
    code: AuthErrorCode.SERVER_ERROR,
    details: { originalError: error }
  };
  return fallbackResult;
}

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  try {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  } catch (error) {
    const authError = parseAuthError(error);
    throw authError;
  }
}

export async function signup(credentials: SignupCredentials): Promise<SignupResponse> {
  try {
    const response = await apiClient.post<SignupResponse>('/auth/register', credentials);
    return response.data;
  } catch (error) {
    const authError = parseAuthError(error);
    throw authError;
  }
}

export async function resendVerification(email: string): Promise<ResendVerificationResponse> {
  try {
    const response = await apiClient.post<ResendVerificationResponse>('/auth/resend-verification-email', { email });
    return response.data;
  } catch (error) {
    const authError = parseAuthError(error);
    throw authError;
  }
}