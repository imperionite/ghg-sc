export function ghgDefaultValues(sector) {
  const fields = {
    energy: [
      "electricity_consumed_kwh",
      "lpg_used_kg",
      "kerosene_used_liters",
      "firewood_used_kg",
      "diesel_used_liters",
      "gasoline_used_liters",
      "coal_used_kg",
    ],
    transport: [
      "vehicle_type",
      "fuel_type",
      "number_of_vehicles",
      "distance_travelled_daily_km",
      "travel_frequency_per_week",
      "trips_per_day",
    ],
    waste: [
      "waste_generated_kg_per_month",
      "organic_fraction_percent",
      "waste_disposal_method",
      "methane_capture",
    ],
    agriculture: [
      "number_of_cattle",
      "number_of_carabao",
      "number_of_goats",
      "number_of_pigs",
      "number_of_chickens",
      "manure_management",
      "rice_paddy_area_hectares",
      "rice_water_management",
      "fertilizer_type",
      "fertilizer_applied_kg",
    ],
    ippu: [
      "cement_produced_tonnes",
      "lime_produced_tonnes",
      "steel_produced_tonnes",
      "refrigerant_consumed_kg",
      "solvent_used_liters",
      "other_process_emissions_CO2e_tonnes",
    ],
  };

  const defaults = { sector };
  fields[sector].forEach((field) => {
    if (field === "methane_capture") defaults[field] = false;
    else if (field === "manure_management") defaults[field] = "none";
    else if (field === "rice_water_management") defaults[field] = "continuous_flooding";
    else if (field === "fertilizer_type") defaults[field] = "none";
    else defaults[field] = null;
  });
  return defaults;
}
