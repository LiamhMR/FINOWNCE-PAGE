/**
 * TS for updating style reading current dimension
 * by Leandro Maureira - 2022@
 */

//DISPLAY-WIDHT-PADDING-TEXTALIGN
let lmnt:boolean;

var ident:Array<string>;
var displayUp:Array<string>;
var displayDown:Array<string>;
var tAlignUp:Array<string>;
var tAlignDown:Array<string>;
var paddingUp:Array<string>;
var paddingDown:Array<string>;
//VISIBILITY
let vis:boolean;
var showIdentUp:Array<string>;
var hidIdentUp:Array<string>;
var showIdentDown:Array<string>;
var hidIdentDown:Array<string>;



function readScreen(){
    let y=innerWidth;
    let x=innerHeight;
    let ratio=(x/y);
    return ratio;
}

function switchVisibility(){
    if(vis==false){
        return;
    }else{
        let ratio=readScreen();
        if(ratio>=0.70){
            for(let i=0;i<showIdentUp.length;i++){
                var input:any=document.getElementById(showIdentUp[i]);
                input.style.visibility="visible";
                var input:any=document.getElementById(hidIdentUp[i]);
                input.style.visibility="hidden";
            }
        }else{
            for(let i=0;i<showIdentDown.length;i++){
                var input:any=document.getElementById(showIdentDown[i]);
                input.style.visibility="visible";
                var input:any=document.getElementById(hidIdentDown[i]);
                input.style.visibility="hidden";
            }
        }
    }
}

function setVisibility(showIdUp:Array<string>,hidIdUp:Array<string>,showIdDown:Array<string>,hidIdDown:Array<string>){
    hidIdentUp=[]
    vis=true;
    showIdentUp=[];
    hidIdentUp=[];
    showIdentDown=[];
    hidIdentDown=[];
    for (let i=0;i<showIdUp.length;i++){
        showIdentUp[i]=showIdUp[i];
        hidIdentUp[i]=hidIdUp[i];
        showIdentDown[i]=showIdDown[i];
        hidIdentDown[i]=hidIdDown[i];
    }
    switchVisibility();
    window.addEventListener("resize",switchVisibility);
}

function switchMenu(){
    let ratio=readScreen();
    var uptab:any=document.getElementById("uptab");
    var phonetab:any=document.getElementById("phonetab");
    if (ratio>=0.70){
        console.log("Set desktop style");
        uptab.style.visibility="hidden";
        phonetab.style.visibility="visible";
    }else{
        console.log("Set phone style");
        uptab.style.visibility="visible";
        phonetab.style.visibility="hidden";
    }
}

function switchStyle(){
    if (lmnt!=true){
        return;
    }else{
        let ratio=readScreen();
        if(ratio>=0.70){
            for(let i=0;i<ident.length;i++){;
                var input:any=document.getElementById(ident[i]);
                //PHONE STYLES
                if (displayUp[i]!=null){
                    input.style.display=displayUp[i];
                }
                if (tAlignUp[i]!=null){
                    let verify=tAlignUp[i].slice(0,1);
                    if(verify!=":"){
                        input.style.float=tAlignUp[i];
                    }else{
                        input.style.textAlign=tAlignUp[i].substring(1);
                    }
                }
                if (paddingUp[i]!=null){
                    let verify=paddingUp[i].slice(0,1);
                    if(verify!=":"){
                        input.style.width=paddingUp[i];
                    }else{
                        input.style.padding=paddingUp[i].substring(1);
                    }
                }
            }
        }else{
            for(let i=0;i<ident.length;i++){
                var input:any=document.getElementById(ident[i]);
                //DESKTOP STYLES
                if (displayDown[i]!=null){
                    input.style.display=displayDown[i];
                }
                if (tAlignDown[i]!=null){
                    let verify=tAlignUp[i].slice(0,1);
                    if(verify!=":"){
                        input.style.float=tAlignDown[i];
                    }else{
                        input.style.textAlign=tAlignDown[i].substring(1);
                    }
                }
                if (paddingDown[i]!=null){
                    let verify=paddingDown[i].slice(0,1);
                    if(verify!=":"){
                        input.style.width=paddingDown[i];
                    }else{
                        input.style.padding=paddingDown[i].substring(1);
                    }
                }
            }
        }
    }
}

function setStyle(id:Array<string>,disUp:Array<string>,disDown:Array<string>,tAlUp:Array<string>,tAlDown:Array<string>,
    padUp:Array<string>,padDown:Array<string>){
    lmnt=true;
    ident=[];
    displayUp=[];
    displayDown=[];
    tAlignUp=[];
    tAlignDown=[];
    paddingUp=[]
    paddingDown=[];
    for (let i=0;i<id.length;i++){
        ident[i]=id[i];
        displayUp[i]=disUp[i];
        displayDown[i]=disDown[i];
        tAlignUp[i]=tAlUp[i];
        tAlignDown[i]=tAlDown[i];
        paddingUp[i]=padUp[i];
        paddingDown[i]=padDown[i];
    }
    switchStyle();
    window.addEventListener("resize",switchStyle);
}


function initMenu(){
    switchMenu();
    window.addEventListener("resize",switchMenu);
}