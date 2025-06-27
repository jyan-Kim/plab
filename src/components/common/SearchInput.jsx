import { useState, useEffect } from "react";

const SearchInput = () => {
  const [stadiumData, setStadiumData] = useState([]);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query); // 디바운싱을 위한 상태

  // 디바운스된 query로만 fetch 실행
  useEffect(() => {
    if (!debouncedQuery) {
      setStadiumData([]);
      return;
    }
    const fetchStadiumData = async () => {
      try {
        const res = await fetch(
          `http://cococoa.tplinkdns.com:44445/api/search?keyword=${encodeURIComponent(
            debouncedQuery
          )}`
        );
        if (!res.ok) {
          throw new Error("구장 데이터를 가져오는 데 실패했습니다.");
        }
        const data = await res.json();
        setStadiumData(data);
      } catch (error) {
        console.error("구장 데이터 가져오기 실패:", error);
      }
    };
    fetchStadiumData();
  }, [debouncedQuery]);

  // 500ms마다 stadiumData를 업데이트
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // stadiumData 최신값 보기
  useEffect(() => {
    console.log("현재 stadiumData:", stadiumData);
  }, [stadiumData]);

  // stadiumlist 추출 (왼쪽 값이 없을때 []로 대신 쓰게함)
  const stadiumList = stadiumData.results || [];

  return (
    <div className="relative w-96 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
      <input
        type="text"
        placeholder="구장 검색"
        className="w-full h-12 px-4 pr-12 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 text-black placeholder-gray-400"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="absolute right-0 top-0 mt-2 mr-2" tabIndex={-1}>
        🔍
      </button>
      {/*구장 검색 결과*/}
      {query && stadiumList.length > 0 && (
        <ul className="absolute left-0 top-full mt-1 w-full bg-white dark:bg-gray-800 border dark:border-gray-600 rounded shadow z-20 max-h-60 overflow-y-auto text-black dark:text-white">
          {stadiumList.map((stadium) => (
            <li
              key={stadium.id}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm transition-colors duration-200"
            >
              {stadium.name}
              <div>
                <span className="text-xs text-gray-500 ml-2">
                  {stadium.location.province}
                </span>
                <span className="text-xs text-gray-500 ml-2">
                  {stadium.location.city}
                </span>
                <span className="text-xs text-gray-500 ml-2">
                  {stadium.location.district}
                </span>
                <span className="text-xs text-gray-500 ml-2">
                  {stadium.location.address}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
