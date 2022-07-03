"use strict";
var userId = "";
var CC = 0;
var INV = 0;
var currentState = 0;
function getUser(path, tmpToken) {
    $.getJSON(path, function (data) {
        const input = document.getElementById("hi");
        const aText = document.createTextNode(data["testUserData"][tmpToken]["userId"]);
        input.appendChild(aText);
    });
}
function getUserPass(path, usernick) {
    $.getJSON(path, function (data) {
        userId = data["allUsers"][usernick][1];
    });
}
function setState(ident, path, tmpToken) {
    $.getJSON(path, function (data) {
        let totalCC = 0;
        let totalINV = 0;
        for (let i = 0; i < data["testUserData"][tmpToken]["ccHM"]; i++) {
            totalCC = totalCC + data["testUserData"][tmpToken]["ccounts"][i][2];
        }
        for (let i = 0; i < data["testUserData"][tmpToken]["invHM"]; i++) {
            totalINV = totalINV + data["testUserData"][tmpToken]["invests"][i][2];
        }
        CC = totalCC;
        INV = totalINV;
        currentState = CC + INV;
        var input = document.getElementById(ident);
        const aText = document.createTextNode(currentState.toString(10));
        input.appendChild(aText);
    });
}
function totalINV(path, tmpToken) {
    $.getJSON(path, function (data) {
        let total = 0;
        for (let i = 0; i < data["testUserData"][tmpToken]["invHM"]; i++) {
            total = total + data["testUserData"][tmpToken]["invests"][i][2];
        }
        INV = total;
    });
}
function getCCSummary(path, tmpToken) {
    $.getJSON(path, function (data) {
        var input = document.getElementById("ccTable");
        let tbl = document.createElement('table');
        let th = tbl.createTHead();
        th.appendChild(document.createTextNode("Cuentas"));
        th.id = "ccTH";
        for (let i = 0; i < data["testUserData"][tmpToken]["ccHM"]; i++) {
            let ccName = data["testUserData"][tmpToken]["ccounts"][i][0];
            let ccCant = data["testUserData"][tmpToken]["ccounts"][i][2];
            const tr = tbl.insertRow();
            const tdName = tr.insertCell();
            tdName.appendChild(document.createTextNode(ccName));
            const tdCant = tr.insertCell();
            tdCant.appendChild(document.createTextNode("$" + ccCant.toString(10)));
        }
        const trFoot = tbl.insertRow();
        const tdTotal = trFoot.insertCell();
        tdTotal.appendChild(document.createTextNode("TOTAL"));
        const tdTotalCant = trFoot.insertCell();
        tdTotalCant.appendChild(document.createTextNode("$" + CC));
        input.appendChild(tbl);
        var thCC = document.getElementById("ccTH");
        thCC.colSpan = "2";
    });
}
function getINVSummary(path, tmpToken) {
    $.getJSON(path, function (data) {
        var input = document.getElementById("invTable");
        let tbl = document.createElement('table');
        let th = tbl.createTHead();
        th.appendChild(document.createTextNode("Inversiones"));
        th.id = "invTH";
        for (let i = 0; i < data["testUserData"][tmpToken]["invHM"]; i++) {
            let invName = data["testUserData"][tmpToken]["invests"][i][0];
            let invCant = data["testUserData"][tmpToken]["invests"][i][2];
            const tr = tbl.insertRow();
            const tdName = tr.insertCell();
            tdName.appendChild(document.createTextNode(invName));
            const tdCant = tr.insertCell();
            tdCant.appendChild(document.createTextNode("$" + invCant.toString(10)));
        }
        const trFoot = tbl.insertRow();
        const tdTotal = trFoot.insertCell();
        tdTotal.appendChild(document.createTextNode("TOTAL"));
        const tdTotalCant = trFoot.insertCell();
        tdTotalCant.appendChild(document.createTextNode("$" + INV));
        input.appendChild(tbl);
        var thCC = document.getElementById("invTH");
        thCC.colSpan = "2";
    });
}
