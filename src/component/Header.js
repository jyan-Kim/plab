import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('로그아웃 되었습니다.');
    navigate('/login');
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-sky-700 text-white max-w-6xl ">
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>
        풋살
      </h1>
      <nav className="flex gap-4">
        <button onClick={() => navigate('/')}>메인</button>
        {!isLoggedIn && (
          <>
            <button onClick={() => navigate('/login')}>로그인</button>
            <button onClick={() => navigate('/signup')}>회원가입</button>
          </>
        )}
        {isLoggedIn && (
          <>
            <button onClick={()=> navigate('/mypage')}>마이페이지</button>
            <button onClick={handleLogout}>로그아웃</button>
          </>
        )}
        <button onClick={() => navigate('/register')}>구장등록</button>
      </nav>
    </header>
  );
};

export default Header;