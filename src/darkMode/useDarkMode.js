import { useState, useEffect } from "react";


function useDarkMode() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme"); // 로컬 스토리지에서 테마를 가져옵니다.
    if (saved) {
      return saved === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches; 
  })
  
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light"); // theme라는 키로 다크모드가 참이면 "dark", 아니면 "light"로 저장합니다.
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode])

  return [darkMode, setDarkMode];
}

export default useDarkMode;
