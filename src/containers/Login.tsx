import React, { useState } from "react";
import { isNotEmpty } from "../validations/validation";

import { Container, Typography, Box, Avatar, TextField, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

interface InputType {
  username: string;
  password: string;
}

const initialInput = { username: "", password: "" };

function Login() {
  const [input, setInput] = useState<InputType>({ ...initialInput });
  const [errorInput, setErrorInput] = useState<InputType>({ ...initialInput });

  function onChangeInput(ev: React.ChangeEvent<HTMLInputElement>) {
    setInput((prev) => ({ ...prev, [ev.target.name]: ev.target.value }));
  }

  function handleSubmit(ev: React.FormEvent<HTMLInputElement>) {
    ev.preventDefault();

    try {
      const error = { ...initialInput };
      setErrorInput({ ...initialInput });

      if (!isNotEmpty(input.username)) error.username = "Username is required";
      if (!isNotEmpty(input.password)) error.password = "Password is required";

      setErrorInput({ ...error });
      const isError = error.username || error.password;

      // if(isError) {

      // }
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
            onChange={onChangeInput}
          />
          <Box component="small" color="red" fontStyle="italic">
            {errorInput.password}
          </Box>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 1 }}>
            Sign in
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
