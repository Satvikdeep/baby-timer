const express = require("express");
const cors = require("cors");
const db = require("./firebase");
const admin = require("firebase-admin");

const app = express();
app.use(cors());
app.use(express.json());

// POST: log focus time
app.post("/api/log-session", async (req, res) => {
  const { user, seconds } = req.body;
  const today = new Date().toISOString().split("T")[0];

  const docRef = db.collection("sessions").doc(today);
  const doc = await docRef.get();
  let data = { satvik: 0, dhanvi: 0 };
  if (doc.exists) data = doc.data();

  data[user] = (data[user] || 0) + seconds;
  await docRef.set(data);

  res.send({ success: true });
});

// GET: scores for a day
app.get("/api/scores/:date", async (req, res) => {
  const date = req.params.date;
  const doc = await db.collection("sessions").doc(date).get();
  res.send(doc.exists ? doc.data() : { satvik: 0, dhanvi: 0 });
});

app.listen(3001, () => console.log("Backend running on http://localhost:3001"));
