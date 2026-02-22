import { User } from './user';

export interface SendOtpRequest {
    phoneNumber: string;
}

export interface SendOtpResponse {
    message: string;
}

export interface VerifyOtpRequest {
    phoneNumber: string;
    otp: string;
}

export interface VerifyOtpResponse {
    accessToken: string;
    user: User;
    isNewUser: boolean;
}

export interface RefreshTokenResponse {
    accessToken: string;
}