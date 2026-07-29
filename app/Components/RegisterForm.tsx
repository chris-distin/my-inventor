"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function RegisterForm() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Buyer");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!fullName || !email || !password) {
      alert("Please complete all required fields.");
      return;
    }

    if (password.length < 6) {
      alert("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
        data: {
          full_name: fullName,
          phone,
          role,
        },
      },
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    if (data.user) {
      alert(
        "Account created successfully! Please check your email and click the verification link before logging in."
      );

      router.push("/login");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "18px",
      }}
    >
      <div>
        <label style={labelStyle}>Full Name</label>

        <input
          type="text"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={inputStyle}
          required
        />
      </div>

      <div>
        <label style={labelStyle}>Phone Number</label>

        <input
          type="tel"
          placeholder="+971..."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>Account Type</label>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={inputStyle}
        >
          <option value="Buyer">Buyer</option>
          <option value="Agent">Agent</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>Email Address</label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          required
        />
      </div>

      <div>
        <label style={labelStyle}>Password</label>

        <input
          type="password"
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          background: "#D4AF37",
          color: "#071A2D",
          border: "none",
          padding: "15px",
          borderRadius: "8px",
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: "bold",
          fontSize: "17px",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? "Creating Account..." : "Register"}
      </button>

      <p
        style={{
          textAlign: "center",
        }}
      >
        Already have an account?{" "}
        <Link
          href="/login"
          style={{
            color: "#071A2D",
            fontWeight: "bold",
          }}
        >
          Login
        </Link>
      </p>
    </form>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontWeight: 600,
} as const;

const inputStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px",
  outline: "none",
} as const;