var CC=0;

function addButton(ident:string){
    var input:any=document.getElementById(ident);
    const newLi = document.createElement("li");
    const newA = document.createElement("a");
    newA.href="#";
    newA.onclick=function(){
        location.reload;
    };
    const currentLi = document.getElementById("mini");
    const aText = document.createTextNode(input.value);
    newA.appendChild(aText);
    newLi.appendChild(newA);
    currentLi?.appendChild(newLi);
    console.log("add button");
}

/**
 * @param ident ->id of element to focus on.
 * @param atribute -> boolean; true to visible - false to hide.
 */
function setvisible(ident:Array<string>,size:Array<string>,atribute:boolean){
    for (let i=0;i<ident.length;i++){
        var input:any=document.getElementById(ident[i]);
        if (atribute==true){
            input.style.visibility= "visible";
            input.style.height=size[i];
        }else{
            input.style.visibility= "hidden";
            input.style.height="0px";
        }
        console.log(ident[i] + " visibility: " + atribute);
    }
}

function setvisibleCl(classLmnt:string,size:string,atribute:boolean)
{
    let inputCollection=document.getElementsByClassName(classLmnt);
    for (let i=0;i<inputCollection.length;i++)
    {
        var input:any=document.getElementById(inputCollection[i].id);
        if (atribute==true){
            input.style.visibility= "visible";
            input.style.height=size;
        }else{
            input.style.visibility= "hidden";
            input.style.height="0px"
        }
    }
    console.log(classLmnt + ' visibility change');
}

/**
 * @param block     -> boolean. True=looked. False=able.
 * @param blcklmnt  -> id of element to disable or not.
 */
function disableinput(blcklmnt:string,block:boolean){
    var input:string= "form input[id='" + blcklmnt + "']";
    if (block==true){
        $(input).prop("disabled", true);
        console.log("disable submit");
    }else{
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
function verifyInput(lookIdent:string,verValue:Array<String>,blcklmnt:string,equalto?:boolean){
    var input:any=document.getElementById(lookIdent);
    let i=0;
    var block:boolean=true;
    if (typeof equalto == 'undefined') {
        equalto=true;
    }
    for (i; i<=verValue.lastIndexOf.length;i++)
    {
        if (input.value==verValue[i] && equalto==true){
            block=false;
        }
        if (input.value!=verValue[i] && equalto==false){
            block=false;
        }
    }
    disableinput(blcklmnt,block);
    return block;
}

/**
 * 
 * @param show  -> element to focus
 * @param block -> True: Show | False: Hide
 */
function onblockshow(show:Array<string>,size:Array<string>,block:boolean,requiredId:string){
    let rq=true;
    if (typeof requiredId == 'undefined') {
        rq=false;
    }
    for (let i=0;i<show.lastIndexOf.length;i++){
        if (block==true){
            setvisible([show[i]],[size[i]],true);
            if (rq==true)
            {
                setRequired(requiredId);
            }
        }else{
            setvisible([show[i]],[size[i]],false);
            if (rq==true)
            {
                rmRequired(requiredId);
            }
        }
    }
}

function onblockshowByCl(show:Array<string>,size:Array<string>,block:boolean,requiredId?:string){
    let rq=true;
    if (typeof requiredId == 'undefined') {
        rq=false;
    }
    for (let i=0;i<=show.lastIndexOf.length;i++){
        if (block==true){
            setvisibleCl(show[i],size[i],true);
            if (rq==true)
            {
                setRequired(requiredId);
            }
        }else{
            setvisibleCl(show[i],size[i],false);
            if (rq==true)
            {
                rmRequired(requiredId);
            }
        }
    }
}

function rmRequired(ident?:string){
    $('['+ident +']').removeAttr('required');
}

function setRequired(ident?:string){
    $('['+ident +']').attr('required');
}

function resetValues(idents:Array<string>){
    var input:any;
    var id:string;
    console.log(idents.length);
    for (let i=0;i<idents.length;i++){
        id=idents[i];
        input=document.getElementById(id);
        input.value="";
        console.log("reset " + id);
    }
}

//POST REQUESTS - NUEVA CUENTA
function postReqCC(cc:string,kind:string,adj:string){
    var inputCC:any=document.getElementById(cc);
    var inputKind:any=document.getElementById(kind);
    var inputAdj:any=document.getElementById(adj);
    
    var req=new XMLHttpRequest();

    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            resetValues([cc,kind,adj]);

       }
    };

    req.open("POST","/newcc",true);
    req.setRequestHeader("cc", inputCC.value);
    req.setRequestHeader("kind", inputKind.value);
    if(inputAdj.value=="" || inputAdj==undefined){
        inputAdj.value=0;
    }
    req.setRequestHeader("rent",inputAdj.value);
    req.setRequestHeader("token",tkn);
    req.send(null);
}

