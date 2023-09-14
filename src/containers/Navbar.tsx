import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Toolbar, Button } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { logout, selectUser } from "../stores/userSlice";
import { initialize } from "../stores/contactsSlice";

interface NavBarProps {
  children: React.ReactNode;
}

export default function Navbar({ children }: NavBarProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (!user) navigate("/");
  }, [navigate, user]);

  function onClickLogout() {
    dispatch(logout());
    dispatch(initialize());
  }
  return user ? (
    <Box display={"flex"} flexDirection={"column"} height={"100vh"} sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ boxShadow: "none" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button color="inherit" onClick={onClickLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {children}
    </Box>
  ) : (
    <></>
  );
}
