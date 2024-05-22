import { insertedValues, valuesCategory } from "./valuesDatabase.js";
const valores = document.querySelector("div.container_valores");
const soma_total = document.querySelector("h3.soma_total");


function renderSoma(data) {
    let reduz_soma = 0
    data.forEach((valor) => {reduz_soma += valor.value;});
    soma_total.innerHTML +=   ` ${reduz_soma.toLocaleString('pt-br', {minimumFractionDigits: 2})}`

}

renderSoma(insertedValues);