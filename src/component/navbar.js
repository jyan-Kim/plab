import { useNavigate } from "react-router-dom";


const NavBar = () => {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('로그아웃 되었습니다.');
    navigate('/login');
  };

  return (
      <nav className="flex items-center justify-center gap-20 text-black p-4 mt-4">
        <button
          onClick={() => navigate('/')}
          className="border border-gray-400 rounded px-4 py-2 bg-gray-100 hover:bg-gray-200"
        >메인</button>
        {!isLoggedIn && (
          <>
            <button 
              onClick={() => navigate('/login')}
              className="border border-gray-400 rounded px-4 py-2 bg-gray-100 hover:bg-gray-200"
            >로그인</button>
            <button onClick={() => navigate('/signup')}
              className="border border-gray-400 rounded px-4 py-2 bg-gray-100 hover:bg-gray-200"
            >회원가입</button>
          </>
        )}
        {isLoggedIn && (
          <>
            <button onClick={() => navigate('/profile')}
              className="border border-gray-400 rounded px-4 py-2 bg-gray-100 hover:bg-gray-200"
            >마이페이지</button>
            <button onClick={handleLogout}
              className="border border-gray-400 rounded px-4 py-2 bg-gray-100 hover:bg-gray-200"
            >로그아웃</button>
          </>
        )}
        <button onClick={() => navigate('/register')}
          className="border border-gray-400 rounded px-4 py-2 bg-gray-100 hover:bg-gray-200"
        >구장등록</button>
      </nav>
  );
};

export default NavBar;
