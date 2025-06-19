import { lazy } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { sanitize } from "isomorphic-dompurify";

import { login } from "../services/http";
import { authAtom } from "../services/atoms";
import { userKeys } from "../services/queryKeyFactory";

const Loader = lazy(() => import("../components/Loader"));

const schema = yup
  .object({
    username: yup.string().required("Enter your registered username"),
    password: yup.string().required("Password is required"),
  })
  .required();

export default function Login() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setAuth = useSetAtom(authAtom);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      setAuth({
        id: data?.user?.id,
        username: data?.user?.username,
        token: data?.token,
        community_type: data?.user?.community_type,
        community_name: data?.user?.community_name,
        region: data?.user?.region,
        city: data?.user?.city,
      });

      toast.success(`Hello ${data?.user?.username}`);
      reset();
      navigate("/community-dashboard");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.detail ||
        error.message ||
        "Login failed. Please try again.";
      toast.error(errorMessage);
    },
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (input) => {
    try {
      const sanitizedData = {
        username: sanitize(input.username),
        password: input.password,
      };
      await mutation.mutateAsync(sanitizedData);
    } catch (error) {
      console.error(error.detail);
    }
  };

  if (mutation.isLoading) return <Loader />;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Paper elevation={4} className="p-8 w-full max-w-md rounded-xl">
        <Typography variant="h5" className="mb-4 text-slate-800 font-semibold">
          GHG-Scout Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <TextField
            label="Username"
            fullWidth
            helperText={
              errors.username
                ? errors.username.message
                : "Enter your registered username"
            }
            error={!!errors.username}
            {...register("username")}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            helperText={
              errors.password
                ? errors.password.message
                : "Enter your secure password"
            }
            error={!!errors.password}
            {...register("password")}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
}
