import express, { NextFunction, Request, Response } from "express";
import { router } from "./routes";
import { globalErrorHandler } from "./app/modules/middleware/globalErrorHandle";
import notFound from "./app/modules/middleware/notFound";
import cookieParser from "cookie-parser";



const app = express();

app.use(cookieParser())
app.use(express.json())


app.use("/api/v1", router)

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to tour management system"
    });
});

app.use(globalErrorHandler)

app.use(notFound)

export default app;