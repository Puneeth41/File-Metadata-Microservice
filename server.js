const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.static("public"));

// ✅ Use memory storage
const upload = multer();

// Home
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// POST
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (!req.file) {
    return res.json({ error: "No file uploaded" });
  }

  res.json({
    name: req.file.originalname || "",
    type: req.file.mimetype || "",
    size: req.file.size || 0
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));