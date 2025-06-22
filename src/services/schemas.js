import * as yup from "yup";

// Common number validation for non-negative values
const numberFieldValidation = yup
  .number()
  .min(0, "Value cannot be negative")
  .nullable()
  .default(0);

// Common sector validation
const sectorValidation = yup
  .string()
  .required("Sector is required");

const optionalStringFieldValidation = yup.string().nullable().default("others");

// Final combined schema
export const ghgSchema = (yup) => ({
  energy: yup.object().shape({
    sector: sectorValidation,
    electricity_consumed_kwh: numberFieldValidation,
    lpg_used_kg: numberFieldValidation,
    kerosene_used_liters: numberFieldValidation,
    firewood_used_kg: numberFieldValidation,
    diesel_used_liters: numberFieldValidation,
    gasoline_used_liters: numberFieldValidation,
    coal_used_kg: numberFieldValidation,
  }),
  transport: yup.object().shape({
    sector: sectorValidation,
    vehicle_type: optionalStringFieldValidation,  
    fuel_type: optionalStringFieldValidation,  
    number_of_vehicles: yup.number().min(0, "Value cannot be negative").nullable().default(0),
    distance_travelled_daily_km: numberFieldValidation,
    travel_frequency_per_week: numberFieldValidation,
    trips_per_day: numberFieldValidation,
  }),
  waste: yup.object().shape({
    sector: sectorValidation,
    waste_generated_kg_per_month: numberFieldValidation,
    organic_fraction_percent: yup
      .number()
      .min(0, "Value cannot be negative")
      .max(100, "Value cannot exceed 100")
      .nullable()
      .default(0),
    waste_disposal_method: optionalStringFieldValidation,
    methane_capture: yup.boolean().nullable().default(false), 
  }),
  agriculture: yup.object().shape({
    sector: sectorValidation,
    number_of_cattle: yup.number().min(0, "Value cannot be negative").nullable().default(0),
    number_of_carabao: yup.number().min(0, "Value cannot be negative").nullable().default(0),
    number_of_goats: yup.number().min(0, "Value cannot be negative").nullable().default(0),
    number_of_pigs: yup.number().min(0, "Value cannot be negative").nullable().default(0),
    number_of_chickens: yup.number().min(0, "Value cannot be negative").nullable().default(0),
    manure_management: optionalStringFieldValidation, 
    rice_paddy_area_hectares: numberFieldValidation,
    rice_water_management: optionalStringFieldValidation, 
    fertilizer_type: optionalStringFieldValidation, 
    fertilizer_applied_kg: numberFieldValidation,
  }),
  ippu: yup.object().shape({
    sector: sectorValidation,
    cement_produced_tonnes: numberFieldValidation,
    lime_produced_tonnes: numberFieldValidation,
    steel_produced_tonnes: numberFieldValidation,
    refrigerant_consumed_kg: numberFieldValidation,
    solvent_used_liters: numberFieldValidation,
    other_process_emissions_CO2e_tonnes: numberFieldValidation,
  }),
});



