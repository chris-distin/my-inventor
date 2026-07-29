"use client";

import { ReactNode } from "react";

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        fontFamily: "Arial, sans-serif",
        background: "#f5f5f5",
      }}
    >
      {/* LEFT SIDE */}

      <div
        style={{
          background:
            "linear-gradient(rgba(7,26,45,.80), rgba(7,26,45,.80)), url('/images/dubai.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "70px",
        }}
      >
        <h1
          style={{
            fontSize: "60px",
            marginBottom: "20px",
          }}
        >
          🏠 Home for All
        </h1>

        <h2
          style={{
            color: "#D4AF37",
            marginBottom: "25px",
          }}
        >
          UAE Real Estate Platform
        </h2>

        <p
          style={{
            fontSize: "20px",
            lineHeight: "1.8",
            maxWidth: "600px",
          }}
        >
          Buy, Rent and Invest in premium properties across Dubai,
          Abu Dhabi, Sharjah and all UAE Emirates.
        </p>

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "50px",
            flexWrap: "wrap",
          }}
        >
          <Stat number="10,000+" text="Properties" />
          <Stat number="120+" text="Developers" />
          <Stat number="300+" text="Communities" />
        </div>
      </div>

      {/* RIGHT SIDE */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "500px",
            background: "white",
            padding: "45px",
            borderRadius: "20px",
            boxShadow: "0 15px 40px rgba(0,0,0,.15)",
          }}
        >
          <h2
            style={{
              color: "#071A2D",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            {title}
          </h2>

          <p
            style={{
              textAlign: "center",
              color: "#777",
              marginBottom: "35px",
            }}
          >
            {subtitle}
          </p>

          {children}
        </div>
      </div>
    </div>
  );
}

function Stat({
  number,
  text,
}: {
  number: string;
  text: string;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,.12)",
        padding: "20px",
        borderRadius: "15px",
        minWidth: "140px",
        textAlign: "center",
        backdropFilter: "blur(8px)",
      }}
    >
      <h2
        style={{
          color: "#D4AF37",
          marginBottom: "8px",
        }}
      >
        {number}
      </h2>

      <p>{text}</p>
    </div>
  );
}