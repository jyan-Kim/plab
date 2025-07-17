import React, { useState, useEffect } from "react";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import { useNavigate } from "react-router-dom";
import ADMIN from "../../api/admin";
const AdminHomePage = () => {
 const { admin, logout } = useAdminAuth();
 const navigate = useNavigate();
 const [stats, setStats] = useState({
   totalUsers: 0,
   totalStadiums: 0,
   activeMatches: 0,
   todayReservations: 0,
 });
 const [isLoadingStats, setIsLoadingStats] = useState(true);
 const handleLogout = async () => {
   try {
     await logout();
     navigate("/admin/login");
   } catch (error) {
     console.error("로그아웃 실패:", error);
   }
 };
 // 통계 데이터 가져오기
 const fetchStats = async () => {
   try {
     setIsLoadingStats(true);
     // 병렬로 여러 API 호출
     const [usersData, stadiumsData, matchesData] = await Promise.allSettled([
       ADMIN.getAllUsers(),
       ADMIN.getAllStadiums(),
       ADMIN.getAllMatches(),
     ]);
     // 각 API 응답 처리
     let totalUsers = 0;
     if (usersData.status === "fulfilled") {
       // /api/user는 직접 배열을 반환
       const userResponse = usersData.value;
       console.log("사용자 API 응답:", userResponse);
       // 다양한 데이터 구조 처리
       const users =
         userResponse.users || userResponse.data || userResponse || [];
       totalUsers = Array.isArray(users) ? users.length : 0;
       console.log("최종 사용자 수:", totalUsers);
     }
     let totalStadiums = 0;
     if (stadiumsData.status === "fulfilled") {
       const stadiums = stadiumsData.value.data || stadiumsData.value || [];
       totalStadiums = Array.isArray(stadiums) ? stadiums.length : 0;
     }
     let activeMatches = 0;
     if (matchesData.status === "fulfilled") {
       const matches = matchesData.value.data || matchesData.value || [];
       activeMatches = Array.isArray(matches) ? matches.length : 0;
     }
     const newStats = {
       totalUsers,
       totalStadiums,
       activeMatches,
       todayReservations: 0, // 예약 API가 구현되면 추가
     };
     console.log("통계 데이터:", newStats);
     console.log("원본 응답들:", { usersData, stadiumsData, matchesData });
     setStats(newStats);
   } catch (error) {
     console.error("통계 데이터 가져오기 실패:", error);
   } finally {
     setIsLoadingStats(false);
   }
 };
 useEffect(() => {
   fetchStats();
 }, []);
 return (
   <div className="max-w-7xl mx-auto p-6">
     {/* 헤더 영역 */}
     <div className="flex justify-between items-center mb-8">
       <div>
         <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
           관리자 대시보드
         </h1>
         <p className="text-gray-600 dark:text-gray-400">
           시스템 관리 및 모니터링
         </p>
       </div>
       <div className="flex items-center space-x-4">
         <button
           onClick={fetchStats}
           disabled={isLoadingStats}
           className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
         >
           {isLoadingStats ? "⟳" : "🔄"} 새로고침
         </button>
         <span className="text-sm text-gray-600 dark:text-gray-400">
           {admin?.email}
         </span>
         <button
           onClick={handleLogout}
           className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
         >
           로그아웃
         </button>
       </div>
     </div>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       {/* 사용자 관리 카드 */}
       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
         <div className="flex items-center justify-between mb-4">
           <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
             사용자 관리
           </h2>
           <div className="text-2xl">👥</div>
         </div>
         <p className="text-gray-600 dark:text-gray-400 mb-4">
           회원 정보를 관리하고 모니터링합니다.
         </p>
         <button
           onClick={() => navigate("/admin/users")}
           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
         >
           사용자 목록 보기
         </button>
       </div>
       {/* 구장 관리 카드 */}
       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
         <div className="flex items-center justify-between mb-4">
           <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
             구장 관리
           </h2>
           <div className="text-2xl">🏟️</div>
         </div>
         <p className="text-gray-600 dark:text-gray-400 mb-4">
           등록된 구장 정보를 관리합니다.
         </p>
         <button
           onClick={() => navigate("/admin/stadiums")}
           className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
         >
           구장 목록 보기
         </button>
       </div>
       {/* 매치 관리 카드 */}
       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
         <div className="flex items-center justify-between mb-4">
           <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
             매치 관리
           </h2>
           <div className="text-2xl">⚽</div>
         </div>
         <p className="text-gray-600 dark:text-gray-400 mb-4">
           진행 중인 매치를 관리하고 모니터링합니다.
         </p>
         <button
           onClick={() => navigate("/admin/matches")}
           className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
         >
           매치 목록 보기
         </button>
       </div>
       {/* 예약 관리 카드 */}
       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
         <div className="flex items-center justify-between mb-4">
           <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
             예약 관리
           </h2>
           <div className="text-2xl">📅</div>
         </div>
         <p className="text-gray-600 dark:text-gray-400 mb-4">
           구장 예약 현황을 확인하고 관리합니다.
         </p>
         <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
           onClick={() => navigate("/admin/Bookings")}>
           예약 목록 보기
         </button>
       </div>
       {/* 통계 카드
       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
         <div className="flex items-center justify-between mb-4">
           <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
             통계
           </h2>
           <div className="text-2xl">📊</div>
         </div>
         <p className="text-gray-600 dark:text-gray-400 mb-4">
           시스템 사용 통계를 확인합니다.
         </p>
         <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
           통계 보기
         </button>
       </div>
       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
         <div className="flex items-center justify-between mb-4">
           <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
             시스템 설정
           </h2>
           <div className="text-2xl">⚙️</div>
         </div>
         <p className="text-gray-600 dark:text-gray-400 mb-4">
           시스템 전반적인 설정을 관리합니다.
         </p>
         <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
           설정 보기
         </button>
       </div>
       */}
     </div>
     {/* 빠른 통계 */}
     <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
       <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
         <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
           {isLoadingStats ? "..." : stats.totalUsers}
         </div>
         <div className="text-sm text-blue-700 dark:text-blue-300">
           총 사용자
         </div>
       </div>
       <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
         <div className="text-2xl font-bold text-green-600 dark:text-green-400">
           {isLoadingStats ? "..." : stats.totalStadiums}
         </div>
         <div className="text-sm text-green-700 dark:text-green-300">
           등록된 구장
         </div>
       </div>
       <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center">
         <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
           {isLoadingStats ? "..." : stats.activeMatches}
         </div>
         <div className="text-sm text-purple-700 dark:text-purple-300">
           등록된 매치
         </div>
       </div>
       <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 text-center">
         <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
           {isLoadingStats ? "..." : stats.todayReservations}
         </div>
         <div className="text-sm text-orange-700 dark:text-orange-300">
           오늘 예약
         </div>
       </div>
     </div>
   </div>
 );
};
export default AdminHomePage;