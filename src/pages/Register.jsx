import { lazy, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  TextField,
  MenuItem,
  Typography,
  Box,
  Paper,
  FormControlLabel,
  Checkbox,
  Autocomplete,
} from "@mui/material";
import { useSetAtom } from "jotai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { sanitize } from "isomorphic-dompurify";
import { toast } from "react-hot-toast";
import * as yup from "yup";

import { register as apiRegister } from "../services/http";
import { authAtom } from "../services/atoms";
import { userKeys } from "../services/queryKeyFactory";

const Loader = lazy(() => import("../components/Loader"));

const REGIONS_AND_CITIES = [
  [
    "National Capital Region (NCR)",
    ["Manila", "Quezon City", "Makati", "Pasig", "Taguig", "Caloocan"],
  ],
  [
    "Cordillera Administrative Region (CAR)",
    ["Baguio City", "Tabuk City", "La Trinidad"],
  ],
  [
    "Region I – Ilocos Region",
    ["Vigan City", "Laoag City", "San Fernando City"],
  ],
  [
    "Region II – Cagayan Valley",
    ["Tuguegarao City", "Ilagan City", "Santiago City"],
  ],
  [
    "Region III – Central Luzon",
    ["San Fernando City", "Angeles City", "Malolos City", "Olongapo City"],
  ],
  [
    "Region IV-A – CALABARZON",
    ["Calamba City", "Batangas City", "Cavite City", "Santa Rosa City"],
  ],
  ["Region IV-B – MIMAROPA", ["Puerto Princesa", "Calapan City", "Romblon"]],
  ["Region V – Bicol Region", ["Legazpi City", "Naga City", "Sorsogon City"]],
  [
    "Region VI – Western Visayas",
    ["Iloilo City", "Bacolod City", "Roxas City"],
  ],
  [
    "Region VII – Central Visayas",
    ["Cebu City", "Lapu-Lapu City", "Tagbilaran City"],
  ],
  [
    "Region VIII – Eastern Visayas",
    ["Tacloban City", "Ormoc City", "Borongan City"],
  ],
  [
    "Region IX – Zamboanga Peninsula",
    ["Zamboanga City", "Pagadian City", "Dipolog City"],
  ],
  [
    "Region X – Northern Mindanao",
    ["Cagayan de Oro City", "Iligan City", "Malaybalay City"],
  ],
  ["Region XI – Davao Region", ["Davao City", "Tagum City", "Panabo City"]],
  [
    "Region XII – SOCCSKSARGEN",
    ["Koronadal City", "General Santos City", "Kidapawan City"],
  ],
  ["Region XIII – Caraga", ["Butuan City", "Surigao City", "Bayugan City"]],
  [
    "Bangsamoro Autonomous Region in Muslim Mindanao (BARMM)",
    ["Cotabato City", "Marawi City", "Jolo"],
  ],
];

const schema = yup
  .object({
    username: yup.string().required("Username is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    community_type: yup.string().required("Community Type is required"),
    community_name: yup.string().required("Community Name is required"),
    region: yup.string().required("Region is required"),
    city: yup.string().required("City is required"),
    agreeToPolicy: yup
      .bool()
      .oneOf([true], "You must agree to the Privacy Policy"),
  })
  .required();

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setAuth = useSetAtom(authAtom);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: "",
      community_type: "",
      community_name: "",
      region: "",
      city: "",
      agreeToPolicy: false,
    },
  });

  const selectedRegion = watch("region");
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    const found = REGIONS_AND_CITIES.find(
      ([region]) => region === selectedRegion
    );
    if (found) {
      setCityOptions(found[1]);
    } else {
      setCityOptions([]);
    }
    setValue("city", "");
  }, [selectedRegion, setValue]);

  const { mutate: registerMutation, isLoading } = useMutation({
    mutationFn: (data) => apiRegister(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      reset();
      setAuth({
        id: data?.user?.id,
        username: data?.user?.username,
        token: data?.token,
        community_type: data?.user?.community_type,
        community_name: data?.user?.community_name,
        region: data?.user?.region,
        city: data?.user?.city,
      });
      toast.success(`Welcome ${data?.username}`);
      navigate("/community-dashboard");
    },
    onError: (err) => {
      const message =
        err?.response?.data?.detail ||
        err?.detail ||
        err?.message ||
        "Registration failed";
      toast.error(message);
    },
  });

  const onSubmit = (input) => {
    const sanitizedData = {
      username: sanitize(input.username),
      password: input.password,
      community_type: sanitize(input.community_type),
      community_name: sanitize(input.community_name),
      region: input.region,
      city: sanitize(input.city),
    };
    registerMutation(sanitizedData);
  };

  if (isLoading) return <Loader />;

  return (
    <Box className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-neutral-50 px-4 py-10">
      <Paper elevation={3} className="p-8 max-w-md w-full">
        <Typography variant="h5" className="mb-4 font-bold text-center">
          Register for GHG-Scout PH
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            fullWidth
            required
            label="Username"
            {...register("username")}
            helperText={
              errors.username
                ? errors.username.message
                : "Enter a unique username"
            }
            error={!!errors.username}
            className="mb-4"
            autoComplete="username"
          />

          <TextField
            fullWidth
            required
            label="Password"
            type="password"
            {...register("password")}
            helperText={
              errors.password
                ? errors.password.message
                : "Choose a secure password"
            }
            error={!!errors.password}
            className="mb-4"
            autoComplete="new-password"
          />

          <TextField
            fullWidth
            required
            label="Community Type"
            {...register("community_type")}
            helperText={
              errors.community_type
                ? errors.community_type.message
                : "Enter your community type"
            }
            error={!!errors.community_type}
            className="mb-4"
          />

          <TextField
            fullWidth
            required
            label="Community Name"
            {...register("community_name")}
            helperText={
              errors.community_name
                ? errors.community_name.message
                : "Enter the name of your organization"
            }
            error={!!errors.community_name}
            className="mb-4"
          />

          {/* Region dropdown */}
          <TextField
            select
            fullWidth
            required
            label="Region"
            {...register("region")}
            error={!!errors.region}
            helperText={
              errors.region
                ? errors.region.message
                : "Select your Philippine region"
            }
            className="mb-4"
            value={selectedRegion || ""}
            onChange={(e) => setValue("region", e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {REGIONS_AND_CITIES.map(([region]) => (
              <MenuItem key={region} value={region}>
                {region}
              </MenuItem>
            ))}
          </TextField>

          {/* City autocomplete with freeSolo */}
          <Controller
            name="city"
            control={control}
            rules={{ required: "City is required" }}
            render={({ field }) => (
              <Autocomplete
                {...field}
                freeSolo
                options={cityOptions}
                onChange={(_, value) => field.onChange(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="City"
                    required
                    error={!!errors.city}
                    helperText={
                      errors.city
                        ? errors.city.message
                        : "Select or enter your city"
                    }
                    className="mb-4"
                  />
                )}
              />
            )}
          />

          <FormControlLabel
            control={
              <Checkbox {...register("agreeToPolicy")} color="primary" />
            }
            label={
              <Typography variant="body2">
                I agree to the{" "}
                <Link to="/privacy-policy" className="text-blue-600 underline">
                  Privacy Policy
                </Link>
              </Typography>
            }
            className="mb-4"
          />
          {errors.agreeToPolicy && (
            <Typography variant="caption" color="error" className="mb-4">
              {errors.agreeToPolicy.message}
            </Typography>
          )}

          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            className="mt-2"
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting || isLoading ? "Registering..." : "Create Account"}
          </Button>

          <Typography variant="body2" align="center" className="mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 underline">
              Login
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;
