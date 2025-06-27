const BASE_URL = "http://cococoa.tplinkdns.com:44445";

/*서버정보
로그인 : /api/user/signin
회원가입 :  /api/user/signup
매치 : /api/match/all
http://cococoa.tplinkdns.com:44445
*/

const USER = {
  // 회원가입
  signup: async (email, password, name, birth, gender) => { // 파라미터 받는()
    try {
      const res = await fetch(`${BASE_URL}/api/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // 데이터 전송
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
  login: async ( email, password) => {
    try {
      const res = await fetch(`${BASE_URL}/api/user/signin`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      })
      // 서버에서 받아온 데이터 처리
      const data = await res.json();
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
      const res = await fetch(`${BASE_URL}/api/match/`, {
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
  }
};

export default USER;
