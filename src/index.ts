import express from "express";
import { connectDB } from "./config/db";

process.loadEnvFile();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => console.log (`Servidor en http://localhost:${PORT}`));
    } catch (error) {
        console.error("No se pudo iniciar el servidor:", error);
        process.exit(1);
    }
};

start();