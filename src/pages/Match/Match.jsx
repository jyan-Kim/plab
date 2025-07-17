import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import USER from "../../api/user";

//매치의 세부페이지를 구현예정

const Match = () => {
  const { matchId } = useParams(); // URL에서 매치 ID 가져오기
  const [match, setMatch] = useState(null); // 매치 정보를 저장할 상태

  useEffect(() => {
    console.log(matchId)
    const fetchData = async () => {
      try {
        const data = await USER.getMatchDetails(matchId);
        console.log("받은 데이터:", data);
        setMatch(data); // 매치 정보를 상태에 저장
      } catch (error) {
        console.error("매치 정보 가져오기 실패:", error);
      }
    };
    if (matchId) {
      fetchData();
    }
  }, [matchId]); // matchId가 변경될 때마다 실행

  // // 예약하기 버튼 클릭 핸들러
  // const handleReserveClick = async () => {
  //   try {
  //     // 현재 로그인한 유저의 ID가 필요 (AuthContext에서 가져와야 함)
  //     const userId = USER.getCurrentUserId();
  //     const matchId = match._id || match.id;

  //     console.log("예약 시도 - matchId:", matchId, "userId:", userId);

  //     if (!userId) {
  //       alert("로그인이 필요합니다.");
  //       return;
  //     }

  //     if (!matchId) {
  //       alert("매치 정보를 찾을 수 없습니다.");
  //       return;
  //     }

  //     await USER.reserveMatch(matchId, userId);
  //     alert("예약이 완료되었습니다!");
  //   } catch (error) {
  //     console.error("예약 실패:", error);
  //     alert("예약에 실패했습니다: " + error.message);
  //   }
  // };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        {/* 구장 사진영역*/}
        {match?.img ? (
          <img
            src={match.img} // 서버에서 어떻게 오는지에따라 바꿔야함 <<<<
            alt="매치 이미지"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">사진이 없습니다</p>
          </div>
        )}
      </div>
      
      {/*실제 구장정보 (오른쪽div와 왼쪽div 나눌예정)*/}
      <div className="flex-2 p-4 flex flex-row gap-4">
        <div>
          {/* 구장 정보 */}
          
        </div>
        <div className="flex-2">
          {/* 왼쪽 div*/}
        </div>
        <div className="flex-1">
          {/* 오른쪽 div 예약하기 구현예정*/}
          <button
            
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            예약하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Match;
