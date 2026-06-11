const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", require("./routes/users"));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend API Running Successfully"
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});