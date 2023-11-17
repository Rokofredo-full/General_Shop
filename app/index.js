import express from "express";
import cookieParser from "cookie-parser";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

//para __dirname
import path from 'path';
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { methods as authentication } from "./controllers/authentication.controller.js";

import { methods as authorization} from "./middlewares/authorization.js";

//Servidor
const app = express();
app.set ("port",80);
app.listen(app.get("port"));
console.log("Servidor corriendo en puerto",app.get("port"));  

//Configuración
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cookieParser());

//Rutas
app.get("/login",authorization.soloPublico,(req,res)=> res.sendFile(__dirname + "/pages/login.html"));

app.get("/register",authorization.soloPublico,(req,res)=> res.sendFile(__dirname + "/pages/register.html"));

app.get("/admin",authorization.soloAdmin,(req,res)=> res.sendFile(__dirname + "/pages/Admin/admin.html"));

app.post("/api/login", authentication.login);
app.post("/api/register", authentication.register);