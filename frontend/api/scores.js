import { db } from "../lib/firebase-admin";

export default async function handler(req, res) {
  const date = req.query.date;

  if (!date) return res.status(400).json({ error: "Missing date param" });

  try {
    const docRef = db.collection("sessions").doc(date); // ✅ admin SDK style
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      res.status(200).json(docSnap.data());
    } else {
      res.status(200).json({ satvik: 0, dhanvi: 0 });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}