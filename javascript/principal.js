const formulario = document.getElementById('formulario');
const lista = document.getElementById("lista-compras");
const infoLista = document.querySelector('.info-lista p');
const btn_Limpartudo = document.querySelector('.limpar-tudo');
const total = document.querySelector('.total');
const table = document.querySelector('.tabela table');
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((elemento) => {
    criaElemento(elemento);
    total.innerHTML = "R$" + somaTotal().toFixed(2);
    infoLista.innerHTML = "Itens: " + itens.length;
})


//formulario
formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const produto = evento.target.elements['produto'];
    const quantidade = evento.target.elements['quantidade'];
    const valor = evento.target.elements['valor'];

    const existe = itens.find(elemento => elemento.produto === primeiraLetraMaiuscula(produto.value));

    const itemAtual = {
        id: itens.length,
        produto: primeiraLetraMaiuscula(produto.value),
        quantidade: quantidade.value,
        valor: parseFloat(valor.value).toFixed(2) ,
    }

    
    if (existe) {
        itemAtual.id = existe.id;
        itemAtual.valorTotal = itemAtual.quantidade * itemAtual.valor.replace(',', '.');
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
        atualizaElemento(itemAtual);
    } else {
        criaElemento(itemAtual);
        itens.push(itemAtual);
    }

    localStorage.setItem("itens", JSON.stringify(itens));
    total.innerHTML = "R$" + somaTotal().toFixed(2);
    infoLista.innerHTML = "Itens: " + itens.length;

    produto.value = "";
    quantidade.value = "";
    valor.value = "";
    document.getElementById('adicionar').value = 'Adicionar';
    document.getElementById('produto').removeAttribute('disabled', "");
})

//cria novo item
function criaElemento(item) {
    item.valorTotal = (item.quantidade * item.valor.replace(',', '.')).toFixed(2);
    //Lista do carrinho
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');
    novoItem.dataset.iditem = item.id;
    novoItem.innerHTML = `
            <strong class="item__quantidade" data-quantidade="${item.id}">${item.quantidade}</strong>
            <strong class="item__nome-produto" data-produto="${item.id}">${item.produto}</strong>
            <strong class="item__valor-unitario" data-valor="${item.id}">R$${item.valor}</strong>
            <strong class="item__valor-total-produtos" data-total="${item.id}">R$${item.valorTotal}</strong>
    `
    novoItem.appendChild(botaoAlteraItem());
    novoItem.appendChild(botaoDeleta(item.id));
    lista.appendChild(novoItem);

    const quantidadeItens = document.createElement('div');
    quantidadeItens.classList.add('quantidadeItens');
    quantidadeItens.innerHTML = "Itens: " +  itens.length;

    // cria linha com itens e adiciona na tabela
    const linha_tabela = document.createElement('tr');
    linha_tabela.dataset.idLinhaTabela=  item.id;
    linha_tabela.innerHTML = `
            <td data-tabela-quantidade="${item.id}">${item.quantidade}</td>
            <td data-tabela-produto="${item.id}">${item.produto}</td>
            <td data-tabela-valor="${item.id}">R$${item.valor}</td>
            <td data-tabela-total="${item.id}">R$${item.valorTotal}</td>
    `
    table.appendChild(linha_tabela);
}

//função atualiza item
function atualizaElemento(item) {
    document.querySelector("[data-quantidade = '" + item.id + "']").innerHTML = item.quantidade;
    document.querySelector("[data-valor = '" + item.id + "']").innerHTML = `R$${item.valor}`;
    document.querySelector("[data-total = '" + item.id + "']").innerHTML = `R$${item.valorTotal.toFixed(2)}`;
    document.querySelector("[data-tabela-quantidade = '"+item.id+"']").innerHTML = itens[item.id].quantidade;
    document.querySelector("[data-tabela-valor = '"+item.id+"']").innerHTML = itens[item.id].valor;
    document.querySelector("[data-tabela-total = '"+item.id+"']").innerHTML = itens[item.id].valorTotal;
}

//btn alterar
function botaoAlteraItem(){
    const botao = document.createElement('button');
    botao.innerHTML = `<i class="fa-solid fa-file-pen btn-alterar"></i>`;
    botao.classList.add('alteraItem');

    botao.addEventListener('click', function(){
        document.getElementById('adicionar').value = 'Alterar';
        document.getElementById('quantidade').value = botao.parentNode.children[0].innerHTML;
        document.getElementById('produto').setAttribute('disabled', "");
        document.getElementById('produto').value = botao.parentNode.children[1].innerHTML;
        var conteudoElemento = botao.parentNode.children[2].textContent;
        var conteudoExtraido = conteudoElemento.split("R$");
        document.getElementById('valor').value = conteudoExtraido[1];
    })

    return botao;
}

//btn deletar
function botaoDeleta(id) {
    const botao = document.createElement('button');
    botao.innerHTML = `<i class="fa-solid fa-trash-can btn-deletar"></i>`;
    botao.classList.add('deletaItem');

    botao.addEventListener('click', function () {
        deletaItem(botao.parentNode, id);
        total.innerHTML = "R$" + somaTotal().toFixed(2);
        infoLista.innerHTML = "Itens: " + itens.length;
        document.getElementById('quantidade').value = "";
        document.getElementById('produto').removeAttribute('disabled', "");
        document.getElementById('produto').value = "";
        document.getElementById('valor').value = "";
        document.getElementById('adicionar').value = 'Adicionar';
    })
    return botao;
}

// função deletar item
function deletaItem(tag, id) {
    tag.remove();
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);
    table.removeChild(document.querySelector("[data-id-linha-tabela = '"+id+"']"));
    localStorage.setItem("itens", JSON.stringify(itens));
}

// função soma total de itens
function somaTotal(){
    let soma = 0;
    for(var i=0;i<itens.length;i++){
        soma += parseFloat(itens[i].valorTotal);
    }
    return soma;
}

//função  deixa apenas primeira letra maiúscula
function primeiraLetraMaiuscula(nomeProduto){
    const palavras = nomeProduto.split(" ");
    const novo = palavras.map((palavra)=>{
        return palavra[0].toUpperCase() + palavra.substring(1);
    }).join(" ");

    return novo;
}

//btn limpa tudo
btn_Limpartudo.addEventListener('click', ()=>{
    localStorage.clear();
    window.location.reload();
});

infoLista.innerHTML = "Itens: " + itens.length;