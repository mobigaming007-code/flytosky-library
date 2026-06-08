"use client";

import { adminRequest } from "@/lib/adminClient";
import { useState } from "react";

type UploadPdfData = {
  fileId: string;
  fileName: string;
  pdfLink: string;
  pdfEmbedLink: string;
};

type PdfUploaderProps = {
  objectId?: string;
  onUploaded: (data: UploadPdfData) => void;
};

export default function PdfUploader({
  objectId,
  onUploaded,
}: PdfUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    if (file.type !== "application/pdf") {
      setError("Chỉ hỗ trợ file PDF.");
      event.target.value = "";
      return;
    }

    if (file.size > 1000 * 1024 * 1024) {
      setError("File PDF không nên vượt quá 1000MB.");
      event.target.value = "";
      return;
    }

    setUploading(true);

    try {
      const base64 = await fileToBase64(file);

      const data = await adminRequest<UploadPdfData>("adminUploadPdfFile", {
        fileName: file.name,
        mimeType: file.type,
        base64,
        objectId: objectId || "",
      });

      onUploaded(data);
      event.target.value = "";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không upload được PDF.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-slate-900">Upload PDF</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Hệ thống sẽ tự tạo PDF Link và PDF Embed Link từ Google Drive.
          </p>
        </div>

        <label className="cursor-pointer rounded-full bg-orange-500 px-5 py-2 text-sm font-bold text-white hover:bg-orange-600">
          {uploading ? "Đang upload..." : "Chọn PDF"}
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {error && (
        <div className="mt-3 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}
    </div>
  );
}

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = String(reader.result || "");
      const base64 = result.split(",")[1] || "";
      resolve(base64);
    };

    reader.onerror = () => reject(new Error("Không đọc được file PDF."));
    reader.readAsDataURL(file);
  });
}
