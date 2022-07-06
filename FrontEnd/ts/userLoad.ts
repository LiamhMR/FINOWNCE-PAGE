function getByName(name:string) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

let tmpToken=getByName("out");
var userId="";
var letgo="";
var CC=0;
var INV=0;
var currentState=0;

function requestNick(){
    var req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            userId=this.responseText;
            getUser();
        }
    };

    req.open("GET","/usernick",true);
    req.setRequestHeader("token", tmpToken);
    req.send(null);
}

function getUser(){
    const input:any=document.getElementById("usernick");
    const aText = document.createTextNode(userId);
    input.appendChild(aText);
}

function setState(ident:string){
    let totalCC=0;
    let totalINV=0;
    var req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const data=JSON.parse(this.response);
            
            for (let i=0;i<Object.keys(data["ccounts"]).length;i++){
                totalCC=totalCC+data["ccounts"][i][2];
            }
            for (let i=0;i<Object.keys(data["invests"]).length;i++){
                totalINV=totalINV+data["invests"][i][2];
            }

            CC=totalCC;
            INV=totalINV;
            currentState=CC+INV;

            var input:any=document.getElementById(ident);
            const aText=document.createTextNode(currentState.toString(10));
            input.appendChild(aText);
            getCCSummary(data);
            getINVSummary(data);
            //console.log(numArr[0]);
        }
    };

    req.open("GET","/userinfo",true);
    req.setRequestHeader("token", tmpToken);
    req.setRequestHeader("order","ccounts");
    req.send(null);
}

function totalINV(path:string,tmpToken:string){
    $.getJSON(path,function(data){
        let total=0;
        for (let i=0;i<data["testUserData"][tmpToken]["invHM"];i++){
            total=total+data["testUserData"][tmpToken]["invests"][i][2];
        }
        INV=total;
    })
}
function getCCSummary(data:any){
    var input:any=document.getElementById("ccTable");
    let tbl = document.createElement('table');
    let th= tbl.createTHead();
    th.appendChild(document.createTextNode("Cuentas"));
    th.id="ccTH";
    for (let i=0;i<Object.keys(data["ccounts"]).length;i++){
        let ccName=data["ccounts"][i][0];
        let ccCant=data["ccounts"][i][2];
        const tr=tbl.insertRow();
        const tdName=tr.insertCell();
        tdName.appendChild(document.createTextNode(ccName));
        const tdCant=tr.insertCell();
        tdCant.appendChild(document.createTextNode("$"+ccCant.toString(10)));
        let rgb1=Math.random() * (0 - 255) + 255;
        let rgb2=Math.random() * (0 - 255) + 255;
        let rgb3=Math.random() * (0 - 255) + 255;
        let color="rgb("+rgb1+","+rgb2+","+rgb3+")"
    }
    console.log()
    const trFoot=tbl.insertRow();
    const tdTotal=trFoot.insertCell();
    tdTotal.appendChild(document.createTextNode("TOTAL"));
    const tdTotalCant=trFoot.insertCell();
    tdTotalCant.appendChild(document.createTextNode("$"+CC));


    input.appendChild(tbl);
    var thCC:any=document.getElementById("ccTH");
    thCC.colSpan="2";
}

function reqChartData(graph:any){
    let totalCC=0;
    let totalINV=0;
    var req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const data=JSON.parse(this.response);
            getChartData(data,graph);
        }
    };

    req.open("GET","/userinfo",true);
    req.setRequestHeader("token", tmpToken);
    req.setRequestHeader("order","ccounts");
    req.send(null);
}

function getChartData(data:any,graph:any){
    let numArr:Array<number>=[];
    let strArr:Array<string>=[];
    for (let i=0;i<Object.keys(data["ccounts"]).length;i++){
        let ccName=data["ccounts"][i][0];
        let ccCant=data["ccounts"][i][2];
        numArr[i]=parseInt(ccCant);
        strArr[i]=ccName;
        let rgb1=Math.random() * (0 - 255) + 255;
        let rgb2=Math.random() * (0 - 255) + 255;
        let rgb3=Math.random() * (0 - 255) + 255;
        let color="rgb("+rgb1+","+rgb2+","+rgb3+")"
    }
    graphicChart(graph,numArr,strArr);
}


