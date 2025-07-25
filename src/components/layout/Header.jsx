import DarkModeToggle from "../../darkMode/DarkModeToggle";
import SearchInput from "../common/SearchInput";
import { useNavigate, useLocation } from "react-router-dom";

const Header = ({ dark, setDark }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div className="flex justify-between items-center border border-gray-300 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 max-w-7xl mx-auto h-24 p-4 transition ">
      <div>
        {/* 로고 영역 */}
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          ⚽
        </h1>
        {isAdminPage && (
          <span className="ml-3 text-sm bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded">
            관리자 모드
          </span>
        )}
      </div>
      <div className="flex items-center gap-4">
        {!isAdminPage && <SearchInput />}
        {isAdminPage && (
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            홈으로
          </button>
        )}
        <DarkModeToggle dark={dark} setDark={setDark} />
      </div>
    </div>
  );
};

export default Header;
