const ConfirmModal = ({ open, message, onConfirm, onCancel }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg w-80">
        <div className="mb-4 text-gray-900 dark:text-gray-100">{message}</div>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            onClick={onConfirm}
          >
            예
          </button>
          <button
            className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
            onClick={onCancel}
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;