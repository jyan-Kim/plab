import { useState } from "react";
import MyInput from "../components/common/MyInput";
import USER from "../api/user";

// 비밀번호 확인 모달 컴포넌트
const PasswordConfirmModal = ({ onClose, onSuccess }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      setError("비밀번호를 입력해주세요.");
      return;
    }
    setError("");

    try {
      const data = await USER.getUserDetail(password);
      // 성공 시 부모 컴포넌트에 유저 데이터 전달
      console.log("서버에서 받은 데이터:", data); // 디버깅용
      onSuccess(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-blue-700 dark:text-cyan-200 mb-6 text-center">
        비밀번호 확인
      </h2>

      <form onSubmit={handleSubmit}>
        <MyInput
          id="password"
          label="비밀번호"
          type="password"
          placeholder="현재 비밀번호를 입력하세요"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
        )}

        <div className="flex gap-3 mt-6">
          <button
            type="submit"
            className="flex-1 py-2 px-4 bg-blue-500 dark:bg-cyan-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-cyan-700 disabled:opacity-50 transition"
          >
            확인
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 px-4 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordConfirmModal;
