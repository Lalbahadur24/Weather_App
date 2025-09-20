import { useState } from "react";
import { FiSettings } from "react-icons/fi";

export default function Header({ unit, setUnit }) {
  return (
    <header className="flex justify-between items-center py-6 px-8">
      <div className="flex items-center gap-3">
        <div className="text-3xl">☀️</div>
        <h1 className="text-2xl font-bold text-white">Weather Now</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="bg-gray-800/50 backdrop-blur-sm text-white rounded-lg px-4 py-2 text-sm border border-gray-600/30 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
          >
            <option value="celsius">Units</option>
            <option value="celsius">°C</option>
            <option value="fahrenheit">°F</option>
          </select>
        </div>
      </div>
    </header>
  );
}
