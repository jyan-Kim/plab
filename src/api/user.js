const BASE_URL = "http://cococoa.tplinkdns.com:44445";

/*서버정보
로그인 : /api/user/signin
회원가입 :  /api/user/signup
매치 : /api/match/all
http://cococoa.tplinkdns.com:44445
*/

  

const USER = {
  login: async (email, password) => {
    const response = await fetch(`${BASE_URL}/api/user/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  signup: async (email, password, name, birth, gender) => {
    const response = await fetch(`${BASE_URL}/api/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name, birth, gender }),
    });
    return response.json();
  },

  stadiumData: async (name, location, facilities, subFields) => {
    const response = await fetch(`${BASE_URL}/api/stadium/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          name,
          location,
          facilities,
          subFields: [subFields],
      }),
    });
    return response.json();

  },
  getAllMatches: async () => {
    const response = await fetch(`${BASE_URL}/api/match/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  },
};

export default USER;