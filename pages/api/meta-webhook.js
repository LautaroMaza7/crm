import { saveLeadToFirebase } from "../../lib/firebase";

export default async function handler(req, res) {
  // Verificación del webhook de Meta (GET)
  if (req.method === "GET") {
    const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN;
    if (
      req.query["hub.mode"] === "subscribe" &&
      req.query["hub.verify_token"] === VERIFY_TOKEN
    ) {
      return res.status(200).send(req.query["hub.challenge"]);
    }
    return res.status(403).send("Forbidden");
  }

  // Recepción de leads (POST)
  if (req.method === "POST") {
    try {
      const leadData = req.body;
      await saveLeadToFirebase(leadData);
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: "Error al guardar el lead" });
    }
  }

  // Si el método no es GET ni POST
  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 