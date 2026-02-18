require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

const app = express();

app.use(cors({
  origin: "*",
}));

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
