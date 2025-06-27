import { useState } from "react";
import DateNavigation from "./DateNavigation";
import MatchList from "../common/MatchList";


const HomeLeft = () => {
  const [selectedDate, setSelectedDate] = useState("");
  return (
      <div className="border border-gray-300 rounded p-4 bg-white dark:bg-gray-800">
        <div className="mb-6">
          {/*날짜 네비 게이션*/}
          <DateNavigation selectedDate={selectedDate} onDateSelect={setSelectedDate} />
        </div>
        <div className="mb-6">
          {/*선택된 날짜 매치목록*/}
          <MatchList selectedDate={selectedDate} />
        </div>
  
          
      </div>
  );
}

export default HomeLeft;