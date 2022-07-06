import { nextTick } from 'process';
import * as jQuery from "../js/jquery-3.1.1.min"
import express from 'express'
import * as data from "../json/tusers.json";
import * as db from "../json/tdb.json";
import internal from 'stream';
import { json } from 'stream/consumers';
import { stringify } from 'querystring';
import { getSystemErrorMap } from 'util';
import { symbolName } from 'typescript';
import { Console } from 'console';

const fs=require('fs');
const path = require('path');
const jssub="../";

//const express = require('express')
const app = express();
app.use(express.json());
app.use(errorHandler);
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, jssub+'../../FrontEnd')));


//>>>>>>>>>> GET <<<<<<<<<<<<<<<<
//400 - DATOS INCOMPLETOS
//401 - DATOS INCORRECTOS
//200 - MATCH DE DATOS 
//provide right data inputs
const requireUser = () => {
    return (req:any, res:any, next:any) => {
      let usernick:string=req.headers['user'];
      let password:string=req.headers['pass'];
      if ((usernick==undefined)||(password==undefined)){
        res.status(400).send("Require user and password")
      }else{
        let dataUser:any;
        let dataPass:any;
        let entries:any
        try{
        dataUser=(data.allUsers["users"][usernick][2]);
        dataPass=data.allUsers["users"][usernick][1];
        entries=data.allUsers["users"][usernick][3];
        }catch(error){
          res.status(401).send("Invalid input");
        }
        if ((dataUser==true)&&(dataPass==password)){
          data.allUsers["users"][usernick][3]=entries+1;
          data.allUsers["users"][usernick][0]=createOUT();
          data.allUsers["users"][usernick][4]=getLastLog();
          data.allUsers.logs[getLastLog()]=usernick;
          updateData();
          next();
        }else{
          res.status(401).send("Invalid input");
        }
      }
    }
}

//400 ->token no coincide
//401 ->usuario no coincide
const requireOUT=()=>{
  return(req:any,res:any,next:any)=>{
    let token=req.headers["token"].split("_");
    let code=token[0];
    let ln=token[1];
    let nick=data.allUsers.logs[ln];
    try{
    if(data.allUsers["users"][nick][0]==code){
      next();
    }else{
      console.log("Missmatched token");
      res.status(400).send("Invalid token");
    }
    }catch(error){
      console.log("Invalid user");
      res.status(401).send("Invalid user");
    }
  }
}

//GET
//400 ->missmatched keys
const requireInfo=()=>{
  return(req:any,res:any,next:any)=>{
    let ln=(req.headers["token"]).split("_")[1];
    let user=data.allUsers.logs[ln];
    let order=req.headers["order"];
    //console.log(user);
    if ((user==undefined)||(order==undefined)){
      res.status(400).send("missed keys");
    }else{
      next();
    }
  }
}

function order(user:any,order:any,lmt?:any){
  if (order=="info"){
    //lmt = "name" | "rut" | "mail"
    return db.db[user][order][lmt];
  }else if((order=="ccounts")||(order=="invests")){
    return db.db[user][order];
  }
}

//MVC-test
app.get('/',(req:any,res:any,next:any)=>{
  //res.sendFile(path.join(__dirname,jssub+'../../FrontEnd/home/home.html'));
  console.log("Captured get /");
  //res.sendFile("../home/home.html");
});


//SESION LOGIN
app.get('/userload', requireUser(),(req:any, res:any, next:any) => {
  res.status(200).send(data.allUsers["users"][req.headers["user"]][0]+"_"+data.allUsers.users[req.headers["user"]][4]);
  //res.sendFile(path.join(__dirname,jssub+'../../FrontEnd/user/summary.html'));
  console.log("Capture login:"+req.headers["user"]);
});
//GET USER INFO
app.get('/userinfo',requireOUT(),requireInfo(),(req:any,res:any,next:any)=>{
  console.log("matched token & info");
  let ln=(req.headers["token"]).split("_")[1];
  let user=data.allUsers.logs[ln];
  res.status(200).send(db.db[user]);
});
//LOAD USER NICK~~ UNUSED ()
app.get("/usernick",requireOUT(),(req:any,res:any,next:any)=>{
  console.log("matched token");
  let token=req.headers["token"].split("_");
  let ln=token[1];
  let nick=data.allUsers.logs[ln];
  res.status(200).send(nick);
});

