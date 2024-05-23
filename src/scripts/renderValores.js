//importações 
import { insertedValues, valuesCategory } from "./valuesDatabase.js";

//declarações
const main = document.querySelector("main");
const valores = document.querySelector("div.container_valores");
const soma_total = document.querySelector("h3.soma_total");
const todos = document.querySelector("button.todos");
const entrada = document.querySelector("button.entrada");
const saida = document.querySelector("button.saida");

//FUNÇÕES CASO ESTEJA SEM VALORES
function renderizaSemValores(title) {

    valores.innerHTML = `
    <div class="valorNaoEncontrado">
     <h3>${title}</h3>
    </div>
   `;
}

//função para renderizar valores existentes 
//TODOS
function renderizaValoresExistentesTodos(data) {
    data.forEach((valor) => {
        const category = valor.categoryID == 0 ? "Entrada" : "Saída";

        valores.insertAdjacentHTML("afterbegin",
            `
                <div class="valorEncontrado">
                        <h3 class="valor_value">R$ ${valor.value.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h3>
                        <div class="category_button">
                            <h3 class="valor_category">${category}</h3>
                            <button class="valor_button"></button>
                        </div>
                </div>
            `);

    });
    renderSoma(data);
}
//ENTRADA
function renderizaValoresExistentesEntradas(data) {
    const filter = data.filter((valor) => {
        return valor.categoryID == 0;
    });

    filter.forEach((valor) => {
        const category = valor.categoryID == 0 ? "Entrada" : "Saída";
        valores.insertAdjacentHTML("afterbegin",
            `
                <div class="valorEncontrado">
                        <h3 class="valor_value">R$ ${valor.value.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h3>
                        <div class="category_button">
                            <h3 class="valor_category">${category}</h3>
                            <button class="valor_button"></button>
                        </div>
                </div>
            `);
    })

    renderSoma(filter);
}

//SAIDA
function renderizaValoresExistentesSaidas(data) {
    const filter = data.filter((valor) => {
        return valor.categoryID == 1;
    });

    filter.forEach((valor) => {
        const category = valor.categoryID == 0 ? "Entrada" : "Saída";
        valores.insertAdjacentHTML("afterbegin",
            `
                  <div class="valorEncontrado">
                          <h3 class="valor_value">R$ ${valor.value.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h3>
                          <div class="category_button">
                              <h3 class="valor_category">${category}</h3>
                              <button class="valor_button"></button>
                          </div>
                  </div>
              `);
    })

    renderSoma(filter);
}

//função para renderizar todos E TELA INICIAL (clamadas de função)

function renderValoresTodos(data) {
    valores.innerHTML = "";
    if (data.length == 0) {
        renderizaSemValores("Sem valores cadastrados");
    } else {
        renderizaValoresExistentesTodos(data);
    }

}
renderValoresTodos(insertedValues);

//AÇÃO DE CLICK PARA TODOS
todos.addEventListener("click", () => {
    return renderValoresTodos(insertedValues);
});

//AÇÃO DE CLICK PARA ENTRADAS
entrada.addEventListener("click", () => {
    valores.innerHTML = "";
    if (insertedValues.length == 0) {
        renderizaSemValores("Sem valores na categoria Entradas");
    } else {
        renderizaValoresExistentesEntradas(insertedValues);
    }
});

//AÇÃO DE CLICK PARA SAIDA
saida.addEventListener("click", () => {
    valores.innerHTML = "";
    if (insertedValues.length == 0) {
        renderizaSemValores("Sem valores na categoria Saídas");
    } else {
        renderizaValoresExistentesSaidas(insertedValues);
    }
});

//FUNÇÃO PARA RENDERIZAR SOMA DOS VALORES 

function renderSoma(data) {
    let reduz_soma = 0
    data.forEach((valor) => { reduz_soma += valor.value; });
    soma_total.innerHTML = "";
    soma_total.innerHTML += `R$ ${reduz_soma.toLocaleString('pt-br', { minimumFractionDigits: 2 })}`

}
