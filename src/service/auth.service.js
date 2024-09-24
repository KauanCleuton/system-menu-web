import customAxios from './middleware';

export const login = async (payload) => customAxios.post('/login', payload);
export const refreshTokenService = async (payload) => customAxios.post('/refresh-token', payload);
export const Signup = async (payload) => customAxios.post('/register', payload);
export const ForgotPassword = async (payload) => customAxios.post('/forgotPassword', payload);
export const ResetPasswordUser = async (payload) => customAxios.post('/resetPassword', payload);
export const VerifyTokenUser = async (payload) => customAxios.post('/verifyToken', payload);
export const googleLogin = async (payload) => customAxios.post('/google/login', payload);
export const getAddress = async (payload) => customAxios.get("/address", payload)

