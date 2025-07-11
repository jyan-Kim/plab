import { useState, useEffect } from "react";
import USER from "../api/user";

const ReservationListModal = ({ onClose }) => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const data = await USER.getMyReservations();
      console.log("받은 데이터:", data);
      setReservations(data.reservations || data.data || data || []);
    } catch (err) {
      console.error("예약 목록 에러:", err);
      setError(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        내 예약 목록
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {reservations.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">
            예약 내역이 없습니다.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reservations.map((reservation, index) => (
            <div
              key={reservation.id || index}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                    {reservation.match?.subField?.stadium?.name || "구장명"} -{" "}
                    {reservation.match?.subField?.fieldName || "필드"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    날짜:{" "}
                    {reservation.match?.startTime
                      ? new Date(
                          reservation.match.startTime
                        ).toLocaleDateString("ko-KR")
                      : "날짜 정보 없음"}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    시간:{" "}
                    {reservation.match?.startTime
                      ? new Date(
                          reservation.match.startTime
                        ).toLocaleTimeString("ko-KR", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })
                      : "시간 정보 없음"}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    상태:{" "}
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        reservation.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {reservation.status === "confirmed" ? "확정" : "대기"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end mt-6">
        <button
          onClick={onClose}
          className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default ReservationListModal;
