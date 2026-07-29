"use client";

interface AdminInputProps {
  label: string;
  name: string;
  value: string | number;
  type?: string;
  placeholder?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export default function AdminInput({
  label,
  name,
  value,
  type = "text",
  placeholder,
  onChange,
}: AdminInputProps) {
  return (
    <div>
      <label className="mb-2 block font-semibold text-gray-700">
        {label}
      </label>

      <input
        className="w-full rounded-xl border border-gray-300 p-4 outline-none transition focus:border-[#0B3D91]"
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}