import { createContext } from 'react';
import { type User } from 'firebase/auth';

export interface AuthContextType {
  user: User | null;
  username: string | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
