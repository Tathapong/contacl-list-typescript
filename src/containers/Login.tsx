import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Container, Typography, Box, Avatar, TextField, Button, CircularProgress } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { isNotEmpty } from "../validations/validation";
import { InputType, Status } from "../interface/interfaces";

import { thunk_login, selectUser, selectError, selectStatus } from "../stores/userSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

const initialInput = { username: "", password: "" };

function Login() {
  const [input, setInput] = useState<InputType>({ ...initialInput });
  const [errorInput, setErrorInput] = useState<InputType>({ ...initialInput });

  const user = useAppSelector(selectUser);
  const loginError = useAppSelector(selectError);
  const loginStatus = useAppSelector(selectStatus);

  const isLoading = loginStatus === Status.PENDING;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  function onChangeInput(ev: React.ChangeEvent<HTMLInputElement>) {
    setInput((prev) => ({ ...prev, [ev.target.name]: ev.target.value }));
  }

  async function handleSubmit(ev: React.FormEvent<HTMLInputElement>) {
    ev.preventDefault();

    try {
      const error = { ...initialInput };
      setErrorInput({ ...initialInput });

      if (!isNotEmpty(input.username)) error.username = "Username is required";
      if (!isNotEmpty(input.password)) error.password = "Password is required";

      setErrorInput({ ...error });
      const isError = error.username || error.password;

      if (!isError) {
        await dispatch(thunk_login(input));
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "teal" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h4" textTransform="uppercase">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            label="Username"
            autoComplete="username"
            autoFocus
            name="username"
            color={errorInput.username ? "warning" : "primary"}
            disabled={isLoading}
            onChange={onChangeInput}
          />
          <Box component="small" color="red" fontStyle="italic">
            {errorInput.username}
          </Box>

          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            autoComplete="password"
            name="password"
            color={errorInput.password ? "warning" : "primary"}
            disabled={isLoading}
            onChange={onChangeInput}
          />
          <Box component="small" color="red" fontStyle="italic">
            {errorInput.password}
          </Box>
          <Typography variant="body1" align="center" mt={2} color={"red"}>
            {loginError}
          </Typography>
          {isLoading ? (
            <Box textAlign={"center"}>
              <CircularProgress />
            </Box>
          ) : (
            ""
          )}

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 1 }} disabled={isLoading}>
            Sign in
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
