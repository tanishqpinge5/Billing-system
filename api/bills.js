
import { getDb } from "./db.js";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  try {
    const db = await getDb();
    const bills = db.collection("bills");

    if (req.method === "GET") {
      const data = await bills
        .find({}, { projection: { _id: 0 } })
        .sort({ createdAt: -1 })
        .limit(500)
        .toArray();

      return res.status(200).json({ bills: data });
    }

    if (req.method === "POST") {
      const bill = req.body;

      if (!bill || !Array.isArray(bill.rows) ||
          bill.rows.length === 0 || bill.rows.length > 100) {
        return res.status(400).json({ error: "Invalid bill data" });
      }

      const id = Number(bill.id);

      if (!Number.isSafeInteger(id) || id <= 0) {
        return res.status(400).json({ error: "Invalid bill ID" });
      }

      const clean = {
        ...bill,
        id,
        createdAt: new Date()
      };

      await bills.updateOne(
        { id },
        { $set: clean },
        { upsert: true }
      );

      return res.status(200).json({ bill: clean });
    }

    if (req.method === "DELETE") {
      const id = Number(req.query?.id);

      if (!Number.isSafeInteger(id) || id <= 0) {
        return res.status(400).json({ error: "Invalid bill ID" });
      }

      await bills.deleteOne({ id });

      return res.status(200).json({ deleted: true });
    }

    res.setHeader("Allow", "GET, POST, DELETE");
    return res.status(405).json({ error: "Method not allowed" });

  } catch (error) {
    console.error("Bills API error:", error);

    return res.status(500).json({
      error: "Database error. Check Vercel logs and MongoDB network access."
    });
  }
}
