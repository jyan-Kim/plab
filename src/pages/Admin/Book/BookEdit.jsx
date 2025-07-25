import { useState, useEffect, use } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ADMIN from "../../../api/admin";

const BookEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // 예약 ID (수정 모드일 경우)
  const [formData, setFormData] = useState({
    userId: "",
    matchId: "",
    status: "예약", // 기본값
  });

  useEffect(() => {
    // 예약 ID가 있을 때 수정 모드로 진입
    if (id) {
      const fetchBookings = async () => {
        try {
          const bookingData = await ADMIN.getBookingById(id);
          // 예약 데이터를 상태에 저장하거나 폼에 채우는 로직 추가
          console.log("예약 데이터:", bookingData);
          setFormData(bookingData);
        } catch (error) {
          console.error("예약 데이터 불러오기 실패:", error);
        }
      };
      fetchBookings();
    }
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    if (!formData) {
      console.error("폼 데이터가 없습니다.");
      return;
    }
    try {
      await ADMIN.updateBooking(formData._id, {
        userId: formData.user?._id,
        matchId: formData.match?._id,
        status: formData.status,
        reservedAt: formData.reservedAt,
      });
      alert("예약 정보가 수정되었습니다.");
      navigate('/admin/Bookings');
      // 필요시 navigate로 목록 이동
    } catch (error) {
      alert("예약 수정 실패: " + (error.message || error));
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-8 px-2 transition-colors duration-200">
      <div className="w-full max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          예약 수정 페이지
        </h1>
        {formData ? (
          <form onSubmit={submitForm} className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                예약 ID
              </span>
              <span className="font-mono text-blue-700 dark:text-blue-300 text-sm">
                {formData._id}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor="userName"
                className="text-sm text-gray-500 dark:text-gray-400"
              >
                사용자명
              </label>
              <input
                id="userName"
                type="text"
                className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-200 w-40"
                value={formData.user?.name || ""}
                readOnly
              />
              <label
                htmlFor="userEmail"
                className="text-sm text-gray-500 dark:text-gray-400"
              >
                이메일
              </label>
              <input
                id="userEmail"
                type="email"
                className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-200 w-56"
                value={formData.user?.email || ""}
                readOnly
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor="matchStart"
                className="text-sm text-gray-500 dark:text-gray-400"
              >
                매치 시작
              </label>
              <input
                id="matchStart"
                type="datetime-local"
                className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-200 w-64"
                value={
                  formData.match?.startTime
                    ? new Date(formData.match.startTime).toISOString().slice(0, 16)
                    : ""
                }
                readOnly
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor="status"
                className="text-sm text-gray-500 dark:text-gray-400"
              >
                상태
              </label>
              <select
                id="status"
                className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-200 w-32"
                value={formData.status}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, status: e.target.value }))
                }
              >
                <option value="예약">예약</option>
                <option value="취소">취소</option>
              </select>
            </div>
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor="reservedAt"
                className="text-sm text-gray-500 dark:text-gray-400"
              >
                예약 시간
              </label>
              <input
                id="reservedAt"
                type="datetime-local"
                className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-200 w-64"
                value={
                  formData.reservedAt
                    ? new Date(formData.reservedAt).toISOString().slice(0, 16)
                    : ""
                }
                readOnly
              />
            </div>
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                저장
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-500 dark:text-gray-400">
              예약 데이터를 불러오는 중...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookEdit;
