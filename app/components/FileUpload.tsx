"use client";

import { IKUpload } from "imagekitio-react";
import { useState } from "react";

interface FileUploadProps {
  onSuccess: (res: any) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState("upload");

  const validateFile = (file: File) => {
    if (fileType === "video" && !file.type.startsWith("video/")) {
      setError("Please upload a valid video file");
      return false;
    }
    if (file.size > 100 * 1024 * 1024) {
      setError("File size must be less than 100 MB");
      return false;
    }
    return true;
  };

  return (
    <>
      <IKUpload
        fileName={fileName}
        onChange={(e) => {
          const selected = e.target.files?.[0];
          if (selected) setFileName(selected.name);
        }}
        onUploadStart={() => {
          setUploading(true);
          setError(null);
        }}
        onError={(err) => {
          console.error("Upload failed", err);
          setError("Upload failed");
          setUploading(false);
        }}
        onSuccess={(res) => {
          onSuccess(res);
          setUploading(false);
        }}
        onUploadProgress={(evt) => {
          if (evt?.lengthComputable && onProgress) {
            const percent = (evt.loaded / evt.total) * 100;
            onProgress(Math.round(percent));
          }
        }}
        validateFile={(file) => validateFile(file)}
        accept={fileType === "video" ? "video/*" : "image/*"}
      />
      {uploading && <span>Loading....</span>}
      {error && <span className="text-error">{error}</span>}
    </>
  );
};

export default FileUpload;