const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 3000;


app.use(bodyParser.json());
app.use(express.static("public"));


const loadData = () => {
  try {
    const raw = fs.readFileSync("data.json");
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
};


const saveData = (data) => {
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
};

let data = loadData();


app.get("/data", (req, res) => {
  res.json(data);
});


app.post("/data", (req, res) => {
  const newItem = {
    id: uuidv4(),
    text: req.body.text
  };

  data.push(newItem);
  saveData(data);

  res.json(newItem);
});


app.put("/data/:id", (req, res) => {
  const id = req.params.id;
  const newText = req.body.text;

  const item = data.find(item => item.id === id);
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  item.text = newText;
  saveData(data);

  res.json({ message: "Item updated", item });
});

app.delete("/data/:id", (req, res) => {
  const id = req.params.id;

  data = data.filter(item => item.id !== id);
  saveData(data);

  res.json({ message: "Item deleted", id });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
