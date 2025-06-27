import MyInput from "../components/common/MyInput";
import GenderSelect from "../components/common/GenderSelect";
import USER from "../api/user";
import { useState,  } from "react";

const SignupModalContent = ({ onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    birth: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, passwordConfirm, name, birth, gender } = formData;

    // 1단계: 필수 필드 검증
    if (!email || !password || !passwordConfirm || !name || !birth || !gender) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    // 2단계: 비밀번호 일치 확인
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 3단계: 서버 요청
    try {
      const data = await USER.signup(email, password, name, birth, gender); // arguments 보내는 ()
      const msg = data.msg || "회원가입이 완료되었습니다.";
      alert(msg);

      // 성공 시 폼 초기화
      setFormData({
        email: "",
        password: "",
        passwordConfirm: "",
        name: "",
        birth: "",
        gender: "",
      })
      onClose();
    } catch (error) {
      alert(`회원가입 실패: ${error.message}`);
    }
  };

  return (
    <div className="max-w-md w-full rounded-xl shadow-2xl p-8 border border-transparent dark:border-gray-700 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <form className="w-full" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-extrabold mb-6 text-center text-blue-600 dark:text-cyan-300 tracking-tight drop-shadow">
          회원가입
        </h2>
        <MyInput
          id="signup-email"
          name="email"
          label="E-mail"
          type="email"
          placeholder="이메일을 입력하세요"
          value={formData.email}
          onChange={handleChange}
        />
        <MyInput
          id="signup-password"
          name="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={formData.password}
          onChange={handleChange}
        />
        <MyInput
          id="signup-password-confirm"
          name="passwordConfirm"
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          value={formData.passwordConfirm}
          onChange={handleChange}
        />
        <MyInput
          id="signup-name"
          name="name"
          label="이름"
          placeholder="이름을 입력하세요"
          value={formData.name}
          onChange={handleChange}
        />
        <MyInput
          id="signup-birth"
          name="birth"
          label="생년월일"
          type="date"
          placeholder="생년월일을 입력하세요"
          value={formData.birth}
          onChange={handleChange}
        />
        <GenderSelect
          id="signup-gender"
          label="성별"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        />
        <button className="w-full p-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 dark:from-cyan-700 dark:to-blue-800 dark:hover:from-cyan-600 dark:hover:to-blue-700 text-white font-bold rounded-lg shadow-md transition">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignupModalContent;
