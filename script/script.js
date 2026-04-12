const produtos = [];
const impostos = {
 1: 0,
 2: 8,
 3: 10,
 4: 12,
 5: 17,
};

function calcularImp(quantidade, valorUnitario, tipoProduto) {
    const total = quantidade * valorUnitario;
    const percentualImp = impostos[tipoProduto];
    const imposto = (total * percentualImp) / 100;
    const valorFinal = total + imposto;
    return {
        total: total,
        imposto: imposto,
        valorFinal: valorFinal,
    }
}













function addProduto(e) { 
    e.preventDefault();
    const nome = document.getElementById("produto").value;
    const descricao = document.getElementById("caracteristicas").value;
    const preco = parseFloat(document.getElementById("valorUnitario").value);
    const medida = document.getElementById("unidade").value;
    const tipo = document.querySelector('input[name="tipoProduto"]:checked')?.value;

    if (!nome || !descricao || isNaN(preco) ||preco <=0 ||!medida || !tipo) {
        alert("preencha todos os campos corretamente.");
        return;
    }
    const novproduto = {
    id: Date.now(),
    produto: nome,
    caracteristicas: descricao,
    valorUnitario: preco,
    unidade: medida,
    tipoProduto: parseInt(tipo),
    quantidade: 1    
    };
    produtos.push(novproduto);
    document.getElementById("produtoForm").reset();
    renderizar();

    alert("Produto adicionado com sucesso!");
}   

function renderizar() {
 const listDiv = document.getElementById("produtoList");
 listDiv.innerHTML = "";
  
 if(produtos.length === 0){
    listDiv.innerHTML = "<p>Nenhum produto adicionado.</p>";
    return;

 }

 let tabela = '<table><thead><tr><th>Produto</th><th>V. Unitário</th><th>Qtd</th><th>V. Total</th><th>Imposto</th><th>Final</th><th>Ação</th></tr></thead><tbody>';
    produtos.forEach((produto) => {
       const calculos = calcularImp(produto.quantidade, produto.valorUnitario, produto.tipoProduto);
        tabela += `<tr>
            <td>${produto.produto}</td>
            <td>${produto.valorUnitario.toFixed(2)}</td>
            <td><input type="number" value="${produto.quantidade}" min="1" data-id="${produto.id}" onchange="atualizarQuantidade(this)"></td>
            <td>${calculos.total.toFixed(2)}</td>
            <td>${calculos.imposto.toFixed(2)}</td>
            <td>${calculos.valorFinal.toFixed(2)}</td>
            <td><button onclick="removerProduto(${produto.id})">Remover</button></td>
        </tr>`;
    });
    tabela += '</tbody></table>';
    listDiv.innerHTML = tabela;
}
// está sendo passado this (o elemento HTML) para a função. Dentro da função, acessa data-id para identificar qual produto mexeu
function atualizarQuantidade(input) {
    const idP = parseInt(input.dataset.id);
    const novaQ = parseInt(input.value);
    if(novaQ <= 0){
        input.value = 1;
        alert("A quantidade deve ser pelo menos 1.");
        return;
    } 
    const produto = produtos.find(p => p.id === idP);
    if (produto) {
        produto.quantidade = novaQ;
        renderizar();
    }
}

function removerProduto(id) {
    const confirmarR = confirm("Tem certeza que deseja remover este produto?");
   if(confirmarR){ 
    const index = produtos.findIndex(produto => produto.id === id);
    if (index !== -1) {
        produtos.splice(index, 1);
        renderizar();
    }
  }
}

document.getElementById("produtoForm").addEventListener("submit", addProduto);

