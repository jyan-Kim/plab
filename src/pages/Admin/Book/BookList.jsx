import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ADMIN from "../../../api/admin";

const BookList = () => {
  const [Bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await ADMIN.getAllBookings();
        setBookings(data);
        console.log("예약 목록:", data);
      } catch (error) {
        console.error("예약 목록 가져오기 실패:", error);
      }
    };
    fetchBookings();
  }, []);

  const deleteBooking = async (id) => {
    if (window.confirm("정말로 이 예약을 삭제하시겠습니까?")) {
      try {
        await ADMIN.deleteBooking(id);
        alert("예약이 성공적으로 삭제되었습니다.");
        setBookings((prev) => prev.filter((booking) => booking._id !== id));
      } catch (error) {
        console.error("예약 삭제 실패:", error);
        alert("예약 삭제에 실패했습니다: " + error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 py-8 px-2">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            예약 목록
          </h2>
          <button
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
            onClick={() => navigate("/admin")}
          >
            대시보드로 돌아가기
          </button>
        </div>

        {Bookings.length === 0 ? (
          <div className="text-gray-400 dark:text-gray-500 text-center py-12 text-lg">
            <div className="text-4xl mb-4">📅</div>
            예약 내역이 없습니다.
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                총{" "}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {Bookings.length}
                </span>{" "}
                건의 예약
              </p>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Bookings.map((reservation) => (
                <li
                  key={reservation._id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col justify-between"
                >
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg text-blue-700 dark:text-blue-300">
                        예약 ID: {reservation._id}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${
                          reservation.status === "취소"
                            ? "bg-red-100 text-red-600 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700"
                            : "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700"
                        }`}
                      >
                        {reservation.status}
                      </span>
                    </div>
                    <div className="space-y-1 mb-3">
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        <strong>예약 사용자:</strong> {reservation.user?.name} (
                        {reservation.user?.email})
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        <strong>예약 매치:</strong>{" "}
                        {reservation.match?.startTime
                          ? new Date(
                              reservation.match.startTime
                            ).toLocaleString()
                          : "N/A"}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        (경기장:{" "}
                        {reservation.match?.subField?.stadium?.name || "N/A"} /
                        서브필드:{" "}
                        {reservation.match?.subField?.fieldName || "N/A"})
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        <strong>예약 일시:</strong>{" "}
                        {new Date(reservation.reservedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30">
                    <button
                      className="flex-1 text-center bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded transition-colors text-sm font-medium"
                      onClick={() =>
                        navigate(`/admin/bookings/edit/${reservation._id}`)
                      }
                    >
                      예약 수정/취소
                    </button>
                    <button
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors text-sm font-medium"
                      onClick={() => deleteBooking(reservation._id)}
                    >
                      예약 삭제
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default BookList;
