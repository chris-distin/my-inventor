"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function AddPropertyPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [propertyType, setPropertyType] = useState("Apartment");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [area, setArea] = useState("");
  const [status, setStatus] = useState("Available");

  async function checkUser() {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      router.push("/login");
      return;
    }

    setUserId(data.user.id);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
    checkUser();
  }, []);

  async function saveProperty(e: React.FormEvent) {
    e.preventDefault();

    if (!title || !description || !location || !price || !area) {
      alert("Please complete all fields.");
      return;
    }

    setSaving(true);

    const { error } = await supabase
      .from("properties")
      .insert([
        {
          owner_id: userId,
          title,
          description,
          property_type: propertyType,
          location,
          price: Number(price),
          bedrooms,
          bathrooms,
          area: Number(area),
          status,
        },
      ]);

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Property added successfully!");
    router.push("/dashboard");
  }

  if (loading) {
    return (
      <main style={pageLoading}>
        Loading...
      </main>
    );
  }

  return (
    <main style={page}>
      <section style={card}>
        <h1 style={titleStyle}>Add New Property</h1>

        <form onSubmit={saveProperty} style={formStyle}>

          <Field label="Property Title">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Luxury Apartment in Dubai Marina"
              style={inputStyle}
            />
          </Field>

          <Field label="Description">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              style={inputStyle}
            />
          </Field>

          <Field label="Property Type">
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              style={inputStyle}
            >
              <option>Apartment</option>
              <option>Villa</option>
              <option>Townhouse</option>
              <option>Penthouse</option>
              <option>Office</option>
              <option>Retail</option>
            </select>
          </Field>

          <Field label="Location">
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Dubai Marina"
              style={inputStyle}
            />
          </Field>

          <Field label="Price (AED)">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={inputStyle}
            />
          </Field>

          <Field label="Bedrooms">
            <input
              type="number"
              value={bedrooms}
              onChange={(e) => setBedrooms(Number(e.target.value))}
              style={inputStyle}
            />
          </Field>

          <Field label="Bathrooms">
            <input
              type="number"
              value={bathrooms}
              onChange={(e) => setBathrooms(Number(e.target.value))}
              style={inputStyle}
            />
          </Field>

          <Field label="Area (sq ft)">
            <input
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              style={inputStyle}
            />
          </Field>

          <Field label="Status">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={inputStyle}
            >
              <option>Available</option>
              <option>Sold</option>
              <option>Rented</option>
            </select>
          </Field>

          <button
            type="submit"
            disabled={saving}
            style={buttonStyle}
          >
            {saving ? "Saving..." : "Add Property"}
          </button>

        </form>
      </section>
    </main>
  );
}


function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}


const page = {
  minHeight: "100vh",
  background: "#071A2D",
  padding: "40px 20px",
};

const pageLoading = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#071A2D",
  color: "white",
  fontSize: "22px",
};

const card = {
  maxWidth: "850px",
  margin: "auto",
  background: "white",
  padding: "35px",
  borderRadius: "16px",
};

const titleStyle = {
  color: "#071A2D",
  marginBottom: "25px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "18px",
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontWeight: "600",
  color: "#071A2D",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const buttonStyle = {
  background: "#071A2D",
  color: "white",
  padding: "14px",
  borderRadius: "10px",
  border: "none",
  fontSize: "18px",
  cursor: "pointer",
};