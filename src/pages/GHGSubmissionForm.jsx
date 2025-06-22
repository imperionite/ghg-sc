import { lazy, useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { useAtomValue } from "jotai";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Tabs,
  Tab,
  Box,
  CircularProgress,
  Tooltip,
  Switch,
  Alert,
  IconButton,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import toast from "react-hot-toast";
import { sanitize } from "isomorphic-dompurify";
import * as yup from "yup";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitGHGData } from "../services/http";
import { ghgKeys } from "../services/queryKeyFactory";
import { authAtom } from "../services/atoms";
import { ghgSchema } from "../services/schemas";
import { ghgFieldMetadata } from "../services/fieldMetadata";
import {
  vehicleTypeOptions,
  fuelTypeOptions,
  wasteDisposalMethodOptions,
  manureManagementOptions,
  riceWaterManagementOptions,
  fertilizerTypeOptions,
} from "../services/enumOptions";

import { ghgDefaultValues } from "../services/defaultValues";

const Loader = lazy(() => import("../components/Loader"));

const sectors = ["energy", "transport", "waste", "agriculture", "ippu"];

export default function GHGSubmissionForm() {
  const queryClient = useQueryClient();
  const auth = useAtomValue(authAtom);
  const [sector, setSector] = useState("energy");
  const [value, setValue] = useState(0);
  const [showNote, setShowNote] = useState(true);

  const schema = useMemo(() => ghgSchema(yup)[sectors[value]], [value]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: ghgDefaultValues(sector),
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: submitGHGData,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ghgKeys.all });
      queryClient.invalidateQueries(ghgKeys.userSubmissions(auth?.id));
      toast.success(
        `${data?.message}\nEstimated CO2e: ${data?.estimated_co2e_kg} kg`
      );
      reset(ghgDefaultValues(sector));
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.detail || "Submission failed. Try again."
      );
    },
  });

  const handleSectorChange = (e, newValue) => {
    setValue(newValue);
    setSector(sectors[newValue]);
    reset(ghgDefaultValues(sectors[newValue]));
  };

  const onSubmit = (data) => {
    // Step 1: Sanitize string fields
    const sanitized = Object.keys(data).reduce((acc, key) => {
      if (typeof data[key] === "string") {
        acc[key] = sanitize(data[key]);  // Sanitize strings
      } else if (data[key] === null || data[key] === "") {
        acc[key] = ghgDefaultValues(sector)[key] || data[key];  // Use default if missing
      } else {
        acc[key] = data[key];  // Keep non-string values intact
      }
      return acc;
    }, {});

    // Step 2: Proceed with the mutation
    mutation.mutate(sanitized);
  };

  const tabSx = {
    minWidth: 80,
    borderRadius: "16px",
    textTransform: "none",
    fontWeight: "600",
    marginRight: 1,
    paddingX: 1.5,
  };

  const getEnumOptions = (sector, field) => {
    if (sector === "transport" && field === "vehicle_type") return vehicleTypeOptions;
    if (sector === "transport" && field === "fuel_type") return fuelTypeOptions;
    if (sector === "waste" && field === "waste_disposal_method") return wasteDisposalMethodOptions;
    if (sector === "agriculture" && field === "manure_management") return manureManagementOptions;
    if (sector === "agriculture" && field === "rice_water_management") return riceWaterManagementOptions;
    if (sector === "agriculture" && field === "fertilizer_type") return fertilizerTypeOptions;
    return null;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Paper elevation={4} className="p-6 rounded-xl shadow-md bg-gray-50">
        <Typography variant="h5" className="mb-4 font-semibold text-slate-700">
          GHG Submission Form
        </Typography>

        {showNote && (
          <Alert
            severity="info"
            sx={{ mb: 3 }}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setShowNote(false)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Note: You can submit data for each sector once every 7 days. The
            system will notify you if you try to submit too soon.
          </Alert>
        )}

        {/* Tabs */}
        <Tabs
          value={value}
          onChange={handleSectorChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            mb: 3,
            "& .MuiTabs-indicator": {
              height: 3,
              borderRadius: 2,
              backgroundColor: "primary.main",
            },
          }}
        >
          {sectors.map((s, index) => (
            <Tab key={index} label={s.toUpperCase()} sx={tabSx} disableRipple />
          ))}
        </Tabs>

        {/* Sector Description */}
        <Box className="mb-6">
          <Typography variant="body1" color="textSecondary">
            {
              {
                energy:
                  "Track your energy consumption to measure its impact on CO2 emissions.",
                transport:
                  "Submit data about your transportation sector to calculate emissions from travel.",
                waste:
                  "Report your waste management activities and their environmental impact.",
                agriculture:
                  "Provide information on agricultural activities to calculate carbon emissions from farming.",
                ippu: "Track industrial emissions from processes like cement or steel production.",
              }[sector]
            }
          </Typography>
        </Box>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            {Object.keys(schema.fields).map((field) => {
              if (field === "sector") return null;

              const meta = ghgFieldMetadata[sector]?.[field] || {};
              const label = meta.label || field;
              const hint = meta.hint || "";
              const tooltip = meta.tooltip || "";

              const isBoolean =
                schema.fields[field]?.type === "boolean";  // Updated boolean logic

              const enumOptions = getEnumOptions(sector, field);

              if (enumOptions) {
                return (
                  <Grid size={{ xs: 12, sm: 6 }} key={field}>
                    <Controller
                      name={field}
                      control={control}
                      render={({ field: controllerField }) => (
                        <Autocomplete
                          freeSolo
                          options={enumOptions}
                          value={controllerField.value || ""}
                          onChange={(_, value) =>
                            controllerField.onChange(value)
                          }
                          onInputChange={(_, value) =>
                            controllerField.onChange(value)
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label={label}
                              variant="outlined"
                              fullWidth
                              error={!!errors[field]}
                              helperText={errors[field]?.message || hint}
                              InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                  <>
                                    {tooltip && (
                                      <Tooltip title={tooltip}>
                                        <InfoOutlinedIcon
                                          fontSize="small"
                                          sx={{ ml: 1 }}
                                        />
                                      </Tooltip>
                                    )}
                                    {params.InputProps.endAdornment}
                                  </>
                                ),
                              }}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>
                );
              }

              if (isBoolean) {
                return (
                  <Grid item xs={12} sm={6} key={field}>
                    <Controller
                      name={field}
                      control={control}
                      render={({ field: controllerField }) => (
                        <Box display="flex" alignItems="center">
                          <Typography
                            component="label"
                            htmlFor={field}
                            sx={{ mr: 1, fontWeight: 600 }}
                          >
                            {label}
                            {tooltip && (
                              <Tooltip title={tooltip}>
                                <InfoOutlinedIcon
                                  fontSize="small"
                                  sx={{ ml: 1 }}
                                />
                              </Tooltip>
                            )}
                          </Typography>
                          <Switch
                            {...controllerField}
                            checked={!!controllerField.value}
                            onChange={(e) =>
                              controllerField.onChange(e.target.checked)
                            }
                            color="primary"
                            id={field}
                          />
                        </Box>
                      )}
                    />
                    {hint && (
                      <Typography variant="caption" color="textSecondary">
                        {hint}
                      </Typography>
                    )}
                  </Grid>
                );
              }

              return (
                <Grid size={{ xs: 12, sm: 6 }} key={field}>
                  <Controller
                    name={field}
                    control={control}
                    render={({ field: controllerField }) => (
                      <TextField
                        {...controllerField}
                        label={label}
                        variant="outlined"
                        fullWidth
                        error={!!errors[field]}
                        helperText={errors[field]?.message || hint}
                        type={
                          schema.fields[field]?.type === "number" ||
                          typeof controllerField.value === "number"
                            ? "number"
                            : "text"
                        }
                        InputProps={{
                          endAdornment: tooltip && (
                            <Tooltip title={tooltip}>
                              <InfoOutlinedIcon
                                fontSize="small"
                                sx={{ ml: 1 }}
                              />
                            </Tooltip>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
              );
            })}
          </Grid>

          <Box mt={4} display="flex" justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={mutation.isLoading}
              startIcon={
                mutation.isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : null
              }
            >
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
}
