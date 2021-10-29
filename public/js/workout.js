
dia = 0;

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

}

function selectDia(j){

    var diaText = document.getElementById("diaSelected");
    if (j<=1){
        diaText.innerHTML="Dia " + 1;
    }else{
        diaText.innerHTML="Dia " + j;
    }
    
}

function addSerie(){
    var serie = document.getElementById("series");
    var numSeries = serie.children.length +1;
    console.log(numSeries);
    
    //Creamos el contenedor div
    var newSerie = document.createElement("div");
    var inputSeries = document.createElement("input");
    var inputRepes = document.createElement("input");

    inputSeries.setAttribute("type", "text");
    inputSeries.setAttribute("name", "serie"+numSeries);
    inputSeries.setAttribute("placeholder", "Serie "+numSeries);
    inputSeries.setAttribute("class", "form-control");

    inputRepes.setAttribute("type", "text");
    inputRepes.setAttribute("name", "repes"+numSeries);
    inputRepes.setAttribute("placeholder", "Repeticiones");
    inputRepes.setAttribute("class", "form-control");

    //Añadimos el div al doc
    newSerie.appendChild(inputSeries);
    newSerie.appendChild(inputRepes);
    serie.appendChild(newSerie);
    
}