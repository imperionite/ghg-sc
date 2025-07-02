const About = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 text-neutral-800 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">About GHG-Scout PH</h1>
        <p className="text-lg text-neutral-600">
          Empowering Filipino communities with localized carbon footprint insights.
        </p>
      </div>

      <section className="bg-white rounded-2xl shadow p-6 space-y-4">
        <p>
          <strong>GHG-Scout PH</strong> is an innovative software application
          designed to help schools, Local Government Units (LGUs), and barangays
          estimate, track, and understand their greenhouse gas (GHG) emissions. 
          It focuses on key sectors like energy, transport, waste, and agriculture 
          — providing an accessible, science-based tool for climate action.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-neutral-50 p-4 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Why Measure Emissions?</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Raise awareness of local emission sources.</li>
            <li>Support data-driven decision-making.</li>
            <li>Contribute to national and global climate goals.</li>
            <li>
              Complement systems like 
              <a 
                href="https://niccdies.climate.gov.ph/ghg-inventory"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline ml-1"
              >
                PGHGIMRS
              </a>.
            </li>
          </ul>
        </div>

        <div className="bg-neutral-50 p-4 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-2">What is CO<sub>2</sub>e?</h2>
          <p>
            CO<sub>2</sub>e (carbon dioxide equivalent) is a standard unit that 
            expresses the global warming potential of different gases as equivalent 
            amounts of CO<sub>2</sub>. It allows comparison and aggregation of 
            emissions across sources.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How GHG-Scout PH Calculates Emissions</h2>
        <div className="space-y-2">
          <div className="p-4 bg-white rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-1">Energy Sector</h3>
            <p>Applies emission factors to energy consumption:</p>
            <ul className="list-disc list-inside">
              <li>Electricity: kWh × 0.709</li>
              <li>LPG: kg × 2.983</li>
              <li>Kerosene: L × 2.391</li>
              <li>Firewood: kg × 0.015</li>
            </ul>
          </div>

          <div className="p-4 bg-white rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-1">Transport Sector</h3>
            <p>Combines distance, frequency, trips, fuel factor:</p>
            <p className="italic">
              Distance (km/day) × Trips/day × Days/week × Fuel factor
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-1">Waste Sector</h3>
            <p>Estimates from organic waste decomposition:</p>
            <p className="italic">
              Waste (kg/month) × Organic fraction × 1.8
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-1">Agriculture Sector</h3>
            <ul className="list-disc list-inside">
              <li>Fertilizer: kg × 5.5</li>
              <li>Chickens: number × 0.02</li>
              <li>Pigs: number × 1.1</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 p-6 rounded-xl shadow space-y-3">
        <h2 className="text-xl font-semibold">Benefits of GHG-Scout PH</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Automates Philippine-specific GHG calculations.</li>
          <li>Supports climate compliance & reporting.</li>
          <li>Provides transparent, auditable estimates.</li>
          <li>Delivers interactive dashboards and AI suggestions.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Documentation</h2>
        <p>
          For technical details, refer to:
        </p>
        <ul className="list-disc list-inside">
          <li>
            <a 
              href="https://github.com/imperionite/ghg-scout/blob/main/README.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Project README
            </a>
          </li>
          <li>
            <a 
              href="https://github.com/imperionite/ghg-scout/blob/main/IMPLEMENTATION.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Implementation Plan
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default About;
