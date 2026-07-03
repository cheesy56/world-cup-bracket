const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const HOST = process.env.HOST || "0.0.0.0";
const PORT = Number(process.env.PORT || 3000);
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, "data");
const DATA_FILE = path.join(DATA_DIR, "scenarios.json");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

ensureStorage();

const server = http.createServer(async (req, res) => {
  try {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    const pathname = parsedUrl.pathname;

    if (pathname === "/api/scenarios" && req.method === "GET") {
      return sendJson(res, 200, readScenarios());
    }

    if (pathname === "/api/scenarios" && req.method === "POST") {
      const payload = await readJsonBody(req);
      const scenarios = readScenarios();
      const nextScenario = {
        id: payload.id || `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
        name: String(payload.name || "").trim() || `竞猜方案 ${scenarios.length + 1}`,
        savedAt: payload.savedAt || new Date().toISOString(),
        winners: payload.winners && typeof payload.winners === "object" ? payload.winners : {}
      };
      scenarios.unshift(nextScenario);
      writeScenarios(scenarios);
      return sendJson(res, 201, nextScenario);
    }

    if (pathname.startsWith("/api/scenarios/") && req.method === "DELETE") {
      const scenarioId = decodeURIComponent(pathname.slice("/api/scenarios/".length));
      const scenarios = readScenarios();
      const nextScenarios = scenarios.filter((scenario) => scenario.id !== scenarioId);
      writeScenarios(nextScenarios);
      return sendJson(res, 200, { ok: true });
    }

    if (req.method === "GET") {
      return serveStatic(pathname, res);
    }

    sendJson(res, 405, { error: "Method Not Allowed" });
  } catch (error) {
    sendJson(res, 500, { error: "Server Error", detail: error.message });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});

function ensureStorage() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]", "utf8");
  }
}

function readScenarios() {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function writeScenarios(scenarios) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(scenarios, null, 2), "utf8");
}

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "Cache-Control": "no-store"
  });
  res.end(body);
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 1_000_000) {
        reject(new Error("Payload too large"));
      }
    });
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (error) {
        reject(new Error("Invalid JSON body"));
      }
    });
    req.on("error", reject);
  });
}

function serveStatic(pathname, res) {
  const safePath = pathname === "/" ? "/index.html" : pathname;
  const normalized = path.normalize(safePath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(ROOT, normalized);

  if (!filePath.startsWith(ROOT)) {
    return sendJson(res, 403, { error: "Forbidden" });
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not Found");
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": MIME_TYPES[extension] || "application/octet-stream",
      "Cache-Control": extension === ".html" ? "no-cache" : "public, max-age=300"
    });
    res.end(content);
  });
}
