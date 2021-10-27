

// Leer tabla de ejercicios
var tabla = document.getElementById('tabla');
// tabla.innerHTML = '';

// tabla.innerHTML += `
// <tr>
//       <th scope="row">1</th>
//       <td>Mark</td>
//       <td>Otto</td>
//       <td>@mdo</td>
//     </tr>`

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



function selectDia(j){
    console.log("selectDia:"+ j );

    var diaText = document.getElementById("diaSelected");
    diaText.innerHTML="Dia " + j; 
}