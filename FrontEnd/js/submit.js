"use strict";
function checkfield(ident) {
    var input = document.getElementById(ident);
    if (input.value == "") {
        input.value = "";
        input.style.color = "rgb(0,0,0)";
    }
    else if (input.value == ident) {
        input.value = ident;
        input.style.color = "#757575";
    }
}
function checkfieldInit(ident) {
    var input = document.getElementById(ident);
    if (input.value == "") {
        input.style.color = "rgb(0,0,0)";
    }
    else if (input.value != "") {
        input.style.color = "#757575";
    }
}
/**
 * @param String id
 * @param String exampletext
 */
function checkfieldexample(ident, example) {
    var input = document.getElementById(ident);
    if (input.value == "") {
        input.value = "";
        input.style.color = "rgb(0,0,0)";
    }
    else if (input.value == example) {
        input.value = example;
        input.style.color = "#757575";
    }
}
function setfield(ident, onc) {
    if (onc == undefined) {
        onc = true;
    }
    var input = document.getElementById(ident);
    if (input.style.color == "rgb(117, 117, 117)") {
        input.value = "";
        input.style.color = "rgb(0,0,0)";
    }
    else if ((input.value == "") && (onc == false)) {
        input.value = ident;
        input.style.color = "#757575";
    }
    console.log("Change input entry.");
}
/**
 * @param String id
 * @param String exampletext
 */
function setfieldexample(ident, example, onc) {
    if (onc == undefined) {
        onc = true;
    }
    var input = document.getElementById(ident);
    if (input.style.color == "rgb(117, 117, 117)") {
        input.value = "";
        input.style.color = "rgb(0,0,0)";
    }
    else if ((input.value == "") && (onc == false)) {
        input.value = example;
        input.style.color = "#757575";
    }
    console.log("Change example entry");
}
function goto(path) {
    window.location.replace(path);
    //console.log(window.location.href);
}
function easysubmit() {
    return false;
}
function fill() {
    var nombre = parent.document.URL.substring(parent.document.URL.indexOf('='));
    console.log(nombre);
}
/**
 * formatea el rut
 * @param ident id del rut input
 * @returns
 */
function checkrut(ident) {
    var input = document.getElementById(ident);
    if (input.style.color == "rgb(117, 117, 117)") {
        return;
    }
    ;
    var output = ['', '', '.', '', '', '', '.', '', '', '', '-', ''];
    var replace = "";
    var index = input.value.length - 1;
    //[0][1][.][3][4][5][.][7][8][9][-][11] Lenght=12
    for (var i = 11; i >= 0; i--) {
        if (input.value[index] != undefined) {
            if ((i == 2) || (i == 6) || (i == 10)) {
                if ((input.value[index] != ".") && (input.value[index] != "-")) {
                    index++;
                }
                else {
                    console.log("hay punto o guion en : " + index);
                }
            }
            else {
                output[i] = input.value[index];
            }
            replace = output[i] + replace;
            index--;
        }
    }
    for (var i = 0; i <= 11; i++) {
        if (output[i] != "") {
        }
    }
    input.value = replace;
    console.log("Rut format.");
}
/**
 * Limpia los string al hacer focus en el input y los vuelve a poner al perder focus.
 * @param ident id del rut <input>
 * @param complete true en onfocus y false fuera de atención.
 */
function delStrRut(ident, complete) {
    var input = document.getElementById(ident);
    var cVal = 1;
    if (complete == true) {
        cVal = 0;
        input.setAttribute('maxLength', 12);
    }
    else {
        input.setAttribute('maxLength', 12);
    }
    var strVal;
    var output = [];
    var exit = "";
    var points = [];
    var arrows = [];
    var pIndex = 0;
    var aIndex = 0;
    for (var i = 0; i <= input.value.length - 1; i++) {
        if (input.value[i] == ".") {
            points[pIndex] = i;
            pIndex++;
        }
        if (input.value[i] == "-") {
            arrows[aIndex] = i;
            aIndex++;
        }
        strVal = input.value[i];
        if (isNaN(input.value[i]) != false) {
            var upperStr = strVal.toUpperCase();
            strVal = upperStr;
            console.log(strVal);
        }
        output[i] = strVal;
    }
    for (var i = 0; i <= output.length - 1; i++) {
        for (var k = 0; k <= points.length - 1; k++) {
            if (i == points[k]) {
                output[i] = "";
            }
        }
        for (var k = 0; k < arrows.length - cVal; k++) {
            if (i == arrows[k]) {
                output[i] = "";
            }
        }
        if (output[i] != "") {
            exit = exit + output[i];
        }
    }
    input.value = exit;
}
/**
function onwritecheckrut(ident:string){
    var input:any=document.querySelector("#"+ident);
    input.addEventListener('beforeinput',checkrut(ident));
    console.log("listening...");
}*/
/**
 * Comprueba que los campos estén completos del caso contrario hace focus en el primer campo
 * sin llenar.
 * @param idents id de los inputs a comprobar.
 * @returns
 */
function checksubmit(idents) {
    if (document.getElementById('hideFocus') != undefined) {
        var focus = document.getElementById('hideFocus');
        focus.focus;
    }
    for (var i = 0; i < idents.length; i++) {
        var input = document.getElementById(idents[i]);
        if (input.style.color == "rgb(117, 117, 117)") {
            input.style.color = "rgb(0, 0, 0)";
            input.value = "";
            console.log("focus on :" + idents[i]);
            return;
        }
    }
}
/**
 * Comprueba que el rut esté bien ingresado.
 * @param ident id del rut input.
 */
function checkRutSubmit(ident) {
    var input = document.getElementById(ident);
    var output = ['0', '', '', '', '', '', '', '', '', '', '', ''];
    var index = input.value.length - 1;
    for (var i = 11; i >= 0; i--) {
        if (index >= 0) {
            output[i] = input.value[index];
        }
        index--;
    }
    if ((isNaN(output[0]) != false) ||
        (isNaN(output[1]) != false) ||
        (isNaN(output[3]) != false) ||
        (isNaN(output[4]) != false) ||
        (isNaN(output[5]) != false) ||
        (isNaN(output[7]) != false) ||
        (isNaN(output[8]) != false) ||
        (isNaN(output[9]) != false) ||
        ((isNaN(output[11]) != false) && (output[11] != "K")) ||
        (output[2] != '.') ||
        (output[6] != '.') ||
        (output[10] != '-')) {
        input.style.color = "rgb(117, 117, 117)";
        alert("El rut se ha ingresado incorrectamente.");
    }
}
