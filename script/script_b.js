const API_URL = "https://localhost:5277/api/v1/NovProdutoes1";

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
        if (response.ok) { console.log("produto enviado", dados); return true;}
        else { console.error("erro ao enviar", response.statusText); return false;}
    } 
    catch (error) {console.error("erro na requisição", error); return false;}
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

        const response= await fetch('${API_URL}/${id}',{
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
        const response= await fetch('${API_URL}/${id}',{
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