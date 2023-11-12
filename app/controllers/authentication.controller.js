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
}

export const methods = {
    login,
    register
}