// GET, POST, DELETE, PUT

const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello asadbook-dev!");
  //   res.json({ message: "Hello asadbook-dev" });
});

app.post("/", (req, res) => {
  console.log(req.body);
  const { firstName, lastName } = req.body;
  const message = `His full name - ${firstName} ${lastName}`;
  res.send(message);
});

app.delete("/:id", (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  res.send(id);
});

app.put("/:id", (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({ id, body });
});

const PORT = 8080;

app.listen(PORT, () => console.log(`Listening on - http://localhost:${PORT} `));
