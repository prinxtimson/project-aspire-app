import { configureStore } from "@reduxjs/toolkit";
import auth from "./features/auth/authSlice";
import booking from "./features/booking/bookingSlice";
import feedback from "./features/feedback/feedbackSlice";
import analytics from "./features/analytics/analyticsSlice";
import content from "./features/content/contentSlice";
import entertainment from "./features/entertainment/entertainmentSlice";
import fashion from "./features/fashion/fashionSlice";
import food from "./features/food/foodSlice";
import health from "./features/health/healthSlice";
import sport from "./features/sport/sportSlice";
import subscription from "./features/plan/planSlice";
import report from "./features/report/reportSlice";

export const store = configureStore({
    reducer: {
        auth,
        booking,
        feedback,
        analytics,
        content,
        entertainment,
        fashion,
        food,
        health,
        sport,
        report,
        subscription,
    },
});
