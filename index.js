const express = require("express");
require("./db/db");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const appointmentRoutes = require("./routes/appointment");
const appError = require("./errors/app_error");

const app = express();
const port = process.env.PORT || 3001;

const apiRouter = express.Router();

app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);


apiRouter.use("/auth", authRoutes);
apiRouter.use("/users", userRoutes);
apiRouter.use("/appointments", appointmentRoutes);

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


app.get("/", (req, res) => {
  res.send("Dr. Sohayb Alayoubi Scheduler Application");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
