import React from "react";
import { useNavigate } from "react-router-dom";

const StadiumCard = ({ stadium, showClickPrompt = true }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    // 구장 세부 페이지로 이동
    navigate(`/stadium/${stadium._id || stadium.id}`);
  };
  if (!stadium) {
    return null
  }
  return (
    <div
      onClick={handleCardClick}
      className="group cursor-pointer transform hover:scale-105 transition-all duration-200 h-full"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg dark:shadow-gray-900/20 dark:hover:shadow-gray-900/30 transition-shadow duration-300 border border-gray-200 dark:border-gray-700 h-full flex flex-col">
        {/*이미지 영역*/}
        <div className="h-48 bg-gradient-to-r from-blue-500 to-green-500 dark:from-blue-600 dark:to-green-600 rounded-t-lg flex items-center justify-center relative">
          {/* 필드 개수 배지 */}
          {stadium.subField && stadium.subField.length > 0 && (
            <div className="absolute top-4 right-4">
              <span className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-600">
                {stadium.subField.length}개 필드
              </span>
            </div>
          )}
        </div>

        {/*구장 정보 영역*/}
        <div className="p-6 flex-1 flex flex-col">
          {/* 구장명 */}
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
            {stadium.name}
          </h3>

          {/* 기본 정보 */}
          <div className="space-y-2 mb-4 flex-1">
            {/* 주소 */}
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <span className="mr-2">📍</span>
              <span className="text-sm">
                {stadium.location?.address || "N/A"}
              </span>
            </div>

            {/* 서브필드 개수 */}
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <span className="mr-2">🏟️</span>
              <span className="text-sm">
                {stadium.subField?.length || 0}개 서브필드
              </span>
            </div>
          </div>

          {/* 편의시설 배지들 */}
          {stadium.facilities && (
            <div className="flex flex-wrap gap-2 mb-4">
              {stadium.facilities.shower && (
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full border border-blue-200 dark:border-blue-700">
                  🚿 샤워실
                </span>
              )}
              {stadium.facilities.freeParking && (
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full border border-green-200 dark:border-green-700">
                  🅿️ 무료주차
                </span>
              )}
              {stadium.facilities.shoesRental && (
                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full border border-purple-200 dark:border-purple-700">
                  👟 신발대여
                </span>
              )}
              {stadium.facilities.vestRental && (
                <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-xs rounded-full border border-yellow-200 dark:border-yellow-700">
                  👕 조끼대여
                </span>
              )}
            </div>
          )}

          {/* 클릭 유도 텍스트 */}
          {showClickPrompt && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
              <span className="text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                자세히 보기 →
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StadiumCard;
