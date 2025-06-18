import axios from "axios";
import React, { use } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api"; // api.js 파일에서 API 객체를 import 합니다.
import bgImg from "../wrtFileImageView.jpg"; // 배경 이미지 경로

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");

  const navigate = useNavigate();

  // 회원가입 버튼 클릭 시 실행되는 함수

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      email.trim() &&
      password.trim() &&
      passwordConfirm.trim() &&
      name.trim() &&
      birth &&
      gender
    ) {
      if (password !== passwordConfirm) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
      const bodyData = {
        email: email,
        password: password,
        name: name,
        birth: birth,
        gender: gender,
      };
      console.log("회원가입 요청 body:", bodyData); // body에 전달되는 내용 출력
      fetch("http://cococoa.tplinkdns.com:44445/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            alert("회원가입 성공");
            navigate("/login"); // 로그인 페이지로 이동 (절대경로로 수정)
          } else {
            alert(res.msg || "회원가입 실패");
          }
        })
        .catch((error) => {
          console.error("회원가입 요청 중 오류 발생:", error);
          alert("회원가입 중 문제가 발생했습니다. 다시 시도해주세요.");
        });
    } else {
      alert("모든 정보를 입력하세요");
      return;
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto mt-10 bg-white border border-gray-300 rounded-lg shadow-lg p-6 max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">회원가입</h1>
        <form onSubmit={submitHandler}>
          <label>
            <span className="block text-sm font-medium text-slate-700">
              이메일
            </span>
            <input
              type="email"
              name="id"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            ></input>
          </label>
          <label>
            <span className="block text-sm font-medium text-slate-700">
              비밀번호
            </span>
            <input
              type="password"
              name="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            ></input>
          </label>
          <label>
            <span className="block text-sm font-medium text-slate-700">
              비밀번호 확인
            </span>
            <input
              type="password"
              name="passwordConfirm"
              placeholder="비밀번호를 다시 입력하세요"
              value={passwordConfirm}
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
              }}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
           focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
           disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
           invalid:border-pink-500 invalid:text-pink-600
           focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            ></input>
          </label>
          <label>
            <span className="block text-sm font-medium text-slate-700">
              이름
            </span>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="이름을 입력하세요"
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
           focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
           disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
           invalid:border-pink-500 invalid:text-pink-600
           focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            ></input>
          </label>
          <label>
            <span className="block text-sm font-medium text-slate-700">
              생년월일
            </span>
            <input
              type="date"
              name="DOB"
              value={birth}
              onChange={(e) => {
                setBirth(e.target.value);
              }}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            ></input>
          </label>
          <label>
            <span className="block text-sm font-medium text-slate-700">
              성별
            </span>
            <div className="flex items-center gap-4">
              <input
                type="radio"
                name="gender"
                value="0"
                checked={gender === "0"}
                onChange={() => setGender("0")}
              />
              <label htmlFor="male">남성</label>
              <input
                type="radio"
                name="gender"
                value="1"
                checked={gender === "1"}
                onChange={() => setGender("1")}
              />
              <label>여성</label>
            </div>
          </label>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="mt-6 bg-sky-500 hover:bg-sky-700 text-white py-2 px-4 rounded-md shadow w-40"
            >
              가입하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
