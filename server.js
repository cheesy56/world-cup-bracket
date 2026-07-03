const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const HOST = process.env.HOST || "0.0.0.0";
const PORT = Number(process.env.PORT || 3000);
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, "data");
const DATA_FILE = path.join(DATA_DIR, "scenarios.json");
const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_KEY =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  "";
const SUPABASE_TABLE = process.env.SUPABASE_TABLE || "scenarios";

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
      return sendJson(res, 200, await readScenarios());
    }

    if (pathname === "/api/scenarios" && req.method === "POST") {
      const payload = await readJsonBody(req);
      return sendJson(res, 201, await createScenario(payload));
    }

    if (pathname.startsWith("/api/scenarios/") && req.method === "DELETE") {
      const scenarioId = decodeURIComponent(pathname.slice("/api/scenarios/".length));
      await deleteScenario(scenarioId);
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
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});

function ensureStorage() {
  if (hasSupabaseConfig()) {
    return;
  }

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]", "utf8");
  }
}

async function readScenarios() {
  if (hasSupabaseConfig()) {
    const rows = await supabaseRequest(
      "GET",
      `/${SUPABASE_TABLE}?select=id,name,created_at,state&order=created_at.desc`
    );
    return rows.map(normalizeScenarioFromDatabase);
  }

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

async function createScenario(payload) {
  const winners = payload.winners && typeof payload.winners === "object" ? payload.winners : {};
  const name = String(payload.name || "").trim() || "竞猜方案";
  const savedAt = normalizeSavedAt(payload.savedAt);

  if (hasSupabaseConfig()) {
    return insertScenarioInSupabase({
      id: payload.id,
      name,
      savedAt,
      winners
    });
  }

  const scenarios = await readScenarios();
  const nextScenario = {
    id: payload.id || `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    name,
    savedAt,
    winners
  };
  scenarios.unshift(nextScenario);
  writeScenarios(scenarios);
  return nextScenario;
}

async function deleteScenario(scenarioId) {
  if (hasSupabaseConfig()) {
    await supabaseRequest("DELETE", `/${SUPABASE_TABLE}?id=eq.${encodeURIComponent(scenarioId)}`);
    return;
  }

  const scenarios = await readScenarios();
  const nextScenarios = scenarios.filter((scenario) => String(scenario.id) !== String(scenarioId));
  writeScenarios(nextScenarios);
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

function hasSupabaseConfig() {
  return Boolean(SUPABASE_URL && SUPABASE_KEY);
}

async function supabaseRequest(method, resourcePath, body, extraHeaders = {}) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1${resourcePath}`, {
    method,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      ...extraHeaders
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Supabase request failed: ${response.status} ${detail}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

async function insertScenarioInSupabase(payload) {
  const record = {
    name: payload.name,
    created_at: payload.savedAt,
    state: {
      winners: payload.winners
    }
  };

  try {
    const rows = await supabaseRequest(
      "POST",
      `/${SUPABASE_TABLE}`,
      record,
      {
        Prefer: "return=representation"
      }
    );
    return normalizeScenarioFromDatabase(rows[0]);
  } catch (error) {
    if (!shouldRetrySupabaseInsertWithId(error)) {
      throw error;
    }
  }

  const rows = await supabaseRequest(
    "POST",
    `/${SUPABASE_TABLE}`,
    {
      id: createSupabaseNumericId(payload.id),
      ...record
    },
    {
      Prefer: "return=representation"
    }
  );
  return normalizeScenarioFromDatabase(rows[0]);
}

function shouldRetrySupabaseInsertWithId(error) {
  return /null value in column "id"|violates not-null constraint|23502/i.test(error.message);
}

function createSupabaseNumericId(rawId) {
  const numericId = Number(rawId);
  if (Number.isSafeInteger(numericId) && numericId > 0) {
    return numericId;
  }

  return Date.now();
}

function normalizeSavedAt(value) {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? new Date().toISOString() : new Date(parsed).toISOString();
}

function normalizeScenarioFromDatabase(row) {
  const state = row.state && typeof row.state === "object" ? row.state : {};
  return {
    id: String(row.id),
    name: row.name || "竞猜方案",
    savedAt: row.created_at || new Date().toISOString(),
    winners: state.winners && typeof state.winners === "object" ? state.winners : {}
  };
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
