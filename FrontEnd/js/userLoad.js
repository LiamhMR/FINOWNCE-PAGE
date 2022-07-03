"use strict";
function getByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var userId = "";
var letgo = "";
var CC = 0;
var INV = 0;
var currentState = 0;
function requestBody() {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            userId = this.responseText;
            console.log("USUARIO:" + userId);
            getUser();
        }
    };
    req.open("GET", "/usernick", true);
    req.setRequestHeader("token", getByName("out"));
    req.send(null);
}
requestBody();
function getUser() {
    var input = document.getElementById("hi");
    var aText = document.createTextNode(userId);
    input.appendChild(aText);
}
function setState(ident, path, tmpToken) {
    $.getJSON(path, function (data) {
        var totalCC = 0;
        var totalINV = 0;
        for (var i = 0; i < data["testUserData"][tmpToken]["ccHM"]; i++) {
            totalCC = totalCC + data["testUserData"][tmpToken]["ccounts"][i][2];
        }
        for (var i = 0; i < data["testUserData"][tmpToken]["invHM"]; i++) {
            totalINV = totalINV + data["testUserData"][tmpToken]["invests"][i][2];
        }
        CC = totalCC;
        INV = totalINV;
        currentState = CC + INV;
        var input = document.getElementById(ident);
        var aText = document.createTextNode(currentState.toString(10));
        input.appendChild(aText);
    });
}
function totalINV(path, tmpToken) {
    $.getJSON(path, function (data) {
        var total = 0;
        for (var i = 0; i < data["testUserData"][tmpToken]["invHM"]; i++) {
            total = total + data["testUserData"][tmpToken]["invests"][i][2];
        }
        INV = total;
    });
}
function getCCSummary(path, tmpToken) {
    $.getJSON(path, function (data) {
        var input = document.getElementById("ccTable");
        var tbl = document.createElement('table');
        var th = tbl.createTHead();
        th.appendChild(document.createTextNode("Cuentas"));
        th.id = "ccTH";
        for (var i = 0; i < data["testUserData"][tmpToken]["ccHM"]; i++) {
            var ccName = data["testUserData"][tmpToken]["ccounts"][i][0];
            var ccCant = data["testUserData"][tmpToken]["ccounts"][i][2];
            var tr = tbl.insertRow();
            var tdName = tr.insertCell();
            tdName.appendChild(document.createTextNode(ccName));
            var tdCant = tr.insertCell();
            tdCant.appendChild(document.createTextNode("$" + ccCant.toString(10)));
        }
        var trFoot = tbl.insertRow();
        var tdTotal = trFoot.insertCell();
        tdTotal.appendChild(document.createTextNode("TOTAL"));
        var tdTotalCant = trFoot.insertCell();
        tdTotalCant.appendChild(document.createTextNode("$" + CC));
        input.appendChild(tbl);
        var thCC = document.getElementById("ccTH");
        thCC.colSpan = "2";
    });
}
function getINVSummary(path, tmpToken) {
    $.getJSON(path, function (data) {
        var input = document.getElementById("invTable");
        var tbl = document.createElement('table');
        var th = tbl.createTHead();
        th.appendChild(document.createTextNode("Inversiones"));
        th.id = "invTH";
        for (var i = 0; i < data["testUserData"][tmpToken]["invHM"]; i++) {
            var invName = data["testUserData"][tmpToken]["invests"][i][0];
            var invCant = data["testUserData"][tmpToken]["invests"][i][2];
            var tr = tbl.insertRow();
            var tdName = tr.insertCell();
            tdName.appendChild(document.createTextNode(invName));
            var tdCant = tr.insertCell();
            tdCant.appendChild(document.createTextNode("$" + invCant.toString(10)));
        }
        var trFoot = tbl.insertRow();
        var tdTotal = trFoot.insertCell();
        tdTotal.appendChild(document.createTextNode("TOTAL"));
        var tdTotalCant = trFoot.insertCell();
        tdTotalCant.appendChild(document.createTextNode("$" + INV));
        input.appendChild(tbl);
        var thCC = document.getElementById("invTH");
        thCC.colSpan = "2";
    });
}
