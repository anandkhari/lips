"use client";

import { IconSearch } from "@tabler/icons-react";

export default function SearchBar({ value, onChange, placeholder = "Search projects…" }) {
  return (
    <div className="w-full">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
          <IconSearch size={18} className="text-gray-400" strokeWidth={2} />
        </div>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-full border border-gray-200 bg-white py-4 pl-12 pr-5 text-sm font-medium text-[#0F172A] placeholder:text-gray-400 shadow-sm shadow-slate-900/5 outline-none transition-colors focus:border-[#0F172A]"
        />
      </div>
    </div>
  );
}

