"use strict";
var OUT;
var NICK;
function getOUT() {
    OUT = getParameterByName("out");
}
function checkLogin(user, pass, shortln) {
    var inputUser = document.getElementById(user);
    var inputPass = document.getElementById(pass);
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            window.location.replace("../user/summary.html?out=" + this.responseText + "&lang=" + shortln);
        }
    };
    req.open("GET", "/userload", true);
    req.setRequestHeader("user", inputUser.value);
    req.setRequestHeader("pass", inputPass.value);
    req.send(null);
}
