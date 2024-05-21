import { insertedValues, valuesCategory } from "./valuesDatabase.js";
import { renderizaSemValoresTodos } from "./renderSemValores.js"
const main = document.querySelector("main");
const valores = document.querySelector("div.container_valores");


function renderValor(data) {
    valores.innerHTML = "";
    const render_valor = data.map((valor) => {
        if (valor.categoryID == 0) {
            valor.categoryID = "Entrada";
        } else {
            valor.categoryID = "Saída"
        }
        
        valores.insertAdjacentHTML("afterbegin",
            `
       <div class="valorEncontrado">
        <h3 class="valor_value">R$ ${valor.value}</h3>
        <h3 class="valor_category">${valor.categoryID}</h3>
        <button class="valor_button">L</button>
       </div>
      `)
    });

    return render_valor;
}

function renderValoresTodos(data) {
    if (data.length == 0) {
        renderizaSemValoresTodos();
    } else {
        renderValor(data);
    }

}

renderValoresTodos(insertedValues);