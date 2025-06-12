import { useState, useCallback, useRef, useEffect } from "react";


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


const SearchInput = ({query, setQuery}) =>{

  return (
    <div className="flex items-center justify-center mb-4 gap-4">
        <Dropdown />
        <div className="flex items-center">
          <span className="text-sm text-gray-500 ml-4">매치 검색</span>
          <input
            type="text"
            placeholder="구장명을 입력하세요"
            className="ml-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-sm w-48 placeholder-gray-400 transition"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="button"
            className="ml-2 bg-sky-500 hover:bg-sky-700 text-white py-1 px-4 rounded-md text-sm"
          >
            검색
          </button>
        </div>
    </div>
  )
}

export default SearchInput;