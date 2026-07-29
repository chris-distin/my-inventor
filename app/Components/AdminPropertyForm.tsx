"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AdminAmenitiesSection from "./AdminAmenitiesSection";
import AdminBasicSection from "./AdminBasicSection";
import AdminDetailsSection from "./AdminDetailsSection";
import AdminSummaryCard from "./AdminSummaryCard";
import PropertyImageUploader, {
  type PropertyImageUploaderHandle,
} from "./PropertyImageUploader";
import PropertyLocationPicker from "./PropertyLocationPicker";
import { supabase } from "../lib/supabase";

type PropertyForm = {
  title: string;
  price: string;
  purpose: string;
  type: string;
  location: string;
  developer: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  description: string;
  latitude: number;
  longitude: number;
  images: string[];
};

type Props = {
  propertyId?: string;
};

type StoredProperty = {
  title: string | null;
  price: number | string | null;
  purpose: string | null;
  type: string | null;
  location: string | null;
  developer: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  area: number | string | null;
  description: string | null;
  amenities: string[] | null;
  images: string[] | null;
  latitude: number | null;
  longitude: number | null;
};

const initialForm: PropertyForm = {
  title: "",
  price: "",
  purpose: "Buy",
  type: "Apartment",
  location: "",
  developer: "",
  bedrooms: 0,
  bathrooms: 0,
  area: "",
  description: "",
  latitude: 25.2048,
  longitude: 55.2708,
  images: [],
};

export default function AdminPropertyForm({ propertyId }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<PropertyForm>(initialForm);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingProperty, setLoadingProperty] = useState(Boolean(propertyId));
  const [imageUploaderKey, setImageUploaderKey] = useState(0);
  const imageUploaderRef = useRef<PropertyImageUploaderHandle>(null);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!propertyId) {
      return;
    }

    let isMounted = true;

    async function loadProperty() {
      const { data, error } = await supabase
        .from("properties")
        .select(
          "title, price, purpose, type, location, developer, bedrooms, bathrooms, area, description, amenities, images, latitude, longitude"
        )
        .eq("id", propertyId)
        .single();

      if (!isMounted) {
        return;
      }

      if (error) {
        setErrorMessage(error.message);
        setLoadingProperty(false);
        return;
      }

      const property = data as StoredProperty;
      setForm({
        title: property.title ?? "",
        price: property.price?.toString() ?? "",
        purpose: property.purpose ?? "Buy",
        type: property.type ?? "Apartment",
        location: property.location ?? "",
        developer: property.developer ?? "",
        bedrooms: property.bedrooms ?? 0,
        bathrooms: property.bathrooms ?? 0,
        area: property.area?.toString() ?? "",
        description: property.description ?? "",
        latitude: property.latitude ?? initialForm.latitude,
        longitude: property.longitude ?? initialForm.longitude,
        images: Array.isArray(property.images) ? property.images : [],
      });
      setAmenities(Array.isArray(property.amenities) ? property.amenities : []);
      setLoadingProperty(false);
    }

    loadProperty();

    return () => {
      isMounted = false;
    };
  }, [propertyId]);

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: name === "bedrooms" || name === "bathrooms" ? Number(value) : value,
    }));
  }

  function handleLocationChange(latitude: number, longitude: number) {
    setForm((currentForm) => ({ ...currentForm, latitude, longitude }));
  }

  function handleImageUploadComplete(images: string[]) {
    setForm((currentForm) => ({
      ...currentForm,
      images: propertyId
        ? Array.from(new Set([...currentForm.images, ...images]))
        : images,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setErrorMessage("");

    try {
      const uploadedImages = await imageUploaderRef.current?.uploadImages() ?? [];
      const nextImages = Array.from(new Set([...form.images, ...uploadedImages]));

      const insertData = {
        title: form.title,
        price: Number(form.price),
        purpose: form.purpose,
        type: form.type,
        location: form.location,
        developer: form.developer,
        bedrooms: form.bedrooms,
        bathrooms: form.bathrooms,
        area: Number(form.area),
        description: form.description,
        amenities,
        images: nextImages,
        featured_image: nextImages[0] ?? null,
        latitude: form.latitude,
        longitude: form.longitude,
      };

      const { error } = propertyId
        ? await supabase.from("properties").update(insertData).eq("id", propertyId)
        : await supabase.from("properties").insert(insertData);

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      setMessage(
        propertyId ? "Property updated successfully." : "Property added successfully."
      );

      if (propertyId) {
        router.push("/admin");
        router.refresh();
        return;
      }

      setForm(initialForm);
      setAmenities([]);
      setImageUploaderKey((currentKey) => currentKey + 1);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to upload property images."
      );
    } finally {
      setLoading(false);
    }
  }

  if (loadingProperty) {
    return <p className="p-6 text-center text-gray-500">Loading property...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="space-y-8">
        <AdminBasicSection form={form} onChange={handleChange} />
        <AdminDetailsSection form={form} onChange={handleChange} />
        <AdminAmenitiesSection
          amenities={amenities}
          setAmenities={setAmenities}
        />
        <PropertyLocationPicker
          latitude={form.latitude}
          longitude={form.longitude}
          onLocationChange={handleLocationChange}
        />
        <PropertyImageUploader
          key={imageUploaderKey}
          ref={imageUploaderRef}
          onUploadComplete={handleImageUploadComplete}
        />

        {message && <p className="font-bold text-green-600">{message}</p>}
        {errorMessage && (
          <p className="font-bold text-red-600">{errorMessage}</p>
        )}
      </div>

      <AdminSummaryCard form={form} loading={loading} />
    </form>
  );
}
