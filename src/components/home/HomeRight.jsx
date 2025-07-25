import MenuButton from "./MenuButton";
import SignupModalContent from "../../modalContents/SignupModalContent";
import RegisterModalContent from "../../modalContents/RegisterModalContent";
import ProfileModalContent from "../../modalContents/ProfileModalContent"; // 프로필 수정 모달
import { useState } from "react";
import Modal from "../common/Modal";
import LoginForm from "./LoginForm";
import { useAuth } from "../../contexts/AuthContext"; // 인증 상태 확인을 위한 컨텍스트
import { useNavigate } from "react-router-dom";
import ReservationListModal from "../../modalContents/ReservationListModal";


const HomeRight = () => {
  const [openModal, setOpenModal] = useState(null);
  const { isAuthenticated, user } = useAuth(); // 인증 상태 및 유저 정보
  const navigate = useNavigate(); //
  // 모달 종류 정의
  const modalContents = {
    signup: <SignupModalContent onClose={() => setOpenModal(null)} />,
    Register: <RegisterModalContent onClose={() => setOpenModal(null)} />, // 구장 등록 모달
    Profile: <ProfileModalContent onClose={() => setOpenModal(null)} />,
    ReservationList: <ReservationListModal onClose={() => setOpenModal(null)} />,
  };
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
            // 로그인된 사용자 메뉴
            <>
              <MenuButton
                icon="👤"
                label="내 프로필"
                onClick={() => setOpenModal("Profile")}
              />
              <MenuButton
                icon="⚽"
                label="예약 목록"
                onClick={() => setOpenModal("ReservationList")} // 예약 목록 모달 열기
              />
              <MenuButton
                icon="🔧"
                label="관리자 페이지"
                onClick={() => navigate("/admin")} // 관리자 페이지로 이동
              />
              {/* 관리자만 구장 등록 버튼 노출 */}
              {user?.role === "admin" && (
                <MenuButton
                  icon="🥅"
                  label="구장 등록"
                  onClick={() => setOpenModal("Register")}
                />
              )}
            </>
          ) : (
            // 게스트 사용자 메뉴
            <>
              <MenuButton
                icon="�"
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
          <MenuButton
            icon="📧"
            label="구장정보"
            onClick={() => navigate("/stadiumList")} // 구장 목록 페이지로 이동
          />
          <MenuButton
            icon="ℹ️"
            label="도움말"
            onClick={() => alert("도움말")}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeRight;
