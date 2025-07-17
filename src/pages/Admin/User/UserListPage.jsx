import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ADMIN from "../../../api/admin";
function UserListPage() {
 const [users, setUsers] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const navigate = useNavigate();
 useEffect(() => {
   fetchUsers();
 }, []);
 const fetchUsers = async () => {
   try {
     setLoading(true);
     const data = await ADMIN.getAllUsers();
     // 데이터 구조에 따라 처리
     const userList = data.users || data.data || data || [];
     setUsers(Array.isArray(userList) ? userList : []);
   } catch (err) {
     setError("사용자 목록을 불러오는데 실패했습니다.");
     console.error(err);
   } finally {
     setLoading(false);
   }
 };
 const handleDelete = async (id) => {
   if (window.confirm("정말로 이 사용자를 삭제하시겠습니까?")) {
     try {
       const res = await ADMIN.deleteUser(id);
       if (res.success) {
         alert("사용자가 성공적으로 삭제되었습니다!");
         fetchUsers(); // 목록 새로고침
       } else {
         alert('삭제 실패');
       }
     } catch (err) {
       alert("사용자 삭제에 실패했습니다. " + err.message);
       console.error(err);
     }
   }
 };
 if (loading)
   return (
     <div className="flex justify-center items-center min-h-64">
       <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
     </div>
   );
 if (error)
   return (
     <div className="bg-red-50 border border-red-200 rounded-md p-4 m-4">
       <div className="text-red-800">오류: {error}</div>
     </div>
   );
 return (
   <div className="max-w-7xl mx-auto p-6">
     <div className="flex justify-between items-center mb-6">
       <div className="flex items-center space-x-4">
         <button
           onClick={() => navigate("/admin")}
           className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
         >
           ← 대시보드로 돌아가기
         </button>
         <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
           사용자 목록
         </h2>
       </div>
       <button
         onClick={() => navigate("/admin/users/add")}
         className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
       >
         새 사용자 추가
       </button>
     </div>
     <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
       <div className="overflow-x-auto">
         <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
           <thead className="bg-gray-50 dark:bg-gray-700">
             <tr>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                 이메일
               </th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                 이름
               </th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                 생년월일
               </th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                 성별
               </th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                 역할
               </th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                 작업
               </th>
             </tr>
           </thead>
           <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
             {users.length > 0 ? (
               users.map((user) => (
                 <tr
                   key={user._id || user.id}
                   className="hover:bg-gray-50 dark:hover:bg-gray-700"
                 >
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                     {user.email}
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                     {user.name}
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                     {user.birth ? user.birth.slice(0, 10) : "N/A"}
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                     {user.gender ? "여성" : "남성"}
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                     <span
                       className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                         user.role === "admin"
                           ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                           : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                       }`}
                     >
                       {user.role || "user"}
                     </span>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                     <Link
                       to={`/admin/users/edit/${user._id || user.id}`}
                       className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                     >
                       수정
                     </Link>
                     <button
                       onClick={() => handleDelete(user._id || user.id)}
                       className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                     >
                       삭제
                     </button>
                   </td>
                 </tr>
               ))
             ) : (
               <tr>
                 <td
                   colSpan="6"
                   className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                 >
                   사용자가 없습니다.
                 </td>
               </tr>
             )}
           </tbody>
         </table>
       </div>
     </div>
   </div>
 );
}
export default UserListPage;