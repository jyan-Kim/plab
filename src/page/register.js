import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 훅

const Register = () => {
  // 구장 등록을 위한 상태 변수들
  const [name, setName] = useState("");
  const [location, setLocation] = useState({
    province: "",
    city: "",
    district: "",
    address: "",
  });
  const [facilities, setFacilities] = useState({
    shower: false,
    freeParking: false,
    shoesRental: false,
    vestRental: false,
    ballRental: false,
    drinkSale: false,
    genderDivision: false,
  });

  const [subFields, setSubFields] = useState({
    fieldName: "",
    size: { width: 0, height: 0 },
    indoor: false,
    surface: "",
  });

  const [stadiumId, setStadiumId] = useState(null) // 구장 ID를 저장하기 위한 상태 변수

  const [message, setMessage] = useState(""); // 성공했을때 페이지에 표시되게 하기위해서? 미관상인듯

  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

  const handleSubmit = async (e) => {
  
 
  
    e.preventDefault();
    // 폼 제출 시 실행되는 함수
    if (
      !name ||
      !location.province ||
      !location.city ||
      !location.district ||
      !location.address
    ) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    if (!subFields.fieldName || !subFields.size || !subFields.surface) {
      alert("구장 세부 정보를 입력해주세요.");
      return;
    }
    // 구장 등록 로직 (예: API 호출 등)
    const mainStadiumData = await fetch(
      "http://cococoa.tplinkdns.com:44445/api/stadium/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          location,
          facilities,
        }),
      }
    ).then((res) => res.json());
    if (mainStadiumData.success === true || mainStadiumData.success === 'true') {
      setStadiumId(mainStadiumData.stadiumId); // 메인 구장 ID 저장
      setMessage("구장 등록이 완료되었습니다.");
    }else {
      setMessage(mainStadiumData.msg || "구장 등록 실패");
      return;
    }


    const subStadiumData = await fetch(
      "http://cococoa.tplinkdns.com:44445/api/stadium/subField/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fieldName: subFields.fieldName,
          size: {
            width: Number(subFields.size.width),
            height: Number(subFields.size.height),
          },
          indoor: subFields.indoor,
          surface: subFields.surface,
          stadiumId: mainStadiumData.stadiumId, // 메인 구장 ID를 전달
        }),
      }
    ).then((res) => res.json());
    if (!subStadiumData.success) {
      setMessage(subStadiumData.msg || "구장 세부 정보 등록 실패");
      return;
    }

    setMessage("구장 등록이 완료되었습니다.");
    setName("");
    setLocation({
      province: "",
      city: "",
      district: "",
      address: "",
    });
    setFacilities({
      shower: false,
      freeParking: false,
      shoesRental: false,
      vestRental: false,
      ballRental: false,
      drinkSale: false,
      genderDivision: false,
    });
    setSubFields({
      fieldName: "",
      size: "",
      indoor: false,
      surface: "",
    });
    setMessage("구장 등록이 완료되었습니다."); // 성공 메시지 설정
  };

  

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">구장 등록</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">구장명</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">주소</label>
          <input
            type="text"
            value={location.province}
            onChange={(e) =>
              setLocation({ ...location, province: e.target.value })
            }
            placeholder="도/광역시"
            className="w-full border rounded px-3 py-2 mb-2"
            required
          />
          <input
            type="text"
            value={location.city}
            onChange={(e) => setLocation({ ...location, city: e.target.value })}
            placeholder="시/군/구"
            className="w-full border rounded px-3 py-2 mb-2"
            required
          ></input>
          <input
            type="text"
            value={location.district}
            onChange={(e) =>
              setLocation({ ...location, district: e.target.value })
            }
            placeholder="동/읍/면"
            className="w-full border rounded px-3 py-2 mb-2"
            required
          ></input>
          <input
            type="text"
            value={location.address}
            onChange={(e) =>
              setLocation({ ...location, address: e.target.value })
            }
            placeholder="상세 주소"
            className="w-full border rounded px-3 py-2"
            required
          ></input>
        </div>
        <div>
          <label className="block mb-1 font-semibold">시설</label>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={facilities.shower}
                onChange={(e) =>
                  setFacilities({ ...facilities, shower: e.target.checked })
                }
                className="mr-2"
              />
              샤워 시설
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={facilities.freeParking}
                onChange={(e) =>
                  setFacilities({
                    ...facilities,
                    freeParking: e.target.checked,
                  })
                }
                className="mr-2"
              />
              무료 주차
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={facilities.shoesRental}
                onChange={(e) =>
                  setFacilities({
                    ...facilities,
                    shoesRental: e.target.checked,
                  })
                }
              />
              신발 대여
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={facilities.vestRental}
                onChange={(e) =>
                  setFacilities({ ...facilities, vestRental: e.target.checked })
                }
                className="mr-2"
              />
              조끼 대여
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={facilities.ballRental}
                onChange={(e) =>
                  setFacilities({ ...facilities, ballRental: e.target.checked })
                }
                className="mr-2"
              />
              공 대여
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={facilities.drinkSale}
                onChange={(e) =>
                  setFacilities({ ...facilities, drinkSale: e.target.checked })
                }
                className="mr-2"
              />
              음료 판매
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={facilities.genderDivision}
                onChange={(e) =>
                  setFacilities({
                    ...facilities,
                    genderDivision: e.target.checked,
                  })
                }
                className="mr-2"
              />
              성별 구분
            </label>
          </div>
        </div>
        <div>
          <label className="block mb-1 font-semibold">구장 세부 정보</label>
          <input
            type="text"
            value={subFields.fieldName}
            onChange={(e) =>
              setSubFields({ ...subFields, fieldName: e.target.value })
            }
            placeholder="구장 이름"
            className="w-full border rounded px-3 py-2 mb-2"
            required
          />
          <label className="block mb-1 font-semibold">구장 크기 (m)</label>
          <div className="flex items-center gap-2 mb-2">
          <input type="number" value={subFields.size.width} onChange={e => setSubFields({ ...subFields, size: { ...subFields.size, width: e.target.value } })} />
          <input type="number" value={subFields.size.height} onChange={e => setSubFields({ ...subFields, size: { ...subFields.size, height: e.target.value } })} />
          </div>
          <div className="flex items-center gap-4 mb-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={subFields.indoor}
                onChange={(e) =>
                  setSubFields({ ...subFields, indoor: e.target.checked })
                }
                className="mr-2"
              />
              실내 구장
            </label>
          </div>
          <input
            type="text"
            value={subFields.surface}
            onChange={(e) =>
              setSubFields({ ...subFields, surface: e.target.value })
            }
            placeholder="구장 표면 (예: 잔디, 인조잔디)"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-sky-500 hover:bg-sky-700 text-white py-2 rounded font-bold"
        >
          등록하기
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="w-full mt-2 bg-gray-300 hover:bg-gray-400 text-black py-2 rounded font-bold"
        >
          돌아가기
        </button>
      </form>
      {message && <p className="mt-4 text-green-600 text-center">{message}</p>}
    </div>
  );
};

export default Register;
