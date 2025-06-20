import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useAtomValue } from "jotai";
import { useResetAtom } from "jotai/utils";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";

import { authAtom } from "../services/atoms";

const ghgBaseURL = import.meta.env.VITE_BASE_GHG_URL;

export default function Header() {
  const auth = useAtomValue(authAtom);
  const resetAuth = useResetAtom(authAtom);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogout = () => {
    resetAuth();
    queryClient.clear();
    localStorage.clear();
    navigate("/");
    toast.success("Successfully logged out!");
  };

  const isAuthenticated = auth?.token; // Determines if the user is authenticated

  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      className="bg-white border-b border-slate-200"
    >
      <Toolbar className="flex justify-between">
        <Link to="/">
          <Typography variant="h6" className="font-bold text-slate-800">
            GHG-Scout
          </Typography>
        </Link>

        <div className="space-x-4">
          {/* Links accessible regardless of authentication */}
          {!isAuthenticated && (
            <Link
              to="/"
              className="text-slate-700 hover:text-slate-900 font-medium"
            >
              Home
            </Link>
          )}
          {isAuthenticated && (
            <Link
              to="/community-dashboard"
              className="text-slate-700 hover:text-slate-900 font-medium"
            >
              Community Data
            </Link>
          )}

          <a
            href={`${ghgBaseURL}/Public_Dashboard`}
            className="text-slate-700 hover:text-slate-900 font-medium"
          >
            Public GHG Dashboard
          </a>
          <Link
            to="/about"
            className="text-slate-700 hover:text-slate-900 font-medium"
          >
            About
          </Link>

          {/* Auth-specific buttons */}
          {isAuthenticated ? (
            <Button onClick={handleLogout} variant="outlined" color="primary">
              Logout
            </Button>
          ) : (
            <>
              <Link to="/login">
                <Button variant="text" color="primary">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="contained" color="primary">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
