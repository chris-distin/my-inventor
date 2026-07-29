"use client";

import { useState } from "react";

export default function AdminAgentForm() {

  const [message, setMessage] = useState("");

  const [agent, setAgent] = useState({
    name: "",
    role: "",
    phone: "",
    email: "",
    photo: "",
    location: "",
  });



  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    setAgent({
      ...agent,
      [e.target.name]: e.target.value,
    });

  }



  function handleSubmit(e: React.FormEvent) {

    e.preventDefault();


    const oldAgents =
      JSON.parse(localStorage.getItem("agents") || "[]");


    const newAgent = {
      id: Date.now(),
      ...agent,
    };


    localStorage.setItem(
      "agents",
      JSON.stringify([...oldAgents, newAgent])
    );


    setMessage("Agent added successfully ✅");


    setAgent({
      name: "",
      role: "",
      phone: "",
      email: "",
      photo: "",
      location: "",
    });

  }



  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >


      <input
        name="name"
        value={agent.name}
        onChange={handleChange}
        placeholder="Agent name"
        className="w-full rounded-xl border p-3"
      />



      <input
        name="role"
        value={agent.role}
        onChange={handleChange}
        placeholder="Role (Sales Agent, Manager...)"
        className="w-full rounded-xl border p-3"
      />



      <input
        name="phone"
        value={agent.phone}
        onChange={handleChange}
        placeholder="Phone / WhatsApp"
        className="w-full rounded-xl border p-3"
      />



      <input
        name="email"
        value={agent.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full rounded-xl border p-3"
      />



      <input
        name="photo"
        value={agent.photo}
        onChange={handleChange}
        placeholder="Agent photo URL"
        className="w-full rounded-xl border p-3"
      />



      <input
        name="location"
        value={agent.location}
        onChange={handleChange}
        placeholder="Area (Dubai Marina, Downtown...)"
        className="w-full rounded-xl border p-3"
      />



      <button
        className="rounded-xl bg-[#0B3D91] px-6 py-3 text-white hover:bg-[#072C69]"
      >
        Add Agent
      </button>



      {message && (
        <p className="font-bold text-green-600">
          {message}
        </p>
      )}


    </form>

  );
}