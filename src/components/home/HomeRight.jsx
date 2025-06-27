import MenuButton from "./MenuButton";
import SignupModalContent from "../../modalContents/SignupModalContent";
import { useState } from "react";
import Modal from "../common/Modal";
import LoginForm from "./LoginForm";
import { useAuth } from "../../contexts/AuthContext"; // 인증 상태 확인을 위한 컨텍스트

const HomeRight = () => {
  const [openModal, setOpenModal] = useState(null);
  const {isAuthenticated} = useAuth(); // 인증 상태 확인
  // 모달 종류 정의
  const modalContents = {
    signup : <SignupModalContent />,
  }
  return (
    <div className="flex flex-col gap-4">
      <Modal open={!!openModal} onClose={() => setOpenModal(null)}>
        {modalContents[openModal]}
      </Modal>
      <LoginForm />
      <div className="border border-gray-300 rounded p-4 bg-white dark:bg-gray-800">
        {/*버튼을 3개씩 가로 정렬*/}
        <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-2 sm:px-4 md:px-6 min-w-0">
          {isAuthenticated ? (
            //로그인된 사용자메뉴
            <>
            <MenuButton icon="👤" label="내 프로필" onClick={() => alert("내 프로필 클릭")} />
            <MenuButton icon="⚽" label="매치 신청" onClick={() => alert("매치 신청")} />
            </>
          ): (
            // 게스트 사용자 메뉴
            <>
            <MenuButton
              icon="📝"
              label="회원가입"
              onClick={() => setOpenModal("signup")}
            />
            <MenuButton
              icon="🔍"
              label="ID/Password 찾기"
              onClick={() => alert("아이디/비밀번호 찾기 클릭")}
            />
          </>
          )}
           <MenuButton icon="🥅" label="구장 등록" onClick={() => alert("구장등록")} /> 
           <MenuButton icon="📧" label="문의하기" onClick={() => alert("문의하기")} />
           <MenuButton icon="ℹ️" label="도움말" onClick={() => alert("도움말")} />
        </div>
      </div>
    </div>
  );
};

export default HomeRight;
