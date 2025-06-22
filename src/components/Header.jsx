import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useAtomValue } from "jotai";
import { useResetAtom } from "jotai/utils";

import { authAtom } from "../services/atoms";

const ghgBaseURL = import.meta.env.VITE_BASE_GHG_URL;

export default function Header() {
  const auth = useAtomValue(authAtom);
  const isAuthenticated = Boolean(auth?.token);
  const location = useLocation();

  const resetAuth = useResetAtom(authAtom);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:768px)");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    resetAuth();
    queryClient.clear();
    localStorage.clear();
    navigate("/");
    toast.success("Successfully logged out!");
    setDrawerOpen(false);
  };

  const publicLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    {
      label: "Public GHG Dashboard",
      to: `${ghgBaseURL}/User_Generated_GHG_Data`,
      external: true,
    },
    { label: "Login", to: "/login" },
    { label: "Register", to: "/register" },
  ];

  const authLinks = [
    { label: "About", to: "/about" },
    { label: "Community Data", to: "/community-dashboard" },
    {
      label: "Public GHG Dashboard",
      to: `${ghgBaseURL}/User_Generated_GHG_Data`,
      external: true,
    },
    { label: "Profile", to: "/me" },
    { label: "GHG Submission", to: "/ghg-submission-form", isPrimary: true },
    { label: "Logout", onClick: handleLogout },
  ];

  const linksToRender = isAuthenticated ? authLinks : publicLinks;

  const isActive = (path) => {
    if (!path || path.startsWith("http")) return false;
    return location.pathname === path;
  };

  const renderNavLinks = (isDrawer = false) =>
    linksToRender.map((link, idx) => {
      const active = isActive(link.to);

      const textClass = active
        ? "text-emerald-600 font-semibold"
        : "text-slate-600 hover:text-slate-900";

      const itemClass = isDrawer ? "" : textClass;

      if (link.onClick) {
        return (
          <ListItem button key={idx} onClick={link.onClick}>
            <ListItemText primary={link.label} className={itemClass} />
          </ListItem>
        );
      }

      if (link.external) {
        return (
          <ListItem
            button
            key={idx}
            component="a"
            href={link.to}
            onClick={() => setDrawerOpen(false)}
          >
            <ListItemText primary={link.label} className={itemClass} />
          </ListItem>
        );
      }

      return (
        <ListItem
          button
          key={idx}
          component={Link}
          to={link.to}
          onClick={() => setDrawerOpen(false)}
        >
          <ListItemText primary={link.label} className={itemClass} />
        </ListItem>
      );
    });

  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={1}
        className="bg-white border-b border-slate-200"
      >
        <Toolbar className="flex justify-between items-center">
          <Link to="/" className="text-slate-800 font-bold no-underline">
            <Typography variant="h6">GHG-Scout</Typography>
          </Link>

          {!isMobile && (
            <Box className="flex gap-4 items-center">
              {linksToRender.map((link, idx) => {
                const active = isActive(link.to);

                const textClass = active
                  ? "text-emerald-600 font-semibold"
                  : "text-slate-600 hover:text-slate-900";

                if (link.onClick) {
                  return (
                    <Button
                      key={idx}
                      onClick={link.onClick}
                      variant="outlined"
                      color="primary"
                    >
                      {link.label}
                    </Button>
                  );
                }

                if (link.isPrimary) {
                  return (
                    <Link key={idx} to={link.to}>
                      <Button variant="contained" color="primary">
                        {link.label}
                      </Button>
                    </Link>
                  );
                }

                if (link.external) {
                  return (
                    <a key={idx} href={link.to} className={textClass}>
                      {link.label}
                    </a>
                  );
                }

                return (
                  <Link key={idx} to={link.to} className={textClass}>
                    {link.label}
                  </Link>
                );
              })}
            </Box>
          )}

          {isMobile && (
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <Box className="flex justify-end p-2">
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>{renderNavLinks(true)}</List>
        </Box>
      </Drawer>
    </>
  );
}
