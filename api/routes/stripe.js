const router = require("express").Router();
const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51OEykISEe8t9vYpZzTWMfd7lU3Y12xvhdxO7aM3ASAecGAyRrt92KIohHVMR0AxTUDMD7GsiaiGxwXw6SFcecCsM00XpLfYOKy"
);

router.post("/payment", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      payment_method_data: {
        type: "card",
        card: {
          token: req.body.tokenId,
        },
      },
      confirm: true,
      return_url: "https://www.google.com",
    });

    // If the payment intent is successful, return a success response
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    // Log the error for debugging
    console.error("Error processing payment:", error);

    // If there is an error, return an error response
    res.status(500).json({ error: "Failed to process payment" });
  }
});

module.exports = router;
