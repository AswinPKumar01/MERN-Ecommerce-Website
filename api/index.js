const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");
const bcrypt = require("bcryptjs");

dotenv.config();

app.use(
  cors({
    origin: ["https://quintech-ecommerce.vercel.app/"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

mongoose
  .connect(
    "mongodb+srv://aswinpkumar03:W3LwrfhgcCXv99mL@cluster0.aly6ghh.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "Cluster0",
    }
  )
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => {
    console.error("DB Connection Error:", err);
  });

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend Server is running!");
});
