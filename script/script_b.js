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
        const response = await fetch(API_URL);
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