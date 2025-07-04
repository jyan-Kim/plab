import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AdminHomePage from "./pages/Admin/AdminHomePage";
import AdminLoginPage from "./pages/Admin/Auth/AdminLoginPage";
import AdminProtectedRoute from "./components/common/AdminProtectedRoute";
import UserListPage from "./pages/Admin/User/UserListPage";
import UserEditPage from "./pages/Admin/User/UserEditPage";
import StadiumListPage from "./pages/Admin/Stadium/StadiumListPage";
import StadiumEditPage from "./pages/Admin/Stadium/StadiumEditPage";
import MatchListPage from "./pages/Admin/Match/MatchListPage";
import MatchEditPage from "./pages/Admin/Match/MatchEditPage";
import Stadium from "./pages/Stadium/Stadium";
import StadiumList from "./pages/Stadium/StadiumList";
import SubField from "./pages/Stadium/Subfield";


const Router = () => {
  return (
    <Routes>
      {/*라우트 추가 path는 내가정하는경로 element는 이동할 컴포넌트*/}
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminHomePage />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminProtectedRoute>
            <UserListPage />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/stadiums"
        element={
          <AdminProtectedRoute>
            <StadiumListPage />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/users/edit/:id"
        element={
          <AdminProtectedRoute>
            <UserEditPage />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/users/add"
        element={
          <AdminProtectedRoute>
            <UserEditPage />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/stadiums/edit/:id"
        element={
          <AdminProtectedRoute>
            <StadiumEditPage />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/stadiums/add"
        element={
          <AdminProtectedRoute>
            <StadiumEditPage />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/matches"
        element={
          <AdminProtectedRoute>
            <MatchListPage />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/matches/edit/:id"
        element={
          <AdminProtectedRoute>
            <MatchEditPage />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/matches/add"
        element={
          <AdminProtectedRoute>
            <MatchEditPage />
          </AdminProtectedRoute>
        }
      />
      <Route path="/stadium/:id" element={<Stadium />} />
      <Route path="/stadiumList" element={<StadiumList />} />
      <Route path="/stadium/:stadiumId/subfields/:subFieldId" element={<SubField />} />
      {/* 잘못된 경로 처리 */}
    </Routes>
  );
};

export default Router;
