function readButton(nm:string){
    const newLi = document.createElement("li");
    const newA = document.createElement("a");
    newA.href="#";
    newA.onclick=function(){
        window.location.replace("/user/subpages/count-wr.html?lang="+shortln+"&out="+tkn+"&cc="+nm);
    };
    const currentLi = document.getElementById("mini");
    const aText = document.createTextNode(nm);
    newA.appendChild(aText);
    newLi.appendChild(newA);
    currentLi?.appendChild(newLi);
    console.log("readed button");
}

//READ CC
function setCC(){
    var req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const data=JSON.parse(this.response);
            
            for (let i=0;i<Object.keys(data["ccounts"]).length;i++){
                let cc=data["ccounts"][i][0];
                console.log(cc);
                readButton(cc);
            }
            /*for (let i=0;i<Object.keys(data["invests"]).length;i++){
                totalINV=totalINV+data["invests"][i][2];
            }*/
        }
    };

    req.open("GET","/userinfo",true);
    req.setRequestHeader("token", tkn);
    req.setRequestHeader("order","ccounts");
    req.send(null);
}
