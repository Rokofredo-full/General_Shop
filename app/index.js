import express from "express";

import path from 'path';
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { methods as authentication } from "./controllers/authentication.controller.js";

//Servidor
const app = express();
app.set ("port",80);
app.listen(app.get("port"));
console.log("Servidor corriendo en puerto",(app.get("port")))  


//Configuración
app.use(express.static(__dirname + "/public"));
app.use(express.json());

//Rutas
app.get("/login",(req,res)=> res.sendFile(__dirname + "/pages/login.html"))
app.get("/register",(req,res)=> res.sendFile(__dirname + "/pages/register.html"));
app.get("/admin",(req,res)=> res.sendFile(__dirname + "/pages/Admin/admin.html"));
app.post("/api/login", authentication.login);
app.post("/api/register", authentication.register);