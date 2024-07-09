import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/auth/authSlice";
import configSlice from "../slices/config/configSlice";
import userSlice from "../slices/user/userSlice";

const initialLoadingState = localStorage.getItem("loading") === "true";

export default configureStore({
  reducer: {
    auth: authSlice,
    users: userSlice,
    config: configSlice,

    loading: (state = initialLoadingState, action) => {
      if (action.type.endsWith("/pending")) {
        localStorage.setItem("loading", "true");
        return true;
      } else if (
        action.type.endsWith("/fulfilled") ||
        action.type.endsWith("/rejected")
      ) {
        // Remove loading state from localStorage
        localStorage.removeItem("loading");
        return false;
      }
      return state;
    },
  },
});
