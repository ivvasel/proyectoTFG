var Dia = 1;

if ( (sessionStorage.getItem('plan'))){
    printEjercicios();

}else{
    var plan = [];
    sessionStorage.setItem("plan", JSON.stringify(plan));
    
}


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
    //sessionStorage.removeItem("Dia"+dia);

}

function selectDia(j){

    var diaText = document.getElementById("diaSelected");
    if (j<=1){
        diaText.innerHTML="Dia " + 1;
        j=1;
    }else{
        diaText.innerHTML="Dia " + j;
    }
    Dia = j;

    printEjercicios();
    
}

// function addSerie(){
//     var series = document.getElementById("series");
//     var numSeries = series.children.length +1;
    
//     //Creamos el contenedor div
//     var newSerie = document.createElement("div");
//     var inputreps = document.createElement("input");

//     inputreps.setAttribute("type", "text");
//     inputreps.setAttribute("name", "reps");
//     inputreps.setAttribute("placeholder", "Repeticiones Serie "+numSeries);
//     inputreps.setAttribute("class", "form-control");

//     //Añadimos el div al doc
//     newSerie.appendChild(inputreps);
//     series.appendChild(newSerie);
    
// }

// function delSerie(){
//     var seriesDiv = document.getElementById("series");
//     var numSeries = series.children.length;
//     var lastSerie = seriesDiv.lastElementChild;
//     //Evitamos que se borre la serie 1
//     if (numSeries > 1){
//         seriesDiv.removeChild(lastSerie);
//     } 
// }

function addEjercicio(){

    const modal = document.getElementById("modal-workout");
    modal.style.display = "none";

    var ejercicio = document.getElementsByName("ejercicio")[0].value;
    document.getElementsByName("ejercicio")[0].value = "";

    var series = Number(document.getElementsByName("series")[0].value);
    document.getElementsByName("series")[0].value = "";

    var reps = document.getElementsByName("reps")[0].value;
    document.getElementsByName("reps")[0].value = "";

    var intensidad = document.getElementsByName("intensidad")[0].value;
    document.getElementsByName("intensidad")[0].value = "";

    var descanso = document.getElementsByName("descanso")[0].value;
    document.getElementsByName("descanso")[0].value = "";

    var pesoMin = Number(document.getElementsByName("pesomin")[0].value);
    document.getElementsByName("pesomin")[0].value = "";

    const newEjercicio = {
        nombre: ejercicio,
        series: series,
        reps: reps,
        intensidad: intensidad,
        rest: descanso,
        pesoMin: pesoMin
    }

    //Ejecutamos saveEjercicio
    saveEjercicio(newEjercicio);
    //Ejecutamos printEjercicio
    printEjercicios();
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
    
    //Obtenemos la variable de session, convertimos a array y añadimos el nuevo ejercicio
    var dia = sessionStorage.getItem('Dia'+Dia);
    dia = JSON.parse(dia);    
    dia.push(newEjercicio);

    //Guardamos el ejercicio en el dia correspondiente
    plan = sessionStorage.getItem("plan");
    plan = JSON.parse(plan);
    //Guardamos en la posición del día seleccionado
    plan[Dia-1] = dia; 
    plan = JSON.stringify(plan);
    sessionStorage.setItem("plan", plan);

    // //Utilizamos sessionStorage para guardar los datos de cada dia
    dia = JSON.stringify(dia);
    sessionStorage.setItem("Dia"+Dia,dia);
}


function printEjercicios(){
    var divLista = document.getElementById("lista");
    //Vacia la lista anteriror del HTML
    divLista.innerHTML="";
    var listaEjercicios = sessionStorage.getItem("Dia"+Dia);
    
    listaEjercicios = JSON.parse(listaEjercicios);
    
    listaEjercicios.forEach( e => {
        //Obtenemos variables de cada entrenamiento
        const nombre = e.nombre;
        const series = e.series;
        const reps = e.reps;
        const intensidad = e.intensidad;
        const pesoMin = e.pesoMin;
        const rest = e.rest;

        //Creamos los elementos de cada tarjeta
        var newCard = document.createElement("div");
        
        var newCardTitulo = document.createElement("div");
        var newCardInfo = document.createElement("div");

        var pSerie = document.createElement("p");
        pSerie.innerHTML = series;
        var pReps = document.createElement("p");
        pReps.innerHTML = reps;
        var pIntensidad = document.createElement("p");
        pIntensidad.innerHTML = intensidad;
        var pPesoMin = document.createElement("p");
        pPesoMin.innerHTML = pesoMin;
        var pRest = document.createElement("p");
        pRest.innerHTML = rest;

        // Añadimos CadTitulo
        newCardTitulo.innerHTML=nombre;


        // Relacionamos CardInfo
        newCardInfo.appendChild(pSerie);
        newCardInfo.appendChild(pReps);
        newCardInfo.appendChild(pIntensidad);
        newCardInfo.appendChild(pPesoMin);
        newCardInfo.appendChild(pRest);
        


        newCard.appendChild(newCardTitulo);
        newCard.appendChild(newCardInfo);
        divLista.appendChild(newCard);
        
        newCard.classList.add("card");
        newCardTitulo.classList.add("card-titulo");
        newCardInfo.classList.add("card-info");
    });
}

function modalForm (){
    const form =document.getElementById("modal-workout");
    form.style.display = "block";
}
window.onclick = function(event) {
    const modal = document.getElementById("modal-workout");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  } 

function sendDB(){
    datos = JSON.parse(sessionStorage.getItem("plan"));

    fetch("http://localhost:3000/workout/add", {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then(res =>{console.log(res)})
}