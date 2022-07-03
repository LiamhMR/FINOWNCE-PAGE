var OUT:any;
var NICK:any;
function getOUT(){
    OUT=getParameterByName("out");
}

function checkLogin(user:string,pass:string,shortln:string){
    var inputUser:any=document.getElementById(user);
    var inputPass:any=document.getElementById(pass);

    var req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            window.location.replace("../user/summary.html?out="+this.responseText+"&lang="+shortln);
       }
    };

    req.open("GET","/userload",true);
    req.setRequestHeader("user", inputUser.value);
    req.setRequestHeader("pass", inputPass.value);
    req.send(null);
}
