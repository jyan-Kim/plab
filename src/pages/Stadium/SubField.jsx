import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import USER from "../../api/user";



const SubField = () => {
  const { stadiumId, subFieldId } = useParams(); // URL 파라미터에서 구장 ID와 서브필드 ID 추출
  const navigate = useNavigate();
  const [stadium, setStadium] = useState(null);
  const [subField, setSubField] = useState(null);

  // 구장과 서브필드 데이터 가져오기
useEffect(() => {
  const fetchData = async () => {
    try {
      const stadiumData = await USER.getStadiumById(stadiumId); // 구장 데이터 가져오기
      setStadium(stadiumData); // 구장 데이터 상태에 저장
      console.log("Stadium Data:", stadiumData);
      const subFieldData = stadiumData.subField.find(sf => sf._id === subFieldId); // 서브필드 데이터 찾기
      if (subFieldData) {
        setSubField(subFieldData); // 서브필드 데이터 상태에 저장
        console.log("SubField Data:", subFieldData);
      } else {
        console.error("SubField not found");
      }
      
    } catch (error) {
      console.error("Error fetching stadium data:", error);
    }
  };
  
  fetchData(); // 함수 호출 추가
}, [stadiumId, subFieldId]);
  return(
    <div>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 p-4">
        <div className="mb-6">
          <button
            onClick={() => navigate(`/stadium/${stadiumId}`)} // 구장 상세 페이지로 이동
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4 transition-colors"
          >
            ← 구장으로 돌아가기
          </button>
          {stadium && (
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">
              {stadium.name} - {subField ? subField.name : "서브필드"}
            </h1>
          )}
        </div>
        {/*구장사진 구역*/}
        <div className="mt-6">
          {stadium && stadium.image && (
            <img
              src={stadium.image}
              alt={stadium.name}
              className="w-full h-auto rounded-lg shadow-md"
            />
          )}
        </div>

        {/* 서브필드 정보 표시 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900/20 border border-gray-200 dark:border-gray-700 transition-all duration-200">
          {subField ? (
            <>
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors">
                서브필드 정보
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                이름: {subField.name}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                타입: {subField.type || "일반 구장"}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                설명: {subField.description || "설명이 없습니다."}
              </p>
            </>
          ) : (
            <p className="text-red-500">서브필드를 찾을 수 없습니다.</p>
          )}
        </div>
      </div>

        
    </div>
  )
}


export default SubField;