const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const morgan = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors({ origin: ["http://localhost:3000"], httpOnly: true }));

const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

app.use("/api/user", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api", taskRoutes);

mongoose
  .connect(process.env.DB_CONNECTION, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Server connected to mongodb.");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
