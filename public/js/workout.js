var Dia = 1;
var Plan = [];

sessionStorage.setItem("Plan", JSON.stringify(Plan));


function addDia (){
    //Obtenemos la fila y la longitud de las columnas
    let row = document.getElementById('filaDias');
    var dias = row.children.length;

    // Insertamos nueva celda en la posicion antes del +
    var newCell = row.insertCell(dias - 1);    
    let newButton = document.createElement("button");    
    let newText = document.createTextNode(dias);

    // Añadir atributo al boton
    newButton.setAttribute("onclick", "selectDia("+dias+")");

    // Relacionamos los elementos creados con la fila creada
    newButton.appendChild(newText);    
    newCell.appendChild(newButton);

    //Seleccionar el dia añadido
    selectDia(dias);
    //Creamos la variable de session para guardar los ejercicios proximamente
    //sessionStorage.setItem("Dia"+Dia , []);    
}

function delDia () {
    var diaText = document.getElementById("diaSelected");
    //Obtengo el dia a partir del texto
    var texto = diaText.textContent;
    var parts = texto.split(" ");
    var dia=parts[1]; // Guardamos el dia que hemos borrado

    //Obtenemos la fila
    let row = document.getElementById('filaDias');
    var l = row.children.length-1;

    // Borramos todos los numeros para ordenarlos de nuevo
    for(var i=0; i<l; i++){
        row.deleteCell(0); // eliminados el dia seleccionado
    }  


    //Generamos los dias en orden
    for(var i=0; i<l-1; i++){
        addDia(); // eliminados el dia seleccionado
    }
    selectDia(dia-1);
    //sessionStorage.removeItem("Dia"+dia);

}

function selectDia(j){

    var diaText = document.getElementById("diaSelected");
    if (j<=1){
        diaText.innerHTML="Dia " + 1;
    }else{
        diaText.innerHTML="Dia " + j;
    }
    Dia = j;
    
}

function addSerie(){
    var series = document.getElementById("series");
    var numSeries = series.children.length +1;
    
    //Creamos el contenedor div
    var newSerie = document.createElement("div");
    var inputRepes = document.createElement("input");

    inputRepes.setAttribute("type", "text");
    inputRepes.setAttribute("name", "repes");
    inputRepes.setAttribute("placeholder", "Repeticiones Serie "+numSeries);
    inputRepes.setAttribute("class", "form-control");

    //Añadimos el div al doc
    newSerie.appendChild(inputRepes);
    series.appendChild(newSerie);
    
}

function delSerie(){
    var seriesDiv = document.getElementById("series");
    var numSeries = series.children.length;
    var lastSerie = seriesDiv.lastElementChild;
    //Evitamos que se borre la serie 1
    if (numSeries > 1){
        seriesDiv.removeChild(lastSerie);
    } 
}

function addEjercicio(){

    var ejercicio = document.getElementsByName("ejercicio")[0].value;

    var intensidad = document.getElementsByName("intensidad")[0].value;

    var descanso = document.getElementsByName("descanso")[0].value;

    var pesoMin = document.getElementsByName("pesomin")[0].value;

    //Obtenemos el numero de series
    var numSeries = document.getElementById("series").children.length;
    var repes = [];

    for (var i=1; i <= numSeries; i++){

        var serie = document.getElementsByName("repes")[i-1].value;
        repes.push(serie);
    }

    const newEjercicio = {
        nombre: ejercicio,
        intensidad: intensidad,
        repes: repes,
        rest: descanso,
        pesoMin: pesoMin
    }

    //Ejecutamos saveEjercicio
    saveEjercicio(newEjercicio);
    //Ejecutamos printEjercicio
}

function printEjercicio(ejercicio, repes, intensidad,descanso,pesoMin) {
    
}
function saveEjercicio(newEjercicio) {

    //Comprobamos que no haya una variable guardada con ese nombre
    if(sessionStorage.getItem('Dia'+Dia) == null){        
        //Creamos  un sessionStorage del dia seleccionado
        sessionStorage.setItem("Dia"+Dia , JSON.stringify([]));
        console.log("No Existe");
    }else{
        console.log("Existe");
    }
    

    var dia = sessionStorage.getItem('Dia'+Dia);
    dia = JSON.parse(dia);
    // dia = JSON.parse(dia);
    
    dia.push(newEjercicio);
    console.log(dia);       

    // //Utilizamos sessionStorage para guardar daJtos
    dia = JSON.stringify(dia);
    sessionStorage.setItem("Dia"+Dia,dia);

}