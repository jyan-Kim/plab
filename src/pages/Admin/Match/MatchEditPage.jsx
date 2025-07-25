import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ADMIN_API } from "../../../api/admin";
const MatchEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    conditions: {
      level: "",
      gender: "",
      matchFormat: "",
      theme: "",
    },
    durationMinutes: 90,
    fee: 12000,
    status: "모집중",
    participantInfo: {
      minimumPlayers: 0,
      maximumPlayers: 0,
    },
    startTime: "",
    subField: {},
    subFieldId: ""
  });
  const [subList, setSubList] = useState([]);
  useEffect(() => {
    if (id) {
      fetchMatch();
    } else {
      fetchSubfields();
    }
  }, [id]);
  const fetchSubfields = async () => {
    try {
      setLoading(true);
      const data = await ADMIN_API.getAllSubFields();
      if (data) {
        setSubList(data);
      }
    } catch (err) {
      alert(`구장 정보 불러오기 오류: ${err}`);
    } finally {
      setLoading(false);
    }
  }

  const fetchMatch = async () => {
    try {
      setLoading(true);
      const response = await ADMIN_API.getMatch(id);
      console.log("Match data:", response);
      if (response) {
        const match = response;
        match.subFieldId = match.subField._id;
        setFormData(match);
      }
    } catch (error) {
      console.error("Error fetching match:", error);
      setError("경기 정보를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };
  // 일반 필드용 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 중첩 객체용 핸들러 (conditions, participantInfo, subField)
  const handleNestedChange = (e, parent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [name]: value,
      },
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (id) {
        await ADMIN_API.updateMatch(id, formData);
        alert("경기 정보가 성공적으로 수정되었습니다.");
      } else {
        await ADMIN_API.createMatch(formData);
        alert("경기가 성공적으로 생성되었습니다.");
      }
      navigate("/admin/matches");
    } catch (error) {
      console.error("Error saving match:", error);
      setError("경기 저장 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    navigate("/admin/matches");
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">
              {id ? "경기 수정" : "새 경기 등록"}
            </h1>
          </div>
          {error && (
            <div className="mx-6 mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  상태 *
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status || ""}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="모집중">모집중</option>
                  <option value="마감">마감</option>
                  <option value="취소됨">취소됨</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  경기 날짜 *
                </label>
                <input
                  type="datetime-local"
                  id="datetime-local"
                  name="startTime"
                  value={formData.startTime ? formData.startTime.slice(0, 16) : ""}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {id && (
                <div className="md:col-span-2">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    경기 장소
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.subField?.stadium?.name || ""}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readOnly
                  />
                </div>
              )}
              {/* 조건(conditions) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  레벨
                </label>
                <input
                  type="text"
                  name="level"
                  value={formData.conditions?.level || ""}
                  onChange={(e) => handleNestedChange(e, "conditions")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="예: 중급 이상"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  성별
                </label>
                <input
                  type="text"
                  name="gender"
                  value={formData.conditions?.gender || ""}
                  onChange={(e) => handleNestedChange(e, "conditions")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="예: 혼성"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  경기 방식
                </label>
                <input
                  type="text"
                  name="matchFormat"
                  value={formData.conditions?.matchFormat || ""}
                  onChange={(e) => handleNestedChange(e, "conditions")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="예: 5v5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  풋살화
                </label>
                <input
                  type="text"
                  name="theme"
                  value={formData.conditions?.theme || ""}
                  onChange={(e) => handleNestedChange(e, "conditions")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="예: 풋살화"
                />
              </div>
              {/* 참가자 정보 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  최소 인원
                </label>
                <input
                  type="number"
                  name="minimumPlayers"
                  value={formData.participantInfo?.minimumPlayers || 0}
                  onChange={(e) => handleNestedChange(e, "participantInfo")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  최대 인원
                </label>
                <input
                  type="number"
                  name="maximumPlayers"
                  value={formData.participantInfo?.maximumPlayers || 0}
                  onChange={(e) => handleNestedChange(e, "participantInfo")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  min="2"
                />
              </div>
              {id && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    현재 인원
                  </label>
                  <input
                    type="number"
                    name="currentPlayers"
                    value={formData.participantInfo?.currentPlayers || 0}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    min="0"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  경기 시간(분)
                </label>
                <input
                  type="number"
                  name="durationMinutes"
                  value={formData.durationMinutes || 0}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  min="0"
                />
              </div>
              {/* 구장(subField) */}
              {id ? (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    구장 ID
                  </label>
                  <input
                    type="text"
                    name="_id"
                    value={formData.subField?._id || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="구장(subField) ID"
                    readOnly
                  />
                </div>
              ): (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    구장 선택
                  </label>
                  <select
                    id="subFieldId"
                    name="subFieldId"
                    value={formData.subFieldId || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {
                      subList.map((sub, idx) => {
                        return (
                          <option value={sub._id} key={idx}>{sub.stadium.name}/{sub.fieldName}</option>
                        )
                      })
                    }
                  </select>
                </div>
              )}
              {/* 참가비 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  참가비(원)
                </label>
                <input
                  type="number"
                  name="fee"
                  value={formData.fee || 0}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  min="0"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-8">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? "저장 중..." : id ? "수정" : "등록"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default MatchEditPage;
