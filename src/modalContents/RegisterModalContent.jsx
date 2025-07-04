import { useState } from "react";
import USER from "../api/user";

const RegisterModalContent = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: {
      province: "",
      city: "",
      district: "",
      address: "",
    },
    facilities: {
      shower: false,
      freeParking: false,
      shoesRental: false,
      vestRental: false,
      ballRental: false,
      drinkSale: false,
      genderDivision: false,
    },
  });
  const [subFields, setSubFields] = useState({
    fieldName: "",
    size: {
      width: "",
      height: "",
    },
    indoor: false,
    surface: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await USER.registerStadium(
        formData.name,
        formData.location,
        subFields,
        formData.facilities
      );
      alert("구장 등록 성공: " + (data.msg || "구장 등록이 완료되었습니다."));
      onClose();
    } catch (error) {
      console.error("구장 등록 실패:", error);
    }
  };

  return (
    <div className="max-w-md w-full rounded-xl shadow-2xl p-8 border border-transparent dark:border-gray-700 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <form className="w-full" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-extrabold mb-6 text-center text-blue-600 dark:text-cyan-300 tracking-tight drop-shadow">
          구장등록
        </h2>
        <div className="flex items-center mb-5 min-w-0 w-full">
          <label className="flex items-center h-10 w-40 text-blue-700 dark:text-cyan-200 font-semibold p-0">
            구장명
          </label>
          <input
            id="signup-stadium-name"
            name="stadiumName"
            placeholder="구장명을 입력하세요"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="h-10 p-2 border-2 border-blue-200 dark:border-cyan-700 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-cyan-100 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-cyan-400 transition"
          />
        </div>
        {/*주소*/}
        <div className="mb-5">
          <label className="block mb-3 text-blue-700 dark:text-cyan-200 font-semibold">
            주소
          </label>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <input
                id="signup-province"
                name="province"
                type="text"
                value={formData.location.province}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: {
                      ...formData.location,
                      province: e.target.value,
                    },
                  })
                }
                className="h-9 p-2 border-2 border-blue-200 dark:border-cyan-700 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-cyan-100 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-cyan-400 transition text-sm"
                placeholder="도/광역시"
              />
            </div>
            <div>
              <input
                id="signup-city"
                name="city"
                type="text"
                value={formData.location.city}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: { ...formData.location, city: e.target.value },
                  })
                }
                className="h-9 p-2 border-2 border-blue-200 dark:border-cyan-700 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-cyan-100 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-cyan-400 transition text-sm"
                placeholder="시/군/구"
              />
            </div>
            <div>
              <input
                id="signup-district"
                name="district"
                type="text"
                value={formData.location.district}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: {
                      ...formData.location,
                      district: e.target.value,
                    },
                  })
                }
                className="h-9 p-2 border-2 border-blue-200 dark:border-cyan-700 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-cyan-100 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-cyan-400 transition text-sm"
                placeholder="동/읍/면"
              />
            </div>
            <div>
              <input
                id="signup-address"
                name="address"
                type="text"
                value={formData.location.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: { ...formData.location, address: e.target.value },
                  })
                }
                className="h-9 p-2 border-2 border-blue-200 dark:border-cyan-700 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-cyan-100 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-cyan-400 transition text-sm"
                placeholder="상세주소"
              />
            </div>
          </div>
        </div>
        {/*구장 세부 정보*/}
        <div className="mb-5">
          <label className="block mb-3 text-blue-700 dark:text-cyan-200 font-semibold">
            구장 세부 정보
          </label>
          <div className="space-y-3">
            <input
              type="text"
              value={subFields.fieldName}
              onChange={(e) =>
                setSubFields({ ...subFields, fieldName: e.target.value })
              }
              placeholder="구장 이름"
              className="h-9 p-2 border-2 border-blue-200 dark:border-cyan-700 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-cyan-100 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-cyan-400 transition text-sm"
              required
            />
            <div>
              <label className="block mb-2 text-sm text-blue-600 dark:text-cyan-300 font-medium">
                구장 크기 (m)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  value={subFields.size.width}
                  onChange={(e) =>
                    setSubFields({
                      ...subFields,
                      size: { ...subFields.size, width: e.target.value },
                    })
                  }
                  placeholder="너비"
                  className="h-9 p-2 border-2 border-blue-200 dark:border-cyan-700 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-cyan-100 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-cyan-400 transition text-sm"
                />
                <input
                  type="number"
                  value={subFields.size.height}
                  onChange={(e) =>
                    setSubFields({
                      ...subFields,
                      size: { ...subFields.size, height: e.target.value },
                    })
                  }
                  placeholder="높이"
                  className="h-9 p-2 border-2 border-blue-200 dark:border-cyan-700 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-cyan-100 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-cyan-400 transition text-sm"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-blue-600 dark:text-cyan-300 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-800 p-2 rounded-lg transition">
                <input
                  type="checkbox"
                  checked={subFields.indoor}
                  onChange={(e) =>
                    setSubFields({ ...subFields, indoor: e.target.checked })
                  }
                  className="w-4 h-4 text-blue-600 bg-blue-50 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="text-sm font-medium">실내 구장</span>
              </label>
            </div>
            <input
              type="text"
              value={subFields.surface}
              onChange={(e) =>
                setSubFields({ ...subFields, surface: e.target.value })
              }
              placeholder="구장 표면 (예: 잔디, 인조잔디)"
              className="h-9 p-2 border-2 border-blue-200 dark:border-cyan-700 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-cyan-100 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-cyan-400 transition text-sm"
              required
            />
          </div>
        </div>
        {/*시설*/}
        <div className="mb-5">
          <label className="block mb-3 text-blue-700 dark:text-cyan-200 font-semibold">
            시설
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center gap-2 text-blue-600 dark:text-cyan-300 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-800 p-2 rounded-lg transition">
              <input
                type="checkbox"
                checked={formData.facilities.shower}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      shower: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4 text-blue-600 bg-blue-50 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-sm font-medium">샤워 시설</span>
            </label>
            <label className="flex items-center gap-2 text-blue-600 dark:text-cyan-300 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-800 p-2 rounded-lg transition">
              <input
                type="checkbox"
                checked={formData.facilities.freeParking}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      freeParking: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4 text-blue-600 bg-blue-50 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-sm font-medium">무료 주차</span>
            </label>
            <label className="flex items-center gap-2 text-blue-600 dark:text-cyan-300 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-800 p-2 rounded-lg transition">
              <input
                type="checkbox"
                checked={formData.facilities.shoesRental}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      shoesRental: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4 text-blue-600 bg-blue-50 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-sm font-medium">신발 대여</span>
            </label>
            <label className="flex items-center gap-2 text-blue-600 dark:text-cyan-300 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-800 p-2 rounded-lg transition">
              <input
                type="checkbox"
                checked={formData.facilities.vestRental}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      vestRental: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4 text-blue-600 bg-blue-50 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-sm font-medium">조끼 대여</span>
            </label>
            <label className="flex items-center gap-2 text-blue-600 dark:text-cyan-300 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-800 p-2 rounded-lg transition">
              <input
                type="checkbox"
                checked={formData.facilities.ballRental}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      ballRental: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4 text-blue-600 bg-blue-50 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-sm font-medium">공 대여</span>
            </label>
            <label className="flex items-center gap-2 text-blue-600 dark:text-cyan-300 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-800 p-2 rounded-lg transition">
              <input
                type="checkbox"
                checked={formData.facilities.drinkSale}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      drinkSale: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4 text-blue-600 bg-blue-50 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-sm font-medium">음료 판매</span>
            </label>
            <label className="flex items-center gap-2 text-blue-600 dark:text-cyan-300 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-800 p-2 rounded-lg transition col-span-2">
              <input
                type="checkbox"
                checked={formData.facilities.genderDivision}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    facilities: {
                      ...formData.facilities,
                      genderDivision: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4 text-blue-600 bg-blue-50 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-sm font-medium">성별 구분</span>
            </label>
          </div>
        </div>

        <button className="w-full p-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 dark:from-cyan-700 dark:to-blue-800 dark:hover:from-cyan-600 dark:hover:to-blue-700 text-white font-bold rounded-lg shadow-md transition">
          구장등록
        </button>
      </form>
    </div>
  );
};

export default RegisterModalContent;
