const express = require("express");
const routes = require("./routes/routes");
const db = require("./db");
const appError = require("./errors/app_error");

const app = express();
const port = 8080; // or any port you prefer

app.use(express.json());
app.use("/api", routes);

// Middleware to set content type to JSON for all routes
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

app.use(function (err, req, res, next) {
  console.error(err);
  res.setHeader("Content-Type", "application/json");
  if (err instanceof appError.AppError) {
    res.status(err.statusCode).send(JSON.stringify(err));
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
