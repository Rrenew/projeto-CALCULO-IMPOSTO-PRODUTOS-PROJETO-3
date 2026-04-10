let produtos = [];

const aliquotasImposto = {
    1: 0,
    2: 8,
    3: 10,
    4: 12,
    5: 17
};
// Pega a porcentagem e calcula em cima do valor total
function calcularImposto(tipo, valorTotal) {
    const aliquota = aliquotasImposto[tipo] || 0;
    return (valorTotal * aliquota) / 100;
}
function calcularValorTotal(quantidade, valorUnitario) {
    return quantidade * valorUnitario;
}
function calcularValorFinal(valorTotal, imposto) {
    return valorTotal + imposto;
}
function formatarReal(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}
// Adiciona o produto na lista, depois renderiza a tabela
function adicionarProduto(evento) {
    evento.preventDefault();

    const produto = document.getElementById('produto').value.trim();
    const caracteristicas = document.getElementById('caracteristicas').value.trim();
    const valorUnitario = parseFloat(document.getElementById('valorUnitario').value);
    const unidade = document.getElementById('unidade').value;
    const tipoProduto = parseInt(document.querySelector('input[name="tipoProduto"]:checked')?.value);

    
    if (!produto || !caracteristicas || isNaN(valorUnitario) || valorUnitario <= 0 || !unidade || !tipoProduto) {
        alert('Preenche tudo certo ai mano');
        return;
    }

    const novoProduto = {
        id: Date.now(),
        produto: produto,
        caracteristicas: caracteristicas,
        valorUnitario: valorUnitario,
        unidade: unidade,
        tipoProduto: tipoProduto,
        quantidade: 1
    };

    produtos.push(novoProduto);
    document.getElementById('produtoForm').reset();
    renderizarProdutos();
}
// Renderiza a tabela, calculando os valores e impostos
function atualizarQuantidade(input) {
    const id = parseInt(input.dataset.id);
    let novaQuantidade = parseInt(input.value);

    // Impede quantidade maluca ou de estrapolar
    if (isNaN(novaQuantidade) || novaQuantidade < 1) {
        novaQuantidade = 1;
        input.value = 1;
    }

    const produto = produtos.find(p => p.id === id);
    if (produto) {
        produto.quantidade = novaQuantidade;
        renderizarProdutos();
    }
}
function removerProduto(id) {
    if (confirm('Remove esse produto mesmo?')) {
        produtos = produtos.filter(p => p.id !== id);
        renderizarProdutos();
    }
}