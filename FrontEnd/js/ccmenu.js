"use strict";
function readButton(nm) {
    var newLi = document.createElement("li");
    var newA = document.createElement("a");
    var currentLi = document.getElementById("mini");
    var aText = document.createTextNode(nm);
    newA.appendChild(aText);
    newLi.appendChild(newA);
    currentLi === null || currentLi === void 0 ? void 0 : currentLi.appendChild(newLi);
    console.log("readed button");
}
//READ CC
function setCC() {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.response);
            for (var i = 0; i < Object.keys(data["ccounts"]).length; i++) {
                var cc = data["ccounts"][i][0];
                console.log(cc);
                readButton(cc);
            }
            /*for (let i=0;i<Object.keys(data["invests"]).length;i++){
                totalINV=totalINV+data["invests"][i][2];
            }*/
        }
    };
    req.open("GET", "/userinfo", true);
    req.setRequestHeader("token", tkn);
    req.setRequestHeader("order", "ccounts");
    req.send(null);
}
