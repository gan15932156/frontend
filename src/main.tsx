import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AuthProvider } from "./provider/AuthProvider.tsx";
import LoginPage from "./component/LoginPage.tsx";
import ProtectedRoute from "./component/ProtectedRoute.tsx";
import DashboardPage from "./component/user/DashboardPage.tsx";
import Layout from "./component/Layout.tsx";
import { Toaster } from "react-hot-toast";
import DashboardAdminPage from "./component/admin/DashboardAdminPage.tsx";
import UnauthenticatedRoute from "./component/UnauthenticatedRoute.tsx";
import RegisterPage from "./component/RegisterPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProfilePage from "./component/ProfilePage.tsx";
import Rootlayout from "./component/Rootlayout.tsx";
import AddPostPage from "./component/user/AddPostPage.tsx";
import EditPostForm from "./component/user/EditPostForm.tsx";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Routes>
            <Route element={<Rootlayout />}>
              <Route element={<UnauthenticatedRoute />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<App />} />
              </Route>
              <Route element={<Layout />}>
                <Route path="/me" element={<ProfilePage />} />
                <Route path="/add-post" element={<AddPostPage />} />
                <Route path="/post/edit/:postId" element={<EditPostForm />} />
                <Route path="/" element={<ProtectedRoute role="USER" />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                </Route>
                <Route path="/" element={<ProtectedRoute role="ADMIN" />}>
                  <Route
                    path="/dashboardAdmin"
                    element={<DashboardAdminPage />}
                  />
                </Route>
              </Route>
              <Route path="*" element={<Navigate to="/login" />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
