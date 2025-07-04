import { useNavigate } from "react-router-dom";

const SubFieldListModal = ({ stadium, onClose }) => {
  const navigate = useNavigate();

  const handleSubFieldClick = (subFieldId) => {
    onClose(); // 모달 닫기
    navigate(`/stadium/${stadium._id}/subfields/${subFieldId}`); // 서브필드 상세 페이지로 이동
  };

  return (
    <div className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {stadium?.name} 서브필드 목록
        </h2>
      </div>

      {stadium?.subField && stadium.subField.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stadium.subField.map((subField, index) => (
            <div
              key={subField._id || index}
              onClick={() => handleSubFieldClick(subField._id || index)}
              className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 cursor-pointer transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-center gap-3 mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {subField.name || `서브필드 ${index + 1}`}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {subField.type || "일반 구장"}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  클릭하여 상세보기 →
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <span className="text-6xl mb-4 block">🏟️</span>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            등록된 서브필드가 없습니다
          </p>
        </div>
      )}
    </div>
  );
};

export default SubFieldListModal;
