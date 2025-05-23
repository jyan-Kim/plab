import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 훅

const Register = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState(""); // 성공했을때 페이지에 표시되게 하기위해서? 미관상인듯

  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("구장 등록이 완료되었습니다.");
    setName(""); // 입력 필드 초기화
    setLocation(""); // 입력 필드 초기화
    setDescription(""); // 입력 필드 초기화
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
          <label className="block mb-1 font-semibold">위치</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">설명</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={3}
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
