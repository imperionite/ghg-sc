import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./guards/PrivateRoute";
import GuestRoute from "./guards/GuestRoute";
import MainLayout from "../components/layout/MainLayout";
import Loader from "../components/Loader";

// Lazy-loaded pages
const Home = lazy(() => import("../pages/Hero"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const About = lazy(() => import("../pages/About"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const CommunityDashboard = lazy(() => import("../pages/CommunityDashboard"));
const GHGSubmissionForm = lazy(() => import("../pages/GHGSubmissionForm"));
const UserProfile = lazy(() => import("../pages/UserProfile"));
const NotFound = lazy(() => import("../pages/NotFound"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <MainLayout>
        <Routes>
          {/* Guest-only routes */}
          <Route
            path="/"
            element={
              <GuestRoute>
                <Home />
              </GuestRoute>
            }
          />
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/register"
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />
          <Route path="/community-dashboard" element={<CommunityDashboard />} />
          {/* Public routes */}
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* Private routes */}

          <Route
            path="/ghg-submission-form"
            element={
              <PrivateRoute>
                <GHGSubmissionForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/me"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </Suspense>
  );
};

export default AppRoutes;
