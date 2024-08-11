import { Navigate, Route, Routes } from "react-router-dom";

import PlatformLayout from "./layouts/platform-layout";
import AuthLayout from "./layouts/auth-layout";

import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import AboutPage from "./pages/about-page";

import { useAuth } from "./providers/auth-provider";
import TeamPage from "./pages/vision-page";
import VisionPage from "./pages/team-page";
import ProductPage from "./pages/products-page";
import NotFoundPage from "./pages/notfound-page";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { loggedInUser } = useAuth();

  // in case the user is still being fetched
  if (loggedInUser === undefined) {
    return null;
  }

  // if the user is not logged in, redirect
  if (loggedInUser === null) {
    return <Navigate to="/auth/login" replace />;
  }

  // if the user is logged in, show the protected route
  return children;
}

function AuthRoutes({ children }: { children: React.ReactNode }) {
  const { loggedInUser } = useAuth();

  // in case the user is still being fetched
  if (loggedInUser === undefined) {
    return null;
  }

  // if the user is logged in, redirect to home
  if (loggedInUser) {
    return <Navigate to="/" replace />;
  }

  // if the user is not logged in, show the auth routes
  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<PlatformLayout />}>
        <Route index element={<div>Home</div>} />
        <Route path="products" element={<ProductPage />} />
        <Route path="about" element={<AboutPage />}>
          <Route path="team" element={<TeamPage />} />
          <Route path="vision" element={<VisionPage />} />
        </Route>
        <Route path="contact" element={<div>Contact</div>} />
        <Route path="services" element={<div>Services</div>} />
        <Route
          path="protected"
          element={
            <ProtectedRoute>
              <div>Protected</div>
            </ProtectedRoute>
          }
        />
      </Route>
      <Route
        path="auth"
        element={
          <AuthRoutes>
            <AuthLayout />
          </AuthRoutes>
        }
      >
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