//OBTENER EL RESUMEN DE CUENTAS
function setCCSummary(){
    let totalCC=0;
    var req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const data=JSON.parse(this.response);
            
            for (let i=0;i<Object.keys(data["ccounts"]).length;i++){
                totalCC=totalCC+data["ccounts"][i][2];
            }
            CC=totalCC;
            getCCTable(data);
        }
    };

    req.open("GET","/userinfo",true);
    req.setRequestHeader("token", tkn);
    req.setRequestHeader("order","ccounts");
    req.send(null);
}

//TABLA DE RESUMEN DE CUENTAS
function getCCTable(data:any){
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
    }
    const trFoot=tbl.insertRow();
    const tdTotal=trFoot.insertCell();
    tdTotal.appendChild(document.createTextNode("TOTAL"));
    const tdTotalCant=trFoot.insertCell();
    tdTotalCant.appendChild(document.createTextNode("$"+CC));


    input.appendChild(tbl);
    var thCC:any=document.getElementById("ccTH");
    thCC.colSpan="2";
}

//OBTENER INFO DE MOVIMIENTOS
function setCCMoves(ccNameInput:String){
    var req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const data=JSON.parse(this.response);
            getMoveTable(data,ccNameInput);
        }
    };

    req.open("GET","/userinfo",true);
    req.setRequestHeader("token", tkn);
    req.setRequestHeader("order","ccounts");
    req.send(null);
}

//CREAR TABLA DE MOVIMIENTOS
let MoveId:Array<number>=[];
let currEdit:number;
function getMoveTable(data:any,ccName:String){
    var ccTotal=0;
    var input:any=document.getElementById("ccMoves");
    let tbl = document.createElement('table');
    //tbl.className="mvtable";
    let th= tbl.createTHead();
    th.appendChild(document.createTextNode("Movimientos"));
    th.id="ccTH";
    for (let i=0;i<Object.keys(data["moves"]).length;i++){
        if(data["moves"][i][0]==ccName)
        {
            let moveName=data["moves"][i][1];
            let ccCant=data["moves"][i][2];
            let dateText=data["moves"][i][3];
            MoveId[i]=data["moves"][i][4];
            let date="Unkowing";
            const tr=tbl.insertRow();
            const tdName=tr.insertCell();
            tdName.appendChild(document.createTextNode(moveName));
            const tdCant=tr.insertCell();
            tdCant.appendChild(document.createTextNode("$"+ccCant.toString(10)));
            const tdDate=tr.insertCell();
            if (dateText!=null){
                date=dateText.split(" ");
                tdDate.appendChild(document.createTextNode(date[2]+" "+date[1]+" "+date[3]+" "+date[4]));
                //tdDate.appendChild(document.createTextNode(dateText));
            }else{
                tdDate.appendChild(document.createTextNode(dateText));
            }
            const tdEdit=tr.insertCell();
            var editGraph:any=document.createElement('span');
            editGraph.className="fa fa-edit";
            var editButton:any=document.createElement('a');
            editButton.className="btn btn-info btn-lg";

            editButton.onclick=function(){
                setvisible(['addMove','editmv'],['300px','40px'],true)
                setvisible(['savemv'],[],false);
                currEdit=data["moves"][i][4];
                var mvNameInput:any=document.getElementById('ccMove');
                var mvHmInput:any=document.getElementById('ccHowMuch');
                mvNameInput.value=moveName;
                mvHmInput.value=ccCant;
            }
            editButton.appendChild(editGraph);
            tdEdit.appendChild(editButton);

            ccTotal=ccTotal+ccCant;
        }
    }
    const trFoot=tbl.insertRow();
    const tdTotal=trFoot.insertCell();
    tdTotal.appendChild(document.createTextNode("TOTAL"));
    const tdTotalCant=trFoot.insertCell();
    tdTotalCant.appendChild(document.createTextNode("$"+ccTotal));


    input.appendChild(tbl);
    var thCC:any=document.getElementById("ccTH");
    thCC.colSpan="2";
}

