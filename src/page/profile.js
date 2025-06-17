import { useState } from "react";

function Profile() {
  const [profileImage, setProfileImage] = useState(null); // 사용자가 선택한 프로필 이미지 상태
  const [uploadedImageUrl, setUploadedImageUrl] = useState(""); // 서버에 업로드된 이미지url 상태

  // 파일 선택 시 호출되는 함수
  const handleFileChange = (event) => {
    setProfileImage(event.target.files[0]); // 파일 선택 시 상태 업데이트
  };

  const handleImgUpload = async () => {
    if (!profileImage) {
      alert("이미지를 선택해주세요");
      return;
    }
    const formData = new FormData();
    formData.append("image", profileImage); // 선택한 파일을 FormData에 추가
    try {
      const res = await fetch("", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error("이미지 업로드 실패");
        return;
      }
      const data = await res.json();
      setUploadedImageUrl(data.imageUrl); // 서버에서 반환된 이미지 URL을 상태에 저장
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="mb-6 border border-black-300 rounded-lg shadow-lg p-6 bg-white w-2/3 h-full">
        <form>
          {/*사진 div*/}
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <label
              htmlFor="profile-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <img
                src={
                  profileImage
                    ? URL.createObjectURL(profileImage)
                    : uploadedImageUrl
                }
                className="w-32 h-32 rounded-full object-cover bg-gray-200 shadow-lg"
                style={{ display: "block" }}
              />
            </label>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={handleImgUpload}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              사진 업로드
            </button>
            {uploadedImageUrl && (
              <div>
                <img
                  src={uploadedImageUrl}
                  alt="Uploaded Profile"
                  className="w-32 h-32 rounded-full object-cover bg-gray-200 shadow-lg"
                />
              </div>
            )}
          </div>
          {/*정보 div*/}
          <div className="flex flex-col items-center mb-4 w-full max-w-md mx-auto bg-gray-50 rounded-lg shadow-inner p-6 border border-gray-200">
            <div className="flex flex-col w-full mb-4">
              <label className="font-bold mb-1" htmlFor="profile-name">
                이름
              </label>
              <input
                id="profile-name"
                type="text"
                placeholder="이름을 입력하세요"
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-sm w-full placeholder-gray-400 transition"
              />
            </div>
            <div className="flex flex-col w-full">
              <span className="font-bold mb-1">성별</span>
              <div className="flex flex-row gap-2 w-full">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  className="hidden peer/male"
                />
                <label
                  htmlFor="male"
                  className="flex-1 text-center py-2 border border-blue-300 rounded-lg cursor-pointer transition
                  peer-checked/male:bg-blue-50 peer-checked/male:border-blue-500 peer-checked/male:text-blue-600"
                >
                  남자
                </label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  className="hidden peer/female"
                />
                <label
                  htmlFor="female"
                  className="flex-1 text-center py-2 border border-blue-300 rounded-lg cursor-pointer transition
                  peer-checked/female:bg-blue-50 peer-checked/female:border-blue-500 peer-checked/female:text-blue-600"
                >
                  여자
                </label>
              </div>
              <div>
                <label className="block mt-4">
                  <span className="font-bold mb-1">소개글</span>
                  <textarea
                    className="resize-none px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-sm w-full placeholder-gray-400 transition"
                    rows="4"
                    placeholder="자신에 대한 간단한 소개를 작성하세요"
                  />
                </label>
              </div>
              <button className="mt-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white-500 hover:bg-blue-200">
                저장하기
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
