import React, { useState, useEffect, use } from "react";

// 오늘 날짜 기준으로 2주(14일)치 날짜 배열 생성
const getNext14Days = () => {
  const days = [];
  const today = new Date(); // 오늘 날짜설정
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i); // setDate는 일을 변경
    const dateStr = date.toISOString().slice(0, 10);
    const weekDay = "일월화수목금토"[date.getDay()];
    days.push({
      label: `${dateStr} (${weekDay})`,
      value: dateStr,
    });
  }
  return days;
};

const Dropdown = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        className="px-4 py-2 bg-gray-200 rounded"
        onClick={() => setOpen((prev) => !prev)}
      >
        내 지역
      </button>
      {open && (
        <div className="absolute left-0 mt-1 bg-white border rounded shadow z-10 w-full">
          <ul>
            <li>서울</li>
            <li>경기도</li>
            <li>충청북도</li>
            <li>충청남도</li>
            <li>전라북도</li>
            <li>전라남도</li>
            <li>경상북도</li>
            <li>경상남도</li>
            <li>강원도</li>
            <li>제주도</li>
          </ul>
        </div>
      )}
    </div>
  );
};

const Content = () => {
  const dateList = getNext14Days();
  const [weekIndex, setWeekIndex] = useState(0); // 0: 첫째주, 1: 둘째주
  const weekDates = dateList.slice(weekIndex * 7, weekIndex * 7 + 7);
  const [selectedDate, setSelectedDate] = useState(weekDates[0]?.value || "");
  const [matchesByDate, setMatchesByDate] = useState({});
  const [search, setSearch] = useState(""); // 검색
  const [visibleCount, setVisibleCount] = useState(5); // 보여줄 매치 개수

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  // 날짜별 매치 데이터 fetch (처음 마운트될 때 전체를 받아온다고 가정)
  useEffect(() => {
    fetch("http://cococoa.tplinkdns.com:44445/api/match/all") // 실제 서버 API 주소로 변경 필요
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        const groupedMatches = {};
        data.forEach(match => {
          const date = match.date.slice(0, 10); // YYYY-MM-DD 형식으로 변환
          // 날짜별로 매치 그룹화
          if(!groupedMatches[date]) {
            groupedMatches[date] = [];
          }
          groupedMatches[date].push(match);
        });

        setMatchesByDate(groupedMatches);
      })
      .catch(() => setMatchesByDate({}));

  }, []);

  useEffect(() => {
    setVisibleCount(5);
  }, [selectedDate, search]);

  const allMatches = matchesByDate[selectedDate] || [];
  const matches = allMatches.filter(
    (match) => match.name.includes(search) || match.location.includes(search)
  );
  console.log(search);

  // matches 배열에서 visibleCount 개수만큼 잘라서 보여줌
  const visibleMatches = matches.slice(0, visibleCount);

  // 주간 이동 핸들러
  const goPrevWeek = () => setWeekIndex((prev) => Math.max(prev - 1, 0));
  const goNextWeek = () => setWeekIndex((prev) => Math.min(prev + 1, 1));

  // 주가 바뀌면 해당 주의 첫 번째 날짜로 선택 변경
  React.useEffect(() => {
    setSelectedDate(weekDates[0]?.value || "");
  }, [weekIndex]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* 날짜 선택 버튼 + 화살표 */}
      <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
        <button
          className="px-2 py-1 text-lg border rounded disabled:opacity-30"
          onClick={goPrevWeek}
          disabled={weekIndex === 0}
        >
          ◀
        </button>
        {weekDates.map((date) => (
          <button
            key={date.value}
            className={`px-3 py-2 rounded border text-xs md:text-base ${
              selectedDate === date.value
                ? "bg-sky-500 text-white"
                : "bg-gray-100 text-black"
            }`}
            onClick={() => setSelectedDate(date.value)}
          >
            {date.label}
          </button>
        ))}
        <button
          className="px-2 py-1 text-lg border rounded disabled:opacity-30"
          onClick={goNextWeek}
          disabled={weekIndex === 1}
        >
          ▶
        </button>
      </div>
      {/* 선택된 날짜의 매치 리스트 */}
      <div className="flex items-center justify-center mb-4 gap-4">
        <Dropdown />
        <div className="flex items-center">
          <span className="text-sm text-gray-500 ml-4">구장 검색</span>
          <input
            type="text"
            placeholder="구장명을 입력하세요"
            className="ml-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-sm w-48 placeholder-gray-400 transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="button"
            className="ml-2 bg-sky-500 hover:bg-sky-700 text-white py-1 px-4 rounded-md text-sm"
          >
            검색
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center">
        {matches.length === 0 ? (
          <p className="text-center text-gray-500 my-12">
            해당 날짜에 등록된 매치가 없습니다.
          </p>
        ) : (
          <div className="flex flex-col gap-4 w-full max-w-6xl mx-auto">
            {visibleMatches.map((match) => (
              <div
                key={match.id}
                className="border rounded-lg p-4 shadow bg-white w-full flex items-center justify-between"
              >
                <div>
                  <h3 className="font-bold">{match.name}</h3>
                  <p>{match.location}</p>
                </div>
                <button className="ml-4 bg-sky-500 hover:bg-sky-700 text-white py-1 px-4 rounded">
                  예약하기
                </button>
              </div>
            ))}
            {visibleCount < matches.length && (
              <div className="flex justify-center mt-8 mb-32">
                <button
                  className="bg-sky-100 hover:bg-sky-300 text-sky-700 font-semibold py-2 px-6 rounded shadow"
                  onClick={handleShowMore}
                >
                  매치 더 보기
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Content;
