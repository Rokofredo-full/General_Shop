import bcryptjs from "bcryptjs";

const usuarios = [{
    user: "Admin",
    email: "Admin@admin.co",
    password: "a"
}]


async function login(req,res){

}

async function register(req,res){
    console.log(req.body)
    const user = req.body.user;
    const email = req.body.email;
    const password = req.body.password;
    if(!user || !email || !password){
        res.status(400).send({status:"Error",message:"Verificar los campos que esten completos."})
    }
    const userARevisar = usuarios.find(usuario => usuario.user === user);
    if (userARevisar) {
        res.status(400).send({status:"Error",message:"Este usuario ya existe."})
    }
    const salt = await bcryptjs.gensalt(5);
    const hashPassword = await bcryptjs.hash(password,salt);
    const newUser = {
        user, email, password: hashPassword
    }
    console.log(newUser),
    usuarios.push(newUser);
    res.status(201).send({status:"ok",message:`Usuarios ${newUser.user} Agregado correctamente`,redirec:"/"})
}


export const methods = {
    login,
    register
}