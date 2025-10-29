import "dotenv/config";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();

// CORS: allow your Netlify site in prod; allow any in dev
const FRONTEND_ORIGIN = "https://crypto-cashier.netlify.app";
const DEV = process.env.NODE_ENV !== "production";

const corsOpts = DEV
  ? { origin: true, credentials: false, methods: ["GET","POST","PUT","DELETE","OPTIONS"], allowedHeaders: ["Content-Type","Authorization"] }
  : { origin: FRONTEND_ORIGIN, credentials: false, methods: ["GET","POST","PUT","DELETE","OPTIONS"], allowedHeaders: ["Content-Type","Authorization"] };

app.use(cors(corsOpts));
app.options("*", cors(corsOpts));
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
app.use(express.json());

// Env
const PORT = Number(process.env.PORT || 4010);
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const DEMO_EMAIL = (process.env.DEMO_EMAIL || "admin@cashier.app").trim().toLowerCase();
const DEMO_PASSWORD_PLAIN = (process.env.DEMO_PASSWORD_PLAIN || "Password123!").trim();

console.log("AUTH ENV", { DEMO_EMAIL, PORT, JWT_SET: !!JWT_SECRET });

// Health + root
app.get("/", (_req, res) =>
  res.json({ ok: true, service: "crypto-cashier-backend", time: new Date().toISOString() })
);
app.get("/health", (_req, res) =>
  res.json({ ok: true, time: new Date().toISOString() })
);

// Auth guard
function authGuard(req, res, next) {
  try {
    const h = req.headers.authorization || "";
    const token = h.startsWith("Bearer ") ? h.slice(7) : null;
    if (!token) return res.status(401).json({ error: { message: "Unauthorized" } });
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (e) {
    console.error("AUTH GUARD ERROR:", e?.message);
    return res.status(401).json({ error: { message: "Unauthorized" } });
  }
}

// Login (demo creds)
app.post("/auth/login", (req, res) => {
  let { email, password } = req.body || {};
  email = (email || "").trim().toLowerCase();
  password = (password || "").trim();

  if (email === DEMO_EMAIL && password === DEMO_PASSWORD_PLAIN) {
    const token = jwt.sign({ sub: email, role: "admin" }, JWT_SECRET, { expiresIn: "1d" });
    return res.json({ token, user: { email, role: "admin" } });
  }
  return res.status(401).json({ error: { message: "Invalid credentials" } });
});

// Protected mocks
app.get("/auth/me", authGuard, (req, res) =>
  res.json({ user: { email: req.user.sub, role: "admin" } })
);

app.get("/portal/overview", authGuard, (_req, res) =>
  res.json({ revenue30d: 12875.42, invoices: 42, payouts: 7, status: "active" })
);

const __invoices = [];
app.get("/portal/invoices", authGuard, (_req, res) => res.json(__invoices));
app.post("/portal/invoices", authGuard, (req, res) => {
  const { amount = 0, note = "" } = req.body || {};
  const row = { id: Date.now(), amount: Number(amount) || 0, note: String(note || "") };
  __invoices.unshift(row);
  res.status(201).json(row);
});

app.get("/portal/payouts", authGuard, (_req, res) => res.json([]));
app.get("/portal/settings", authGuard, (_req, res) => res.json({ businessName: "Crypto Cashier", notifications: true }));
app.put("/portal/settings", authGuard, (req, res) => res.json({ ok: true, saved: req.body || {} }));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API listening on http://localhost:${PORT}`);
});