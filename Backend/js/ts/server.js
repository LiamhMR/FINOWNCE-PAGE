"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data = __importStar(require("../json/tusers.json"));
const db = __importStar(require("../json/tdb.json"));
const fs = require('fs');
const path = require('path');
const jssub = "../";
//const express = require('express')
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(errorHandler);
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path.join(__dirname, jssub + '../../FrontEnd')));
//>>>>>>>>>> GET <<<<<<<<<<<<<<<<
//400 - DATOS INCOMPLETOS
//401 - DATOS INCORRECTOS
//200 - MATCH DE DATOS 
//provide right data inputs
const requireUser = () => {
    return (req, res, next) => {
        let usernick = req.headers['user'];
        let password = req.headers['pass'];
        if ((usernick == undefined) || (password == undefined)) {
            res.status(400).send("Require user and password");
        }
        else {
            let dataUser;
            let dataPass;
            let entries;
            try {
                dataUser = (data.allUsers["users"][usernick][2]);
                dataPass = data.allUsers["users"][usernick][1];
                entries = data.allUsers["users"][usernick][3];
            }
            catch (error) {
                res.status(401).send("Invalid input");
            }
            if ((dataUser == true) && (dataPass == password)) {
                data.allUsers["users"][usernick][3] = entries + 1;
                data.allUsers["users"][usernick][0] = createOUT();
                data.allUsers["users"][usernick][4] = getLastLog();
                data.allUsers.logs[getLastLog()] = usernick;
                updateData();
                next();
            }
            else {
                res.status(401).send("Invalid input");
            }
        }
    };
};
//400 ->token no coincide
//401 ->usuario no coincide
const requireOUT = () => {
    return (req, res, next) => {
        let token = req.headers["token"].split("_");
        let code = token[0];
        let ln = token[1];
        let nick = data.allUsers.logs[ln];
        try {
            if (data.allUsers["users"][nick][0] == code) {
                next();
            }
            else {
                console.log("Missmatched token");
                res.status(400).send("Invalid token");
            }
        }
        catch (error) {
            console.log("Invalid user");
            res.status(401).send("Invalid user");
        }
    };
};
//GET
//400 ->missmatched keys
const requireInfo = () => {
    return (req, res, next) => {
        let ln = (req.headers["token"]).split("_")[1];
        let user = data.allUsers.logs[ln];
        let order = req.headers["order"];
        //console.log(user);
        if ((user == undefined) || (order == undefined)) {
            res.status(400).send("missed keys");
        }
        else {
            next();
        }
    };
};
function order(user, order, lmt) {
    if (order == "info") {
        //lmt = "name" | "rut" | "mail"
        return db.db[user][order][lmt];
    }
    else if ((order == "ccounts") || (order == "invests")) {
        return db.db[user][order];
    }
}
//MVC-test
app.get('/', (req, res, next) => {
    //res.sendFile(path.join(__dirname,jssub+'../../FrontEnd/home/home.html'));
    console.log("Captured get /");
    //res.sendFile("../home/home.html");
});
//SESION LOGIN
app.get('/userload', requireUser(), (req, res, next) => {
    res.status(200).send(data.allUsers["users"][req.headers["user"]][0] + "_" + data.allUsers.users[req.headers["user"]][4]);
    //res.sendFile(path.join(__dirname,jssub+'../../FrontEnd/user/summary.html'));
    console.log("Capture login:" + req.headers["user"]);
});
//GET USER INFO
app.get('/userinfo', requireOUT(), requireInfo(), (req, res, next) => {
    console.log("matched token & info");
    let ln = (req.headers["token"]).split("_")[1];
    let user = data.allUsers.logs[ln];
    res.status(200).send(db.db[user]);
});
//LOAD USER NICK~~ UNUSED ()
app.get("/usernick", requireOUT(), (req, res, next) => {
    console.log("matched token");
    let token = req.headers["token"].split("_");
    let ln = token[1];
    let nick = data.allUsers.logs[ln];
    res.status(200).send(nick);
});
//LOAD USER DATA
app.get("/userdata", requireOUT(), requireInfo(), (req, res) => {
    console.log("matched token");
    res.send(order(req.headers["user"], req.headers["order"]));
});
function errorHandler(err, req, res, any, next) {
    res.status(500);
    res.render('error', { error: err });
}
//Generate a random string
function createOUT() {
    let randToken = "";
    for (let i = 0; i <= 9; i++) {
        let randnum = Math.random() * (65 - 122) + 122;
        if (randnum == 95 || randnum == 96) {
            randnum = randnum - 4;
        }
        let letter = String.fromCharCode(randnum);
        randToken = randToken + letter;
    }
    return randToken;
}
function getLastLog() {
    let last = Object.keys(data.allUsers.logs).length;
    return last;
}
//>>>>>>>>>>>>>>>>> POST <<<<<<<<<<<<<<<<<<<
//402 -> Datos incompletos
//401 -> Usuario en uso
//402 -> Mail en uso
const requirelmnts = () => {
    return (req, res, next) => {
        let name = req.headers["name"];
        let rut = req.headers["rut"];
        let mail = req.headers["mail"];
        let usernick = req.headers["user"];
        let password = req.headers["pass"];
        if ((name == undefined) || (rut == undefined) || (mail == undefined) || (usernick == undefined) || (password == undefined)) {
            res.status(400).send("incomplete");
        }
        else {
            let existnick = db.db[usernick];
            let existmail = db.db["mails"][mail];
            if (existnick != undefined) {
                res.status(401).send("Nick in use");
            }
            else if (existmail != undefined) {
                res.status(402).send("mail in use");
            }
            else {
                next();
            }
            ;
        }
    };
};
function addUser(req) {
    let name = req.headers["name"];
    let rut = req.headers["rut"];
    let mail = req.headers["mail"];
    let usernick = req.headers["user"];
    let password = req.headers["pass"];
    let objinfo = `{
    "info":{
      "name":"${name}",
      "rut":"${rut}",
      "mail":"${mail}"
    },
    "ccounts":[],
    "invests":[]
    }`;
    //let objuser=`["${createOUT()}","${password}",true,0]`;
    let objuser = [createOUT(), password, true, 0];
    db.db[usernick] = JSON.parse(objinfo);
    db.db["mails"][mail] = true;
    data.allUsers["users"][usernick] = objuser;
    updateDB();
    updateData();
}
app.post("/newuser", requirelmnts(), (req, res) => {
    console.log("Complete data");
    addUser(req);
    res.send("User added");
});
const requireCC = () => {
    return (req, res, next) => {
        let ccName = req.headers["cc"];
        let ccKind = req.headers["kind"];
        let ccRent = req.headers["rent"];
        if (ccName == undefined || ccKind == undefined || ccRent == undefined) {
            res.status(400).send("Incomplete");
        }
        else {
            console.log("Captured cc");
            next();
        }
    };
};
//"moves":[["cc-name","name of move",how-much,"date"],~]
app.post("/newcc", requireOUT(), requireCC(), (req, res) => {
    let ln = (req.headers["token"]).split("_");
    let user = data.allUsers.logs[ln[1]];
    let ccName = req.headers["cc"];
    let ccKind = req.headers["kind"];
    let ccRent = parseInt(req.headers["rent"]);
    let arr = [ccName, ccKind, 0, ccRent];
    console.log(arr);
    let lenght = Object.entries(db.db[user]["ccounts"]).length;
    db.db[user]["ccounts"][lenght] = arr;
    let mvLenght = Object.entries(db.db[user]["moves"]).length;
    let firstMove = [ccName, "creation", 0, Date(), mvLenght];
    db.db[user]["moves"][mvLenght] = firstMove;
    updateDB();
    res.status(200).send("New cc added");
});
const requireMove = () => {
    return (req, res, next) => {
        let ccName = req.headers["cc"];
        let howMuch = parseInt(req.headers["move"]);
        let moveName = req.headers["mn"];
        if (ccName == undefined || howMuch == undefined || moveName == undefined) {
            res.status(400).send("Incomplete data");
        }
        else {
            next();
        }
    };
};
//"moves":[["cc-name","name of move",how-much,"date"],~]
app.post("/newmove", requireOUT(), requireMove(), (req, res) => {
    let ln = (req.headers["token"]).split("_");
    let user = data.allUsers.logs[ln[1]];
    let ccName = req.headers["cc"];
    let howMuch = parseInt(req.headers["move"]);
    let moveName = req.headers["mn"];
    let mvLenght = Object.entries(db.db[user]["moves"]).length;
    let firstMove = [ccName, moveName, howMuch, Date(), mvLenght];
    db.db[user]["moves"][mvLenght] = firstMove;
    let ccLenght = Object.entries(db.db[user]["ccounts"]).length;
    for (let i = 0; i < ccLenght; i++) {
        if (db.db[user]["ccounts"][i][0] == ccName) {
            db.db[user]["ccounts"][i][2] = db.db[user]["ccounts"][i][2] + howMuch;
        }
    }
    updateDB();
    res.status(200).send("New move added");
});
//UPDATES
function updateData() {
    const upd = JSON.stringify(data);
    fs.writeFile("./json/tusers.json", upd, (err) => {
        if (err) {
            throw err;
        }
    });
    fs.writeFile("./js/json/tusers.json", upd, (err) => {
        if (err) {
            throw err;
        }
    });
    //console.log("updated entrie");
    console.log("update test entrie");
}
function updateDB(mix) {
    const upd = JSON.stringify(db);
    fs.writeFile("./json/tdb.json", upd, (err) => {
        if (err) {
            throw err;
        }
    });
    fs.writeFile("./js/json/tdb.json", upd, (err) => {
        if (err) {
            throw err;
        }
    });
    console.log("UPDATED TEST DATABASE");
    //console.log("UPDATED JSON DB");
}
function getNick(out, lognum) {
    const obj = data.allUsers;
}
app.listen(5000, () => console.log('Server started on 5000'));
