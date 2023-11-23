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
app.get("/login",(req,res)=> res.sendFile(__dirname + "/pages/login.html"),authorization.soloPublico);

app.get("/register",(req,res)=> res.sendFile(__dirname + "/pages/register.html"),authorization.soloPublico);

app.get("/home",(req,res)=> res.sendFile(__dirname + "/pages/home.html"));

app.get("/admin",(req,res)=> res.sendFile(__dirname + "/pages/Admin/admin.html"),authorization.soloAdmin);

app.post("/api/login", authentication.login);
app.post("/api/register", authentication.register);