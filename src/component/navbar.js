const NavBar = () => {
  return (
    <nav className="flex items-center justify-center gap-20 text-black p-4 mt-4">
      <button className="border border-gray-400 rounded px-4 py-2 bg-gray-100 hover:bg-gray-200">
        전체메뉴
      </button>
      <button className="border border-gray-400 rounded px-4 py-2 bg-gray-100 hover:bg-gray-200">
        초급매치
      </button>
      <button className="border border-gray-400 rounded px-4 py-2 bg-gray-100 hover:bg-gray-200">
        중급매치
      </button>
      <button className="border border-gray-400 rounded px-4 py-2 bg-gray-100 hover:bg-gray-200">
        상급매치
      </button>
      <button className="border border-gray-400 rounded px-4 py-2 bg-gray-100 hover:bg-gray-200">
        찜한매치
      </button>
    </nav>
  );
};

export default NavBar;
