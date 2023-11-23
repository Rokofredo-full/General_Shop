const mensajeError = document.getElementsByClassName("error")[0];

document.getElementById("login-form").addEventListener("submit",async (e)=>{
    e.preventDefault();
    const user = e.target.children.user.value;
    const password = e.target.children.password.value;
    //const confirmPassword = e.target.children.confirmPassword.value;
    //Agregar la confirmacion de la contrasena para que no genere error.
    const res = await fetch("/api/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            user,password
        })
    });
    if(!res.ok) return mensajeError.classList.toggle("escondido",false);
    const resJson = await res.json();
    if(resJson.redirect){
        window.location.href = resJson.redirect;
    }
})

