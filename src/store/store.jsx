import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/auth/authSlice";
import configSlice from "../slices/config/configSlice";
import userSlice from "../slices/user/userSlice";
import clientSlice from "../slices/client/clientSlice";
import aircraftSlice from "../slices/aircraft/aircraftSlice";
import bookingSlice from "../slices/booking/bookingSlice";
import fuelSlice from "../slices/fuel/fuelSlice";
import contactSlice from "../slices/contact/contactSlice";
import maintenanceSlice from "../slices/maintenance/maintenanceSlice";
import amoSlice from "../slices/amo/amoSlice";
import reportingSlice from "../slices/reporting/reportingSlice";

const initialLoadingState = localStorage.getItem("loading") === "true";

const store = configureStore({
  reducer: {
    auth: authSlice,
    users: userSlice,
    config: configSlice,
    client: clientSlice,
    aircraft: aircraftSlice,
    booking: bookingSlice,
    fuel: fuelSlice,
    contacts: contactSlice,
    maintenance: maintenanceSlice,
    amo: amoSlice,
    reporting: reportingSlice,

    loading: (state = initialLoadingState, action) => {
      if (action.type.endsWith("/pending")) {
        sessionStorage.setItem("loading", "true");
        return true;
      } else if (
        action.type.endsWith("/fulfilled") ||
        action.type.endsWith("/rejected")
      ) {
        // Remove loading state from localStorage
        sessionStorage.removeItem("loading");
        return false;
      }
      return state;
    },
  },
});

export default store;
