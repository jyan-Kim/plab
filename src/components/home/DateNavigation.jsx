import React, { useState, useEffect } from "react";

const DateNavigation = ({ selectedDate, onDateSelect }) => {
  const [weekIndex, setWeekIndex] = useState(0);

  // 2주치 날짜 생성
  const getNext14Days = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const dateStr = date.toISOString().slice(0, 10);
      const weekDay = "일월화수목금토"[date.getDay()];
      const day = date.getDate();
      const month = date.getMonth() + 1;

      dates.push({
        value: dateStr,
        display: `${month}-${String(day).padStart(2, "0")}`,
        weekDay: weekDay,
        isToday: i === 0,
      });
    }
    return dates;
  };

  const dateList = getNext14Days();
  const currentWeek = dateList.slice(weekIndex * 7, weekIndex * 7 + 7);
  // 자동으로 오늘날짜 선택
  useEffect(() => {
    if (!selectedDate && onDateSelect) {
      const today = new Date().toISOString().slice(0, 10); // 오늘 날짜 (YYYY-MM-DD)
      onDateSelect(today);
    }
  }, [selectedDate, onDateSelect]);

  // weekIndex가 변경될 때마다 첫 번째 날짜를 선택
  useEffect(() => {
    if (onDateSelect && currentWeek.length > 0) {
      onDateSelect(currentWeek[0].value);
    }
  }, [weekIndex, onDateSelect]);

  const goToPrevWeek = () => setWeekIndex((prev) => Math.max(prev - 1, 0));
  const goToNextWeek = () => setWeekIndex((prev) => Math.min(prev + 1, 1));

  return (
    <div className="w-full">
      {/* 화살표 + 날짜 버튼들을 한 줄에 배치 */}
      <div className="flex items-center gap-2">
        {/* 왼쪽 화살표 */}
        <button
          onClick={goToPrevWeek}
          disabled={weekIndex === 0}
          className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-30 disabled:cursor-pointer"
        >
          ◀
        </button>

        {/* 날짜 버튼들 */}
        <div className="flex-1 grid grid-cols-7 gap-1">
          {currentWeek.map((date) => (
            <button
              key={date.value}
              onClick={() => onDateSelect && onDateSelect(date.value)}
              className={`px-1 py-2 rounded-xl text-xs font-semibold transition-all duration-300 text-center border-2 ${
                selectedDate === date.value
                  ? "bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-200"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 shadow-sm hover:shadow-md"
              }`}
            >
              <div
                className={
                  selectedDate === date.value ? "font-bold text-base" : ""
                }
              >
                {date.display}
              </div>
              <div
                className={
                  selectedDate === date.value ? "text-sky-100" : "text-gray-400"
                }
              >
                ({date.weekDay})
              </div>
            </button>
          ))}
        </div>

        {/* 오른쪽 화살표 */}
        <button
          onClick={goToNextWeek}
          disabled={weekIndex === 1}
          className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-30 disabled:cursor-pointer"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default DateNavigation;