function graphicChart(graph:any,num:any,str:any){
    const mychart:any= {
        chart: {
            plotBackgroundColor: "rgb(110,32,237)",
            plotBorderWidth: "linear-gradient(90deg, rgba(110,32,237,1) 0%, rgba(176,38,255,1) 78%)",
            plotShadow: true,
            backgroundColor:"rgb(255, 255, 255)",
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
            data:[]
        }]
    };
    const test=[{
        name: 'Chrome',
        y: 61.41,
        sliced: true,
        selected: true
    }, {
        name: 'Internet Explorer',
        y: 11.84
    }];
    //mychart.series[0].data=test;
    for(let i=0; i<Object.entries(num).length;i++){
        const unid={
            name:str[i],
            y:num[i]
        };
        mychart.series[0].data.push(unid);
    }
    graph.chart('graphCC',mychart);
}
function getINVSummary(data:any){
    var input:any=document.getElementById("invTable");
    let tbl = document.createElement('table');
    let th= tbl.createTHead();
    th.appendChild(document.createTextNode("Inversiones"));
    th.id="invTH";
    for (let i=0;i<Object.keys(data["invests"]).length;i++){
        let invName=data["invests"][i][0];
        let invCant=data["invests"][i][2];
        const tr=tbl.insertRow();
        const tdName=tr.insertCell();
        tdName.appendChild(document.createTextNode(invName));
        const tdCant=tr.insertCell();
        tdCant.appendChild(document.createTextNode("$"+invCant.toString(10)));
    }
    const trFoot=tbl.insertRow();
    const tdTotal=trFoot.insertCell();
    tdTotal.appendChild(document.createTextNode("TOTAL"));
    const tdTotalCant=trFoot.insertCell();
    tdTotalCant.appendChild(document.createTextNode("$"+INV));


    input.appendChild(tbl);
    var thCC:any=document.getElementById("invTH");
    thCC.colSpan="2";
}

function reqChartDataInv(graph:any){
    let totalCC=0;
    let totalINV=0;
    var req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const data=JSON.parse(this.response);
            getChartDataInv(data,graph);
        }
    };

    req.open("GET","/userinfo",true);
    req.setRequestHeader("token", tmpToken);
    req.setRequestHeader("order","ccounts");
    req.send(null);
}

function getChartDataInv(data:any,graph:any){
    let numArr:Array<number>=[];
    let strArr:Array<string>=[];
    for (let i=0;i<Object.keys(data["invests"]).length;i++){
        let ccName=data["invests"][i][0];
        let ccCant=data["invests"][i][2];
        numArr[i]=parseInt(ccCant);
        strArr[i]=ccName;
        let rgb1=Math.random() * (0 - 255) + 255;
        let rgb2=Math.random() * (0 - 255) + 255;
        let rgb3=Math.random() * (0 - 255) + 255;
        let color="rgb("+rgb1+","+rgb2+","+rgb3+")"
    }
    graphicChartInv(graph,numArr,strArr);
}


function graphicChartInv(graph:any,num:any,str:any){
    const mychart:any= {
        chart: {
            plotBackgroundColor: "rgb(110,32,237)",
            plotBorderWidth: "linear-gradient(90deg, rgba(110,32,237,1) 0%, rgba(176,38,255,1) 78%)",
            plotShadow: true,
            backgroundColor:"rgb(255, 255, 255)",
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
            data:[]
        }]
    };
    const test=[{
        name: 'Chrome',
        y: 61.41,
        sliced: true,
        selected: true
    }, {
        name: 'Internet Explorer',
        y: 11.84
    }];
    //mychart.series[0].data=test;
    for(let i=0; i<Object.entries(num).length;i++){
        const unid={
            name:str[i],
            y:num[i]
        };
        mychart.series[0].data.push(unid);
    }
    graph.chart('graphInv',mychart);
}