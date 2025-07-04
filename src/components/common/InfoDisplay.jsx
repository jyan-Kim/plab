const InfoDisplay = ({ label, value }) => {
  return (
    <div className="flex items-center mb-5 min-w-0 w-full">
      <span className="flex items-center h-10 w-40 text-blue-700 dark:text-cyan-200 font-semibold p-0">
        {label}
      </span>
      <div className="h-10 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg w-full flex items-center text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
        {value}
      </div>
    </div>
  );
};

export default InfoDisplay;
