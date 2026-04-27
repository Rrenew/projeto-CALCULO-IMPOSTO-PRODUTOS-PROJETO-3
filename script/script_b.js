const API_URL ="http://localhost:5277/api/v1/novprodutos";
async function enviarproduto(prouto){
    try {
        const dados = {
            produto: prouto.produto,
            caracteristica: prouto.caracteristica,
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
