import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
//usuarios
export const usuarios = [{
//Este usuario deberia entrar a admin 
    user: "Admin",
    email: "Admin@admin.co",
    password: "$2a$05$3G6kHUxreTcgRvkF6okhJOm9DnB1DmlusWSveHA63hiY5VKEmyll.",
    confirmPassword: "$2a$05$3G6kHUxreTcgRvkF6okhJOm9DnB1DmlusWSveHA63hiY5VKEmyll.",
//Estos dos usuarios dentran al Home
    user: 'Sara',
    lastname: 'Flores',
    email: 'sara@gmail.com',
    select: '2',
    password: '$2a$05$ZDQKBxkfy3tzgxvJdawflO6vj71IoIvQxFSSQRbXFtUu0UjtRhnfO',
    confirmPassword: '$2a$05$ZDQKBxkfy3tzgxvJdawflO6vj71IoIvQxFSSQRbXFtUu0UjtRhnfO',

    user: 'Andres',
    lastname: 'Mora',
    email: 'a@g.com',
    select: '4',
    password: '$2a$05$Q5pAfLlaXa63/W8w1wZHSOpZIZkjl29B2SgbVcj3j9nIqQmcQYU9m',
    confirmPassword: '$2a$05$Q5pAfLlaXa63/W8w1wZHSOpZIZkjl29B2SgbVcj3j9nIqQmcQYU9m',
}]


async function login(req,res){
    console.log(req.body);

    const user = req.body.user;
    const password = req.body.password;

    //No es necesario la confirmacion de la contrasena para ingresar, de ser asi activar =

    //const confirmPassword = req.body.confirmPassword;

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
        //Aqui es donde se direcciona despues de ingresar. por ahora solo esta direccionando a Home si eres user.
        res.send({status: "ok",message:"Usuario logeado",redirect:"/home" })
}

async function register(req,res){
    console.log(req.body);

    const user = req.body.user;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const select = req.body.select;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if(!user || !lastname || !email || !select || !password|| !confirmPassword ){
        return res.status(400).send({status:"Error",message:"Verificar los campos que esten completos."})
    }

    //Agregar mas identificadores para que no alla clonacion de usuarios.
    const usuarioARevisar = usuarios.find(usuario => usuario.user === user);
    if (usuarioARevisar){
        return res.status(400).send({status:"Error",message:"Este usuario ya existe."})
    }
    const salt = await bcryptjs.genSalt(5);
    const hashPassword = await bcryptjs.hash(password,salt);

    //No esta generando la incriptacion de la contrasen a pero si la de la confrimacion.

    const nuevoUsuario = {
        user,lastname, email, select, password, confirmPassword: hashPassword
    }
    console.log(nuevoUsuario);

    usuarios.push(usuarios);
    return res.status(201).send({status:"ok",message:`Usuarios ${nuevoUsuario.user} Agregado correctamente`,redirect:"/home"})
}


export const methods = {
    login,
    register
}