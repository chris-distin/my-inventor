"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "../Components/AuthGuard";
import { supabase } from "../lib/supabase";

export default function ProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [email, setEmail] = useState("");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Buyer");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
      router.push("/login");
      return;
    }

    const user = data.user;

    setEmail(user.email || "");

    setFullName(
      user.user_metadata?.full_name || ""
    );

    setPhone(
      user.user_metadata?.phone || ""
    );

    setRole(
      user.user_metadata?.role || "Buyer"
    );

    setLoading(false);
  }


  async function saveProfile() {
    setSaving(true);

    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: fullName,
        phone,
        role,
      },
    });

    setSaving(false);


    if (error) {
      alert(error.message);
      return;
    }


    alert("Profile updated successfully!");
  }


  if (loading) {
    return (
      <main
        style={{
          minHeight:"100vh",
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          background:"#071A2D",
          color:"#fff",
          fontSize:"22px",
          fontWeight:"bold",
        }}
      >
        Loading Profile...
      </main>
    );
  }


  return (
    <AuthGuard>
    <main
      style={{
        minHeight:"100vh",
        background:"#071A2D",
        padding:"40px 20px",
      }}
    >

      <section
        style={{
          maxWidth:"700px",
          margin:"auto",
          background:"#fff",
          borderRadius:"18px",
          padding:"35px",
        }}
      >

        <h1
          style={{
            color:"#071A2D",
            marginBottom:"25px",
          }}
        >
          My Profile
        </h1>


        <div style={fieldStyle}>
          <label>Email Address</label>

          <input
            value={email}
            disabled
            style={{
              ...inputStyle,
              background:"#eee",
            }}
          />
        </div>


        <div style={fieldStyle}>
          <label>Full Name</label>

          <input
            value={fullName}
            onChange={(e)=>setFullName(e.target.value)}
            placeholder="Your full name"
            style={inputStyle}
          />
        </div>


        <div style={fieldStyle}>
          <label>Phone Number</label>

          <input
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            placeholder="+971..."
            style={inputStyle}
          />
        </div>


        <div style={fieldStyle}>
          <label>Account Type</label>

          <select
            value={role}
            onChange={(e)=>setRole(e.target.value)}
            style={inputStyle}
          >
            <option value="Buyer">
              Buyer
            </option>

            <option value="Agent">
              Agent
            </option>

          </select>
        </div>


        <button
          onClick={saveProfile}
          disabled={saving}
          style={{
            width:"100%",
            marginTop:"20px",
            background:"#D4AF37",
            color:"#071A2D",
            border:"none",
            padding:"15px",
            borderRadius:"10px",
            fontWeight:"bold",
            fontSize:"17px",
            cursor:"pointer",
          }}
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>


        <button
          onClick={()=>router.push("/dashboard")}
          style={{
            width:"100%",
            marginTop:"15px",
            background:"#071A2D",
            color:"#fff",
            border:"none",
            padding:"15px",
            borderRadius:"10px",
            fontWeight:"bold",
            cursor:"pointer",
          }}
        >
          Back to Dashboard
        </button>


      </section>

    </main>
    </AuthGuard>
  );
}


const fieldStyle = {
  display:"flex",
  flexDirection:"column" as const,
  gap:"8px",
  marginBottom:"18px",
  color:"#071A2D",
  fontWeight:600,
};


const inputStyle = {
  width:"100%",
  padding:"14px",
  borderRadius:"8px",
  border:"1px solid #ccc",
  fontSize:"15px",
  outline:"none",
};