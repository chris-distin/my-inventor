"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email address.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo:
          "http://localhost:3000/reset-password",
      }
    );

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage(
      "Password reset link sent. Please check your email."
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <p
        style={{
          color: "#666",
          lineHeight: 1.6,
          textAlign: "center",
        }}
      >
        Enter your registered email address and we will send you
        instructions to reset your password.
      </p>

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
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "15px",
            outline: "none",
          }}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          background: "#D4AF37",
          color: "#071A2D",
          padding: "15px",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          cursor: "pointer",
          fontSize: "16px",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>

      {message && (
        <p
          style={{
            textAlign: "center",
            color: "#071A2D",
          }}
        >
          {message}
        </p>
      )}

      <Link
        href="/login"
        style={{
          textAlign: "center",
          color: "#071A2D",
          fontWeight: "bold",
          textDecoration: "none",
        }}
      >
        ← Back to Login
      </Link>
    </form>
  );
}