const produtos = [];
const form = document.getElementById('produtoForm');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const produto = document.getElementById('produto').value.trim();
    const caracteristicas = document.getElementById('caracteristicas').value.trim();
    const valorUnitario = parseFloat(document.getElementById('valorUnitario').value);
    const unidade = document.getElementById('unidade').value;
    const tipoProduto = document.querySelector('input[name="tipoProduto"]:checked')?.value

    if (!produto.trim()) {
        alert('O campo "Produto" não pode estar vazio.');
        return;
    }
    if (!caracteristicas.trim()) {
        alert('O campo "Características" não pode estar vazio.');
        return;
    }
    if (isNaN(valorUnitario) || valorUnitario <= 0) {
        alert('O campo "Valor Unitário" deve ser um número maior que zero.');
        return;
    }
    if (!unidade) {
        alert('Selecione uma unidade válida.');
        return;
    }
    if (!tipoProduto) {
        alert('Selecione um tipo de produto.');
        return;
    }

    const novoProduto = {
        produto,
        caracteristicas,
        valorUnitario,
        unidade,
        tipoProduto
    };

    produtos.push(novoProduto);
    form.reset();
});
