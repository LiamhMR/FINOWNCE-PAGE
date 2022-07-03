"use strict";
/**
 * TS for updating style reading current dimension
 * by Leandro Maureira - 2022@
 */
//DISPLAY-WIDHT-PADDING-TEXTALIGN
var lmnt;
var ident;
var displayUp;
var displayDown;
var tAlignUp;
var tAlignDown;
var paddingUp;
var paddingDown;
//VISIBILITY
var vis;
var showIdentUp;
var hidIdentUp;
var showIdentDown;
var hidIdentDown;
function readScreen() {
    var y = innerWidth;
    var x = innerHeight;
    var ratio = (x / y);
    return ratio;
}
function switchVisibility() {
    if (vis == false) {
        return;
    }
    else {
        var ratio = readScreen();
        if (ratio >= 0.70) {
            for (var i = 0; i < showIdentUp.length; i++) {
                var input = document.getElementById(showIdentUp[i]);
                input.style.visibility = "visible";
                var input = document.getElementById(hidIdentUp[i]);
                input.style.visibility = "hidden";
            }
        }
        else {
            for (var i = 0; i < showIdentDown.length; i++) {
                var input = document.getElementById(showIdentDown[i]);
                input.style.visibility = "visible";
                var input = document.getElementById(hidIdentDown[i]);
                input.style.visibility = "hidden";
            }
        }
    }
}
function setVisibility(showIdUp, hidIdUp, showIdDown, hidIdDown) {
    hidIdentUp = [];
    vis = true;
    showIdentUp = [];
    hidIdentUp = [];
    showIdentDown = [];
    hidIdentDown = [];
    for (var i = 0; i < showIdUp.length; i++) {
        showIdentUp[i] = showIdUp[i];
        hidIdentUp[i] = hidIdUp[i];
        showIdentDown[i] = showIdDown[i];
        hidIdentDown[i] = hidIdDown[i];
    }
    switchVisibility();
    window.addEventListener("resize", switchVisibility);
}
function switchMenu() {
    var ratio = readScreen();
    var uptab = document.getElementById("uptab");
    var phonetab = document.getElementById("phonetab");
    if (ratio >= 0.70) {
        console.log("Set desktop style");
        uptab.style.visibility = "hidden";
        phonetab.style.visibility = "visible";
    }
    else {
        console.log("Set phone style");
        uptab.style.visibility = "visible";
        phonetab.style.visibility = "hidden";
    }
}
function switchStyle() {
    if (lmnt != true) {
        return;
    }
    else {
        var ratio = readScreen();
        if (ratio >= 0.70) {
            for (var i = 0; i < ident.length; i++) {
                ;
                var input = document.getElementById(ident[i]);
                //PHONE STYLES
                if (displayUp[i] != null) {
                    input.style.display = displayUp[i];
                }
                if (tAlignUp[i] != null) {
                    var verify = tAlignUp[i].slice(0, 1);
                    if (verify != ":") {
                        input.style.float = tAlignUp[i];
                    }
                    else {
                        input.style.textAlign = tAlignUp[i].substring(1);
                    }
                }
                if (paddingUp[i] != null) {
                    var verify = paddingUp[i].slice(0, 1);
                    if (verify != ":") {
                        input.style.width = paddingUp[i];
                    }
                    else {
                        input.style.padding = paddingUp[i].substring(1);
                    }
                }
            }
        }
        else {
            for (var i = 0; i < ident.length; i++) {
                var input = document.getElementById(ident[i]);
                //DESKTOP STYLES
                if (displayDown[i] != null) {
                    input.style.display = displayDown[i];
                }
                if (tAlignDown[i] != null) {
                    var verify = tAlignUp[i].slice(0, 1);
                    if (verify != ":") {
                        input.style.float = tAlignDown[i];
                    }
                    else {
                        input.style.textAlign = tAlignDown[i].substring(1);
                    }
                }
                if (paddingDown[i] != null) {
                    var verify = paddingDown[i].slice(0, 1);
                    if (verify != ":") {
                        input.style.width = paddingDown[i];
                    }
                    else {
                        input.style.padding = paddingDown[i].substring(1);
                    }
                }
            }
        }
    }
}
function setStyle(id, disUp, disDown, tAlUp, tAlDown, padUp, padDown) {
    lmnt = true;
    ident = [];
    displayUp = [];
    displayDown = [];
    tAlignUp = [];
    tAlignDown = [];
    paddingUp = [];
    paddingDown = [];
    for (var i = 0; i < id.length; i++) {
        ident[i] = id[i];
        displayUp[i] = disUp[i];
        displayDown[i] = disDown[i];
        tAlignUp[i] = tAlUp[i];
        tAlignDown[i] = tAlDown[i];
        paddingUp[i] = padUp[i];
        paddingDown[i] = padDown[i];
    }
    switchStyle();
    window.addEventListener("resize", switchStyle);
}
function initMenu() {
    switchMenu();
    window.addEventListener("resize", switchMenu);
}
