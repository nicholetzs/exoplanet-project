import express from "express";
import cors from "cors";
import { PrismaClient } from "../generated/prisma/index.js";
import exoplanetsRouter from "./routes/exoplanets.js";

const app = express();
const prisma = new PrismaClient();
const PORT = 3001;

app.use(
  cors(
    "http://localhost:5173" // Permitir acesso do frontend
  )
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/exoplanets", exoplanetsRouter);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Exoplanet API is running!" });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

export { prisma };
