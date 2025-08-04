
import express, { Request, Response } from "express"
import { Server } from "http"
import mongoose from "mongoose"
import app from "./app";
import { seedSuperAdmin } from "./uitiles/seedSuperAdmin";

let server: Server;


const startServer = async () => {
    try {
        await mongoose.connect("mongodb+srv://JunaidRahman:DNS2bnld2TkJQkqU@cluster0.hturdn4.mongodb.net/tour-management-backend?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Connect to DB")
        server = app.listen(5000, () => {
            console.log("Server is Listning to port 5000")
        })

    } catch (error) {
        console.log(error)

    }

}
(async () => {
    await startServer()
    await seedSuperAdmin()
})()

process.on("unhandledRejection", () => {
    console.log("Unhandle Rejection setected... Server shutting down");

    if (server) {
        server.close(() => {
            process.exit(1);
        });

    }
    process.exit(1)
})

// Promise.reject(new Error("I forgot to catch this pormise"))

