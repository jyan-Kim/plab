

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded shadow-lg p-6 min-w-[420px] max-w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 mb-6 transition"
          onClick={onClose}
        >
          ✖️
        </button>
        {children}
      </div>

    </div>
  )

}

export default Modal;