"use client";

import { useState } from "react";

export default function ScheduleViewing() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    alert("Your viewing request has been submitted!");

    console.log(form);
  };

  return (
    <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900">
        Schedule a Viewing
      </h2>

      <p className="mt-2 text-gray-600">
        Fill in your details and our property consultant will contact you to confirm your appointment.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
          required
        />

        <div className="grid gap-4 md:grid-cols-2">

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="rounded-lg border p-3"
            required
          />

          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="rounded-lg border p-3"
            required
          />

        </div>

        <textarea
          name="message"
          placeholder="Additional Notes"
          value={form.message}
          onChange={handleChange}
          rows={5}
          className="w-full rounded-lg border p-3"
        />

        <button
          type="submit"
          className="rounded-lg bg-blue-700 px-6 py-3 text-white hover:bg-blue-800"
        >
          Request Viewing
        </button>

      </form>
    </section>
  );
}