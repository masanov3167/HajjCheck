import { signToken } from './jwt';

export async function login(email: string, password: string) {
  if (email !== "masanov3167@gmail.com" || password !== "admin12345") {
    return null;
  }
  
  const token = signToken({ email, password });
  return token;
}