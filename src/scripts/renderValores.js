//importações 
import { insertedValues, valuesCategory } from "./valuesDatabase.js";

const main = document.querySelector("main");
const valores = document.querySelector("div.container_valores");
const soma_total = document.querySelector("h3.soma_total");
const todos = document.querySelector("button.todos");
const entrada = document.querySelector("button.entrada");
const saida = document.querySelector("button.saida");

//FUNÇÕES CASO ESTEJA SEM VALORES
function renderizaSemValoresTodos() {
    valores.innerHTML = "";
    valores.innerHTML = `
    <div class="valorNaoEncontrado">
     <h3>Nenhum valor cadastrado</h3>
    </div>
   `;

}
function renderizaSemValoresEntrada() {
    valores.innerHTML = "";
    valores.innerHTML = `
    <div class="valorNaoEncontrado">
     <h3> Sem valores na categoria Entradas</h3>
    </div>
   `;
}

function renderizaSemValoresSaida() {
    valores.innerHTML = "";
    valores.innerHTML = `
    <div class="valorNaoEncontrado">
     <h3> Sem valores na categoria Saídas</h3>
    </div>
   `;
}

//função para renderizar valores existentes 
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
            <h3 class="valor_value">R$ ${valor.value.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h3>
            <div class="category_button">
                <h3 class="valor_category">${valor.categoryID}</h3>
                <button class="valor_button"></button>
            </div>
       </div>
      `)
    });

    return render_valor;
}

//função para renderizar todos E TELA INICIAL (clamadas de função)

function renderValoresTodos(data) {
    if (data.length == 0) {
        renderizaSemValoresTodos();
    } else {
        renderValor(data);
    }

}
renderValoresTodos(insertedValues);

//AÇÃO DE CLICK PARA TODOS
todos.addEventListener("click", () => {
    return renderValoresTodos(insertedValues);
});



//FUNÇÃO PARA RENDERIZAR SOMA DOS VALORES 

function renderSoma(data) {
    let reduz_soma = 0
    data.forEach((valor) => { reduz_soma += valor.value; });
    soma_total.innerHTML += ` ${reduz_soma.toLocaleString('pt-br', { minimumFractionDigits: 2 })}`

}

renderSoma(insertedValues);


//FUNÇÃO PARA RENDERIZAR FILTROS ENTRADA E SAIDA 