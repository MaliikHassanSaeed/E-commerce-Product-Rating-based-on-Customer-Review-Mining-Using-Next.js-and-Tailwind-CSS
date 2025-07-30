"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { useRouter } from 'next/router'
// import React from 'react'

const Filter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className=" text-right">
      <select
        name="sort"
        id=""
        className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400"
        // onChange={handleFilterChange}
      >
        <option>Sort By</option>
        <option value="asc price">Price(Low to high)</option>
        <option value="desc price">Price(High to low)</option>
        <option value="asc lastUpdated">Newest</option>
        <option value="desc lastUpdated">Oldest</option>
      </select>
    </div>
  );
};

export default Filter;
