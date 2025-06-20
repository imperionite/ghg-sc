import React from "react";

const RegionFilter = ({ regions, selectedRegions, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Filter by Region</label>
      <select
        multiple
        value={selectedRegions}
        onChange={(e) =>
          onChange(Array.from(e.target.selectedOptions, (opt) => opt.value))
        }
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

export default RegionFilter;
