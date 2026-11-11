import express from "express";
import { connectDB } from "./config/db";
import bookRoutes from "./routes/book.routes";

process.loadEnvFile();

const app = express();
app.use(express.json());
app.use("/books", bookRoutes);

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