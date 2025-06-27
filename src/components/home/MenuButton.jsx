const MenuButton = ({ icon, label, onClick }) => {
  return (
    <button
      className="w-full max-w-[96px] sm:max-w-[80px] xs:max-w-[64px] h-auto aspect-square min-w-0 min-h-0 bg-blue-500 text-white rounded flex flex-col p-0 overflow-hidden hover:bg-blue-600 transition"
      onClick={onClick}
      type="button"
    >
      <div className="flex-1 flex items-center justify-center">
        <span className="text-4xl">{icon}</span>
      </div>
      <div className="h-1/3 flex items-center justify-center bg-blue-600 bg-opacity-80">
        <span className="text-xs font-semibold w-full text-center dark:text-white">
          {label}
        </span>
      </div>
    </button>
  );
};

export default MenuButton;
