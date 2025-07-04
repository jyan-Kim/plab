import React, { createContext, useContext, useState, useEffect } from "react";
import ADMIN from "../api/admin";

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 관리자 로그인 함수
  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const data = await ADMIN.login(email, password);

      // 응답 구조에 따라 유연하게 처리
      if (data.msg && data.msg.includes("성공")) {
        setAdmin({ email, role: "admin" });
        setIsAuthenticated(true);
        localStorage.setItem("isAdminLoggedIn", "true");
        localStorage.setItem("adminEmail", email);
        return data;
      } else if (data.success || data.token || data.isAdmin) {
        // 다른 성공 응답 형태도 처리
        setAdmin({ email, role: "admin" });
        setIsAuthenticated(true);
        localStorage.setItem("isAdminLoggedIn", "true");
        localStorage.setItem("adminEmail", email);
        return data;
      } else {
        throw new Error("로그인에 실패했습니다.");
      }
    } catch (error) {
      // 에러 메시지 로깅으로 디버깅
      console.error("관리자 로그인 오류:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // 관리자 로그아웃 함수
  const logout = async () => {
    try {
      await ADMIN.logout();
    } catch (error) {
      console.error("로그아웃 에러:", error);
    } finally {
      localStorage.removeItem("isAdminLoggedIn");
      localStorage.removeItem("adminEmail");
      setAdmin(null);
      setIsAuthenticated(false);
    }
  };

  // 관리자 인증 상태 확인
  const checkAuthStatus = async () => {
    try {
      const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
      const adminEmail = localStorage.getItem("adminEmail");

      if (isLoggedIn === "true" && adminEmail) {
        // 서버에서 관리자 세션 확인
        const data = await ADMIN.checkSession();
        if (data.isValid) {
          setAdmin({ email: adminEmail, role: "admin" });
          setIsAuthenticated(true);
        } else {
          // 세션이 만료된 경우
          localStorage.removeItem("isAdminLoggedIn");
          localStorage.removeItem("adminEmail");
        }
      }
    } catch (error) {
      console.error("인증 상태 확인 에러:", error);
      localStorage.removeItem("isAdminLoggedIn");
      localStorage.removeItem("adminEmail");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const value = {
    admin,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuthStatus,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
