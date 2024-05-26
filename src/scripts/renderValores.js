//importações 
import { getArray, setArray, valuesCategory } from "./valuesDatabase.js";

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
    entrada.classList.remove("ativo");
    todos.classList.add("ativo");
    saida.classList.remove("ativo");

    data.forEach((valor) => {
        const category = valor.categoryID == 0 ? "Entrada" : "Saída";

        valores.insertAdjacentHTML("afterbegin",
            `
                <div id="${valor.id}" class="valorEncontrado">
                        <h3 class="valor_value">R$ ${valor.value.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h3>
                        <div class="category_button">
                            <h3 class="valor_category">${category}</h3>
                            <button  id="${valor.id}" class="valor_button" ></button>
                        </div>
                </div>
            `);

    });
    renderSoma(data);
    adicionaClick();
}
//ENTRADA
function renderizaValoresExistentesEntradas(data) {
    entrada.classList.add("ativo");
    todos.classList.remove("ativo");
    saida.classList.remove("ativo");

    const filter = data.filter((valor) => {
        return valor.categoryID == 0;
    });

    filter.forEach((valor) => {
        const category = valor.categoryID == 0 ? "Entrada" : "Saída";
        valores.insertAdjacentHTML("afterbegin",
            `
                <div id="${valor.id}" class="valorEncontrado">
                        <h3 class="valor_value">R$ ${valor.value.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h3>
                        <div class="category_button">
                            <h3 class="valor_category">${category}</h3>
                            <button  id="${valor.id}" class="valor_button"></button>
                        </div>
                </div>
            `);
    })
    renderSoma(filter);
    adicionaClick();
}

//SAIDA
function renderizaValoresExistentesSaidas(data) {
    entrada.classList.remove("ativo");
    todos.classList.remove("ativo");
    saida.classList.add("ativo");

    const filter = data.filter((valor) => {
        return valor.categoryID == 1;
    });

    filter.forEach((valor) => {
        const category = valor.categoryID == 0 ? "Entrada" : "Saída";

        valores.insertAdjacentHTML("afterbegin",
            `
                  <div id="${valor.id}" class="valorEncontrado">
                          <h3 class="valor_value">R$ ${valor.value.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h3>
                          <div class="category_button">
                              <h3 class="valor_category">${category}</h3>
                              <button  id="${valor.id}" class="valor_button"></button>
                          </div>
                  </div>
              `);
    })
    renderSoma(filter);
    adicionaClick();
}

//função para renderizar todos E TELA INICIAL (clamadas de função)

function renderValoresTodos(data) {
    valores.innerHTML = "";
    todos.classList.add("ativo");
    if (data.length == 0) {
        renderizaSemValores("Sem valores cadastrados");
    } else {
        renderizaValoresExistentesTodos(data);
    }
}
renderValoresTodos(getArray());
//////AÇÕES DE CLICK 
//AÇÃO DE CLICK PARA TODOS
todos.addEventListener("click", () => {
    return renderValoresTodos(getArray());
});

//AÇÃO DE CLICK PARA ENTRADAS
entrada.addEventListener("click", () => {
    valores.innerHTML = "";
    if (getArray().length == 0) {
        renderizaSemValores("Sem valores na categoria Entradas");
    } else {
        renderizaValoresExistentesEntradas(getArray());
    }
});

//AÇÃO DE CLICK PARA SAIDA
saida.addEventListener("click", () => {
    valores.innerHTML = "";
    if (getArray().length == 0) {
        renderizaSemValores("Sem valores na categoria Saídas");
    } else {
        renderizaValoresExistentesSaidas(getArray());
    }
});

//FUNÇÃO PARA RENDERIZAR SOMA DOS VALORES 

function renderSoma(data) {
    let reduz_soma = 0;
    data.forEach((valor) => { reduz_soma += valor.value; });
    soma_total.innerHTML = "";
    soma_total.innerHTML += `R$ ${reduz_soma.toLocaleString('pt-br', { minimumFractionDigits: 2 })}`

}
/////// FUNÇÕES DE AÇÕES DA LICHEIRA

//             console.log(remove);
//             const insertedValue=getArray()
//             insertedValue.push({
//                 id: 4,
//                 value: 15.5,
//                 categoryID: 0,
//               })
//               setArray(insertedValue)
//             renderValoresTodos(getArray())



function adicionaClick() {
    const lixo = document.querySelectorAll(".valor_button");
    const lixoFiltrado = lixo.forEach((valor) => {
        return valor.onclick = function () { functionRemove(valor.id) };
    });
}

function functionRemove(id) {
    const insertedValue = getArray();
    const filter = insertedValue.filter((valor) => {
        return valor.id != id;
    });
    setArray(filter);
    renderValoresTodos(getArray());
}