//POST - REQUEST 
function postReqNewMove(ccName:string,mvName:string,howMuch:string){
    var mvInput:any=document.getElementById(mvName);
    var hmInput:any=document.getElementById(howMuch);
    var req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            location.reload();
        }
    };

    req.open("POST","/newmove",true);
    req.setRequestHeader("token", tkn);
    req.setRequestHeader('cc',ccName);
    req.setRequestHeader("move",hmInput.value);
    req.setRequestHeader("mn",mvInput.value);
    req.send(null);
}

function postReqEditMove(ccName:string,mvName:string,howMuch:string,mvid:number){
    var mvInput:any=document.getElementById(mvName);
    var hmInput:any=document.getElementById(howMuch);
    var req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            location.reload();
        }
    };

    req.open("POST","/editmove",true);
    req.setRequestHeader("token", tkn);
    req.setRequestHeader('cc',ccName);
    req.setRequestHeader("move",hmInput.value);
    req.setRequestHeader("mn",mvInput.value);
    req.setRequestHeader("id",mvid+'');
    req.send(null);
}

function cleanForm(inputs:Array<string>){
    for (let i=0;i<Object.entries(inputs).length;i++){
        var clean:any=document.getElementById(inputs[i]);
        clean.value="";
    }
}

//DELETE REQUEST
function delReqMove(mvid:number){
    var req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            location.reload();
        }
    };

    req.open("DELETE","/delmove",true);
    req.setRequestHeader("token", tkn);
    req.setRequestHeader("id",mvid+'');
    req.send(null);
}

//GRÁFICO DE RESUMEN
function reqChartDataCC(graph:any){
    var req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const data=JSON.parse(this.response);
            getChartDataCC(data,graph);
        }
    };

    req.open("GET","/userinfo",true);
    req.setRequestHeader("token", tkn);
    req.setRequestHeader("order","ccounts");
    req.send(null);
}

function getChartDataCC(data:any,graph:any){
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
    graphicChartCC(graph,numArr,strArr);
}


function graphicChartCC(graph:any,num:any,str:any){
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
    for(let i=0; i<Object.entries(num).length;i++){
        const unid={
            name:str[i],
            y:num[i]
        };
        mychart.series[0].data.push(unid);
    }
    graph.chart('graphCC',mychart);
}

//GRÁFICO DE MOVIMIENTOS
function reqChartDataMv(graph:any,ccName:string){
    var req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const data=JSON.parse(this.response);
            getChartDataMv(data,graph,ccName);
        }
    };

    req.open("GET","/userinfo",true);
    req.setRequestHeader("token", tkn);
    req.setRequestHeader("order","ccounts");
    req.send(null);
}

function getChartDataMv(data:any,graph:any,cc:string){
    let numArr:Array<number>=[];
    let strArr:Array<string>=[];
    for (let i=0;i<Object.keys(data["moves"]).length;i++){
        if(data["moves"][i][0]==cc){
            let dateText=(data["moves"][i][3]);
            let date=dateText.split(" ");
            let ccDate=date[2]+" "+date[1];
            let ccCant=data["moves"][i][5];
            let lenght=Object.entries(numArr).length;
            numArr[lenght]=parseInt(ccCant);
            strArr[lenght]=ccDate;
            console.log("MOVE");
        }
    }
    graphicChartMv(graph,numArr,strArr,cc);
}


function graphicChartMv(graph:any,num:any,str:any,ccName:string){
    const mychart:any= {
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
            data:  []
        }]
    };
    const unidSeries={
        name:ccName,
        data:[]
    }
    //mychart.series.push(unidSeries);
    for(let i=0; i<Object.entries(num).length;i++){
        /*
        const unid={
            name:str[i],
            y:num[i]
        };*/
        mychart.series[0].data.push(num[i]);
        mychart.xAxis["categories"][i]=str[i];
    }
    console.log(mychart);
    graph.chart('graphmv',mychart);
}
