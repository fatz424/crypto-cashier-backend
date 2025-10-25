import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: ["http://localhost:3001","http://localhost:3002","http://localhost:3003","http://127.0.0.1:3003"] }));
app.use(express.json());
app.get("/", (_req, res) => {
  res.json({ ok: true, service: "crypto-cashier-backend", time: new Date().toISOString() });
});

app.get("/portal/overview", (_req,res)=>res.json({revenue30d:12875.42,invoices:42,payouts:7,status:"active"}));
app.get("/portal/invoices", (_req,res)=>res.json([{id:"inv_1001",amount:125,currency:"USD",status:"paid",created:"2025-10-01"}]));
app.get("/portal/payouts", (_req,res)=>res.json([{id:"po_2001",amount:500,currency:"USD",status:"sent",date:"2025-10-05"}]));
app.get("/portal/settings", (_req,res)=>res.json({businessName:"EJG CoinTender",settlementCurrency:"USD",notificationsEmail:"owner@example.com"}));
app.put("/portal/settings", (req,res)=>res.json({ok:true,saved:req.body}));

app.listen(PORT, ()=>console.log(`API listening on http://localhost:${PORT}`));

