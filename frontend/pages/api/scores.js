// frontend/pages/api/scores.js
import { db } from "../../lib/firebase-admin";


export default async function handler(req, res) {
  const date = req.query.date;

  if (!date) return res.status(400).json({ error: "Missing date param" });

  try {
    const docRef = doc(db, "sessions", date);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      res.status(200).json(docSnap.data());
    } else {
      res.status(200).json({ satvik: 0, dhanvi: 0 });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
