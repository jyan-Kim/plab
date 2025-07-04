import React, { useState, useEffect } from "react";
import MatchCard from "./MatchCard";

const MatchList = ({ selectedDate }) => {
  const [matchesByDate, setMatchesByDate] = useState({});
  const [visibleMatches, setVisibleMatches] = useState(5); // 초기 표시할 매치 수

  const fetchMatches = async (dateValue) => {
    try {
      // console.log('전송하는 날짜:', dateValue);
      // console.log('날짜 타입:', typeof dateValue);
      // console.log('완전한 URL:', `/api/match?date=${dateValue}`);

      const res = await fetch(`/api/match?date=${dateValue}`, {
        credentials: "include", // 쿠키 포함
      });
      const data = await res.json();

      console.log("매치 데이터:", data);
      setMatchesByDate((prev) => ({
        ...prev, // 기존 데이터 유지
        [dateValue]: data.data,
      }));
    } catch (error) {
      console.error("매치 목록을 가져오는 중 오류 발생:", error);
      // 에러 상태 표시를 위해 빈 배열 설정
      setMatchesByDate((prev) => ({
        ...prev,
        [dateValue]: [],
      }));
    }
  };
  // 날짜 선택하면 매치목록 가져오기
  useEffect(() => {
    if (selectedDate) {
      fetchMatches(selectedDate);
    }
  }, [selectedDate]);

  const todaysMatches = matchesByDate[selectedDate] || [];

  const handleShowMore = () => {
    setVisibleMatches((prev) => prev + 5);
  };

  // 날짜가 변경되면 visibleMatches 초기화
  useEffect(() => {
    setVisibleMatches(5);
  }, [selectedDate]);

  // 표시할 매치들만 필터링
  const displayedMatches = todaysMatches.slice(0, visibleMatches);

  return (
    <div>
      <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
        Match List
      </h2>
      {todaysMatches.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          매치가 없습니다
        </div>
      ) : (
        <>
          {displayedMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}

          {/* 더보기 버튼 - 더 표시할 매치가 있을 때만 */}
          {visibleMatches < todaysMatches.length && (
            <div className="text-center mt-4">
              <button
                onClick={handleShowMore}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
              >
                매치 더보기 ({todaysMatches.length - visibleMatches}개 남음)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MatchList;
