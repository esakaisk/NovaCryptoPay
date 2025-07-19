const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const paymentRoutes = require("./routes/payment");
app.use("/api/payment", paymentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`NovaCryptoPay running on port ${PORT}`));
