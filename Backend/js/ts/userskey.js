"use strict";
var randToken = "";
function createOUT(userId) {
    for (let i = 0; i <= 9; i++) {
        let letter = String.fromCharCode(Math.random() * (65 - 122) + 122);
        randToken = randToken + letter;
        localStorage.setItem(randToken, userId);
    }
    var obj = localStorage.getItem(randToken);
    return 0;
}
$.getJSON("../json/users.json", (data) => {
    var input = document.getElementById("test");
    input.appendChild(document.createTextNode(data));
});
