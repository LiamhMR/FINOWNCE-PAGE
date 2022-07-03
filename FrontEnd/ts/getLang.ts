function updateLang(ident:string,user?:string){
    let tkn="";
    if (user!=undefined){
        tkn=user;
    }
    var input:any=document.getElementById(ident);
    let ln=window.location.pathname
    window.location.replace(ln + "?lang=" + input.value+tkn);
}

function proove(){
    $.getJSON("/tempbackend/tempdb.json",function(data){
        alert(data);
    });
}

function getLang(lang:string,ident:string,pos:number){
    $.getJSON(lang, function(data) {
        // JSON result in `data` variable
        let text=data["languajes"][pos];
        setText(ident,text);
    });
}

function setText(ident:string,text:string)
{
    console.log("set:" +text);
    var input:any=document.getElementById(ident);
    input.appendChild(document.createTextNode(text));
}

function setSelect(ident:string,text:string){
    if (text==""){
        text="es";
    }
    var input:any=document.getElementById(ident);
    input.value=text;
}

/**
 * 
 * @param lang ->Path del json con el idioma
 * @param tier ->Capa de la página 'start' o 'user'
 * @param pos ->Indice
 * @param ident ->id del HMLElement al que ponerle el texto
 */
function getMenu(lang:string,tier:string,pos:number,ident:string){
    $.getJSON(lang, function(data) {
    // JSON result in `data` variable
        let text=data[tier]['menu'][pos];
        setText(ident,text);
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
function getText(lang:string,tier:string,page:string,str:string,ident:string){
    $.getJSON(lang, function(data) {
    // JSON result in `data` variable
        let text=data[tier][page][str];
        setText(ident,text);
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
function getForm(lang:string,tier:string,page:string,str:string,ind:number,ident:string){
    $.getJSON(lang, function(data) {
        // JSON result in `data` variable
            let text=data[tier][page][str][ind];
            setText(ident,text);
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
function setValue(lang:string,tier:string,page:string,str:string,ident:string){
    $.getJSON(lang, function(data) {
    // JSON result in `data` variable
        let text=data[tier][page][str];
        var input:any=document.getElementById(ident);
        input.value=text;
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
function doLang(func:string,lang:string,tier:string,ident:Array<string>,page?:string,str?:string,pos?:number){
    if(pos==undefined){
        return;
    }
    for (let i=0;i<ident.length;i++){
        if (func=="getMenu"){
            getMenu(lang,tier,pos,ident[i]);
        };

        if (func=="getLang"){
            getLang(lang,ident[i],pos);
        }
    }
}



