import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import USER from "../../api/user"; // 사용자 API 모듈

const ProfileCard = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      try {
        await USER.logout(); // 실제 로그아웃 API 호출
        logout(); // 상태 초기화 등 후처리
        // 필요하다면 alert("로그아웃 되었습니다!");
      } catch (error) {
        alert("로그아웃에 실패했습니다: " + error.message);
      }
    }
  };

  return (
    <div className="text-center">
      {/* 프로필 헤더 */}
      <div className="mb-4">
        <div className="text-4xl mb-2">👤</div>
        <h2 className="text-lg font-bold text-green-600 dark:text-green-400 mb-1">
          환영합니다!
        </h2>
      </div>

      {/* 상태 표시 */}
      <div className="mb-4 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <p className="text-sm text-green-700 dark:text-green-300">
          ✅ 로그인 상태
        </p>
      </div>

      {/* 로그아웃 버튼 */}
      <button
        onClick={handleLogout}
        className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
      >
        로그아웃
      </button>
    </div>
  );
};

export default ProfileCard;
