/*서버정보
로그인 : /api/user/signin
회원가입 :  /api/user/signup
매치 : /api/match/all
매치 세부정보: /api/match/:id
구장등록: /api/stadium
유저정보 가져오기: /api/user/get-user-detail
예약하기 : /api/reservation
내 예약목록 :/api/reservation/my

http://cococoa.tplinkdns.com:44445
*/

const USER = {
  // 회원가입
  signup: async (email, password, name, birth, gender) => {
    // 파라미터 받는()
    try {
      const res = await fetch(`/api/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // 사용자가 입력한 데이터 전송
        body: JSON.stringify({ email, password, name, birth, gender }),
        credentials: "include",
      });
      // 서버에서 받아온 데이터 처리
      const data = await res.json();

      if (!res.ok) {
        const errorMessage =
          data.msg || data.message || "회원가입에 실패했습니다.";
        throw new Error(errorMessage);
      }

      return data;
    } catch (error) {
      throw error;
    }
  },
  // 로그인
  login: async (email, password) => {
    try {
      const res = await fetch(`/api/user/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      // 서버에서 받아온 데이터 처리
      const data = await res.json();
      console.log("로그인 전체 응답 데이터:", data);
      console.log("로그인 응답 데이터 구조:", JSON.stringify(data, null, 2));
      if (!res.ok) {
        const errorMessage =
          data.msg || data.message || "로그인에 실패했습니다.";
        throw new Error(errorMessage);
      }
      return data;
    } catch (error) {
      throw error;
    }
  },
  // 모든 매치 정보 가져오기
  getAllMatches: async () => {
    try {
      const res = await fetch(`/api/match/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      // 서버에서 받아온 데이터 처리
      const data = await res.json();

      if (!res.ok) {
        const errorMessage =
          data.msg || data.message || "매치 정보를 가져오는 데 실패했습니다.";
        throw new Error(errorMessage);
      }

      return data;
    } catch (error) {
      throw error;
    }
  },
  //구장등록
  registerStadium: async (name, location, subField, facilities) => {
    try {
      const res = await fetch(`/api/stadium`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, location, subField, facilities }),
      });
      // 서버에서 받아온 데이터 처리
      const data = await res.json();

      if (!res.ok) {
        const errorMessage =
          data.msg || data.message || "구장 등록에 실패했습니다.";
        throw new Error(errorMessage);
      }

      return data;
    } catch (error) {
      throw error;
    }
  },
  // 유저 정보 가져오기 (비밀번호 확인 이후)
  getUserDetail: async (password) => {
    try {
      const res = await fetch(`/api/user/get-user-detail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
        credentials: "include",
      });
      // 서버에서 받아온 데이터 처리
      const data = await res.json();
      if (!res.ok) {
        const errorMessage =
          data.msg || data.message || "유저 정보를 가져오는 데 실패했습니다.";
        throw new Error(errorMessage);
      }
      return data;
    } catch (error) {
      throw error;
    }
  },
  updateProfile: async (userID, newPassword) => {
    try {
      const res = await fetch(`/api/user/${userID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPassword }),
        credentials: "include",
      });
      // 서버에서 받아온 데이터 처리
      const data = await res.json();
      if (!res.ok) {
        const errorMessage =
          data.msg || data.message || "프로필 수정에 실패했습니다.";
        throw new Error(errorMessage);
      }
      return data;
    } catch (error) {
      throw error;
    }
  },
  getAllStadiums: async () => {
    try {
      const res = await fetch(`/api/stadium`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      // 서버에서 받아온 데이터 처리
      const data = await res.json();
      if (!res.ok) {
        const errorMessage =
          data.msg || data.message || "구장 목록을 가져오는 데 실패했습니다.";
        throw new Error(errorMessage);
      }
      return data;
    } catch (error) {
      throw error;
    }
  },
  // 특정 구장 정보 가져오기 (ID로 조회)
  getStadiumById: async (id) => {
    try {
      const res = await fetch(`/api/stadium/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      // 서버에서 받아온 데이터 처리
      const data = await res.json();
      if (!res.ok) {
        const errorMessage =
          data.msg || data.message || "구장 정보를 가져오는 데 실패했습니다.";
        throw new Error(errorMessage);
      }
      return data;
    } catch (error) {
      throw error;
    }
  },
  // 예약하기
  reserveMatch: async (matchId, userId) => {
    try {
      console.log("예약 요청 데이터:", { matchId, userId });
      const res = await fetch(`/api/reservation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ matchId, userId }),
        credentials: "include",
      });
      // 서버에서 받아온 데이터 처리
      const data = await res.json();
      console.log("예약 응답 데이터:", data);
      if (!res.ok) {
        console.error("예약 요청 실패:", res.status, data);
        const errorMessage = data.msg || data.message || "예약에 실패했습니다.";
        throw new Error(errorMessage);
      }
      return data;
    } catch (error) {
      console.error("예약 에러:", error);
      throw error;
    }
  },
  // 매치 세부 정보
  getMatchDetails: async (matchId) => {
    try {
      const res = await fetch(`/api/match/${matchId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      // 서버에서 받아온 데이터 처리
      const data = await res.json();
      if (!res.ok) {
        const errorMessage =
          data.msg ||
          data.message ||
          "매치 세부 정보를 가져오는 데 실패했습니다.";
        throw new Error(errorMessage);
      }
      return data;
    } catch (error) {
      throw error;
    }
  },
  // 내 예약 목록 
  getMyReservations: async () => {
    try {
      const res = await fetch(`/api/reservation/my`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      // 서버에서 받아온 데이터 처리
      const data = await res.json();
      if (!res.ok) {
        const errorMessage =
          data.msg || data.message || "내 예약 목록을 가져오는 데 실패했습니다.";
        throw new Error(errorMessage);
      }
      return data;
    } catch (error) {
      throw error;
    }
  },
  // 현재 로그인한 유저의 ID를 가져오는 함수
  getCurrentUserId: () => {
    try {
      // 현재 로그인한 유저의 ID를 반환하는 로직
      // localStorage에서 가져오는 경우
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        console.warn("localStorage에 user 정보가 없습니다.");
        return null;
      }

      const user = JSON.parse(userStr);
      console.log("localStorage에서 가져온 user 데이터:", user);

      const userId = user.userId || user.id;
      console.log("추출된 userId:", userId);

      return userId || null; // userId 또는 id 중 하나 반환
    } catch (error) {
      console.error("getCurrentUserId 에러:", error);
      return null;
    }
  },
};

export default USER;
