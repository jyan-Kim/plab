import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
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

  // 300ms마다 stadiumData를 업데이트
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
    <header className="flex items-center justify-between px-6 py-3 bg-sky-700 text-white max-w-6xl ">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        풋살
      </h1>
      {/*구장 검색 input*/}
      <div className="relative w-96">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
          🔍
        </span>
        <input
          type="text"
          placeholder="구장 검색"
          className="pl-10 px-4 py-2 rounded w-full text-black placeholder-gray-400"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {/*구장 검색 결과*/}
        {query && stadiumList.length > 0 && (
          <ul className="absolute left-0 top-full mt-1 w-full bg-white border rounded shadow z-20 max-h-60 overflow-y-auto text-black">
            {stadiumList.map((stadium) => (
              <li
                key={stadium.id}
                className="px-4 py-2 hover:bg-sky-100 cursor-pointer text-sm"
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
    </header>
  );
};

export default Header;
