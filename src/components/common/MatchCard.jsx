import { useState } from "react";
import { useNavigate } from "react-router-dom";
import USER from "../../api/user";

const MatchCard = ({ match }) => {
  const navigate = useNavigate();

  // 상세정보 버튼 클릭 핸들러
  const handleDetailsClick = () => {
    navigate(`/match/${match.id}`);
  };

  // 예약하기 버튼 클릭 핸들러
  const handleReserveClick = async () => {
    try {
      // 현재 로그인한 유저의 ID가 필요 (AuthContext에서 가져와야 함)
      const userId = USER.getCurrentUserId();
      const matchId = match._id || match.id;

      console.log("예약 시도 - matchId:", matchId, "userId:", userId);

      if (!userId) {
        alert("로그인이 필요합니다.");
        return;
      }

      if (!matchId) {
        alert("매치 정보를 찾을 수 없습니다.");
        return;
      }

      await USER.reserveMatch(matchId, userId);
      alert("예약이 완료되었습니다!");
    } catch (error) {
      console.error("예약 실패:", error);
      alert("예약에 실패했습니다: " + error.message);
    }
  };
  // startTime에서 시간 추출
  const matchTime = new Date(match.startTime).toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="flex items-center p-2 sm:p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
      {/* 시간 표시 (왼쪽) */}
      <div className="w-16 sm:w-20 text-center bg-blue-100 dark:bg-blue-900 rounded-lg p-1 sm:p-2 mr-2 sm:mr-4 flex-shrink-0">
        <div className="text-sm sm:text-lg font-bold text-blue-800 dark:text-blue-200">
          {matchTime}
        </div>
      </div>

      {/* 매치 정보 (중앙) */}
      <div className="flex-1 ml-1 sm:ml-4 min-w-0">
        <div className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-gray-100 leading-tight truncate">
          {match.subField?.stadium?.name || "구장명"} -{" "}
          {match.subField?.fieldName || "필드"}
        </div>
      </div>
      {/* 상세정보 예약 버튼 (오른쪽) */}
      <div className="flex-shrink-0 flex flex-col gap-2">
        <button
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-1 px-2 sm:py-2 sm:px-4 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md text-xs sm:text-sm"
          onClick={handleDetailsClick}
        >
          상세정보
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-1 px-2 sm:py-2 sm:px-4 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md text-xs sm:text-sm"
          onClick={handleReserveClick}
        >
          예약하기
        </button>
      </div>
    </div>
  );
};

export default MatchCard;
