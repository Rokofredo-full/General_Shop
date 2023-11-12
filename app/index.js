import express from "express";

import path from 'path';
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//Servidor

const app = express();
app.set ("port",4000);
app.listen(app.get("port"));
console.log("Servidor corriendo en puerto",(app.get("port")))  


//Configuración

app.use(express.static(__dirname + "/public"));





//Rutas
app.get("/LoginyRegistro",(req,res)=> res.sendFile(__dirname + "/pages/LoginyRegistro.html"))