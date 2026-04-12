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
    const Novproduto = {
    id: Date.now(),
    produto: nome,
    caracteristicas: descricao,
    valorUnitario: preco,
    unidade: medida,
    tipoProduto: parseInt(tipo),
    quantidade: 1    
    };
    produtos.push(Novproduto);
    document.getElementById("produtoForm").reset();
    renderizar();
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
        const total = produto.quantidade * produto.valorUnitario;
        const imposto = (total * impostos[produto.tipoProduto]) / 100;
        const valorFinal = total + imposto;
        tabela += `<tr>
            <td>${produto.produto}</td>
            <td>${produto.valorUnitario.toFixed(2)}</td>
            <td><input type="number" value="${produto.quantidade}" min="1" data-id="${produto.id}" onchange="atualizarQuantidade(this)"></td>
            <td>${total.toFixed(2)}</td>
            <td>${imposto.toFixed(2)}</td>
            <td>${valorFinal.toFixed(2)}</td>
            <td><button onclick="removerProduto(${produto.id})">Remover</button></td>
        </tr>`;
    });
    tabela += '</tbody></table>';
    listDiv.innerHTML = tabela;
}

function atualizarQuantidade(input) {
    const idP = parseInt(input.dataset.id);
    const novaQ = parseInt(input.value);
    if(novaQ <= 0){
        input.value = 1;
        return;
    } 
    const produto = produtos.find(p => p.id === idP);
    if (produto) {
        produto.quantidade = novaQ;
        renderizar();
    }
}

function removerProduto(id) {
    const index = produtos.findIndex(produto => produto.id === id);
    if (index !== -1) {
        produtos.splice(index, 1);
        renderizar();
    }
}

document.getElementById("produtoForm").addEventListener("submit", addProduto);

