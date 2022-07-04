/**
 * @param name name
 * @return String
 */
 function getParameterByName(name:string) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getLangPath(name:string){
    if (name=="es"){
        console.log("Spanish");
        return "/lang/es.json"
    }else if(name=="en"){
        console.log("English");
        return "/lang/en.json"
    }else{
        console.log("Default Languaje");
        return "/lang/es.json"
    }
}

function fillVars(){
    var nombre:string=getParameterByName("name");
    var correo:string=getParameterByName("mail");
//Nombre - email
    var input:any=document.getElementById("Nombre");
    if (nombre!=""){
        input.value=nombre;
        input.style.color="rgb(0,0,0)";
    };
    var input:any=document.getElementById("Email");
    if (correo!=""){
        input.value=correo;
        input.style.color="rgb(0,0,0)";
    };
    console.log("Taken variables from URL");
}

/**EJECUCIONES INMEDIATAS */
var tkn=getParameterByName("out");;
var lang=getLangPath(getParameterByName("lang"));
var tempdb="/tempbackend/tempdb.json";
var shortln=getParameterByName("lang")
if (shortln==""){
    shortln="es";
}
console.log("Languaje set:"+shortln);