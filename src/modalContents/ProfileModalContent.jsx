import MyInput from "../components/common/MyInput";
import InfoDisplay from "../components/common/InfoDisplay";
import PasswordConfirmModal from "./PasswordConfirmModal";
import USER from "../api/user";
import { useState } from "react";

const ProfileModalContent = ({ onClose }) => {
  const [step, setStep] = useState("passwordConfirm"); // 비밀번호 확인 => 프로필 수정
  const [userData, setUserData] = useState(null); // 서버에서 받은 유저 데이터 저장
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    birth: "",
    gender: false,
  });

  // 성별 변환 함수 (0/false = 남성, 1/true = 여성)
  const getGenderText = (gender) => {
    return gender ? "여성" : "남성";
  };

  // 비밀번호 확인이 성공했을때 실행되는 함수
  const handlePasswordConfirmed = async (res) => {
    // 서버 응답에서 실제 사용자 데이터 추출
    const user = res.user;
    //원본 데이터 저장
    setUserData(user);
    //폼 데이터에 기존 정보 채우기
    setFormData({
      email: user.email,
      password: "", // 비밀번호는 수정할 때 입력하도록 비워둠
      passwordConfirm: "", // 비밀번호 확인도 비워둠
      name: user.name,
      birth: user.birth ? user.birth.split("T")[0] : "",
      gender: user.gender,
    });
    // 프로필 수정 단계로 이동
    setStep("profileEdit");
  };

  if (step === "passwordConfirm") {
    return (
      <PasswordConfirmModal
        onSuccess={handlePasswordConfirmed} // 비밀번호 확인 성공 시 실행되는 함수
        onClose={onClose} // 모달 닫기 함수
      />
    );
  }

  const submitProfileEdit = async (e) => {
    e.preventDefault();
    
    //변경 할수있는 데이터만 추출
    const { password, passwordConfirm } = formData;
    //비밀번호 검사 
    if (!password || !passwordConfirm) {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
  console.log("userData:", userData);
  console.log("userData의 키들:", Object.keys(userData));
    try {
      const userID = userData._id; // 서버에서 받은 유저 데이터에서 ID 추출

      await USER.updateProfile(userID, password); // 비밀번호 업데이트 요청
      alert("프로필이 성공적으로 수정되었습니다.");
      onClose(); // 모달 닫기

    }catch (error) {
      alert(`프로필 수정 실패: ${error.message}`);
      return;
    }

  }

  return (
    <div className="max-w-md w-full rounded-xl shadow-2xl p-8 border border-transparent dark:border-gray-700 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <form className="w-full" onSubmit={submitProfileEdit}>
        <h2 className="text-2xl font-extrabold mb-6 text-center text-blue-600 dark:text-cyan-300 tracking-tight drop-shadow">
          프로필 수정
        </h2>
        <div className="mb-6">
          <InfoDisplay label="이메일" value={formData.email} />
          <MyInput
            id="edit-password"
            name="password"
            label="새 비밀번호"
            type="password"
            placeholder="새로운 비밀번호를 입력하세요"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <MyInput
            id="edit-password-confirm"
            name="passwordConfirm"
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            value={formData.passwordConfirm}
            onChange={(e) =>
              setFormData({ ...formData, passwordConfirm: e.target.value })
            }
          />
          <MyInput
            id="edit-name"
            label="이름"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
          <MyInput
            id="edit-birth"
            name="birth"
            type="date"
            label="생년월일"
            value={formData.birth}
              onChange={(e) =>
              setFormData({ ...formData, birth: e.target.value })
            }
          />
          <InfoDisplay
            label="성별"
            value={getGenderText(formData.gender)}
          />
        </div>
        <button type="submit" className="w-full p-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 dark:from-cyan-700 dark:to-blue-800 dark:hover:from-cyan-600 dark:hover:to-blue-700 text-white font-bold rounded-lg shadow-md transition">
          수정하기
        </button>
      </form>
    </div>
  );
};

export default ProfileModalContent;
