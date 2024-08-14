import customAxios from './middleware';

export const login = async (payload) => customAxios.post('/login', payload);
export const refreshTokenService = async (payload) => customAxios.post('/refresh-token', payload);
export const Signup = async (payload) => customAxios.post('/register', payload);
export const ForgotPassword = async (payload) => customAxios.post('/forgot-password', payload);
export const ResetPassword = async (payload) => customAxios.post('/reset-password', payload);
export const googleLogin = async (payload) => customAxios.post('/google/login', payload);
export const getAddress = async (payload) => customAxios.get("/address", payload)

