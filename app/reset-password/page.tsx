"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!password) {
      setMessage("Please enter a new password.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Password updated successfully.");

    setTimeout(() => {
      router.push("/login");
    }, 2000);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#071A2D",
        padding: "20px",
      }}
    >
      <section
        style={{
          background: "white",
          width: "100%",
          maxWidth: "450px",
          padding: "35px",
          borderRadius: "15px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#071A2D",
            marginBottom: "25px",
          }}
        >
          Create New Password
        </h1>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              background: "#D4AF37",
              color: "#071A2D",
              border: "none",
              padding: "15px",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {loading ? "Updating..." : "Update Password"}
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
        </form>
      </section>
    </main>
  );
}