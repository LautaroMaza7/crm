import { saveLeadToFirebase } from "@/lib/firebase";

const VERIFY_TOKEN = "tucscrm2024";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("Verificación exitosa de Meta Webhook");
      return res.status(200).send(challenge);
    } else {
      console.error("Token inválido en verificación");
      return res.status(403).send("Token inválido");
    }
  }

  if (req.method === "POST") {
    const body = req.body;
    console.log("POST recibido en webhook:", JSON.stringify(body, null, 2));

    if (body.object === "page") {
      for (const entry of body.entry) {
        for (const change of entry.changes) {
          if (change.field === "leadgen") {
            try {
              console.log("Intentando guardar lead:", JSON.stringify(change.value, null, 2));
              await saveLeadToFirebase({
                ...change.value,
                receivedAt: new Date().toISOString(),
                status: "pending"
              });
              console.log("Lead guardado correctamente en Firestore");
            } catch (error) {
              console.error("Error al guardar lead en Firestore:", error);
              return res.status(500).json({ error: "Error al guardar lead", details: error.message });
            }
          }
        }
      }
      return res.status(200).send("EVENT_RECEIVED");
    }
    console.warn("No es un evento de leadgen");
    return res.status(404).send("No es un evento de leadgen");
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 