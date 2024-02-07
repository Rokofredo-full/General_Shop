import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

function soloAdmin(req,res,next){
    const logueado = revisarCookie(req);
    //si esta logueado accede a Admin
    if(logueado) return next();
    //si no esta logueado se redirije a login
    return res.redirect("/")
    
}

function soloPublico(req,res,next){
    const logueado = revisarCookie(req);
    //Si no esta logueado me accede a Home
    if(logueado) return next();
    //si esta logueado se dirije a Home o admin = que acceda al usuario que esta logueado
    return res.redirect("/admin")
    
}

function revisarCookie (req){
    try {
        const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4);
    
        const codificada = jsonwebtoken.verify(cookieJWT,process.env.JWT_SECRET);

        console.log("COOKIE",cookieJWT);
        console.log(codificada)

        const usuarioARevisar = usuarios.find(usuario => usuario.user === codificada.user);
        console.log(usuarioARevisar)
        if (!usuarioARevisar){
            return false
        }
        return true;
    }
    catch{
        return false;
    }
}

export const methods = {
    soloAdmin,
    soloPublico,

}