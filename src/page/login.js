import React, { useState, useEffect } from "react";
import API from "../api/api";

import { useNavigate, } from "react-router-dom";

import bgImg from "../wrtFileImageView.jpg";

function Login() {
  const [id, setId] =useState('')
  const [password, setPassword] = useState('');
  const [rememberId, setRememberId] = useState(false); // 아이디 저장 체크박스 상태
  const navigate = useNavigate();


  /*서버정보
  로그인 : /api/user/signin
  회원가입 :  /api/user/signup
  http://checksabca.tplinkdns.com:44445/
  */

 


 


  

  const loginSubmit = (e) => {
    e.preventDefault();
    if (id.trim() && password.trim()) {
      const bodyData = { email: id, password };
      console.log('로그인 요청 body:', bodyData); // body에 전달되는 내용 출력
      fetch("http://cococoa.tplinkdns.com:44445/api/user/signin", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData)  
      })
      .then((res) => res.json())
      .then((res) => {
        console.log('로그인 응답:', res); // 서버 응답 전체 출력
        if (res.success) {
          alert(res.msg);
          navigate("/"); // 로그인 성공 후 이동할 경로 설정
        } else {
          alert(res.msg); 
        }
      })  
    } else {
      alert("아이디와 비밀번호를 입력하세요");
      return;
    }
  };
  return (
  <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: `url(${bgImg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: "no-repeat"}}> 
    <div className="container mx-auto mt-10 bg-white border border-gray-300 rounded-lg shadow-lg p-6 max-w-md">
      <form onSubmit={loginSubmit}>
        <h1 className="text-2xl font-bold text-center mb-4">로그인</h1>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700">아이디</span>
          <input
            type="email"
            name="id"
            placeholder="이메일을 입력하세요"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
          >
          </input>
        </label>
        <label>
          <span className="block text-sm font-medium text-slate-700">비밀번호</span>
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500">
          </input>
        </label>
        <div className="mt-4">
          <input type="checkbox" 
            id="remember"
            checked={rememberId}
            onChange={(e) => setRememberId(e.target.checked)}
            className="mt-4 mr-2" />
          <label htmlFor="remember" className="text-sm text-slate-700">아이디 저장</label>
        </div>
        <div className="flex justify-center mt-6">
          <button 
          className="mt-6 bg-sky-500 hover:bg-sky-700 text-white py-2 px-4 rounded-md shadow w-40">로그인</button>
        </div>
        <div className="flex justify-between mt-6">
          <button type="button" onClick={() => navigate("/signup")} className="">회원가입</button>
          <button onClick={() => navigate("/find")} className="">비밀번호 찾기</button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Login;
