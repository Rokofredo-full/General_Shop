import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const usuarios = [{
    user: "Admin",
    email: "Admin@admin.co",
    password: "$2a$05$3G6kHUxreTcgRvkF6okhJOm9DnB1DmlusWSveHA63hiY5VKEmyll.",

    /*use: "Usu",
    email: "usu@usu.com",
    password:"u"*/
}]


async function login(req,res){
    console.log(req.body);

    const user = req.body.user;
    const password = req.body.password;
    if(!user || !password){
        return res.status(400).send({status:"Error",message:"Verificar los campos que esten completos."})
    }
    const usuarioARevisar = usuarios.find(usuario => usuario.user === user);
    if (!usuarioARevisar){
        return res.status(400).send({status:"Error",message:"Error durante el login."})
    }
    const loginCorrecto = await bcryptjs.compare(password,usuarioARevisar.password);
    if(!loginCorrecto){
        return res.status(400).send({status:"Error",message:"Error durante el login."})
    }
    const token = jsonwebtoken.sign(
        {user:usuarioARevisar.user},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRATION})

        const cookieOption = {
            expires: new Date(Date.now()+ process.env.JWT_COOKIE_EXPIRATION * 24 * 60 * 60 * 1000),
            path: "/"
        }
        res.cookie("jwt",token,cookieOption);
        res.send({status: "ok",message:"Usuario logeado",redirect:"/admin" })
}

async function register(req,res){
    console.log(req.body);

    const user = req.body.user;
    const email = req.body.email;
    const password = req.body.password;

    if(!user || !email || !password){
        return res.status(400).send({status:"Error",message:"Verificar los campos que esten completos."})
    }
    const usuarioARevisar = usuarios.find(usuario => usuario.user === user);
    if (usuarioARevisar){
        return res.status(400).send({status:"Error",message:"Este usuario ya existe."})
    }
    const salt = await bcryptjs.genSalt(5);
    const hashPassword = await bcryptjs.hash(password,salt);
    const nuevoUsuario = {
        user, email, password: hashPassword
    }
    console.log(nuevoUsuario);

    usuarios.push(usuarios);
    return res.status(201).send({status:"ok",message:`Usuarios ${nuevoUsuario.user} Agregado correctamente`,redirect:"/login"})
}


export const methods = {
    login,
    register
}