const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

// Load data from JSON file
const loadData = () => {
  try {
    const raw = fs.readFileSync("data.json");
    return JSON.parse(raw);
  } catch (err) {
    return []; // if file missing or broken
  }
};

// Save data to JSON file
const saveData = (data) => {
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
};

// In-memory copy (synced with file)
let data = loadData();

// GET all items
app.get("/data", (req, res) => {
  res.json(data);
});

// POST new item
app.post("/data", (req, res) => {
  const newItem = {
    id: uuidv4(),
    text: req.body.text
  };

  data.push(newItem);
  saveData(data);

  res.json(newItem);
});

// DELETE item
app.delete("/data/:id", (req, res) => {
  const id = req.params.id;

  data = data.filter(item => item.id !== id);
  saveData(data);

  res.json({ message: "Item deleted", id });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
