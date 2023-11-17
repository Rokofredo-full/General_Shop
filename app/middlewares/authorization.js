import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { usuarios } from "./../controllers/authentication.controller.js";

dotenv.config();

function soloAdmin(req,res,next){
    const logueado = revisarCookie(req);
    if(logueado) return next();
    return res.redirect("/")
    
}

function soloPublico(req,res,next){
    const logueado = revisarCookie(req);
    if(logueado) return next();
    return res.redirect("/admin")
    
}

function revisarCookie (req){
    const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4);
    
    const codificada = jsonwebtoken.verify(cookieJWT,process.env.JWT_SECRET);

    console.log("COOKIE",cookieJWT);
    console.log(codificada)

    const usuarioARevisar = usuarios.find(usuario => usuario.user === codificada.user);
    console.log(usuarioARevisar)
    if (!usuarioARevisar){
        return false;
    }
    return true;
}

export const methods = {
    soloAdmin,
    soloPublico,

}