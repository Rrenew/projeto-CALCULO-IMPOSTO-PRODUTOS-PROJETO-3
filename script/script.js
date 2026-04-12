const produtos = [];
const impostos = {
 1: 0,
 2: 8,
 3: 10,
 4: 12,
 5: 17,
};

function addProduto() { 
    e.preventDefault();
    const nome = document.getElementById("produto").value;
    const descricao = document.getElementById("caracteristicas").value;
    const preco = parseFloat(document.getElementById("preco").value);
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


