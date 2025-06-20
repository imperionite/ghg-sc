import { lazy, useState, useEffect, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Typography, Box, CircularProgress } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { useAtomValue } from "jotai";

import { CommunityDashboard} from './pages/CommunityDashboard';

const Header = lazy(() => import("./components/Header"));
const Footer = lazy(() => import("./components/Footer"));
const Home = lazy(() => import("./pages/Hero"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));

const About = lazy(() => import("./pages/About"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Loader = lazy(() => import("./components/Loader"));

import { authAtom } from "./services/atoms";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1e293b", // slate-800
    },
    secondary: {
      main: "#059669", // emerald-600
    },
    background: {
      default: "#f8fafc", // slate-50
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Inter, Roboto, sans-serif",
  },
});

const PrivateRoute = ({ children }) => {
  const auth = useAtomValue(authAtom); // Get JWT token from Jotai atom
  const [isAttemptingRehydration, setIsAttemptingRehydration] = useState(true);

  useEffect(() => {
    const storedAuth = localStorage.getItem("authAtom");

    if (auth !== undefined || storedAuth) {
      setIsAttemptingRehydration(false);
    } else {
      const timer = setTimeout(() => {
        setIsAttemptingRehydration(false);
      }, 300); // Give Jotai 300ms to rehydrate
      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [auth]);

  if (isAttemptingRehydration) {
    return <Loader />;
  }

  return auth?.token ? children : <Navigate to="/login" replace />;
};

// --- GuestRoute Component (Adopted from your code) ---
// This component prevents authenticated users from accessing "guest-only" routes (like login).
const GuestRoute = ({ children }) => {
  const auth = useAtomValue(authAtom);
  const [isAttemptingRehydration, setIsAttemptingRehydration] = useState(true);

  useEffect(() => {
    // Similar rehydration logic as PrivateRoute to prevent premature redirects.
    const storedAuth = localStorage.getItem("authAtom");
    if (auth !== undefined || storedAuth) {
      setIsAttemptingRehydration(false);
    } else {
      const timer = setTimeout(() => {
        setIsAttemptingRehydration(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [auth]);

  if (isAttemptingRehydration) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading authentication...</Typography>
      </Box>
    );
  }

  return auth?.token ? <Navigate to="/community-dashboard" replace /> : children;
};

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <Suspense fallback={<Loader />}>
                <Routes>
                  {/* Public routes */}
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
                  <Route path="/about" element={<About />} />
                  <Route path="/community-dashboard" element={<CommunityDashboard />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />

                  {/* Protected Routes (requires authentication) */}
                  <Route
                    path="/me"
                    element={
                      <PrivateRoute>
                        <UserProfile />
                      </PrivateRoute>
                    }
                  />

                  {/* Catch-all route for any undefined paths */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Toaster position="top-center" />
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;