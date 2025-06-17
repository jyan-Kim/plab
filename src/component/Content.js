import React, { useState, useEffect, use } from "react";
import SearchInput from "./searchInput";

// 오늘 날짜 기준으로 2주(14일)치 날짜 배열 생성
const getNext14Days = () => {
  const days = [];
  const today = new Date(); // 오늘 날짜설정
  for (let i = 0; i < 14; i++) {
    const date = new Date(today); // 오늘 날짜를 기준으로 새로운 Date 객체 생성
    date.setDate(today.getDate() + i); // setDate는 일을 변경
    const dateStr = date.toISOString().slice(0, 10); // YYYY-MM-DD 형식으로 변환
    const weekDay = "일월화수목금토"[date.getDay()]; // 요일을 한글로 변환 (0: 일요일, 1: 월요일, ..., 6: 토요일)
    days.push({
      label: `${dateStr} (${weekDay})`,
      value: dateStr,
    });
  }
  return days;
};

const Content = () => {
  const dateList = getNext14Days();
  const [weekIndex, setWeekIndex] = useState(0); // 0: 첫째주, 1: 둘째주
  const weekDates = dateList.slice(weekIndex * 7, weekIndex * 7 + 7); //
  const [selectedDate, setSelectedDate] = useState(weekDates[0]?.value || "");
  const [matchesByDate, setMatchesByDate] = useState({}); // 날짜별 매치 데이터
  const [query, setQuery] = useState(""); // 검색
  const [visibleCount, setVisibleCount] = useState(5); // 보여줄 매치 개수
  const [showModal, setShowModal] = useState(false); // 모달 상태

  // const dummyMatches = [
  //   { id: 1, name: "매치1", location: "서울", date: "2025-06-04" },
  // ];

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const dateSubmit = async (dateValue) => {
    const res = await fetch(
      `http://cococoa.tplinkdns.com:44445/api/match?date=${dateValue}`
    );
    const data = await res.json();
    setMatchesByDate({
      [dateValue]: data.data,
    });
    setSelectedDate(dateValue);
  };

  useEffect(() => {
    setVisibleCount(5);
    // dateSubmit(new Date().toISOString().slice(0, 10)); // 오늘 날짜로 초기화
  }, [selectedDate, query]);

  // 주간 이동 핸들러
  const goPrevWeek = () => setWeekIndex((prev) => Math.max(prev - 1, 0));
  const goNextWeek = () => setWeekIndex((prev) => Math.min(prev + 1, 1));

  // 주가 바뀌면 해당 주의 첫 번째 날짜로 선택 변경
  React.useEffect(() => {
    setSelectedDate(weekDates[0]?.value || "");
  }, [weekIndex]);

  // 선택된 날짜의 매치 필터링
  const filteredMatches =
    matchesByDate[selectedDate]?.filter((match) =>
      match.subField?.stadium?.name?.includes(query)
    ) || [];

  // 모달 컴포넌트
  const Modal = ({ match, onClose }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">{match.name}</h2>
            <p>예약 내용 ~~~</p>
            <button
              onClick={onClose}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 border border-black-300">
      {/* 구장 검색 영역 */}
      <SearchInput query={query} setQuery={setQuery} />
      {/* 날짜 선택 + 매치 리스트를 가로로 배치 */}
      <div className="flex flex-row gap-8">
        {/* 날짜 선택 버튼 + 화살표 (왼쪽) */}
        <div className="flex flex-col items-start gap-8 mb-8 w-48">
          <button
            className="w-full px-2 py-1 text-lg border rounded disabled:opacity-30"
            onClick={goPrevWeek}
            disabled={weekIndex === 0}
          >
            ▲
          </button>
          {weekDates.map((date) => (
            <button
              key={date.value}
              className={`w-full px-3 py-2 rounded border text-xs md:text-base ${
                selectedDate === date.value
                  ? "bg-sky-500 text-white"
                  : "bg-gray-100 text-black"
              }`}
              onClick={() => dateSubmit(date.value)}
            >
              {date.label}
            </button>
          ))}
          <button
            className="w-full px-2 py-1 text-lg border rounded disabled:opacity-30"
            onClick={goNextWeek}
            disabled={weekIndex === 1}
          >
            ▼
          </button>
        </div>
        {/* 매치 리스트 (오른쪽) */}
        <div className="flex-1">
          {/* 선택된 날짜의 매치 리스트 */}
          <div className="flex flex-col items-center border border-blue-300">
            {filteredMatches.length > 0 ? (
              filteredMatches.slice(0, visibleCount).map((match) => (
                <div
                  key={match._id}
                  className="p-4 border-b border-gray-200 w-full"
                >
                  <h3 className="font-bold">
                    {match.subField?.stadium?.name || "구장명 없음"} -{" "}
                    {match.subField?.fieldName || "필드명 없음"}
                  </h3>
                  <p>
                    시간: {match.dateTime?.slice(11, 16) || "시간 정보 없음"}
                  </p>
                  <p>
                    조건: {match.conditions?.level || "-"} /{" "}
                    {match.conditions?.gender || "-"} /{" "}
                    {match.conditions?.matchFormat || "-"} /{" "}
                    {match.conditions?.theme || "-"}
                  </p>
                  <p>
                    주소:{" "}
                    {match.subField?.stadium?.location?.address ||
                      "주소 정보 없음"}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-4 text-gray-400">
                해당 날짜에 등록된 매치가 없습니다.
              </div>
            )}
            {/* 더보기 버튼 */}
            {filteredMatches.length > visibleCount && (
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleShowMore}
              >
                더보기
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
