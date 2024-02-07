import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { getConnection } from "../dataBase/dataBase.js";

dotenv.config();
//usuarios


async function login(req,res){
    console.log(req.body);

    const email = req.body.email;
    const password = req.body.password;

    //No es necesario la confirmacion de la contrasena para ingresar, de ser asi activar = const confirmPassword = req.body.confirmPassword;

    if(!email || !password){
        return res.status(400).send({status:"Error",message:"Verificar que los campos esten completos."});
    }

    //Conexion
    const connection = await getConnection();
    
    const userQuery = await connection.query("SELECT * FROM user WHERE email = ?", email, async (error, results)=>{
      if (error){
        return res.status(500).send({status: "Error",message: "Error de acceso."});
      }

      if (results.length === 0){
        return res.status(400).send({status: "Error", message: "No encontramos tú informacion"});
      }
    });
      const usuarioARevisar = userQuery[0][0];

      const loginCorrecto = await bcryptjs.compare(password, usuarioARevisar.password);
      if (!loginCorrecto){
        return res.status(400).send({status: "Error", message: "La informacion ingresada es incorrecta!"})
      }
      //Token
      const token = jsonwebtoken.sign(
        {user: usuarioARevisar.email}, 
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRATION}
      );

      const cookieOption = {
        expires: new Date (Date.now() + process.env.JWT_COOKIE_EXPIRATION *24 *60 *60 *1000),
        path: "/"
      }
      res.cookie("jwt",token,cookieOption);
    
    //Aqui es donde se direcciona despues de ingresar. por ahora solo esta direccionando a Home si eres user.
      res.send({status: "Ok", message: "Usuario logeado con exito!", redirect: "/homeI.html"});
    
    }

async function register(req, res) {
    try {
      const connection = await getConnection();
      const user = req.body.user;
      const lastname = req.body.lastname;
      const email = req.body.email;
      const select = req.body.select;
      const numDoc = req.body.numDoc;
      const password = req.body.password;

      if (
        !user ||
        !lastname ||
        !email ||
        !select ||
        !numDoc ||
        !password 
      ) {
        return res
          .status(400)
          .send({ status: 400, message: "Los" });
      }
   
      const salt = await bcryptjs.genSalt(5);
      const hashPassword = await bcryptjs.hash(password, salt);
   
      const usuario = {
        id_rol: 2,
        nom_User: user,
        apell_User :lastname,
        tipo_Documento: select,
        num_Documento: numDoc,
        email: email,
        password: hashPassword,
      };
   
      const result = await connection.query("INSERT INTO user SET ?", usuario);
   
       //Aqui es donde se direcciona despues de registrase. por ahora solo esta direccionando a Home si eres user.
      return res.status(201).send({
        status: "Ok",
        message: `Usuario agregado`,
        redirect: "./homeI.html",
      });
    } catch (error) {
      console.error(error);
      if (
        error &&
        error.code === "ER_DUP_ENTRY" &&
        error.sqlMessage.includes("email")
      ) {
        return res.status(400).json({ message: "El correo ya está en uso" });
      } else {
        return res
          .status(500)
          .send({ status: "Error", message: "Error en el servidor" });
      }
    }
  }

export const methods = {
    login,
    register
}