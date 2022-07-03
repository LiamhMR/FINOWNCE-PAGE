/**
 * <link rel="stylesheet" href="css/bootstrap.min.css">
 *<script src="js/jquery.min.js"></script>
 *<script src="js/bootstrap.min.js"></script>
 */
 function globalcall(ident:string){
    const currentLmnt = document.getElementById(ident);

    const scriptJq=document.createElement("script");
    scriptJq.src="https://code.jquery.com/jquery-3.2.1.slim.min.js";
    scriptJq.integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
    scriptJq.crossOrigin="anonymous"

    const scriptPo=document.createElement("script");
    scriptPo.src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
    scriptPo.integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q";
    scriptPo.crossOrigin="anonymous"
/*
    const scriptBs=document.createElement("script");
    scriptBs.src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" 
    scriptBs.integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
    scriptBs.crossOrigin="anonymous"

    const scriptReact=document.createElement("script");
    scriptReact.src="https://unpkg.com/react@18/umd/react.development.js";
    scriptReact.crossOrigin="";

    const scriptReactDOM=document.createElement("script");
    scriptReactDOM.src="https://unpkg.com/react-dom@18/umd/react-dom.development.js";
    scriptReactDOM.crossOrigin="";
*/
    currentLmnt?.appendChild(scriptJq);
    currentLmnt?.appendChild(scriptPo);
    //currentLmnt?.appendChild(scriptBs);
    //currentLmnt?.appendChild(scriptReact);
    //currentLmnt?.appendChild(scriptReactDOM);
}
globalcall("gc");