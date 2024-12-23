'use client';

import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';

interface AuthContextType {
  userToken: string | null;
  setUserToken: (token: string | null) => void;
  ongToken: string | null;
  setOngToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [ongToken, setOngToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUserToken = localStorage.getItem('authToken');
    if (storedUserToken) {
      setUserToken(storedUserToken);
    }

    const storedOngToken = localStorage.getItem('authOngToken');
    if (storedOngToken) {
      setOngToken(storedOngToken);
    }
  }, []);

  const value = useMemo(
    () => ({
      userToken,
      setUserToken,
      ongToken,
      setOngToken,
    }),
    [userToken, ongToken]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
