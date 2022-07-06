"use strict";
var CC = 0;
function addButton(ident) {
    var input = document.getElementById(ident);
    var newLi = document.createElement("li");
    var newA = document.createElement("a");
    newA.href = "#";
    newA.onclick = function () {
        location.reload;
    };
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
function setvisible(ident, size, atribute) {
    for (var i = 0; i < ident.length; i++) {
        var input = document.getElementById(ident[i]);
        if (atribute == true) {
            input.style.visibility = "visible";
            input.style.height = size[i];
        }
        else {
            input.style.visibility = "hidden";
            input.style.height = "0px";
        }
        console.log(ident[i] + " visibility: " + atribute);
    }
}
function setvisibleCl(classLmnt, size, atribute) {
    var inputCollection = document.getElementsByClassName(classLmnt);
    for (var i = 0; i < inputCollection.length; i++) {
        var input = document.getElementById(inputCollection[i].id);
        if (atribute == true) {
            input.style.visibility = "visible";
            input.style.height = size;
        }
        else {
            input.style.visibility = "hidden";
            input.style.height = "0px";
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
function onblockshow(show, size, block, requiredId) {
    var rq = true;
    if (typeof requiredId == 'undefined') {
        rq = false;
    }
    for (var i = 0; i < show.lastIndexOf.length; i++) {
        if (block == true) {
            setvisible([show[i]], [size[i]], true);
            if (rq == true) {
                setRequired(requiredId);
            }
        }
        else {
            setvisible([show[i]], [size[i]], false);
            if (rq == true) {
                rmRequired(requiredId);
            }
        }
    }
}
function onblockshowByCl(show, size, block, requiredId) {
    var rq = true;
    if (typeof requiredId == 'undefined') {
        rq = false;
    }
    for (var i = 0; i <= show.lastIndexOf.length; i++) {
        if (block == true) {
            setvisibleCl(show[i], size[i], true);
            if (rq == true) {
                setRequired(requiredId);
            }
        }
        else {
            setvisibleCl(show[i], size[i], false);
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
//POST REQUESTS - NUEVA CUENTA
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
//OBTENER EL RESUMEN DE CUENTAS
function setCCSummary() {
    var totalCC = 0;
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.response);
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
//TABLA DE RESUMEN DE CUENTAS
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
//OBTENER INFO DE MOVIMIENTOS
function setCCMoves(ccNameInput) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.response);
            getMoveTable(data, ccNameInput);
        }
    };
    req.open("GET", "/userinfo", true);
    req.setRequestHeader("token", tkn);
    req.setRequestHeader("order", "ccounts");
    req.send(null);
}
//CREAR TABLA DE MOVIMIENTOS
var MoveId = [];
var currEdit;
function getMoveTable(data, ccName) {
    var ccTotal = 0;
    var input = document.getElementById("ccMoves");
    var tbl = document.createElement('table');
    //tbl.className="mvtable";
    var th = tbl.createTHead();
    th.appendChild(document.createTextNode("Movimientos"));
    th.id = "ccTH";
    var _loop_1 = function (i) {
        if (data["moves"][i][0] == ccName) {
            var moveName_1 = data["moves"][i][1];
            var ccCant_1 = data["moves"][i][2];
            var dateText = data["moves"][i][3];
            MoveId[i] = data["moves"][i][4];
            var date = "Unkowing";
            var tr = tbl.insertRow();
            var tdName = tr.insertCell();
            tdName.appendChild(document.createTextNode(moveName_1));
            var tdCant = tr.insertCell();
            tdCant.appendChild(document.createTextNode("$" + ccCant_1.toString(10)));
            var tdDate = tr.insertCell();
            if (dateText != null) {
                date = dateText.split(" ");
                tdDate.appendChild(document.createTextNode(date[2] + " " + date[1] + " " + date[3] + " " + date[4]));
                //tdDate.appendChild(document.createTextNode(dateText));
            }
            else {
                tdDate.appendChild(document.createTextNode(dateText));
            }
            var tdEdit = tr.insertCell();
            editGraph = document.createElement('span');
            editGraph.className = "fa fa-edit";
            editButton = document.createElement('a');
            editButton.className = "btn btn-info btn-lg";
            editButton.onclick = function () {
                setvisible(['addMove', 'editmv'], ['300px', '40px'], true);
                setvisible(['savemv'], [], false);
                currEdit = data["moves"][i][4];
                var mvNameInput = document.getElementById('ccMove');
                var mvHmInput = document.getElementById('ccHowMuch');
                mvNameInput.value = moveName_1;
                mvHmInput.value = ccCant_1;
            };
            editButton.appendChild(editGraph);
            tdEdit.appendChild(editButton);
            ccTotal = ccTotal + ccCant_1;
        }
    };
    var editGraph, editButton;
    for (var i = 0; i < Object.keys(data["moves"]).length; i++) {
        _loop_1(i);
    }
    var trFoot = tbl.insertRow();
    var tdTotal = trFoot.insertCell();
    tdTotal.appendChild(document.createTextNode("TOTAL"));
    var tdTotalCant = trFoot.insertCell();
    tdTotalCant.appendChild(document.createTextNode("$" + ccTotal));
    input.appendChild(tbl);
    var thCC = document.getElementById("ccTH");
    thCC.colSpan = "2";
}
//POST - REQUEST 
function postReqNewMove(ccName, mvName, howMuch) {
    var mvInput = document.getElementById(mvName);
    var hmInput = document.getElementById(howMuch);
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            location.reload();
        }
    };
    req.open("POST", "/newmove", true);
    req.setRequestHeader("token", tkn);
    req.setRequestHeader('cc', ccName);
    req.setRequestHeader("move", hmInput.value);
    req.setRequestHeader("mn", mvInput.value);
    req.send(null);
}
function postReqEditMove(ccName, mvName, howMuch, mvid) {
    var mvInput = document.getElementById(mvName);
    var hmInput = document.getElementById(howMuch);
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            location.reload();
        }
    };
    req.open("POST", "/editmove", true);
    req.setRequestHeader("token", tkn);
    req.setRequestHeader('cc', ccName);
    req.setRequestHeader("move", hmInput.value);
    req.setRequestHeader("mn", mvInput.value);
    req.setRequestHeader("id", mvid + '');
    req.send(null);
}
function cleanForm(inputs) {
    for (var i = 0; i < Object.entries(inputs).length; i++) {
        var clean = document.getElementById(inputs[i]);
        clean.value = "";
    }
}
//DELETE REQUEST
function delReqMove(mvid) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            location.reload();
        }
    };
    req.open("DELETE", "/delmove", true);
    req.setRequestHeader("token", tkn);
    req.setRequestHeader("id", mvid + '');
    req.send(null);
}
//GRÁFICO DE RESUMEN
function reqChartDataCC(graph) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.response);
            getChartDataCC(data, graph);
        }
    };
    req.open("GET", "/userinfo", true);
    req.setRequestHeader("token", tkn);
    req.setRequestHeader("order", "ccounts");
    req.send(null);
}
function getChartDataCC(data, graph) {
    var numArr = [];
    var strArr = [];
    for (var i = 0; i < Object.keys(data["ccounts"]).length; i++) {
        var ccName = data["ccounts"][i][0];
        var ccCant = data["ccounts"][i][2];
        numArr[i] = parseInt(ccCant);
        strArr[i] = ccName;
        var rgb1 = Math.random() * (0 - 255) + 255;
        var rgb2 = Math.random() * (0 - 255) + 255;
        var rgb3 = Math.random() * (0 - 255) + 255;
        var color = "rgb(" + rgb1 + "," + rgb2 + "," + rgb3 + ")";
    }
    graphicChartCC(graph, numArr, strArr);
}
function graphicChartCC(graph, num, str) {
    var mychart = {
        chart: {
            plotBackgroundColor: "rgb(110,32,237)",
            plotBorderWidth: "linear-gradient(90deg, rgba(110,32,237,1) 0%, rgba(176,38,255,1) 78%)",
            plotShadow: true,
            backgroundColor: "rgb(255, 255, 255)",
            type: 'pie'
        },
        title: {
            text: 'Cuentas'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
                name: 'Acounts',
                colorByPoint: true,
                data: []
            }]
    };
    for (var i = 0; i < Object.entries(num).length; i++) {
        var unid = {
            name: str[i],
            y: num[i]
        };
        mychart.series[0].data.push(unid);
    }
    graph.chart('graphCC', mychart);
}
//GRÁFICO DE MOVIMIENTOS
function reqChartDataMv(graph, ccName) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.response);
            getChartDataMv(data, graph, ccName);
        }
    };
    req.open("GET", "/userinfo", true);
    req.setRequestHeader("token", tkn);
    req.setRequestHeader("order", "ccounts");
    req.send(null);
}
function getChartDataMv(data, graph, cc) {
    var numArr = [];
    var strArr = [];
    for (var i = 0; i < Object.keys(data["moves"]).length; i++) {
        if (data["moves"][i][0] == cc) {
            var dateText = (data["moves"][i][3]);
            var date = dateText.split(" ");
            var ccDate = date[2] + " " + date[1];
            var ccCant = data["moves"][i][5];
            var lenght = Object.entries(numArr).length;
            numArr[lenght] = parseInt(ccCant);
            strArr[lenght] = ccDate;
            console.log("MOVE");
        }
    }
    graphicChartMv(graph, numArr, strArr, cc);
}
function graphicChartMv(graph, num, str, ccName) {
    var mychart = {
        chart: {
            type: 'line'
        },
        title: {
            text: cc
        },
        xAxis: {
            categories: []
        },
        yAxis: {
            title: {
                text: 'TOTAL'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: true
            }
        },
        series: [{
                name: "Movimientos",
                data: []
            }]
    };
    var unidSeries = {
        name: ccName,
        data: []
    };
    //mychart.series.push(unidSeries);
    for (var i = 0; i < Object.entries(num).length; i++) {
        /*
        const unid={
            name:str[i],
            y:num[i]
        };*/
        mychart.series[0].data.push(num[i]);
        mychart.xAxis["categories"][i] = str[i];
    }
    console.log(mychart);
    graph.chart('graphmv', mychart);
}