//LOAD USER DATA
app.get("/userdata",requireOUT(),requireInfo(),(req:any,res:any)=>{
  console.log("matched token");
  res.send(order(req.headers["user"],req.headers["order"]));
});

function errorHandler(err:any,req:any,res:any,any,next:any){
  res.status(500);
  res.render('error',{error: err});
}

//Generate a random string
function createOUT(){
  let randToken="";
  for (let i=0;i<=9;i++){
      let randnum=Math.random() * (65 - 122) + 122;
      if (randnum==95 || randnum==96){
        randnum=randnum-4;
      }
      let letter=String.fromCharCode(randnum);
      randToken=randToken+letter;
  }
  return randToken;
}

function getLastLog(){
  let last=Object.keys(data.allUsers.logs).length;
  return last;
}

//>>>>>>>>>>>>>>>>> POST <<<<<<<<<<<<<<<<<<<
//402 -> Datos incompletos
//401 -> Usuario en uso
//402 -> Mail en uso
const requirelmnts=()=>{
  return(req:any,res:any,next:any)=>{
    let name=req.headers["name"];
    let rut=req.headers["rut"];
    let mail=req.headers["mail"];
    let usernick=req.headers["user"];
    let password=req.headers["pass"];
    if ((name==undefined)||(rut==undefined)||(mail==undefined)||(usernick==undefined)||(password==undefined)){
      res.status(400).send("incomplete");
    }else{
        let existnick=db.db[usernick];
        let existmail=db.db["mails"][mail];
        if (existnick!=undefined){
          res.status(401).send("Nick in use");
        }else if(existmail!=undefined){
          res.status(402).send("mail in use");
        }else{
          next();
        };
    }
  }
}

function addUser(req:any){
  let name=req.headers["name"];
  let rut=req.headers["rut"];
  let mail=req.headers["mail"];
  let usernick=req.headers["user"];
  let password=req.headers["pass"];
  let objinfo=
  `{
    "info":{
      "name":"${name}",
      "rut":"${rut}",
      "mail":"${mail}"
    },
    "ccounts":[],
    "invests":[]
    }`;
  //let objuser=`["${createOUT()}","${password}",true,0]`;
  let objuser=[createOUT(),password,true,0];
  db.db[usernick]=JSON.parse(objinfo);
  db.db["mails"][mail]=true;
  data.allUsers["users"][usernick]=objuser;
  updateDB();
  updateData();
}
app.post("/newuser",requirelmnts(),(req:any,res:any)=>{
  console.log("Complete data");
  addUser(req);
  res.send("User added");
})

const requireCC=()=>{
  return (req:any,res:any,next:any)=>{
    
    let ccName=req.headers["cc"];
    let ccKind=req.headers["kind"];
    let ccRent=req.headers["rent"];
    if(ccName==undefined || ccKind==undefined || ccRent==undefined){
      res.status(400).send("Incomplete");
    }else{
      console.log("Captured cc");
      next();
    }
  }
}

//"moves":[["cc-name","name of move",how-much,"date"],~]
app.post("/newcc",requireOUT(),requireCC(),(req:any,res:any)=>{
  let ln=(req.headers["token"]).split("_");
  let user=data.allUsers.logs[ln[1]];
  let ccName=req.headers["cc"];
  let ccKind=req.headers["kind"];
  let ccRent=parseInt(req.headers["rent"]);
  let arr:any=[ccName,ccKind,0,ccRent];
  console.log(arr);
  let lenght=Object.entries(db.db[user]["ccounts"]).length;
  db.db[user]["ccounts"][lenght]=arr;
  let mvLenght=Object.entries(db.db[user]["moves"]).length;
  let firstMove:any=[ccName,"creation",0,Date(),mvLenght];
  db.db[user]["moves"][mvLenght]=firstMove;

  updateDB();
  res.status(200).send("New cc added");
});

const requireMove=()=>{
  return (req:any,res:any,next:any)=>{
    let ccName=req.headers["cc"];
    let howMuch=parseInt(req.headers["move"]);
    let moveName=req.headers["mn"];
    if (ccName==undefined || howMuch==undefined || moveName==undefined){
      res.status(400).send("Incomplete data");
    }else{
      next();
    }
  }
};

