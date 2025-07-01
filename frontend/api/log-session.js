// frontend/pages/api/log-session.js
import { db } from "./firebase-admin"; // ✅ Correct: use admin SDK

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { user, seconds } = req.body;
  const today = new Date().toISOString().split("T")[0];

  const docRef = db.collection("sessions").doc(today);

  try {
    const docSnap = await docRef.get();
    let data = { satvik: 0, dhanvi: 0 };

    if (docSnap.exists) data = docSnap.data();

    data[user] = (data[user] || 0) + seconds;
    await docRef.set(data);

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
