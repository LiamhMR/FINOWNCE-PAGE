var CC=0;

function addButton(ident:string){
    var input:any=document.getElementById(ident);
    const newLi = document.createElement("li");
    const newA = document.createElement("a");
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
function setvisible(ident:Array<string>,atribute:boolean){

    for (let i=0;i<ident.length;i++){
        var input:any=document.getElementById(ident[i]);
        if (atribute==true){
            input.style.visibility= "visible";
        }else{
            input.style.visibility= "hidden";
        }
        console.log(ident[i] + " visibility: " + atribute);
    }
}

function setvisibleCl(classLmnt:string,atribute:boolean)
{
    let inputCollection=document.getElementsByClassName(classLmnt);
    for (let i=0;i<inputCollection.length;i++)
    {
        var input:any=document.getElementById(inputCollection[i].id);
        if (atribute==true){
            input.style.visibility= "visible";
        }else{
            input.style.visibility= "hidden";
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
function onblockshow(show:Array<string>,block:boolean,requiredId:string){
    let rq=true;
    if (typeof requiredId == 'undefined') {
        rq=false;
    }
    for (let i=0;i<show.lastIndexOf.length;i++){
        if (block==true){
            setvisible([show[i]],true);
            if (rq==true)
            {
                setRequired(requiredId);
            }
        }else{
            setvisible([show[i]],false);
            if (rq==true)
            {
                rmRequired(requiredId);
            }
        }
    }
}

function onblockshowByCl(show:Array<string>,block:boolean,requiredId?:string){
    let rq=true;
    if (typeof requiredId == 'undefined') {
        rq=false;
    }
    for (let i=0;i<=show.lastIndexOf.length;i++){
        if (block==true){
            setvisibleCl(show[i],true);
            if (rq==true)
            {
                setRequired(requiredId);
            }
        }else{
            setvisibleCl(show[i],false);
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

//POST REQUESTS
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

function setCCSummary(){
    let totalCC=0;
    var req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const data=JSON.parse(this.response);
            console.log(data);
            
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
