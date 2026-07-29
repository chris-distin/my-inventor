"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import { supabase } from "../lib/supabase";

const BUCKET_NAME = "property-images";

type ImageStatus = "pending" | "uploading" | "uploaded" | "error";

type PropertyImage = {
  id: string;
  file: File;
  previewUrl: string;
  status: ImageStatus;
  storagePath?: string;
  publicUrl?: string;
  error?: string;
};

type Props = {
  onUploadComplete: (publicUrls: string[]) => void;
  maxImages?: number;
};

export type PropertyImageUploaderHandle = {
  uploadImages: () => Promise<string[]>;
};

function getUniqueFileName(file: File) {
  const extension = file.name.includes(".")
    ? `.${file.name.split(".").pop()?.toLowerCase()}`
    : "";

  return `properties/${crypto.randomUUID()}${extension}`;
}

const PropertyImageUploader = forwardRef<PropertyImageUploaderHandle, Props>(
  function PropertyImageUploader({ onUploadComplete, maxImages = 10 }, ref) {
  const [images, setImages] = useState<PropertyImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  function notifyParent(nextImages: PropertyImage[]) {
    onUploadComplete(
      nextImages.flatMap((image) =>
        image.publicUrl ? [image.publicUrl] : []
      )
    );
  }

  function handleFilesSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files ?? []).filter((file) =>
      file.type.startsWith("image/")
    );
    const remainingSlots = maxImages - images.length;
    const filesToAdd = selectedFiles.slice(0, Math.max(remainingSlots, 0));

    if (filesToAdd.length === 0) {
      setMessage(`You can upload up to ${maxImages} images.`);
      event.target.value = "";
      return;
    }

    const nextImages = [
      ...images,
      ...filesToAdd.map((file) => ({
        id: crypto.randomUUID(),
        file,
        previewUrl: URL.createObjectURL(file),
        status: "pending" as const,
      })),
    ];

    setImages(nextImages);
    setMessage(
      selectedFiles.length > filesToAdd.length
        ? `Only ${maxImages} images can be selected.`
        : ""
    );
    event.target.value = "";
  }

  async function uploadImages() {
    const imagesToUpload = images.filter(
      (image) => image.status === "pending" || image.status === "error"
    );

    if (imagesToUpload.length === 0) {
      return images.flatMap((image) =>
        image.publicUrl ? [image.publicUrl] : []
      );
    }

    setUploading(true);
    setProgress(0);
    setMessage("");

    let nextImages = images;

    try {
      for (let index = 0; index < imagesToUpload.length; index += 1) {
        const image = imagesToUpload[index];

        nextImages = nextImages.map((currentImage) =>
          currentImage.id === image.id
            ? { ...currentImage, status: "uploading", error: undefined }
            : currentImage
        );
        setImages(nextImages);

        const storagePath = getUniqueFileName(image.file);
        const { data, error } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(storagePath, image.file, {
            cacheControl: "3600",
            contentType: image.file.type,
            upsert: false,
          });

        if (error) {
          nextImages = nextImages.map((currentImage) =>
            currentImage.id === image.id
              ? { ...currentImage, status: "error", error: error.message }
              : currentImage
          );
        } else {
          const { data: publicUrlData } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(data.path);

          nextImages = nextImages.map((currentImage) =>
            currentImage.id === image.id
              ? {
                  ...currentImage,
                  status: "uploaded",
                  storagePath: data.path,
                  publicUrl: publicUrlData.publicUrl,
                }
              : currentImage
          );
        }

        setImages(nextImages);
        setProgress(Math.round(((index + 1) / imagesToUpload.length) * 100));
      }

      notifyParent(nextImages);

      const uploadError = nextImages.find(
        (image) => image.status === "error"
      )?.error;

      if (uploadError) {
        setMessage(uploadError);
        throw new Error(uploadError);
      }

      setMessage("Image upload complete.");
      return nextImages.flatMap((image) =>
        image.publicUrl ? [image.publicUrl] : []
      );
    } finally {
      setUploading(false);
    }
  }

  useImperativeHandle(ref, () => ({ uploadImages }));

  async function removeImage(image: PropertyImage) {
    if (uploading) {
      return;
    }

    const nextImages = images.filter((currentImage) => currentImage.id !== image.id);
    setImages(nextImages);
    notifyParent(nextImages);
    URL.revokeObjectURL(image.previewUrl);

    if (image.storagePath) {
      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([image.storagePath]);

      if (error) {
        setMessage("The image was removed from this form, but could not be deleted from storage.");
        return;
      }
    }

    setMessage("");
  }

  return (
    <section className="rounded-2xl bg-white p-8 shadow">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0B3D91]">Property Images</h2>
          <p className="mt-1 text-sm text-gray-500">
            Upload up to {maxImages} images. The first image is shown first.
          </p>
        </div>

        <label className="cursor-pointer rounded-xl border border-[#0B3D91] px-4 py-2 font-semibold text-[#0B3D91] transition hover:bg-blue-50">
          Select Images
          <input
            type="file"
            accept="image/*"
            multiple
            disabled={uploading || images.length >= maxImages}
            onChange={handleFilesSelected}
            className="sr-only"
          />
        </label>
      </div>

      {images.length > 0 && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <div key={image.id} className="overflow-hidden rounded-xl border bg-white">
              <img
                src={image.previewUrl}
                alt={image.file.name}
                className="h-40 w-full object-cover"
              />

              <div className="space-y-2 p-3">
                <p className="truncate text-sm font-medium text-gray-700">
                  {image.file.name}
                </p>

                <p className="text-xs text-gray-500">
                  {image.status === "uploaded" && "Uploaded"}
                  {image.status === "uploading" && "Uploading..."}
                  {image.status === "pending" && "Ready to publish"}
                  {image.status === "error" && image.error}
                </p>

                <button
                  type="button"
                  onClick={() => removeImage(image)}
                  disabled={uploading}
                  className="text-sm font-semibold text-red-600 hover:text-red-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {uploading && (
        <div className="mt-6">
          <div className="mb-2 flex justify-between text-sm font-semibold text-[#0B3D91]">
            <span>Uploading images</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-blue-100">
            <div
              className="h-full rounded-full bg-[#0B3D91] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {message && <p className="mt-6 text-sm font-semibold text-gray-600">{message}</p>}
    </section>
  );
  }
);

export default PropertyImageUploader;
