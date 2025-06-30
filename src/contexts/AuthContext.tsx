
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('ravio-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('ravio-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ravio-user');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Mock authentication - in real app, this would call your auth service
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Demo users
      if (email === 'admin@ravio.store' && password === 'admin123') {
        setUser({
          id: '1',
          email: 'admin@ravio.store',
          name: 'Admin User',
          isAdmin: true
        });
        return true;
      }
      
      if (email === 'user@example.com' && password === 'user123') {
        setUser({
          id: '2',
          email: 'user@example.com',
          name: 'John Doe'
        });
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      // Mock signup - in real app, this would call your auth service
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setUser({
        id: Date.now().toString(),
        email,
        name
      });
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
