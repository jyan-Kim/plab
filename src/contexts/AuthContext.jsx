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

  // 로그인 함수 (쿠키 기반)
  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const data = await USER.login(email, password);
      
      // 서버에서 로그인 성공 응답이 오면 (쿠키는 자동으로 설정됨)
      if (data.msg && data.msg.includes('성공')) {
        setUser({ email });
        setIsAuthenticated(true);
        // 쿠키 기반이므로 localStorage 대신 간단한 플래그만 저장
        localStorage.setItem('isLoggedIn', 'true');
        return data;
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // 로그아웃 함수 (쿠키 기반)
  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    setUser(null);
    setIsAuthenticated(false);
    // 실제로는 서버에 로그아웃 API 호출해서 쿠키를 삭제해야 함
  };

  // 앱 시작 시 로그인 상태 확인 (쿠키 기반)
  useEffect(() => {
    const checkAuthStatus = async () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      
      if (isLoggedIn === 'true') {
        // 쿠키 기반이므로 단순히 플래그만 확인
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