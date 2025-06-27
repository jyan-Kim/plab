import DarkModeToggle from "../../darkMode/DarkModeToggle"
import SearchInput from "../common/SearchInput"

const Header = ({ dark, setDark }) => {
  return (
    <div 
      className="flex justify-between items-center border border-gray-300 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 max-w-7xl mx-auto h-24 p-4 transition ">
      <div>
        {/* 로고 영역 */}
      </div>
      <div className="flex items-center gap-4">
        <SearchInput />
        <DarkModeToggle dark={dark} setDark={setDark} />        
      </div>
    </div>
  )
}

export default Header