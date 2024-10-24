// internetStatus.js

import { toast } from "react-toastify";

// Function to handle online/offline status
export const handleConnectionChange = () => {
  if (navigator.onLine) {
    toast.success("Connected to the internet", { position: "bottom-right" });
  } else {
    toast.error("No internet connection", { position: "bottom-right" });
  }
};

// Function to check internet connection quality
export const checkConnectionQuality = () => {
  const img = new Image();
  const startTime = new Date().getTime();

  img.src = "https://www.google.com/images/phd/px.gif?t=" + startTime;
  img.onload = () => {
    const endTime = new Date().getTime();
    const duration = endTime - startTime;

    if (duration > 3000) {
      toast.warn("Poor internet connection", { position: "bottom-right" });
    }
  };

  img.onerror = () => {
    toast.error("Unable to check connection quality", {
      position: "bottom-right",
    });
  };
};
