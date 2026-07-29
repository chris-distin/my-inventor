"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "../Components/AuthGuard";
import { supabase } from "../lib/supabase";

export default function DashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    async function loadUser() {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.push("/login");
        return;
      }

      setEmail(data.user.email ?? "");
      setFullName(
        (data.user.user_metadata?.full_name as string) || "Home For All Member"
      );

      setLoading(false);
    }

    loadUser();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#071A2D",
          color: "#fff",
          fontSize: "22px",
          fontWeight: "bold",
        }}
      >
        Loading Dashboard...
      </main>
    );
  }

  return (
    <AuthGuard>
    <main
      style={{
        minHeight: "100vh",
        background: "#071A2D",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Header */}

        <div
          style={{
            background: "#ffffff",
            borderRadius: "18px",
            padding: "30px",
            marginBottom: "25px",
            boxShadow: "0 10px 30px rgba(0,0,0,.08)",
          }}
        >
          <h1
            style={{
              color: "#071A2D",
              margin: 0,
              fontSize: "34px",
            }}
          >
            Welcome to Home For All
          </h1>

          <p
            style={{
              color: "#666",
              marginTop: "10px",
            }}
          >
            Hello <strong>{fullName}</strong>
          </p>

          <p
            style={{
              color: "#888",
              marginTop: "5px",
            }}
          >
            {email}
          </p>
        </div>

        {/* Statistics */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <DashboardCard
            title="Properties"
            value="0"
            subtitle="Available Listings"
          />

          <DashboardCard
            title="Favorites"
            value="0"
            subtitle="Saved Homes"
          />

          <DashboardCard
            title="Messages"
            value="0"
            subtitle="New Enquiries"
          />

          <DashboardCard
            title="Appointments"
            value="0"
            subtitle="Upcoming Visits"
          />
        </div>

        {/* Quick Actions */}

        <div
          style={{
            background: "#fff",
            borderRadius: "18px",
            padding: "30px",
            marginBottom: "25px",
          }}
        >
          <h2
            style={{
              color: "#071A2D",
              marginTop: 0,
            }}
          >
            Quick Actions
          </h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
              marginTop: "20px",
            }}
          >
            <Link href="/properties" style={buttonStyle}>
              Browse Properties
            </Link>

            <Link href="/favorites" style={buttonStyle}>
              Favorites
            </Link>

            <Link href="/profile" style={buttonStyle}>
              My Profile
            </Link>

            <Link href="/contact" style={buttonStyle}>
              Contact Agent
            </Link>

            <button
              onClick={handleLogout}
              style={{
                ...buttonStyle,
                background: "#071A2D",
                color: "#fff",
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Coming Soon */}

        <div
          style={{
            background: "#fff",
            borderRadius: "18px",
            padding: "30px",
          }}
        >
          <h2
            style={{
              color: "#071A2D",
              marginTop: 0,
            }}
          >
            Coming Soon
          </h2>

          <ul
            style={{
              lineHeight: 2,
              color: "#555",
            }}
          >
            <li>Interactive UAE Property Map</li>
            <li>Satellite View</li>
            <li>Nearby Metro & Tram Stations</li>
            <li>Mortgage Calculator</li>
            <li>Property Comparison</li>
            <li>AI Property Recommendations</li>
            <li>Developer Projects</li>
            <li>Appointment Booking</li>
          </ul>
        </div>
      </div>
    </main>
    </AuthGuard>
  );
}

function DashboardCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "18px",
        padding: "25px",
        boxShadow: "0 8px 25px rgba(0,0,0,.08)",
      }}
    >
      <h3
        style={{
          color: "#071A2D",
          marginTop: 0,
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          color: "#D4AF37",
          margin: "15px 0",
          fontSize: "42px",
        }}
      >
        {value}
      </h1>

      <p
        style={{
          color: "#777",
          marginBottom: 0,
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  background: "#D4AF37",
  color: "#071A2D",
  textDecoration: "none",
  border: "none",
  padding: "14px 24px",
  borderRadius: "10px",
  fontWeight: "bold",
  cursor: "pointer",
};