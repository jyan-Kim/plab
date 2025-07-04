import React, { useState, useEffect } from "react";
import USER from "../../api/user";
import StadiumCard from "./StadiumCard"; // 같은 폴더의 StadiumCard 사용

//구장 목록 페이지
const StadiumList = () => {
  const [stadiums, setStadiums] = useState([]);

  useEffect(() => {
    const fetchStadiums = async () => {
      try {
        const data = await USER.getAllStadiums();
        setStadiums(data);
      } catch (error) {
        console.error("구장 목록 가져오기 실패:", error);
      }
    };
    fetchStadiums();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* 헤더 섹션 */}
      <div className="bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-700/20 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 dark:text-white transition-colors">
            구장 목록
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 text-center mt-2 transition-colors">
            원하는 구장을 선택해보세요
          </p>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {stadiums.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4 transition-colors">
              🏟️
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg transition-colors">
              등록된 구장이 없습니다.
            </p>
          </div>
        ) : (
          <>
            {/* 구장 개수 표시 */}
            <div className="mb-6 sm:mb-8">
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 transition-colors">
                총{" "}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {stadiums.length}
                </span>
                개의 구장
              </p>
            </div>

            {/* 구장 카드 그리드 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
              {stadiums.map((stadium) => (
                <StadiumCard
                  key={stadium._id || stadium.id}
                  stadium={stadium}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StadiumList;
