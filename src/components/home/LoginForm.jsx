import React, { useState } from "react";
import USER from "../../api/user"; // 사용자 API 모듈
import { useAuth } from "../../contexts/AuthContext";
import UserProfile from "../common/ProfileCard";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useAuth(); // AuthContext에서 로그인 함수 가져오기

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 이메일과 비밀번호가 비어있는지 확인
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }
    try {
      await login(email, password); // AuthContext.login() 호출
      setEmail(""); // 입력 필드 초기화
      setPassword(""); // 입력 필드 초기화
    } catch (error) {
      // 로그인 실패 시 에러 메시지 표시
      alert(`로그인 실패: ${error.message}`);
    }
  };

  return (
    <div className="border border-gray-300 rounded p-4 bg-white dark:bg-gray-800 w-full max-w-md mx-auto">
      {isAuthenticated ? (
        <UserProfile />
      ) : (
        <>
          <h2 className="text-xl font-bold mb-6 dark:text-white">로그인</h2>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex items-center mb-4 min-w-0 w-full">
              <span className="flex items-center h-10 w-24 dark:text-white p-0">
                E-mail
              </span>
              <input
                type="text"
                className="h-10 p-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white w-full"
                placeholder="E-mail을 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex items-center mb-4 min-w-0 w-full">
              <span className="flex items-center h-10 w-24 dark:text-white p-0">
                비밀번호
              </span>
              <input
                type="password"
                className="h-10 p-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white w-full"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              로그인
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default LoginForm;
