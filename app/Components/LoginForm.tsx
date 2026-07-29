"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Welcome to Home For All!");

    router.push("/dashboard");
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
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: 600,
          }}
        >
          Email Address
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div>
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: 600,
          }}
        >
          Password
        </label>

        <div
          style={{
            display: "flex",
            border: "1px solid #ccc",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              ...inputStyle,
              border: "none",
              flex: 1,
            }}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              padding: "0 18px",
              border: "none",
              background: "#f5f5f5",
              cursor: "pointer",
            }}
          >
            {showPassword ? "🙈" : "👁"}
          </button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <label
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />

          Remember me
        </label>

        <Link
          href="/forgot-password"
          style={{
            color: "#071A2D",
            fontWeight: 600,
          }}
        >
          Forgot Password?
        </Link>
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
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "17px",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? "Signing In..." : "Login"}
      </button>

      <div
        style={{
          textAlign: "center",
          color: "#888",
        }}
      >
        OR
      </div>

      <button type="button" style={socialButton}>
        Continue with Google
      </button>

      <button type="button" style={socialButton}>
        Continue with Apple
      </button>

      <p
        style={{
          textAlign: "center",
          marginTop: "10px",
        }}
      >
        Don't have an account?{" "}
        <Link
          href="/register"
          style={{
            color: "#071A2D",
            fontWeight: "bold",
          }}
        >
          Register
        </Link>
      </p>
    </form>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px",
  outline: "none",
} as const;

const socialButton = {
  background: "#ffffff",
  border: "1px solid #ddd",
  padding: "14px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: "15px",
} as const;