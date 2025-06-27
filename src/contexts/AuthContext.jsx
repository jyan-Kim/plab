// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import USER from '../api/user';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 로그인 함수
  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const data = await USER.login(email, password);
      
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        setUser(data.user || { email });
        setIsAuthenticated(true);
        return data;
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // 로그아웃 함수
  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  // 앱 시작 시 토큰 확인
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('authToken');
      
      if (token) {
        // 여기서는 간단히 토큰이 있으면 로그인된 것으로 처리
        // 실제로는 서버에 토큰 검증 요청을 보내야 함
        setIsAuthenticated(true);
        setUser({ email: 'user@example.com' }); // 임시 사용자 정보
      }
      
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};