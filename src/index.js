import React from "react";
import ReactDOM from "react-dom/client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./AuthContext/AuthContext";

//Stripe Configuration
const stripePromise = loadStripe(
  "pk_test_51QwOa7GCufCFTds8yUyfoaDFphyYdwjCbZESa3lAjpeDCDjPETLwAHYsuP7wgVpJaIMbtVM3CI8vuLKpbKzFfrMr00hgIgyl9q"
);

const options = {
  mode: "payment",
  currency: "usd",
  amount: 9999,
};

const root = ReactDOM.createRoot(document.getElementById("root"));

// React Query Client

const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Elements stripe={stripePromise} options={options}>
          <App />
        </Elements>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
