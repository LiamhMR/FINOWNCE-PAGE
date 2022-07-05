"use strict";
/**
 * <link rel="stylesheet" href="css/bootstrap.min.css">
 *<script src="js/jquery.min.js"></script>
 *<script src="js/bootstrap.min.js"></script>
 */
function globalcall(ident) {
    var currentLmnt = document.getElementById(ident);
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/css/overrideBTS.css";
    var scriptJq = document.createElement("script");
    scriptJq.src = "https://code.jquery.com/jquery-3.2.1.slim.min.js";
    scriptJq.integrity = "sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN";
    scriptJq.crossOrigin = "anonymous";
    var scriptPo = document.createElement("script");
    scriptPo.src = "https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js";
    scriptPo.integrity = "sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q";
    scriptPo.crossOrigin = "anonymous";
    var scriptBs = document.createElement("script");
    scriptBs.src = "https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js";
    scriptBs.integrity = "sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl";
    scriptBs.crossOrigin = "anonymous";
    var scriptReact = document.createElement("script");
    scriptReact.src = "https://unpkg.com/react@18/umd/react.development.js";
    scriptReact.crossOrigin = "";
    var scriptReactDOM = document.createElement("script");
    scriptReactDOM.src = "https://unpkg.com/react-dom@18/umd/react-dom.development.js";
    scriptReactDOM.crossOrigin = "";
    var scriptGly = document.createElement("link");
    scriptGly.href = "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
    scriptGly.rel = "stylesheet";
    currentLmnt === null || currentLmnt === void 0 ? void 0 : currentLmnt.appendChild(link);
    currentLmnt === null || currentLmnt === void 0 ? void 0 : currentLmnt.appendChild(scriptJq);
    currentLmnt === null || currentLmnt === void 0 ? void 0 : currentLmnt.appendChild(scriptPo);
    currentLmnt === null || currentLmnt === void 0 ? void 0 : currentLmnt.appendChild(scriptBs);
    currentLmnt === null || currentLmnt === void 0 ? void 0 : currentLmnt.appendChild(scriptReact);
    currentLmnt === null || currentLmnt === void 0 ? void 0 : currentLmnt.appendChild(scriptReactDOM);
    currentLmnt === null || currentLmnt === void 0 ? void 0 : currentLmnt.appendChild(scriptGly);
    console.log("load bootstrap");
}
globalcall("gc");
