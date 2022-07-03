"use strict";
function updateLang(ident, user) {
    var tkn = "";
    if (user != undefined) {
        tkn = user;
    }
    var input = document.getElementById(ident);
    var ln = window.location.pathname;
    window.location.replace(ln + "?lang=" + input.value + tkn);
}
function proove() {
    $.getJSON("/tempbackend/tempdb.json", function (data) {
        alert(data);
    });
}
function getLang(lang, ident, pos) {
    $.getJSON(lang, function (data) {
        // JSON result in `data` variable
        var text = data["languajes"][pos];
        setText(ident, text);
    });
}
function setText(ident, text) {
    console.log("set:" + text);
    var input = document.getElementById(ident);
    input.appendChild(document.createTextNode(text));
}
function setSelect(ident, text) {
    if (text == "") {
        text = "es";
    }
    var input = document.getElementById(ident);
    input.value = text;
}
/**
 *
 * @param lang ->Path del json con el idioma
 * @param tier ->Capa de la página 'start' o 'user'
 * @param pos ->Indice
 * @param ident ->id del HMLElement al que ponerle el texto
 */
function getMenu(lang, tier, pos, ident) {
    $.getJSON(lang, function (data) {
        // JSON result in `data` variable
        var text = data[tier]['menu'][pos];
        setText(ident, text);
    });
}
/**
 *
 * @param lang ->Path del json con el idioma
 * @param tier ->Capa de la página 'start' o 'user'
 * @param page ->Página
 * @param str  ->Texto que desea obtener
 * @param ident ->id del HMLElement al que ponerle el texto
 */
function getText(lang, tier, page, str, ident) {
    $.getJSON(lang, function (data) {
        // JSON result in `data` variable
        var text = data[tier][page][str];
        setText(ident, text);
    });
}
/**
 *
 * @param lang ->Path del json con el idioma
 * @param tier ->Capa de la página 'start' o 'user'
 * @param page ->Página
 * @param str  ->input del formulario que desea
 * @param ind  -> índice; 0 para label | 1 para la sugerencia
 * @param ident ->id del HMLElement al que ponerle el texto
 */
function getForm(lang, tier, page, str, ind, ident) {
    $.getJSON(lang, function (data) {
        // JSON result in `data` variable
        var text = data[tier][page][str][ind];
        setText(ident, text);
    });
}
/**
 *
 * @param lang ->Path del json con el idioma
 * @param tier ->Capa de la página 'start' o 'user'
 * @param page ->Página
 * @param str  ->Texto que desea obtener
 * @param ident ->id del botón al que desea poner texto.
 */
function setValue(lang, tier, page, str, ident) {
    $.getJSON(lang, function (data) {
        // JSON result in `data` variable
        var text = data[tier][page][str];
        var input = document.getElementById(ident);
        input.value = text;
    });
}
/**
 *
 * @param func
 * @param lang
 * @param tier
 * @param ident
 * @param page
 * @param str
 * @param pos
 */
function doLang(func, lang, tier, ident, page, str, pos) {
    if (pos == undefined) {
        return;
    }
    for (var i = 0; i < ident.length; i++) {
        if (func == "getMenu") {
            getMenu(lang, tier, pos, ident[i]);
        }
        ;
        if (func == "getLang") {
            getLang(lang, ident[i], pos);
        }
    }
}
