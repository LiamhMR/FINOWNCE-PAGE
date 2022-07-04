"use strict";
var CC = 0;
function addButton(ident) {
    var input = document.getElementById(ident);
    var newLi = document.createElement("li");
    var newA = document.createElement("a");
    var currentLi = document.getElementById("mini");
    var aText = document.createTextNode(input.value);
    newA.appendChild(aText);
    newLi.appendChild(newA);
    currentLi === null || currentLi === void 0 ? void 0 : currentLi.appendChild(newLi);
    console.log("add button");
}
/**
 * @param ident ->id of element to focus on.
 * @param atribute -> boolean; true to visible - false to hide.
 */
function setvisible(ident, atribute) {
    for (var i = 0; i < ident.length; i++) {
        var input = document.getElementById(ident[i]);
        if (atribute == true) {
            input.style.visibility = "visible";
        }
        else {
            input.style.visibility = "hidden";
        }
        console.log(ident[i] + " visibility: " + atribute);
    }
}
function setvisibleCl(classLmnt, atribute) {
    var inputCollection = document.getElementsByClassName(classLmnt);
    for (var i = 0; i < inputCollection.length; i++) {
        var input = document.getElementById(inputCollection[i].id);
        if (atribute == true) {
            input.style.visibility = "visible";
        }
        else {
            input.style.visibility = "hidden";
        }
    }
    console.log(classLmnt + ' visibility change');
}
/**
 * @param block     -> boolean. True=looked. False=able.
 * @param blcklmnt  -> id of element to disable or not.
 */
function disableinput(blcklmnt, block) {
    var input = "form input[id='" + blcklmnt + "']";
    if (block == true) {
        $(input).prop("disabled", true);
        console.log("disable submit");
    }
    else {
        $(input).prop("disabled", false);
        console.log('able submit');
    }
}
/**
 *
 * @param lookIdent -> observer.
 * @param verValue  -> Array of values.
 * @param blcklmnt  -> element to able.
 * @param equalto   -> Optional, default on true. True compare that observer has an element in verValue array, False compare if hasn't.
 * @returns block   -> True: disable blcklmnt | False: able blcklmnt
 */
function verifyInput(lookIdent, verValue, blcklmnt, equalto) {
    var input = document.getElementById(lookIdent);
    var i = 0;
    var block = true;
    if (typeof equalto == 'undefined') {
        equalto = true;
    }
    for (i; i <= verValue.lastIndexOf.length; i++) {
        if (input.value == verValue[i] && equalto == true) {
            block = false;
        }
        if (input.value != verValue[i] && equalto == false) {
            block = false;
        }
    }
    disableinput(blcklmnt, block);
    return block;
}
/**
 *
 * @param show  -> element to focus
 * @param block -> True: Show | False: Hide
 */
function onblockshow(show, block, requiredId) {
    var rq = true;
    if (typeof requiredId == 'undefined') {
        rq = false;
    }
    for (var i = 0; i < show.lastIndexOf.length; i++) {
        if (block == true) {
            setvisible([show[i]], true);
            if (rq == true) {
                setRequired(requiredId);
            }
        }
        else {
            setvisible([show[i]], false);
            if (rq == true) {
                rmRequired(requiredId);
            }
        }
    }
}
function onblockshowByCl(show, block, requiredId) {
    var rq = true;
    if (typeof requiredId == 'undefined') {
        rq = false;
    }
    for (var i = 0; i <= show.lastIndexOf.length; i++) {
        if (block == true) {
            setvisibleCl(show[i], true);
            if (rq == true) {
                setRequired(requiredId);
            }
        }
        else {
            setvisibleCl(show[i], false);
            if (rq == true) {
                rmRequired(requiredId);
            }
        }
    }
}
function rmRequired(ident) {
    $('[' + ident + ']').removeAttr('required');
}
function setRequired(ident) {
    $('[' + ident + ']').attr('required');
}
function resetValues(idents) {
    var input;
    var id;
    console.log(idents.length);
    for (var i = 0; i < idents.length; i++) {
        id = idents[i];
        input = document.getElementById(id);
        input.value = "";
        console.log("reset " + id);
    }
}
//POST REQUESTS
function postReqCC(cc, kind, adj) {
    var inputCC = document.getElementById(cc);
    var inputKind = document.getElementById(kind);
    var inputAdj = document.getElementById(adj);
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resetValues([cc, kind, adj]);
        }
    };
    req.open("POST", "/newcc", true);
    req.setRequestHeader("cc", inputCC.value);
    req.setRequestHeader("kind", inputKind.value);
    if (inputAdj.value == "" || inputAdj == undefined) {
        inputAdj.value = 0;
    }
    req.setRequestHeader("rent", inputAdj.value);
    req.setRequestHeader("token", tkn);
    req.send(null);
}
function setCCSummary() {
    var totalCC = 0;
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.response);
            console.log(data);
            for (var i = 0; i < Object.keys(data["ccounts"]).length; i++) {
                totalCC = totalCC + data["ccounts"][i][2];
            }
            CC = totalCC;
            getCCTable(data);
        }
    };
    req.open("GET", "/userinfo", true);
    req.setRequestHeader("token", tkn);
    req.setRequestHeader("order", "ccounts");
    req.send(null);
}
function getCCTable(data) {
    var input = document.getElementById("ccTable");
    var tbl = document.createElement('table');
    var th = tbl.createTHead();
    th.appendChild(document.createTextNode("Cuentas"));
    th.id = "ccTH";
    for (var i = 0; i < Object.keys(data["ccounts"]).length; i++) {
        var ccName = data["ccounts"][i][0];
        var ccCant = data["ccounts"][i][2];
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
}
