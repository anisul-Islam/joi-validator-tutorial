const express = require("express");

const userRouter = require("./routes/user");

const app = express();

const port = 3008;

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", userRouter);

app.get("/test", (req, res) => {
  res.json({ message: "testing" });
});
