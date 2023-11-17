function soloAdmin(req,res,next){
    const cookieJWT = req.headers.cookie;
    console.log("COOKIE",cookieJWT)
}

function soloPublico(req,res,next){
    
}

export const methods = {
    soloAdmin,
    soloPublico,

}