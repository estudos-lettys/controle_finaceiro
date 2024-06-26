//importações 
import { getArray, setArray, valuesCategory } from "./valuesDatabase.js";

//declarações
const main = document.querySelector("main");
const valores = document.querySelector("div.container_valores");
const soma_total = document.querySelector("h3.soma_total");
const todos = document.querySelector("button.todos");
const entrada = document.querySelector("button.entrada");
const saida = document.querySelector("button.saida");
const button_registro = document.querySelector(".button_header");
const registro_modal = document.querySelector(".registro");
const dialog = document.querySelector("dialog");

//FUNÇÕES CASO ESTEJA SEM VALORES
function renderizaSemValores(title, button_ativo, button_desativo1, button_desativo2) {
    valores.innerHTML = `
    <div class="valorNaoEncontrado">
     <h3>${title}</h3>
    </div>
   `;
    button_desativo1.classList.remove("ativo");
    button_ativo.classList.add("ativo");
    button_desativo2.classList.remove("ativo");
    renderSoma(getArray());
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
        renderizaSemValores("Sem valores cadastrados", todos, entrada, saida);
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
        renderizaSemValores("Sem valores na categoria Entradas", entrada, todos, saida);
    } else {
        renderizaValoresExistentesEntradas(getArray());
    }
});

//AÇÃO DE CLICK PARA SAIDA
saida.addEventListener("click", () => {
    valores.innerHTML = "";
    if (getArray().length == 0) {
        renderizaSemValores("Sem valores na categoria Saídas", saida, todos, entrada);
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

//FUNÇÕES DE AÇÕES DA LICHEIRA
function adicionaClick() {
    const lixo = document.querySelectorAll(".valor_button");
    lixo.forEach((valor) => {
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

///RENDERIZAR MODAL DE REGISTRO DE VALORES 


registro_modal.innerHTML = `
    <div class="container_modal">
        <div class="header_modal">
            <h2 class="titulo_modal">Registro de valor</h2>
            <button class="fechar_modal"></button>
        </div>

        <h3 class="text_modal">Digite o valor e em seguida aperte no botão referente ao tipo do valor</h3>

        <div id="formulario" class="form_modal">
            <div class="input_number">
                <label for="valor" class="label_modal">Valor</label>
                <input id="valor" class="input_modal" type="number" placeholder="R$ 0,00" />
            </div>

            <div class="tipo">
                <label for="tipo" class="label_tipo">Tipo de valor</label>
                <input type="radio" value="Entrada" id="0" class="input_button"/>
                <label class="entrada label" for="0"> <span>Entrada</span>  </label>
                <input type="radio" value="Saída"  id="1" class="input_button" checked/>
                <label class="saida label" for="1"> <span>Saída</span> </label>
            </div>

            <div class="buttons_submits">
                <button class="cancelar">Cancelar</button>
                <button  class="inserir_valor">Inserir valor</button>
        </div>
        </div>
    </div>
`

const fechar = document.querySelector(".fechar_modal");
const cancelar = document.querySelector(".cancelar");



///EVENTOS DE CLICK PARA ABRIR E FECHAR O MODAL
button_registro.addEventListener("click", () => {
    dialog.classList.remove("close");
    dialog.classList.add("open");

    dialog.showModal();
});

fechar.addEventListener("click", () => {
    dialog.classList.remove("open");
    dialog.classList.add("close");
    dialog.close();
});

cancelar.addEventListener("click", () => {
    dialog.classList.remove("open");
    dialog.classList.add("close");
    dialog.close();
});

///FUNÇÃO PARA ADICIONAR NOVOS VALORES NA LISTA(ainda em desenvolvimento )
// const formulario = document.getElementById('formulario');
// const valor = document.querySelector(".input_modal");
// const submit = document.querySelector(".inserir_valor");
// const newObject = new Object();

// submit.addEventListener("click", () => {


//     const valor_input = document.getElementById('valor').value;
//     const tipo = document.querySelectorAll(".input_button");

//     // tipo.forEach((valor) => { valor.onclick = function () { functionlog(valor.id) }; });
//     tipo.forEach((valor) => { valor.onclick = function () { console.log(valor, valor.checked);}; });


//     function functionlog(categoryid) {
//         const insertedValue = getArray();
//         const index = parseInt(insertedValue[insertedValue.length - 1].id + 1);

//         newObject.id = parseInt(index);
//         newObject.value = parseFloat(valor_input);
//         newObject.categoryID = parseInt(categoryid);
//         insertedValue.push(newObject);
//         setArray(insertedValue);
//         renderValoresTodos(getArray());
//     }
//     // dialog.classList.remove("open");
//     // dialog.classList.add("close");
//     // dialog.close();
// });



// ///modal
// /////             console.log(remove);
// //             const insertedValue=getArray()
// //             insertedValue.push({
// //                 id: 4,
// //                 value: 15.5,
// //                 categoryID: 0,
// //               })
// //               setArray(insertedValue)
// //             renderValoresTodos(getArray())

