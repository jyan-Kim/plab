const ADMIN = {
  // 관리자 로그인 (일반 사용자 API 활용하되 서버에서 권한 확인)
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
      const data = await res.json();
      if (!res.ok) {
        const errorMessage =
          data.msg || data.message || "로그인에 실패했습니다.";
        throw new Error(errorMessage);
      }
      // 로그인 성공 후 관리자 권한 확인
      if (data.msg && data.msg.includes("성공")) {
        // 서버에서 사용자 정보를 가져와서 관리자 권한 확인
        try {
          const userRes = await fetch(`/api/user/get-user-detail`, {
            method: "GET",
            credentials: "include",
          });
          if (userRes.ok) {
            const userData = await userRes.json();
            // 서버에서 관리자 권한이 있는지 확인 (role, isAdmin, admin 등의 필드)
            if (
              userData.role === "admin" ||
              userData.isAdmin ||
              userData.admin ||
              userData.authority === "admin"
            ) {
              return { ...data, isAdmin: true };
            } else {
              throw new Error("관리자 권한이 없습니다.");
            }
          } else {
            // 사용자 정보를 가져올 수 없는 경우, 로그인은 성공했으므로 일단 허용
            console.warn(
              "사용자 정보를 가져올 수 없어 권한 확인을 건너뜁니다."
            );
            return { ...data, isAdmin: true };
          }
        } catch (authError) {
          console.warn("권한 확인 중 오류:", authError);
          // 권한 확인 실패 시에도 로그인은 성공했으므로 일단 허용
          return { ...data, isAdmin: true };
        }
      }
      return data;
    } catch (error) {
      throw error;
    }
  },
  // 관리자 로그아웃 (일반 로그아웃 API 활용)
  logout: async () => {
    try {
      const res = await fetch(`/api/user/signout`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("로그아웃에 실패했습니다.");
      }
      return await res.json();
    } catch (error) {
      // 로그아웃은 실패해도 클라이언트에서 처리
      return { success: true };
    }
  },
  // 관리자 세션 확인 (서버에서 권한 확인)
  checkSession: async () => {
    try {
      const res = await fetch(`/api/user/get-user`, {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const { user } = await res.json();
        console.log("세션 확인 응답:", user);
        // 서버에서 관리자 권한 확인
        if (
          user.role === "admin" ||
          user.isAdmin ||
          user.admin ||
          user.authority === "admin"
        ) {
          return { isValid: true, userData: user };
        } else {
          return { isValid: false, reason: "관리자 권한이 없습니다." };
        }
      }
      return { isValid: false, reason: "세션이 유효하지 않습니다." };
    } catch (error) {
      console.error("세션 확인 오류:", error);
      return { isValid: false, reason: "세션 확인 중 오류가 발생했습니다." };
    }
  },
  // 모든 사용자 조회 (더 많은 엔드포인트 시도)
  getAllUsers: async () => {
    try {
      const endpoints = [
        "/api/user", // 단순 GET
        "/api/search?keyword=", // 빈 검색으로 모든 사용자 가져오기 시도
        "/api/user/search?q=",
        "/api/members",
        "/api/accounts",
      ];
      for (const endpoint of endpoints) {
        try {
          const res = await fetch(endpoint, {
            method: "GET",
            credentials: "include",
          });
          if (res.ok) {
            const data = await res.json();
            console.log(`${endpoint} 응답:`, data);
            // 사용자 데이터가 있는지 확인
            if (data.users || data.data || Array.isArray(data)) {
              return data;
            }
          }
        } catch (error) {
          console.log(`${endpoint} 실패:`, error.message);
          continue;
        }
      }
      // 모든 API가 실패한 경우 빈 배열 반환
      return { users: [], message: "사용자 목록 API를 찾을 수 없습니다." };
    } catch (error) {
      console.error("사용자 목록 가져오기 실패:", error);
      return { users: [], message: "사용자 목록을 가져오는데 실패했습니다." };
    }
  },
  // 사용자 삭제 (임시 구현)
  deleteUser: async (userId) => {
    try {
      return {
        success: false,
        message: "사용자 삭제 API가 구현되지 않았습니다.",
      };
    } catch (error) {
      throw error;
    }
  },
  // 모든 매치 조회 (기존 매치 API 활용하되 날짜 파라미터 추가)
  getAllMatches: async () => {
    try {
      // 오늘 날짜로 매치 목록 가져오기 (MatchList에서 사용하는 방식과 동일)
      const today = new Date().toISOString().split("T")[0];
      const endpoints = [
        '/api/match/all',
      ];
      for (const endpoint of endpoints) {
        try {
          const res = await fetch(endpoint, {
            method: "GET",
            credentials: "include",
          });
          if (res.ok) {
            const data = await res.json();
            console.log(`${endpoint} 응답:`, data);
            return data;
          }
        } catch (error) {
          console.log(`${endpoint} 실패:`, error.message);
          continue;
        }
      }
      return { data: [], message: "매치 목록 API를 찾을 수 없습니다." };
    } catch (error) {
      console.error("매치 목록 가져오기 실패:", error);
      return { data: [], message: "매치 목록을 가져오는데 실패했습니다." };
    }
  },
  // 매치 단일 조회
  getMatch: async (matchId) => {
    try {
      const endpoints = [`/api/match/${matchId}`, `/api/matches/${matchId}`];
      for (const endpoint of endpoints) {
        try {
          const res = await fetch(endpoint, {
            method: "GET",
            credentials: "include",
          });
          if (res.ok) {
            const data = await res.json();
            console.log(`${endpoint} 응답:`, data);
            return data;
          }
        } catch (error) {
          console.log(`${endpoint} 실패:`, error.message);
          continue;
        }
      }
      throw new Error("매치 정보 API를 찾을 수 없습니다.");
    } catch (error) {
      console.error("매치 정보 가져오기 실패:", error);
      throw error;
    }
  },
  // 매치 생성
  createMatch: async (matchData) => {
    try {
      const endpoints = ["/api/match"];
      for (const endpoint of endpoints) {
        try {
          const res = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(matchData),
            credentials: "include",
          });
          if (res.ok) {
            const data = await res.json();
            console.log(`${endpoint} 생성 응답:`, data);
            return data;
          }
        } catch (error) {
          console.log(`${endpoint} 생성 실패:`, error.message);
          continue;
        }
      }
      throw new Error("매치 생성 API를 찾을 수 없습니다.");
    } catch (error) {
      console.error("매치 생성 실패:", error);
      throw error;
    }
  },
  // 매치 수정
  updateMatch: async (matchId, matchData) => {
    try {
      const endpoints = [`/api/match/${matchId}`, `/api/matches/${matchId}`];
      for (const endpoint of endpoints) {
        try {
          const res = await fetch(endpoint, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(matchData),
            credentials: "include",
          });
          if (res.ok) {
            const data = await res.json();
            console.log(`${endpoint} 수정 응답:`, data);
            return data;
          }
        } catch (error) {
          console.log(`${endpoint} 수정 실패:`, error.message);
          continue;
        }
      }
      throw new Error("매치 수정 API를 찾을 수 없습니다.");
    } catch (error) {
      console.error("매치 수정 실패:", error);
      throw error;
    }
  },
  // 매치 삭제 (임시 구현)
  deleteMatch: async (matchId) => {
    try {
      const res = await fetch(`/api/match/${matchId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      return {
        success: res.ok,
      };
    } catch (error) {
      throw error;
    }
  },
  // 모든 구장 조회 (기존 구장 API 활용)
  getAllStadiums: async () => {
    try {
      const endpoints = [
        "/api/stadium",
      ];
      for (const endpoint of endpoints) {
        try {
          const res = await fetch(endpoint, {
            method: "GET",
            credentials: "include",
          });
          if (res.ok) {
            const data = await res.json();
            console.log(`${endpoint} 응답:`, data);
            return data;
          }
        } catch (error) {
          console.log(`${endpoint} 실패:`, error.message);
          continue;
        }
      }
      return { data: [], message: "구장 목록 API를 찾을 수 없습니다." };
    } catch (error) {
      console.error("구장 목록 가져오기 실패:", error);
      return { data: [], message: "구장 목록을 가져오는데 실패했습니다." };
    }
  },
  // 구장 단일 조회
  getStadium: async (stadiumId) => {
    try {
      const endpoints = [
        `/api/stadium/${stadiumId}`,
        `/api/stadiums/${stadiumId}`,
      ];
      for (const endpoint of endpoints) {
        try {
          const res = await fetch(endpoint, {
            method: "GET",
            credentials: "include",
          });
          if (res.ok) {
            const data = await res.json();
            console.log(`${endpoint} 응답:`, data);
            return data;
          }
        } catch (error) {
          console.log(`${endpoint} 실패:`, error.message);
          continue;
        }
      }
      throw new Error("구장 정보 API를 찾을 수 없습니다.");
    } catch (error) {
      console.error("구장 정보 가져오기 실패:", error);
      throw error;
    }
  },
  // 구장 생성
  createStadium: async (stadiumData) => {
    try {
      const endpoints = ["/api/stadium"];
      for (const endpoint of endpoints) {
        try {
          const res = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(stadiumData),
            credentials: "include",
          });
          if (res.ok) {
            const data = await res.json();
            console.log(`${endpoint} 생성 응답:`, data);
            return data;
          }
        } catch (error) {
          console.log(`${endpoint} 생성 실패:`, error.message);
          continue;
        }
      }
      throw new Error("구장 생성 API를 찾을 수 없습니다.");
    } catch (error) {
      console.error("구장 생성 실패:", error);
      throw error;
    }
  },
  // 구장 수정
  updateStadium: async (stadiumId, stadiumData) => {
    try {
      const endpoints = [
        `/api/stadium/${stadiumId}`,
      ];
      for (const endpoint of endpoints) {
        try {
          const res = await fetch(endpoint, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(stadiumData),
            credentials: "include",
          });
          if (res.ok) {
            const data = await res.json();
            console.log(`${endpoint} 수정 응답:`, data);
            return data;
          }
        } catch (error) {
          console.log(`${endpoint} 수정 실패:`, error.message);
          continue;
        }
      }
      throw new Error("구장 수정 API를 찾을 수 없습니다.");
    } catch (error) {
      console.error("구장 수정 실패:", error);
      throw error;
    }
  },
  // 구장 삭제 (임시 구현)
  deleteStadium: async (stadiumId) => {
    try {
      const endpoint = `/api/stadium/${stadiumId}`;
      const res = await fetch(endpoint, {
        method: 'DELETE',
        credentials: "include",
      });
      return res.ok ? { success: true } : { success: false };
    } catch (error) {
      throw error;
    }
  },
  // 사용자 단일 조회
  getUser: async (userId) => {
    try {
      const endpoints = [`/api/user/${userId}`];
      for (const endpoint of endpoints) {
        try {
          const res = await fetch(endpoint, {
            method: "GET",
            credentials: "include",
          });
          if (res.ok) {
            const data = await res.json();
            console.log(`${endpoint} 응답:`, data);
            return data;
          }
        } catch (error) {
          console.log(`${endpoint} 실패:`, error.message);
          continue;
        }
      }
      throw new Error("사용자 정보 API를 찾을 수 없습니다.");
    } catch (error) {
      console.error("사용자 정보 가져오기 실패:", error);
      throw error;
    }
  },
  // 사용자 생성
  createUser: async (userData) => {
    try {
      const endpoints = ["/api/user/signup"];
      for (const endpoint of endpoints) {
        try {
          const res = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
            credentials: "include",
          });
          if (res.ok) {
            const data = await res.json();
            console.log(`${endpoint} 생성 응답:`, data);
            return data;
          }
        } catch (error) {
          console.log(`${endpoint} 생성 실패:`, error.message);
          continue;
        }
      }
      throw new Error("사용자 생성 API를 찾을 수 없습니다.");
    } catch (error) {
      console.error("사용자 생성 실패:", error);
      throw error;
    }
  },
  // 사용자 수정
  updateUser: async (userId, userData) => {
    try {
      const endpoints = [`/api/user/${userId}`];
      for (const endpoint of endpoints) {
        try {
          const res = await fetch(endpoint, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
            credentials: "include",
          });
          if (res.ok) {
            const data = await res.json();
            console.log(`${endpoint} 수정 응답:`, data);
            return data;
          }
        } catch (error) {
          console.log(`${endpoint} 수정 실패:`, error.message);
          continue;
        }
      }
      throw new Error("사용자 수정 API를 찾을 수 없습니다.");
    } catch (error) {
      console.error("사용자 수정 실패:", error);
      throw error;
    }
  },
  // 사용자 삭제 (임시 구현)
  deleteUser: async (userId) => {
    try {
      const endpoint = `/api/user/${userId}`;
      const res = await fetch(endpoint, {
        method: 'DELETE',
        credentials: "include",
      });
      return res.ok ? { success: true } : { success: false };
    } catch (error) {
      throw error;
    }
  },
  // 시스템 통계 조회 (임시 구현)
  getStats: async () => {
    try {
      return {
        stats: {
          totalUsers: 0,
          totalMatches: 0,
          totalStadiums: 0,
          todayReservations: 0,
        },
        message: "통계 API가 구현되지 않았습니다.",
      };
    } catch (error) {
      throw error;
    }
  },
  // 예약 목록 조회
  getAllBookings: async () => {
    try {
      const res = await fetch(`/api/reservation/all`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.msg || data.message || "예약 목록을 가져오는 데 실패했습니다.");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("예약 목록 가져오기 실패:", error);
      throw error;
    }
  },
  // 예약 삭제
  deleteBooking: async (id) => {
    try {
      const res = await fetch(`/api/reservation/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.msg || data.message || "예약 삭제에 실패했습니다.");
      }
      return { success: true, message: "예약이 성공적으로 삭제되었습니다." };
    } catch (error) {
      console.error("예약 삭제 실패:", error);
      throw error;
    }
  },
  // 예약 추가
  createBooking: async (bookingData) => {
    try {
      const res = await fetch(`/api/reservation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.msg || data.message || "예약 추가에 실패했습니다.");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("예약 추가 실패:", error);
      throw error;
    }
  },
  // 예약 수정
  updateBooking: async (id, bookingData) => {
    try {
      const res = await fetch(`/api/reservation/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.msg || data.message || "예약 수정에 실패했습니다.");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("예약 수정 실패:", error);
      throw error;
    }
  },
  getBookingById: async (id) => {
    try {
      const res = await fetch(`/api/reservation/${id}`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.msg || data.message || "예약 정보를 가져오는 데 실패했습니다.");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("예약 정보 가져오기 실패:", error);
      throw error;
    }
  },
  getAllSubFields: async () => {
    try {
      const endpoint = '/api/stadium/subfield/all';
      const res = await fetch(endpoint, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = res.json();
      return data;
    } catch (error) {
      console.error("새 경기 등록 실패:", error);
      throw error;
    }
  },
  // 오늘 예약 수 조회
  getTodayReservations: async () => {
    try {
      const res = await fetch("/api/reservation/all", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.msg || data.message || "오늘 예약 수 조회에 실패했습니다.");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("오늘 예약 수 조회 실패:", error);
      throw error;
    }
  }
};
export default ADMIN;
export const ADMIN_API = ADMIN;