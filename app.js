const palabraDiv = document.getElementById("palabra");
const letrasErroneasDiv = document.getElementById("letrasErroneas");
const horca = document.getElementById("horca");

const listaPalabras = ["GOBIERNO",
                       "PLAN",
                       "INCLUSION",
                       "MACRI",
                       "DEUDA",
                       "HELICOPTERO",
                       "PANDEMIA",
                       "CUARENTENA",
                       "MILEI",
                       "DIVERSIDAD",
                       "MINISTERIO",
                       "CHORRA",
                       "LADRON",
                       "ROBAR",
                       "INOCENTE",
                       "CULPABLE",
                       "NEOLIBERALISMO",
                       "ATENTADO",
                       "FERIADO",
                       "VACACIONES",
                       "FMI",
                       "NISMAN",
                       "DOLAR",
                       "IMPUESTAZO",
                       "RETENCION",
                       "MAPUCHES",
                       "BARCOS",
                       "CHINOS",
                       "EXPROPIACION",
                       "MADURO",
                       "BOLSONARO",
                       "BIDEN",
                       "LULA",
                       "BANCOCENTRAL",
                       "POLENTA",
                       "CHORIPAN",
                       "MOVILIZACION",
                       "MARCHA",
                       "CACEROLAZO",
                       "LGBTIQQ",
                       "INOPERANCIA",
                       "FEMINISMO",
                       "MUJER",
                       "ECONOMIA",
                       "FUEGO",
                       "COMBUSTIBLE",
                       "PISTOLA",
                       "ARASANJUAN",
                       "CONECTARIGUALDAD",
                       "NETBOOK",
                       "NESTOR",
                       "MENEM",
                       "PRESIDENTA"
                      ]

/**
 *  @returns {int} a random value
 */
const randomNumber = () => {
    let buffer = Math.floor(Math.random(listaPalabras.length)*100);
    if(buffer<listaPalabras.length) { return buffer; } 
    return randomNumber(); 
}

const palabra = listaPalabras[randomNumber()];
let letrasErradas = [];
let letrasCorrectas = [];
let letrasRestantes = palabra.length;


/**
 * @param {char} letra 
 * @returns 
 */
const getIndexesOfLetra = (letra) => {

    let regex = new RegExp(letra, 'gi'), result, indices = [];
    while((result = regex.exec(palabra))) { indices.push(result.index); }
    return indices;
}


/**
 * 
 * @param {HTMLElement} fatherElement 
 * @param {char} letra
 * @param {boolean} isGameWord
 * @returns 
 */
function drawLetra(fatherElement, letra, letraIndx) {
    
    letra = letra.toUpperCase();

    fatherElement.innerHTML = fatherElement.innerHTML +
       `
       <div class="letra">
       <p id="letra`+letraIndx+`" hidden> `+ letra + ` </p>
       <svg width="80" height="4" viewBox="0 0 80 4" fill="none" xmlns="http://www.w3.org/2000/svg">
           <rect width="80" height="4" rx="2" fill="#0A3871"/>
       </svg>
       </div>
    `;

}

function drawLetraErronea(letra) {
    letrasErroneasDiv.innerHTML = letrasErroneasDiv.innerHTML +
    `
    <div class="letra">
    <p> `+ letra + ` </p>
    </div>
 `;
}

function updateHorca(win=false) {
    
    if(win) {

        horca.setAttribute("src", "./img/imagenGanaste.png");
        return;
    }
    
    horca.setAttribute("src", "./img/imagen"+letrasErradas.length+".png");


}

/**
 * 
 * @param {string} word 
 */
function drawWord(word) {

    palabraDiv.innerHTML="";

    for(let i=0, wordLength=word.length; i<wordLength; i++) {
        drawLetra(palabraDiv, word[i], i);
    }    

}


/**
 * 
 * @param {char} letra 
 */
function guessLetra(letra) {


    if(letrasErradas.length == 6 || letrasRestantes == 0) {
        return;
    }
    
    if(letra === null) {
        return;
    }

    letra = letra[0].toUpperCase();

    if(!(/^[A-Z]+$/.test(letra))) {
        return;
    }

    if(palabra.includes(letra)) {

        if(letrasCorrectas.includes(letra)) {
           return; 
        }
        letrasCorrectas.push(letra);

        letraIndices = getIndexesOfLetra(letra);
        for(let i=0, letrasIndicesLength = letraIndices.length; i<letrasIndicesLength; i++) {
            document.getElementById("letra"+letraIndices[i]).removeAttribute("hidden");
        }

        letrasRestantes -= letraIndices.length;
        
        if(letrasRestantes == 0) {
            updateHorca(true);
        }


    } else {
        if(letrasErradas.includes(letra)) {
            return;
        }
        letrasErradas.push(letra);
        drawLetraErronea(letra);
        updateHorca();
    }
}

function giveUp() {
    letrasErradas.length=6;
    updateHorca();

}

window.onload = () => {


    drawWord(palabra);

    window.mobileCheck = function() {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
      };
      
      
      window.mobileAndTabletCheck = function() {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
      };
   

    if(window.mobileAndTabletCheck()) {
        document.getElementById("mobileInput").removeAttribute("hidden");
        mobileInput.style.cssText = "text-align:center; padding: 11px; width: 16rem; margin: 20px";
    }


}

window.onkeydown = (key) => {
    guessLetra(key.key);

}
