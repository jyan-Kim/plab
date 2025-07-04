// API 클라이언트 기본 설정
const API_BASE_URL = process.env.REACT_APP_API_URL || "";

// 공통 fetch 함수
const apiRequest = async (url, options = {}) => {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include", // 쿠키 포함
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, defaultOptions);

    // 401 에러 (인증 실패) 처리
    if (response.status === 401) {
      // 로그아웃 처리 및 로그인 페이지로 리다이렉트
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("isAdminLoggedIn");
      window.location.href = "/login";
      throw new Error("인증이 만료되었습니다. 다시 로그인해주세요.");
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || data.msg || `HTTP error! status: ${response.status}`
      );
    }

    return data;
  } catch (error) {
    // 네트워크 에러 처리
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error(
        "서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요."
      );
    }
    throw error;
  }
};

// HTTP 메소드별 헬퍼 함수
const apiClient = {
  get: (url, options = {}) => apiRequest(url, { ...options, method: "GET" }),
  post: (url, data, options = {}) =>
    apiRequest(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    }),
  put: (url, data, options = {}) =>
    apiRequest(url, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (url, options = {}) =>
    apiRequest(url, { ...options, method: "DELETE" }),
  patch: (url, data, options = {}) =>
    apiRequest(url, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(data),
    }),
};

export default apiClient;
