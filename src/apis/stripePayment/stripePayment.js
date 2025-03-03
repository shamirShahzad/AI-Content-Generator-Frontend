import axios from "axios";
//Free payment

export const handleFreeSubscriptionAPI = async () => {
  const response = await axios.post(
    "http://localhost:5000/api/v1/stripe/free-plan",
    {},
    {
      withCredentials: true,
    }
  );
  return response?.data;
};

export const createStripePaymentIntentAPI = async ({ plan, amount }) => {
  console.log({ plan, amount });
  const response = await axios.post(
    "http://localhost:5000/api/v1/stripe/checkout",
    { subscriptionPlan: plan, amount: Number(amount) },
    {
      withCredentials: true,
    }
  );
  return response?.data;
};

export const verifyStripePaymentAPI = async (paymentIntentID) => {
  console.log("PAYMENT INTENT ID", paymentIntentID);
  const response = await axios.post(
    `http://localhost:5000/api/v1/stripe/verify-payment/${paymentIntentID}`,
    {},
    {
      withCredentials: true,
    }
  );
  return response?.data;
};
