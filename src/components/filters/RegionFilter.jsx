const RegionFilter = ({ regions, selectedRegions, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Filter by Region</label>
      <select
        multiple
        value={selectedRegions}
        onChange={(e) => {
          const selectedValues = Array.from(e.target.selectedOptions, (opt) => opt.value);
          console.log("Selected regions:", selectedValues); 
          onChange(selectedValues);
        }}
        className="w-full border rounded p-2"
      >
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RegionFilter