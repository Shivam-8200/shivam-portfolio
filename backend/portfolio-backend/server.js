import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8787;
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "http://localhost:3000").split(",");

app.use(express.json());
app.use(
  cors({
    origin: ALLOWED_ORIGINS,
  })
);

// Simple in-memory rate limit: max 5 contact requests per IP per 15 minutes
const rateLimitMap = new Map();
function rateLimit(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const entry = rateLimitMap.get(ip) || { count: 0, start: now };

  if (now - entry.start > windowMs) {
    entry.count = 0;
    entry.start = now;
  }
  entry.count += 1;
  rateLimitMap.set(ip, entry);

  if (entry.count > 5) {
    return res.status(429).json({ error: "Too many requests. Try again later." });
  }
  next();
}

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/api/contact", rateLimit, async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "name, email, and message are required." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message.replace(/\n/g, "<br/>")}</p>`,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({ error: "Failed to send message. Try again shortly." });
  }
});

app.listen(PORT, () => {
  console.log(`Contact API running on http://localhost:${PORT}`);
});
