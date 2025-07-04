import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import USER from "../../api/user";
import StadiumCard from "./StadiumCard";
import Modal from "../../components/common/Modal";
import SubFieldListModal from "../../modalContents/SubFieldListModal";

//구장 페이지
const Stadium = () => {
  const { id } = useParams(); // URL 파라미터에서 구장 ID 추출
  const navigate = useNavigate();
  const [stadium, setStadium] = useState(null);
  const [showSubFieldModal, setShowSubFieldModal] = useState(false); // 모달 상태 관리

  //id 데이터 가져오기
  useEffect(() => {
    const fetchStadium = async () => {
      try {
        const data = await USER.getStadiumById(id); // id 를 보내서
        setStadium(data);
      } catch (error) {
        console.error("Error fetching stadium data:", error);
      }
    };
    if (id) {
      fetchStadium();
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 p-4">
      {/* 헤더 섹션 */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/stadiumList")} // 구장 목록으로 이동
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4 transition-colors"
        >
          ← 목록으로 돌아가기
        </button>
        {stadium && (
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">
            {stadium.name}
          </h1>
        )}
      </div>

      {/* 메인 컨텐츠 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 왼쪽: 구장 카드 */}
        <div>
          <StadiumCard stadium={stadium} showClickPrompt={false} />
        </div>

        {/* 오른쪽: 액션 버튼들 */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900/20 border border-gray-200 dark:border-gray-700 transition-all duration-200">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors">
              구장 관리
            </h2>
            <button
              onClick={() => {
                console.log("버튼클릭됨");
                setShowSubFieldModal(true);
              }}
              className="w-full flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg mb-3 transition-all duration-200 border border-blue-200 dark:border-blue-700"
            >
              <span className="text-2xl">🏟️</span>
              <div className="text-left">
                <p className="font-medium text-blue-700 dark:text-blue-300">
                  서브필드
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  {stadium?.subField?.length || 0}개 서브필드
                </p>
              </div>
            </button>

            <button className="w-full flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg mb-3 transition-all duration-200 border border-green-200 dark:border-green-700">
              <span className="text-2xl">📅</span>
              <div className="text-left">
                <p className="font-medium text-green-700 dark:text-green-300">
                  예약하기
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  구장 예약 신청
                </p>
              </div>
            </button>

            <button className="w-full flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-all duration-200 border border-purple-200 dark:border-purple-700">
              <span className="text-2xl">🗺️</span>
              <div className="text-left">
                <p className="font-medium text-purple-700 dark:text-purple-300">
                  위치보기
                </p>
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  지도에서 확인
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
      {/* 서브필드 목록 모달 */}
      <Modal
        open={showSubFieldModal}
        onClose={() => setShowSubFieldModal(false)}
      >
        <SubFieldListModal
          stadium={stadium}
          onClose={() => setShowSubFieldModal(false)}
        />
      </Modal>
    </div>
  );
};

export default Stadium;
