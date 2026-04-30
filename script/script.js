const produtos = [];
let produtoEditandoId = null;
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

const API_URL = "https://localhost:7297/api/v1/NovProdutoes1";

async function enviarproduto(prouto){
    try {
        const dados = {
            produto: prouto.produto,
            caracteristicas: prouto.caracteristicas,
            valorUnitario: prouto.valorUnitario,
            unidade: prouto.unidade,
            tipoProduto: prouto.tipoProduto
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
               if (response.ok) {
            const criado = await response.json(); 
            console.log("produto enviado", criado);
            return criado; 
        }
        else { console.error("erro ao enviar", response.statusText); return null;}
    } 
    catch (error) {console.error("erro na requisição", error); return null;}
}

async function listarProdutos(){
    try {
        const response= await fetch(API_URL);
        if (!response.ok) {
            console.error("Erro ao listar produtos", response.statusText);
            return [];
        }
        const produtos= await response.json();
        console.log("produtos listados",produtos);
        return produtos;
    }

    catch (error) {console.error("erro na requisição", error); return [];}
}
// por favor tome cuidado ao trabalhar com isso, já que pode da uma merda se não for feito minuciosamente.
// OBS: no nosso caso talvez nao de muito problema.
async function deletarProduto(id){
    try{
        const confirmacao= confirm("Tem certeza que deseja deletar este produto?");
        if(!confirmacao){
            console.log("deleção cancelada");
            return false;
        }

        const response= await fetch(`${API_URL}/${id}`,{
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response.ok){
            console.log("produto deletado ID:", id);
            return true;
        } else {
            console.error("erro ao deletar", response.statusText);
            return false;
        }
    }

    catch (error) {
        console.error("erro na requisição", error);
        return false;
    }
}
//mesma coisa do delete ok, tome cuidado.
async function alterarProduto(id, produtoAtualizado) {
    try{
        const dados= {
            produtoId: id,
            produto: produtoAtualizado.produto,
            caracteristicas: produtoAtualizado.caracteristicas,
            valorUnitario: produtoAtualizado.valorUnitario,
            unidade: produtoAtualizado.unidade,
            tipoProduto: produtoAtualizado.tipoProduto
        };
        const response= await fetch(`${API_URL}/${id}`,{
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        if(response.ok){
            console.log("produto alterado ID:", id);
            return true;
        } else {
            console.error("erro ao alterar", response.statusText);
            return false;
        }
    }

    catch (error) {
        console.error("erro na requisição", error);
        return false;
    }
}

// so uma cosinha mais visual
function formatarValor(valor) {return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });}

function mostrarToast(mensagem) {
    const toast = document.getElementById("toast");
    toast.textContent = mensagem;
    toast.style.display = "block";
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(-10px)";
        setTimeout(() => {
            toast.style.display = "none";
        }, 300);
    }, 2700);
}

async function addProduto(e) { 
    e.preventDefault();
    const nome = document.getElementById("produto").value;
    const descricao = document.getElementById("caracteristicas").value;
    const preco = parseFloat(document.getElementById("valorUnitario").value);
    const medida = document.getElementById("unidade").value;
    const tipo = document.querySelector('input[name="tipoProduto"]:checked')?.value;
    const btn = e.target.querySelector("button");
    const originalText = btn.textContent;

    if (!nome || !descricao || isNaN(preco) ||preco <=0 ||!medida || !tipo) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    btn.disabled = true;
    btn.textContent = "Enviando";

    if(produtoEditandoId !== null){
        const produtoAtualizado = {
            produto: nome,
            caracteristicas: descricao,
            valorUnitario: preco,
            unidade: medida,
            tipoProduto: parseInt(tipo)
    };      
    
    const AlteradoCsucesso = await alterarProduto(produtoEditandoId, produtoAtualizado);

    btn.disabled = false;
    btn.textContent = originalText;

    if (AlteradoCsucesso) {
        const index = produtos.findIndex(p => p.id === produtoEditandoId);
        if (index !== -1) {
            produtos[index] = {...produtos[index], ...produtoAtualizado};
        }
        produtoEditandoId = null;
        document.getElementById("produtoForm").reset();
        renderizar();
        mostrarToast("Produto alterado com sucesso!");
    } else {
        alert("Erro ao alterar o produto. Verifique se a API está rodando.");
    }
    return;
    }



    const novproduto = {
        id: Date.now(),
        produto: nome,
        caracteristicas: descricao,
        valorUnitario: preco,
        unidade: medida,
        tipoProduto: parseInt(tipo),
        quantidade: 1,
        oculto: false
  
    };
    
    
    const enviadoComSucesso = await enviarproduto(novproduto);

    btn.disabled = false;
    btn.textContent = originalText;
    
    

    if (enviadoComSucesso) {
        produtos.push(novproduto);
        document.getElementById("produtoForm").reset();
        renderizar();
        mostrarToast("Produto salvo no banco com sucesso!");
    } else {
        alert("Erro ao salvar no banco de dados. Verifique se a API está rodando.");
    }




    
   

    
}   

