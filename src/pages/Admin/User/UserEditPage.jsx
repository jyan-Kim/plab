import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ADMIN_API } from "../../../api/admin";
const UserEditPage = () => {
 const { id } = useParams();
 const navigate = useNavigate();
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const [formData, setFormData] = useState({
   name: '',
   password: '',
   email: '',
   birth: '',
   role: '',
   gender: ''
 });
 useEffect(() => {
   fetchUser();
 }, [id]);
 const fetchUser = async () => {
   try {
     setLoading(true);
     setError(null);
     if (!id) return;
     // API에서 사용자 정보를 가져옵니다
     const response = await ADMIN_API.getUser(id);
     console.log("User data response:", response);
     // 응답이 배열인 경우 해당 ID의 사용자를 찾습니다
     let userData = response;
     if (userData) {
       setFormData({
         name: userData.name,
         email: userData.email,
         birth: userData.birth.slice(0, 10),
         role: userData.role,
         password: '',
         gender: userData.gender
       });
     } else {
       setError("사용자를 찾을 수 없습니다.");
     }
   } catch (err) {
     console.error("Error fetching user:", err);
     setError("사용자 정보를 불러오는데 실패했습니다.");
   } finally {
     setLoading(false);
   }
 };
 const handleInputChange = (e) => {
   const { name, value } = e.target;
   setFormData((prev) => ({
     ...prev,
     [name]: value,
   }));
 };
 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     setLoading(true);
    
     if (id) {
       // 임시로 성공 메시지 표시 후 목록 페이지로 이동
       const res = await ADMIN_API.updateUser(id, formData);
       if (res) {
         alert("사용자 정보가 업데이트되었습니다.");
         navigate("/admin/users");
       } else {
         alert('수정 실패');
       }
     } else {
       const res = await ADMIN_API.createUser(formData);
       if (res) {
         alert('사용자를 성공적으로 추가하였습니다.');
         navigate("/admin/users");
       } else {
         alert('사용자 추가 실패');
       }
     }
   } catch (err) {
     console.error("Error updating user:", err);
     setError("사용자 정보 업데이트에 실패했습니다.");
   } finally {
     setLoading(false);
   }
 };
 if (loading) {
   return (
     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
       <div className="text-center">
         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
         <p className="mt-4 text-gray-600">사용자 정보를 불러오는 중...</p>
       </div>
     </div>
   );
 }
 if (error) {
   return (
     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
       <div className="text-center">
         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
           {error}
         </div>
         <button
           onClick={() => navigate("/admin/users")}
           className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
         >
           사용자 목록으로 돌아가기
         </button>
       </div>
     </div>
   );
 }
 return (
   <div className="min-h-screen bg-gray-50 py-6">
     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
       <div className="bg-white shadow rounded-lg">
         <div className="px-4 py-5 sm:p-6">
           <div className="flex items-center justify-between mb-6">
             <h1 className="text-2xl font-bold text-gray-900">사용자 편집</h1>
             <button
               onClick={() => navigate("/admin/users")}
               className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
             >
               목록으로 돌아가기
             </button>
           </div>
           <form onSubmit={handleSubmit} className="space-y-6">
             <div>
               <label
                 htmlFor="name"
                 className="block text-sm font-medium text-gray-700"
               >
                 이름
               </label>
               <input
                 type="text"
                 id="name"
                 name="name"
                 value={formData.name}
                 onChange={handleInputChange}
                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                 required
               />
             </div>
             <div>
               <label
                 htmlFor="email"
                 className="block text-sm font-medium text-gray-700"
               >
                 이메일
               </label>
               <input
                 type="email"
                 id="email"
                 name="email"
                 value={formData.email}
                 onChange={handleInputChange}
                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                 required
               />
             </div>
             <div>
               <label
                 htmlFor="password"
                 className="block text-sm font-medium text-gray-700"
               >
                 비밀번호
               </label>
               <input
                 type="password"
                 id="password"
                 name="password"
                 value={formData.password}
                 onChange={handleInputChange}
                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                 required={id ? false : true}
               />
             </div>
             <div>
               <label
                 htmlFor="birth"
                 className="block text-sm font-medium text-gray-700"
               >
                 생년월일
               </label>
               <input
                 type="date"
                 id="birth"
                 name="birth"
                 value={formData.birth}
                 onChange={handleInputChange}
                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
               />
             </div>
             <div>
               <label
                 htmlFor="gender"
                 className="block text-sm font-medium text-gray-700"
               >
                 성별
               </label>
               <select
                 id="gender"
                 name="gender"
                 value={formData.gender}
                 onChange={handleInputChange}
                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
               >
                 <option value="1">남성</option>
                 <option value="0">여성</option>
               </select>
             </div>
             <div>
               <label
                 htmlFor="role"
                 className="block text-sm font-medium text-gray-700"
               >
                 권한
               </label>
               <select
                 id="role"
                 name="role"
                 value={formData.role}
                 onChange={handleInputChange}
                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
               >
                 <option value="user">유저</option>
                 <option value="admin">관리자</option>
               </select>
             </div>
             <div className="flex justify-end space-x-3">
               <button
                 type="button"
                 onClick={() => navigate("/admin/users")}
                 className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
               >
                 취소
               </button>
               <button
                 type="submit"
                 disabled={loading}
                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
               >
                 {loading ? "저장 중..." : "저장"}
               </button>
             </div>
           </form>
         </div>
       </div>
     </div>
   </div>
 );
};
export default UserEditPage;
