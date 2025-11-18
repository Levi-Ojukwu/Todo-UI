/** @format */

"use client";

import { useState, useRef } from "react";
import { User, Loader2, Camera, ImagePlus } from "lucide-react";
import { updateProfile } from "@/lib/api"; // your existing update function
import { useAuth } from "@/lib/auth-context"; // to refresh user after update
import { Button } from "./ui/button";

interface ProfileHeaderProps {
	user: {
		id: string;
		name: string;
		email: string;
		imageUrl?: string;
	};
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [showModal, setShowModal] = useState(false);
	const { token, refreshUser } = useAuth(); // IMPORTANT

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		console.log("Image selected:", {
			name: file.name,
			size: file.size,
			type: file.type,
		});

		// Create preview URL
		const preview = URL.createObjectURL(file);
		setPreviewUrl(preview);
		setSelectedFile(file);
		setShowModal(true);
		setError("");
	};

	const handleConfirmUpload = async () => {
		if (!selectedFile || !token) {
			console.log("Upload validation failed:", {
				hasFile: !!selectedFile,
				hasToken: !!token,
			});
			return;
		}

		setLoading(true);
		try {
			console.log("[v0] Starting file upload...");
			const updates = { image: selectedFile };
			const response = await updateProfile(token, updates);

			console.log("[v0] Upload successful, response:", response);
			console.log("[v0] Refreshing user data...");

			await new Promise((resolve) => setTimeout(resolve, 500));

			await refreshUser();

			setSelectedFile(null);
			setPreviewUrl(null);
			setShowModal(false);
			console.log("[v0] Upload flow completed");
		} catch (err: any) {
			console.error("Upload error:", err);
			setError(err.message || "Failed to upload image");
		} finally {
			setLoading(false);
		}
	};

	const handleCancel = () => {
		setSelectedFile(null);
		setPreviewUrl(null);
		setShowModal(false);
		setError("");
	};

	return (
		<>
      <div className="flex items-end gap-3 p-6 bg-gradient-to-r from-primary/10 to-primary-light/10 rounded-2xl border border-border-light">
        {/* Profile Image Wrapper - Clickable */}
        <div
          className="relative w-24 h-24 rounded-full bg-gradient-to-br gradient-primary overflow-hidden flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity group"
          onClick={() => !loading && fileInputRef.current?.click()}
        >
          {user.imageUrl ? (
            <img
              src={user.imageUrl || "/placeholder.svg"}
              alt={user.name}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-9 h-9 text-gray-100"/>
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            {/* <Camera className="w-6 h-6 text-white" /> */}
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        {/* User Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-text">{user.name}</h2>
          <p className="text-text-muted">{user.email}</p>
        </div>
      </div>

      {showModal && previewUrl && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-2xl p-6 max-w-sm w-full border border-border-light shadow-lg">
            <h3 className="text-xl font-bold text-text mb-4">Confirm Image Upload</h3>

            {/* Preview Image */}
            <div className="mb-6 rounded-lg overflow-hidden border border-border-light">
              <img
                src={previewUrl || "/placeholder.svg"}
                alt="Preview"
                className="w-full h-64 object-cover"
              />
            </div>

            {error && (
              <div className="p-3 bg-error/10 text-error text-sm rounded-lg mb-4">
                {error}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleCancel}
                disabled={loading}
                className="flex-1 bg-surface-secondary border border-border-light text-text hover:bg-surface-secondary/80"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmUpload}
                disabled={loading}
                className="flex-1 gradient-primary text-white flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
	);
}
