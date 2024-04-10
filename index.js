const express = require("express");
require("./db/db");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const routes = require("./routes/routes");
const appError = require("./errors/app_error");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/api", routes);

app.use(function (err, req, res, next) {
  console.error(err);
  res.setHeader("Content-Type", "application/json");
  if (err instanceof appError.AppError) {
    res.status(err.statusCode).send(err);
    return;
  }
  res
    .status(500)
    .send(new appError.AppError(`internal server error: ${err.message}`, 500));
});

// Define routes
app.get("/", (req, res) => {
  res.send("Dr. Sohayb Alayoubi Scheduler Application");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
