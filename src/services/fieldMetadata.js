export const ghgFieldMetadata = {
  energy: {
    electricity_consumed_kwh: {
      label: "Electricity Consumed (kWh)",
      hint: "Enter the total electricity consumed in kilowatt-hours. Check your electricity bills or meter readings.",
      tooltip: "Kilowatt-hour (kWh) is a unit of energy equivalent to one kilowatt of power used for one hour.",
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
      tooltip: "Coal is a fossil fuel used for heating or industrial processes.",
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
