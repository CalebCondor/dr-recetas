#!/usr/bin/env node
import https from "https";
import fs from "fs";
import path from "path";
function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (err) {
            reject(err);
          }
        });
      })
      .on("error", (err) => reject(err));
  });
}

async function run() {
  const url = process.env.DYNAMIC_SERVICES_URL ||
    "https://doctorrecetas.com/api/dynamic_services_es.json";

  const messagesPath = path.join(process.cwd(), "messages", "es.json");

  if (!fs.existsSync(messagesPath)) {
    console.error("messages/es.json not found at:", messagesPath);
    process.exit(2);
  }

  try {
    console.log("Fetching dynamic services from:", url);
    const remote = await fetchJson(url);
    const remoteServices = remote.DynamicServices || remote;

    const raw = fs.readFileSync(messagesPath, "utf8");
    const messages = JSON.parse(raw);
    const current = messages.DynamicServices || {};

    const same = JSON.stringify(current, Object.keys(current).sort()) === JSON.stringify(remoteServices, Object.keys(remoteServices).sort());

    if (same) {
      console.log("No cambios detectados en DynamicServices. No se actualizó el archivo.");
      return;
    }

    messages.DynamicServices = remoteServices;
    fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2) + "\n", "utf8");
    console.log("messages/es.json actualizado con los servicios dinámicos.");
  } catch (err) {
    console.error("Error sincronizando DynamicServices:", err);
    process.exit(1);
  }
}

run();
