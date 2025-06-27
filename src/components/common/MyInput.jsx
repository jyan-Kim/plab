const MyInput = ({ id, label, type = "text", placeholder, name, value, onChange }) => {
  return (
    <label className="flex items-center mb-5 min-w-0 w-full" htmlFor={id}>
      <span className="flex items-center h-10 w-40 text-blue-700 dark:text-cyan-200 font-semibold p-0">
        {label}
      </span>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="h-10 p-2 border-2 border-blue-200 dark:border-cyan-700 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-cyan-100 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-cyan-400 transition"
        placeholder={placeholder}
      />
    </label>
  );
};

export default MyInput;
