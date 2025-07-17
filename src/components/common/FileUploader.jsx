import { useState } from "react";

const FileUploader = ({ accept = "image/*", onChange }) => {
  const [fileName, setFileName] = useState("");
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "");
    if (onChange) onChange(file);
  };

  return (
    <div className="flex items-center gap-3">
      <label className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow transition-colors text-sm cursor-pointer">
        파일 선택
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
      <span className="text-gray-500 text-sm min-w-[80px] truncate">
        {fileName || "선택된 파일 없음"}
      </span>
    </div>
  );
};

export default FileUploader;
