"use client";

import { useState } from "react";

type SearchBarProps = {
  onSearch: (filters: {
    location: string;
    type: string;
    purpose: string;
    bedrooms: string;
    budget: string;
  }) => void;
};


export default function SearchBar({ onSearch }: SearchBarProps) {


  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [purpose, setPurpose] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [budget, setBudget] = useState("");



  return (

    <section className="relative z-20 mx-auto -mt-12 max-w-7xl px-6">

      <div className="rounded-2xl bg-white p-8 shadow-2xl">


        <h2 className="mb-6 text-2xl font-bold text-[#0B3D91]">
          Find Your Perfect Property
        </h2>



        <div className="grid gap-4 lg:grid-cols-6">


          <select
            onChange={(e)=>setLocation(e.target.value)}
            className="rounded-xl border p-3"
          >
            <option value="">Location</option>
            <option>Dubai</option>
            <option>Abu Dhabi</option>
            <option>Sharjah</option>
          </select>



          <select
            onChange={(e)=>setType(e.target.value)}
            className="rounded-xl border p-3"
          >
            <option value="">Property Type</option>
            <option>Apartment</option>
            <option>Villa</option>
            <option>Penthouse</option>
          </select>




          <select
            onChange={(e)=>setPurpose(e.target.value)}
            className="rounded-xl border p-3"
          >
            <option value="">Purpose</option>
            <option>Buy</option>
            <option>Rent</option>
          </select>




          <select
            onChange={(e)=>setBedrooms(e.target.value)}
            className="rounded-xl border p-3"
          >
            <option value="">Bedrooms</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>




          <select
            onChange={(e)=>setBudget(e.target.value)}
            className="rounded-xl border p-3"
          >
            <option value="">Budget</option>
            <option value="1">Under AED 1M</option>
            <option value="2">AED 1M - 5M</option>
            <option value="5">AED 5M+</option>
          </select>




          <button

            onClick={()=>onSearch({
              location,
              type,
              purpose,
              bedrooms,
              budget
            })}

            className="rounded-xl bg-[#0B3D91] p-3 font-bold text-white hover:bg-[#072C69]"
          >

            🔍 Search

          </button>


        </div>


      </div>

    </section>

  );

}