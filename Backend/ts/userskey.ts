 var randToken:string="";

function createOUT(userId:string){
    for (let i=0;i<=9;i++){
        let letter=String.fromCharCode(Math.random() * (65 - 122) + 122);
        randToken=randToken+letter;
        localStorage.setItem(randToken,userId);
    }
    var obj:any =localStorage.getItem(randToken);
    return 0;
}

$.getJSON("../json/users.json",(data: any) => {
    var input:any=document.getElementById("test");
    input.appendChild(document.createTextNode(data));
});