function renderizar() {
    const listDiv = document.getElementById("produtoList");
    listDiv.innerHTML = "";
 
    const visiveis = produtos.filter(p => !p.oculto);
  
    if(visiveis.length === 0){
        listDiv.innerHTML = "<p>Nenhum produto adicionado.</p>";
        return;
    }


 let tabela = '<table><thead><tr><th>Produto</th><th>V. Unitário</th><th>Qtd</th><th>V. Total</th><th>Imposto</th><th>Final</th><th>Ação</th></tr></thead><tbody>';
    let totalGeral = 0;
   visiveis.forEach((produto) => {
        const calculos = calcularImp(produto.quantidade, produto.valorUnitario, produto.tipoProduto);
        totalGeral += calculos.valorFinal;
        tabela += `<tr>
            <td>${produto.produto}</td>
            <td>${produto.valorUnitario.toFixed(2)}</td>
            <td><input type="number" value="${produto.quantidade}" min="1" data-id="${produto.id}" onchange="atualizarQuantidade(this)"></td>
            <td>${calculos.total.toFixed(2)}</td>
            <td>${calculos.imposto.toFixed(2)}</td>
            <td>${calculos.valorFinal.toFixed(2)}</td>
            <td>
                <button onclick="ocultarProduto(${produto.id})">Ocultar</button>
                <button onclick="confirmarDeletar(${produto.id})">Deletar</button>
                <button onclick="editarProduto(${produto.id})">Alterar</button>
            </td>
        </tr>`;
    });

    // a funçao era para isso :)
    tabela += `</tbody><tfoot><tr><td colspan="5">total</td><td colspan="2">${formatarValor(totalGeral)}</td></tr></tfoot></table>`;
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

function ocultarProduto(id) {
    const produto = produtos.find(p => p.id === id);
    if (produto) {
        produto.oculto = true;
        renderizar();
    }
}

async function confirmarDeletar(id) {
    const deletadoComSucesso = await deletarProduto(id);
    if (deletadoComSucesso) {
        const index = produtos.findIndex(p => p.id === id);
        if (index !== -1) produtos.splice(index, 1);
        renderizar();
        mostrarToast("Produto deletado do banco com sucesso!");
    }
}

function editarProduto(id) {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;
 
    document.getElementById("produto").value = produto.produto;
    document.getElementById("caracteristicas").value = produto.caracteristicas;
    document.getElementById("valorUnitario").value = produto.valorUnitario;
    document.getElementById("unidade").value = produto.unidade;
 
    const radio = document.querySelector(`input[name="tipoProduto"][value="${produto.tipoProduto}"]`);
    if (radio) radio.checked = true;
 
    produtoEditandoId = produto.id;
    document.querySelector("#produtoForm button[type='submit']").textContent = "Salvar Alterações";
    document.getElementById("produtoForm").scrollIntoView({ behavior: "smooth" });
}


async function inicializar() {
    const produtosDoBanco = await listarProdutos();
    produtosDoBanco.forEach(p => {
        produtos.push({
            id: p.id ?? p.produtoId ?? Date.now(),
            produto: p.produto,
            caracteristicas: p.caracteristicas,
            valorUnitario: p.valorUnitario,
            unidade: p.unidade,
            tipoProduto: p.tipoProduto,
            quantidade: p.quantidade ?? 1,
            oculto: false
        });
    });
    renderizar();
}


document.getElementById("produtoForm").addEventListener("submit", addProduto);
inicializar();
