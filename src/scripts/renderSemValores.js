const main = document.querySelector("main");
const valores = document.querySelector("div.container_valores");


export function renderizaSemValoresTodos() {
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