const requireMvId=()=>{
  return(req:any,res:any,next:any)=>{
    let mvId=req.headers["id"];
    if(mvId==undefined){
      res.status(400).send("Incomplete data");
    }else{
      next();
    }
  }
}

//"moves":[["cc-name","name of move",how-much,"date"],~]
app.post("/newmove",requireOUT(),requireMove(),(req:any,res:any)=>{
  let ln=(req.headers["token"]).split("_");
  let user=data.allUsers.logs[ln[1]];
  let ccName=req.headers["cc"];
  let howMuch=parseInt(req.headers["move"]);
  let moveName=req.headers["mn"];
  let mvLenght=Object.entries(db.db[user]["moves"]).length;

  let ccLenght=Object.entries(db.db[user]["ccounts"]).length;
  var newTotal:number=0;
  for (let i=0;i<ccLenght;i++){
    if (db.db[user]["ccounts"][i][0]==ccName){
      db.db[user]["ccounts"][i][2]=db.db[user]["ccounts"][i][2]+howMuch;
      newTotal=db.db[user]["ccounts"][i][2];
    }
  }

  let firstMove:any=[ccName,moveName,howMuch,Date(),mvLenght,newTotal];
  db.db[user]["moves"][mvLenght]=firstMove;

  updateDB();
  res.status(200).send("New move added");
});

app.post("/editmove",requireOUT(),requireMove(),requireMvId(),(req:any,res:any)=>{
  let ln=(req.headers["token"]).split("_");
  let user=data.allUsers.logs[ln[1]];
  let ccName=req.headers["cc"];
  let howMuch=parseInt(req.headers["move"]);
  let moveName=req.headers["mn"];
  let mvId=req.headers["id"];
  let original=db.db[user]["moves"][parseInt(mvId)][2]
  let myMove:any=[ccName,moveName,howMuch,Date(),mvId];
  db.db[user]["moves"][parseInt(mvId)]=myMove;

  let ccLenght=Object.entries(db.db[user]["ccounts"]).length;
  for (let i=0;i<ccLenght;i++){
    if (db.db[user]["ccounts"][i][0]==ccName){
      db.db[user]["ccounts"][i][2]=db.db[user]["ccounts"][i][2]-original+howMuch;
    }
  }

  updateDB();
  res.status(200).send("Move edited");

});

app.post("/burntoken",requireOUT(),(req:any,res:any)=>{
  let newToken=createOUT();
  let token=req.headers["token"].split("_");
  console.log(token);
  console.log(newToken);
  let ln=token[1];
  let nick=data.allUsers.logs[ln];
  data.allUsers.users[nick][0]=newToken;
  res.status(200).send(newToken);
})

app.delete("/delmove",requireOUT(),requireMvId(),(req:any,res:any)=>{
  let ln=(req.headers["token"]).split("_");
  let user=data.allUsers.logs[ln[1]];
  let ccName=req.headers["cc"];
  let mvId=req.headers["id"];
  let original=db.db[user]["moves"][parseInt(mvId)][2]

  db.db[user]["moves"][parseInt(mvId)][0]='';

  let ccLenght=Object.entries(db.db[user]["ccounts"]).length;
  for (let i=0;i<ccLenght;i++){
    if (db.db[user]["ccounts"][i][0]==ccName){
      db.db[user]["ccounts"][i][2]=db.db[user]["ccounts"][i][2]-original;
    }
  }

  updateDB();
  res.status(200).send("Move edited");

});
//UPDATES
function updateData(){
  const upd=JSON.stringify(data);
  fs.writeFile("./json/tusers.json",upd,(err)=>{
    if(err){
      throw err;
    }
  });
  fs.writeFile("./js/json/tusers.json",upd,(err)=>{
    if(err){
      throw err;
    }
  });
  //console.log("updated entrie");
  console.log("update test entrie");
}

function updateDB(mix?:boolean){
  const upd=JSON.stringify(db);
  fs.writeFile("./json/tdb.json",upd,(err)=>{
    if(err){
      throw err;
    }
  });
  fs.writeFile("./js/json/tdb.json",upd,(err)=>{
    if(err){
      throw err;
    }
  });
  console.log("UPDATED TEST DATABASE");
  //console.log("UPDATED JSON DB");
}

function getNick(out:string,lognum:any){
  const obj=data.allUsers;
}

app.listen(5000,()=>console.log('Server started on 5000'));