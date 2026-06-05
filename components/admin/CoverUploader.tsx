"use client";

import { adminRequest } from "@/lib/adminClient";
import { useState } from "react";

type CoverUploaderProps = {
  value: string;
  objectType: "resource" | "category";
  objectId?: string;
  onChange: (url: string) => void;
};

type UploadResult = {
  fileId: string;
  fileName: string;
  viewUrl: string;
  imageUrl: string;
};

export default function CoverUploader({
  value,
  objectType,
  objectId = "",
  onChange,
}: CoverUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Chỉ hỗ trợ ảnh JPG, PNG hoặc WEBP.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Ảnh không nên vượt quá 5MB.");
      return;
    }

    setUploading(true);

    try {
      const base64 = await fileToBase64(file);

      const result = await adminRequest<UploadResult>("adminUploadCoverImage", {
        fileName: file.name,
        mimeType: file.type,
        base64,
        objectType,
        objectId,
      });

      onChange(result.imageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload ảnh thất bại.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="grid gap-4 md:grid-cols-[160px_1fr] md:items-start">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {value ? (
            <img
              src={value}
              alt="Ảnh bìa"
              className="aspect-video w-full object-cover"
            />
          ) : (
            <div className="flex aspect-video items-center justify-center text-sm text-slate-400">
              Chưa có ảnh
            </div>
          )}
        </div>

        <div>
          <label className="inline-flex cursor-pointer rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700">
            {uploading ? "Đang upload..." : "Chọn ảnh bìa"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              disabled={uploading}
              className="hidden"
            />
          </label>

          <p className="mt-3 text-xs leading-5 text-slate-500">
            Hỗ trợ JPG, PNG, WEBP. Dung lượng tối đa 5MB. Ảnh sẽ được upload lên
            Google Drive và tự điền link hiển thị.
          </p>

          {error && (
            <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
              {error}
            </p>
          )}

          {value && (
            <p className="mt-3 break-all text-xs text-slate-500">
              Link ảnh: {value}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = String(reader.result || "");
      const base64 = result.includes(",") ? result.split(",")[1] : result;
      resolve(base64);
    };

    reader.onerror = () => {
      reject(new Error("Không đọc được file ảnh."));
    };

    reader.readAsDataURL(file);
  });
}
