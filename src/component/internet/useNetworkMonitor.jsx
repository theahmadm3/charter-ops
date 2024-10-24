import { useEffect } from "react";
import {
  handleConnectionChange,
  checkConnectionQuality,
} from "./internetStatus";

const useNetworkMonitor = () => {
  useEffect(() => {
    // Set up network monitoring
    const setupNetworkMonitor = () => {
      // Listen for changes in online/offline status
      window.addEventListener("online", handleConnectionChange);
      window.addEventListener("offline", handleConnectionChange);

      // Check connection quality periodically (e.g., every 30 seconds)
      const intervalId = setInterval(checkConnectionQuality, 30000);

      // Initial checks
      handleConnectionChange();
      checkConnectionQuality();

      // Clean up event listeners and interval
      return () => {
        window.removeEventListener("online", handleConnectionChange);
        window.removeEventListener("offline", handleConnectionChange);
        clearInterval(intervalId);
      };
    };

    setupNetworkMonitor();
  }, []);
};

export default useNetworkMonitor;
