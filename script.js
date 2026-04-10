function renderizarProdutos() {
    const produtosList = document.getElementById('produtosList');
    produtosList.innerHTML = '';
    // Se não tiver nenhum produto, mostra uma mensagem
    if (produtos.length === 0) {
        produtosList.innerHTML = '<p>Nenhum produto cadastrado ainda</p>';
        return;
    }

    const tabela = document.createElement('table');
    tabela.className = 'tabela-produtos';
 
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <table>
            <th>Produto</th>
            <th>V. Unitário</th>
            <th>Unidade</th>
            <th>Tipo</th>
            <th>Qtd</th>
            <th>V. Total</th>
            <th>V. Imposto</th>
            <th>V. Final</th>
            <th>Ação</th>
        </tr>
    `;
    tabela.appendChild(thead);

    const tbody = document.createElement('tbody');

    // Pra cada produto no array, calcula os valores e monta uma linha
    produtos.forEach(prod => {
        const valorTotal = calcularValorTotal(prod.quantidade, prod.valorUnitario);
        const imposto = calcularImposto(prod.tipoProduto, valorTotal);
        const valorFinal = calcularValorFinal(valorTotal, imposto);

        const tr = document.createElement('tr');
        
        // Se for tipo 1 (isento), marca a linha com uma classe diferente
        if (prod.tipoProduto === 1) {
            tr.className = 'isento';
        }

        tr.innerHTML = `
            <td>${prod.produto}</td>
            <td>${formatarReal(prod.valorUnitario)}</td>
            <td>${prod.unidade}</td>
            <td>Tipo ${prod.tipoProduto}</td>
            <td>
                <input type="number" min="1" value="${prod.quantidade}" class="input-quantidade" data-id="${prod.id}">
            </td>
            <td>${formatarReal(valorTotal)}</td>
            <td>${formatarReal(imposto)}</td>
            <td>${formatarReal(valorFinal)}</td>
            <td>
                <button class="btn-remover" data-id="${prod.id}">Remover</button>
            </td>
        `;

        tbody.appendChild(tr);
    });

    tabela.appendChild(tbody);
    produtosList.appendChild(tabela);

    // Depois que a tabela ta na tela, conecta os eventos dos inputs e botoes
    document.querySelectorAll('.input-quantidade').forEach(input => {
        input.addEventListener('change', function() {
            atualizarQuantidade(this);
        });
    });
 
    document.querySelectorAll('.btn-remover').forEach(btn => {
        btn.addEventListener('click', function() {
            removerProduto(parseInt(this.dataset.id));
        });
    });
}