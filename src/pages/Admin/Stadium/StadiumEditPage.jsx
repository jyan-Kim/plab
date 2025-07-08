import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ADMIN from "../../../api/admin";

const StadiumEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stadium, setStadium] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    location: {
      address: "",
      latitude: "",
      longitude: "",
    },
    facilities: {
      shower: false,
      freeParking: false,
      shoesRental: false,
      vestRental: false,
    },
    description: "",
  });

  useEffect(() => {
    fetchStadium();
  }, [id]);

  const fetchStadium = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching stadium with ID:", id);
      
      // 모든 구장을 가져와서 해당 ID의 구장을 찾습니다
      const response = await ADMIN.getAllStadiums();
      console.log("Stadium data response:", response);

      let stadiumData = response.find((stadium) => stadium._id === id);

      console.log("Found stadium data:", stadiumData);

      setStadium(stadiumData);
        setFormData({
          name: stadiumData?.name || "",
          location: {
            province: stadiumData?.location?.province || "",
            city: stadiumData?.location?.city || "",
            district: stadiumData?.location?.district || "",
            address: stadiumData?.location?.address || "",
          },
          facilities: {
            ballRental: stadiumData?.facilities?.ballRental || false,
            drinkSale: stadiumData?.facilities?.drinkSale || false,
            freeParking: stadiumData?.facilities?.freeParking || false,
            shoesRental: stadiumData?.facilities?.shoesRental || false,
            shower: stadiumData?.facilities?.shower || false,
            toiletGenderDivision: stadiumData?.facilities?.toiletGenderDivision || "남녀공용",
            vestRental: stadiumData?.facilities?.vestRental || false,
          },
          description: stadiumData?.description || "",
        });
    } catch (err) {
      console.error("Error fetching stadium:", err);
      setError("구장 정보를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("location.")) {
      const locationField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFacilityChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      facilities: {
        ...prev.facilities,
        [name]: checked,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // 구장 업데이트 API 호출 (실제 API가 구현되어 있지 않을 수 있음)
      console.log("Updating stadium with data:", formData);

      // 임시로 성공 메시지 표시 후 목록 페이지로 이동
      alert("구장 정보가 업데이트되었습니다.");
      navigate("/admin/stadiums");
    } catch (err) {
      console.error("Error updating stadium:", err);
      setError("구장 정보 업데이트에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">구장 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
          <button
            onClick={() => navigate("/admin/stadiums")}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            구장 목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">구장 편집</h1>
              <button
                onClick={() => navigate("/admin/stadiums")}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                목록으로 돌아가기
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  구장명
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="location.address"
                  className="block text-sm font-medium text-gray-700"
                >
                  주소
                </label>
                <input
                  type="text"
                  id="location.address"
                  name="location.address"
                  value={formData.location.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="location.latitude"
                    className="block text-sm font-medium text-gray-700"
                  >
                    위도
                  </label>
                  <input
                    type="number"
                    step="any"
                    id="location.latitude"
                    name="location.latitude"
                    value={formData.location.latitude}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="location.longitude"
                    className="block text-sm font-medium text-gray-700"
                  >
                    경도
                  </label>
                  <input
                    type="number"
                    step="any"
                    id="location.longitude"
                    name="location.longitude"
                    value={formData.location.longitude}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  시설 정보
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="shower"
                      name="shower"
                      checked={formData.facilities.shower}
                      onChange={handleFacilityChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="shower"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      샤워실
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="freeParking"
                      name="freeParking"
                      checked={formData.facilities.freeParking}
                      onChange={handleFacilityChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="freeParking"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      무료주차
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="shoesRental"
                      name="shoesRental"
                      checked={formData.facilities.shoesRental}
                      onChange={handleFacilityChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="shoesRental"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      신발대여
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="vestRental"
                      name="vestRental"
                      checked={formData.facilities.vestRental}
                      onChange={handleFacilityChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="vestRental"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      조끼대여
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  설명
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="구장에 대한 설명을 입력하세요..."
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => navigate("/admin/stadiums")}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "저장 중..." : "저장"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StadiumEditPage;
