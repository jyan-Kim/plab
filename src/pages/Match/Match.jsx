import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import USER from "../../api/user";

//매치의 세부페이지를 구현예정

const Match = () => {
  // 시작 시간 포맷 함수
  const getFormattedStartTime = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
  };
  const { matchId } = useParams(); // URL에서 매치 ID 가져오기
  const [match, setMatch] = useState(null); // 매치 정보를 저장할 상태

  useEffect(() => {
    console.log(matchId);
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-6xl mx-auto py-10 px-2 md:px-6">
        {/* 구장 사진영역 */}
        <div className="rounded-2xl overflow-hidden shadow-xl mb-10 bg-white dark:bg-gray-800 flex items-center justify-center h-72">
          {match?.img ? (
            <img
              src={match.img}
              alt="매치 이미지"
              className="w-full h-72 object-cover transition duration-300 ease-in-out hover:scale-105 rounded-2xl"
            />
          ) : (
            <div className="w-full h-72 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-2xl">
              <p className="text-gray-500 dark:text-gray-200 text-lg font-medium">
                사진이 없습니다
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          {/* 경기 정보 카드 */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 flex flex-col border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition duration-300">
            <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-200 tracking-tight">
              경기 정보
            </h2>
            <p className="mb-3 text-gray-800 dark:text-gray-100">
              <span className="font-semibold">상태:</span>{" "}
              <span className="text-blue-600 dark:text-blue-400">
                {match?.status}
              </span>
            </p>
            <p className="mb-3 text-gray-800 dark:text-gray-100">
              <span className="font-semibold">시작 시간:</span>{" "}
              {getFormattedStartTime(match?.startTime)}
            </p>
            <p className="mb-3 text-gray-800 dark:text-gray-100">
              <span className="font-semibold">경기 시간(분):</span>{" "}
              {match?.durationMinutes}
            </p>
            <p className="mb-3 text-gray-800 dark:text-gray-100">
              <span className="font-semibold">참가비:</span>{" "}
              <span className="text-blue-600 dark:text-blue-400">
                {match?.fee}원
              </span>
            </p>
            <div className="mt-4">
              <p className="font-semibold mb-2 text-gray-800 dark:text-gray-100">
                조건
              </p>
              <ul className="ml-4 list-disc text-gray-700 dark:text-gray-200 space-y-1">
                <li>레벨: {match?.conditions?.level}</li>
                <li>성별: {match?.conditions?.gender}</li>
                <li>경기 방식: {match?.conditions?.matchFormat}</li>
                <li>테마: {match?.conditions?.theme}</li>
              </ul>
            </div>
          </div>
          {/* 참가자 정보 카드 */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 flex flex-col border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition duration-300">
            <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-200 tracking-tight">
              참가자 정보
            </h2>
            <p className="mb-3 text-gray-800 dark:text-gray-100">
              <span className="font-semibold">최소 인원:</span>{" "}
              {match?.participantInfo?.minimumPlayers}
            </p>
            <p className="mb-3 text-gray-800 dark:text-gray-100">
              <span className="font-semibold">최대 인원:</span>{" "}
              {match?.participantInfo?.maximumPlayers}
            </p>
            <p className="mb-3 text-gray-800 dark:text-gray-100">
              <span className="font-semibold">현재 인원:</span>{" "}
              {match?.participantInfo?.currentPlayers}
            </p>
            <p className="mb-3 text-gray-800 dark:text-gray-100">
              <span className="font-semibold">남은 자리:</span>{" "}
              {match?.participantInfo?.spotsLeft}
            </p>
            <p className="mb-3 text-gray-800 dark:text-gray-100">
              <span className="font-semibold">모집 상태:</span>{" "}
              <span
                className={
                  match?.participantInfo?.isFull
                    ? "text-red-500"
                    : "text-green-500 dark:text-green-400"
                }
              >
                {match?.participantInfo?.isFull ? "마감" : "모집중"}
              </span>
            </p>
          </div>
          {/* 구장 정보 및 예약 카드 */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 flex flex-col justify-between border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition duration-300">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-200 tracking-tight">
                구장 정보
              </h2>
              <p className="mb-3 text-gray-800 dark:text-gray-100">
                <span className="font-semibold">구장명:</span>{" "}
                {match?.subField?.fieldName}
              </p>
              <p className="mb-3 text-gray-800 dark:text-gray-100">
                <span className="font-semibold">구장 ID:</span>{" "}
                {match?.subField?._id}
              </p>
              <p className="mb-3 text-gray-800 dark:text-gray-100">
                <span className="font-semibold">구장 번호:</span>{" "}
                {match?.subField?.id}
              </p>
              <p className="mb-3 text-gray-800 dark:text-gray-100">
                <span className="font-semibold">상위 구장:</span>{" "}
                {match?.subField?.stadium?.name}
              </p>
            </div>
            <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-6 rounded-2xl mt-8 hover:from-blue-600 hover:to-blue-800 transition font-bold shadow dark:from-blue-400 dark:to-blue-600 dark:hover:from-blue-500 dark:hover:to-blue-700">
              예약하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Match;
