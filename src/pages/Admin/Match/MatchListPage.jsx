import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ADMIN from "../../../api/admin";

function MatchListPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      let data = await ADMIN.getAllMatches();
      // 데이터 구조에 따라 처리
      const matchList = data.matches.sort((a, b) => {
        if (a.startTime < b.startTime) return 1;
        if (a.startTime > b.startTime) return -1;
        return 0;
      }) ||[];
      setMatches(Array.isArray(matchList) ? matchList : []);
    } catch (err) {
      setError("매치 목록을 불러오는데 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("정말로 이 매치를 삭제하시겠습니까?")) {
      try {
        const result = await ADMIN.deleteMatch(id);
        if (result.success) {
          alert("매치가 성공적으로 삭제되었습니다!");
          fetchMatches(); // 목록 새로고침
        }
      } catch (err) {
        alert("매치 삭제에 실패했습니다. " + err.message);
        console.error(err);
      }
    }
  };

  const handleEdit = (matchId) => {
    navigate(`/admin/matches/edit/${matchId}`);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 m-4">
        <div className="text-red-800">오류: {error}</div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/admin")}
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            ← 대시보드로 돌아가기
          </button>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            매치 목록
          </h2>
        </div>
        <button
          onClick={() => navigate("/admin/matches/add")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          새 매치 추가
        </button>
      </div>

      <div className="space-y-4">
        {matches.length > 0 ? (
          matches.map((match) => (
            <div
              key={match._id || match.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-2xl">⚽</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {match.startTime
                          ? new Date(match.startTime).toLocaleString()
                          : "시간 미정"}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {match.subField?.stadium?.name || "구장 정보 없음"} -{" "}
                        {match.subField?.fieldName || "필드 정보 없음"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        참가자:
                      </span>
                      <p className="text-gray-600 dark:text-gray-400">
                        {match.participantInfo?.currentPlayers || 0}/
                        {match.participantInfo?.maximumPlayers || 0}명
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        수준:
                      </span>
                      <p className="text-gray-600 dark:text-gray-400">
                        {match.conditions?.level || "제한없음"}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        성별:
                      </span>
                      <p className="text-gray-600 dark:text-gray-400">
                        {match.conditions?.gender || "제한없음"}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        참가비:
                      </span>
                      <p className="text-gray-600 dark:text-gray-400">
                        {match.fee ? `${match.fee.toLocaleString()}원` : "무료"}
                      </p>
                    </div>
                  </div>

                  {match.conditions?.theme && (
                    <div className="mt-3">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        테마:
                      </span>
                      <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {match.conditions.theme}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2 mt-4 md:mt-0">
                  <button
                    onClick={() => handleEdit(match._id || match.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors text-sm"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(match._id || match.id)}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors text-sm"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400">
              <div className="text-4xl mb-4">⚽</div>
              <p>등록된 매치가 없습니다.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MatchListPage;
