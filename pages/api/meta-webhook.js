import { saveLeadToFirebase } from "@/lib/firebase";

const VERIFY_TOKEN = "tucscrm2024";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Verificación de Meta
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    } else {
      return res.status(403).send("Token inválido");
    }
  }

  if (req.method === "POST") {
    const body = req.body;

    // Validar si es leadgen
    if (body.object === "page") {
      for (const entry of body.entry) {
        for (const change of entry.changes) {
          if (change.field === "leadgen") {
            // Guardar usando saveLeadToFirebase
            await saveLeadToFirebase({
              ...change.value,
              receivedAt: new Date().toISOString(),
              status: "pending"
            });
            console.log("Lead recibido y almacenado");
          }
        }
      }
      return res.status(200).send("EVENT_RECEIVED");
    }
    return res.status(404).send("No es un evento de leadgen");
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 