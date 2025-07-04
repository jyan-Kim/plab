import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ADMIN from "../../../api/admin";

function StadiumListPage() {
  const [stadiums, setStadiums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStadiums();
  }, []);

  const fetchStadiums = async () => {
    try {
      setLoading(true);
      const data = await ADMIN.getAllStadiums();

      // 데이터 구조에 따라 처리
      const stadiumList = data.data || data.stadiums || data || [];
      setStadiums(Array.isArray(stadiumList) ? stadiumList : []);
    } catch (err) {
      setError("구장 목록을 불러오는데 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("정말로 이 구장을 삭제하시겠습니까?")) {
      try {
        await ADMIN.deleteStadium(id);
        alert("구장이 성공적으로 삭제되었습니다!");
        fetchStadiums(); // 목록 새로고침
      } catch (err) {
        alert("구장 삭제에 실패했습니다. " + err.message);
        console.error(err);
      }
    }
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
            구장 목록
          </h2>
        </div>
        <button
          onClick={() => navigate("/admin/stadiums/add")}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          새 구장 추가
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stadiums.length > 0 ? (
          stadiums.map((stadium) => (
            <div
              key={stadium._id || stadium.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {stadium.name}
                  </h3>
                  <div className="text-2xl">🏟️</div>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>위치:</strong> {stadium.location?.address || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>서브필드 수:</strong>{" "}
                    {stadium.subField?.length || 0}개
                  </p>
                </div>

                {/* 시설 정보 */}
                {stadium.facilities && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      시설:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {stadium.facilities.shower && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          샤워실
                        </span>
                      )}
                      {stadium.facilities.freeParking && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                          무료주차
                        </span>
                      )}
                      {stadium.facilities.shoesRental && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                          신발대여
                        </span>
                      )}
                      {stadium.facilities.vestRental && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                          조끼대여
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Link
                    to={`/admin/stadiums/edit/${stadium._id || stadium.id}`}
                    className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors text-sm"
                  >
                    수정
                  </Link>
                  <button
                    onClick={() => handleDelete(stadium._id || stadium.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors text-sm"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-500 dark:text-gray-400">
              <div className="text-4xl mb-4">🏟️</div>
              <p>등록된 구장이 없습니다.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StadiumListPage;
