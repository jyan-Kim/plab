const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // 모달이 닫혀있으면 아무것도 렌더링하지 않음
  return (
    // 모달 배경과 중앙정렬
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      {/* 모달 내용 영역 */}
      <div className="bg-white rounded-lg p-6 relative min-w-[300px]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl"
          aria-label="닫기"
        >
          ✖️
        </button>
        {children} {/* 부모가 넣어주는 실제 내용(예약 폼 등) */}
      </div>
    </div>
  );
};

export default Modal;

