const GenderSelect = ({ id, label, name, value, onChange }) => {
  return (
    <div className="flex items-center mb-5 min-w-0 w-full">
      <span className="flex items-center h-10 w-40 text-blue-700 dark:text-cyan-200 font-semibold p-0">
        {label}
      </span>
      <div className="flex gap-4 w-full">
        <label className="flex items-center gap-2 text-blue-700 dark:text-cyan-200">
          <input
            type="radio"
            id={`${id}-male`}
            name={name}
            value="0"
            checked={value === "0"}
            onChange={onChange}
            className="w-4 h-4 text-blue-600 bg-blue-50 border-blue-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          남성
        </label>
        <label className="flex items-center gap-2 text-blue-700 dark:text-cyan-200">
          <input
            type="radio"
            id={`${id}-female`}
            name={name}
            value="1"
            checked={value === "1"}
            onChange={onChange}
            className="w-4 h-4 text-blue-600 bg-blue-50 border-blue-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          여성
        </label>
      </div>
    </div>
  );
};

export default GenderSelect;
