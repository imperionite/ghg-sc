import { lazy, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  MenuItem,
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

import CloseIcon from "@mui/icons-material/Close";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import toast from "react-hot-toast";
import { sanitize } from "isomorphic-dompurify";
import * as yup from "yup";

import { useMutation } from "@tanstack/react-query";
import { submitGHGData } from "../services/http";

const Loader = lazy(() => import("../components/Loader"));

const sectors = ["energy", "transport", "waste", "agriculture", "ippu"];

const getSchema = (yup) => ({
  energy: yup.object().shape({
    sector: yup.string().required(),
    electricity_consumed_kwh: yup.number().min(0).nullable(),
    lpg_used_kg: yup.number().min(0).nullable(),
    kerosene_used_liters: yup.number().min(0).nullable(),
    firewood_used_kg: yup.number().min(0).nullable(),
    diesel_used_liters: yup.number().min(0).nullable(),
    gasoline_used_liters: yup.number().min(0).nullable(),
    coal_used_kg: yup.number().min(0).nullable(),
  }),
  transport: yup.object().shape({
    sector: yup.string().required(),
    vehicle_type: yup.string(),
    fuel_type: yup.string(),
    number_of_vehicles: yup.number().min(0).nullable(),
    distance_travelled_daily_km: yup.number().min(0).nullable(),
    travel_frequency_per_week: yup.number().min(0).nullable(),
    trips_per_day: yup.number().min(0).nullable(),
  }),
  waste: yup.object().shape({
    sector: yup.string().required(),
    waste_generated_kg_per_month: yup.number().min(0).nullable(),
    organic_fraction_percent: yup.number().min(0).max(100).nullable(),
    waste_disposal_method: yup.string(),
    methane_capture: yup.boolean(),
  }),
  agriculture: yup.object().shape({
    sector: yup.string().required(),
    number_of_cattle: yup.number().min(0).nullable(),
    number_of_carabao: yup.number().min(0).nullable(),
    number_of_goats: yup.number().min(0).nullable(),
    number_of_pigs: yup.number().min(0).nullable(),
    number_of_chickens: yup.number().min(0).nullable(),
    manure_management: yup.string(),
    rice_paddy_area_hectares: yup.number().min(0).nullable(),
    rice_water_management: yup.string(),
    fertilizer_type: yup.string(),
    fertilizer_applied_kg: yup.number().min(0).nullable(),
  }),
  ippu: yup.object().shape({
    sector: yup.string().required(),
    cement_produced_tonnes: yup.number().min(0).nullable(),
    lime_produced_tonnes: yup.number().min(0).nullable(),
    steel_produced_tonnes: yup.number().min(0).nullable(),
    refrigerant_consumed_kg: yup.number().min(0).nullable(),
    solvent_used_liters: yup.number().min(0).nullable(),
    other_process_emissions_CO2e_tonnes: yup.number().min(0).nullable(),
  }),
});

const fieldMetadata = {
  energy: {
    electricity_consumed_kwh: {
      label: "Electricity Consumed (kWh)",
      hint: "Enter the total electricity consumed in kilowatt-hours. Check your electricity bills or meter readings.",
      tooltip:
        "Kilowatt-hour (kWh) is a unit of energy equivalent to one kilowatt of power used for one hour.",
    },
    lpg_used_kg: {
      label: "LPG Used (kg)",
      hint: "Enter the amount of liquefied petroleum gas used in kilograms. Refer to purchase receipts or supplier data.",
      tooltip: "LPG is commonly used for cooking and heating.",
    },
    kerosene_used_liters: {
      label: "Kerosene Used (liters)",
      hint: "Enter kerosene consumption in liters. Check fuel purchase records.",
      tooltip: "Kerosene is a fuel used for heating and lighting.",
    },
    firewood_used_kg: {
      label: "Firewood Used (kg)",
      hint: "Estimate the amount of firewood used in kilograms. Weigh or estimate based on purchase.",
      tooltip: "Firewood is biomass fuel used for cooking or heating.",
    },
    diesel_used_liters: {
      label: "Diesel Used (liters)",
      hint: "Enter diesel fuel consumption in liters. Check fuel logs or receipts.",
      tooltip: "Diesel is used in generators, vehicles, and machinery.",
    },
    gasoline_used_liters: {
      label: "Gasoline Used (liters)",
      hint: "Enter gasoline consumption in liters. Refer to fuel purchase records.",
      tooltip: "Gasoline is commonly used in vehicles.",
    },
    coal_used_kg: {
      label: "Coal Used (kg)",
      hint: "Enter coal consumption in kilograms. Check purchase or usage logs.",
      tooltip:
        "Coal is a fossil fuel used for heating or industrial processes.",
    },
  },
  transport: {
    vehicle_type: {
      label: "Vehicle Type",
      hint: "Specify the type of vehicle (e.g., car, truck, motorcycle).",
      tooltip: "Different vehicle types have different emission factors.",
    },
    fuel_type: {
      label: "Fuel Type",
      hint: "Specify the fuel type used (e.g., gasoline, diesel, electric).",
      tooltip: "Fuel type affects emission calculations.",
    },
    number_of_vehicles: {
      label: "Number of Vehicles",
      hint: "Enter the total number of vehicles in your fleet.",
      tooltip: "Count all vehicles used for transport.",
    },
    distance_travelled_daily_km: {
      label: "Distance Travelled Daily (km)",
      hint: "Average kilometers travelled per vehicle per day.",
      tooltip: "Estimate based on trip logs or GPS data.",
    },
    travel_frequency_per_week: {
      label: "Travel Frequency (times per week)",
      hint: "Number of trips made per week.",
      tooltip: "Helps estimate total distance travelled.",
    },
    trips_per_day: {
      label: "Trips per Day",
      hint: "Average number of trips per vehicle each day.",
      tooltip: "Includes all trips regardless of distance.",
    },
  },
  waste: {
    waste_generated_kg_per_month: {
      label: "Waste Generated (kg/month)",
      hint: "Total waste generated monthly in kilograms. Use waste collection records.",
      tooltip: "Includes all types of waste produced.",
    },
    organic_fraction_percent: {
      label: "Organic Waste Fraction (%)",
      hint: "Percentage of waste that is organic. Estimate based on waste sorting.",
      tooltip: "Organic waste decomposes and produces methane.",
    },
    waste_disposal_method: {
      label: "Waste Disposal Method",
      hint: "Describe how waste is disposed (e.g., landfill, recycling).",
      tooltip: "Different methods have different emission impacts.",
    },
    methane_capture: {
      label: "Methane Capture",
      hint: "Indicate if methane from waste is captured (Yes/No).",
      tooltip: "Methane capture reduces greenhouse gas emissions.",
    },
  },
  agriculture: {
    number_of_cattle: {
      label: "Number of Cattle",
      hint: "Enter total cattle count on your farm.",
      tooltip: "Livestock contribute to methane emissions.",
    },
    number_of_carabao: {
      label: "Number of Carabao",
      hint: "Enter total carabao count.",
      tooltip: "Carabao are water buffalo common in agriculture.",
    },
    number_of_goats: {
      label: "Number of Goats",
      hint: "Enter total goat count.",
      tooltip: "Goats produce methane through digestion.",
    },
    number_of_pigs: {
      label: "Number of Pigs",
      hint: "Enter total pig count.",
      tooltip: "Pigs contribute to agricultural emissions.",
    },
    number_of_chickens: {
      label: "Number of Chickens",
      hint: "Enter total chicken count.",
      tooltip: "Poultry emissions are generally lower.",
    },
    manure_management: {
      label: "Manure Management",
      hint: "Describe how manure is handled (e.g., composting, storage).",
      tooltip: "Manure management affects methane emissions.",
    },
    rice_paddy_area_hectares: {
      label: "Rice Paddy Area (hectares)",
      hint: "Area of rice paddies cultivated. Use farm records or maps.",
      tooltip: "Rice paddies emit methane during cultivation.",
    },
    rice_water_management: {
      label: "Rice Water Management",
      hint: "Describe water management practices (e.g., continuous flooding).",
      tooltip: "Water management influences methane emissions.",
    },
    fertilizer_type: {
      label: "Fertilizer Type",
      hint: "Type of fertilizer applied (e.g., urea, compost).",
      tooltip: "Fertilizer affects nitrous oxide emissions.",
    },
    fertilizer_applied_kg: {
      label: "Fertilizer Applied (kg)",
      hint: "Amount of fertilizer applied in kilograms.",
      tooltip: "Record from purchase or application logs.",
    },
  },
  ippu: {
    cement_produced_tonnes: {
      label: "Cement Produced (tonnes)",
      hint: "Total cement production in tonnes. Use production records.",
      tooltip: "Cement production emits CO2 during manufacturing.",
    },
    lime_produced_tonnes: {
      label: "Lime Produced (tonnes)",
      hint: "Total lime production in tonnes.",
      tooltip: "Lime production contributes to process emissions.",
    },
    steel_produced_tonnes: {
      label: "Steel Produced (tonnes)",
      hint: "Total steel production in tonnes.",
      tooltip: "Steel manufacturing is energy-intensive.",
    },
    refrigerant_consumed_kg: {
      label: "Refrigerant Consumed (kg)",
      hint: "Amount of refrigerant used. Check maintenance logs.",
      tooltip: "Refrigerants can have high global warming potential.",
    },
    solvent_used_liters: {
      label: "Solvent Used (liters)",
      hint: "Volume of solvent used in processes.",
      tooltip: "Solvents may release volatile organic compounds.",
    },
    other_process_emissions_CO2e_tonnes: {
      label: "Other Process Emissions (CO2e tonnes)",
      hint: "Estimate other CO2 equivalent emissions from processes.",
      tooltip: "Include any other relevant emissions.",
    },
  },
};

export default function GHGSubmissionForm() {
  const [sector, setSector] = useState("energy");
  const [value, setValue] = useState(0);
  const [showNote, setShowNote] = useState(true);

  const schema = getSchema(yup)[sectors[value]];

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { sector },
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: submitGHGData,
    onSuccess: (data) => {
      toast.success(
        `${data?.message}\nEstimated CO2e: ${data?.estimated_co2e_kg} kg`
      );
      reset({ sector });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.detail || "Submission failed. Try again."
      );
    },
  });

  // Convert string inputs to numbers or booleans before submission
  const convertToNumbers = (data) => {
    const converted = { sector: data.sector };
    Object.keys(data).forEach((key) => {
      if (key === "sector") return;
      if (typeof data[key] === "string") {
        if (data[key] === "true") converted[key] = true;
        else if (data[key] === "false") converted[key] = false;
        else {
          const num = Number(data[key]);
          converted[key] = isNaN(num) ? data[key] : num;
        }
      } else {
        converted[key] = data[key];
      }
    });
    return converted;
  };

  const onSubmit = (data) => {
    const sanitized = {};
    for (const key in data) {
      sanitized[key] =
        typeof data[key] === "string" ? sanitize(data[key]) : data[key];
    }
    const payload = convertToNumbers(sanitized);
    mutation.mutate(payload);
  };

  const handleSectorChange = (e, newValue) => {
    setValue(newValue);
    setSector(sectors[newValue]);
    reset({ sector: sectors[newValue] });
  };

  // Custom Tab styles for compact, rounded inline tabs
  const tabSx = {
    minWidth: 80,
    borderRadius: "16px",
    textTransform: "none",
    fontWeight: "600",
    marginRight: 1,
    paddingX: 1.5,
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

              const meta = fieldMetadata[sector]?.[field] || {};
              const label = meta.label || field;
              const hint = meta.hint || "";
              const tooltip = meta.tooltip || "";

              const isBoolean =
                schema.fields[field]?.type === "boolean" ||
                field === "methane_capture";

              return (
                <Grid item xs={12} sm={6} key={field}>
                  <Controller
                    name={field}
                    control={control}
                    render={({ field: controllerField }) =>
                      isBoolean ? (
                        <Box display="flex" alignItems="center">
                          <Typography
                            component="label"
                            htmlFor={field}
                            sx={{ mr: 1, fontWeight: 600 }}
                          >
                            {label}
                            {tooltip && (
                              <Tooltip title={tooltip} arrow>
                                <InfoOutlinedIcon
                                  fontSize="small"
                                  color="action"
                                  sx={{ ml: 0.5, cursor: "help" }}
                                />
                              </Tooltip>
                            )}
                          </Typography>
                          <Switch
                            {...controllerField}
                            checked={
                              controllerField.value === true ||
                              controllerField.value === "true"
                            }
                            onChange={(e) =>
                              controllerField.onChange(e.target.checked)
                            }
                            inputProps={{ "aria-label": label }}
                            color="primary"
                          />
                        </Box>
                      ) : (
                        <TextField
                          {...controllerField}
                          type="number"
                          fullWidth
                          label={
                            <Box display="flex" alignItems="center">
                              {label}
                              {tooltip && (
                                <Tooltip title={tooltip} arrow>
                                  <InfoOutlinedIcon
                                    fontSize="small"
                                    color="action"
                                    sx={{ ml: 0.5, cursor: "help" }}
                                  />
                                </Tooltip>
                              )}
                            </Box>
                          }
                          error={!!errors[field]}
                          helperText={
                            errors[field]?.message?.toString() || hint
                          }
                          variant="outlined"
                          color="primary"
                          size="small"
                          inputProps={{ min: 0 }}
                          aria-describedby={`${field}-helper-text`}
                        />
                      )
                    }
                  />
                </Grid>
              );
            })}
          </Grid>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="mt-6"
            disabled={mutation.isLoading}
            size="large"
          >
            {mutation.isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Paper>
    </div>
  );
}
