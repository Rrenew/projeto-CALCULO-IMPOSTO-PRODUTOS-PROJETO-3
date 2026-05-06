describe("cadastro de produto com API", () => {
    beforeEach(() => {
        cy.visit('http://localhost:5500/index.html')
    })
    it("cadastra produto, mostra na lista, verificar o calculo do imposto,alterar o produto e deleta o produto", ()=> {
        cy.intercept('POST','https://localhost:5277/api/v1/NovProdutoes1').as('postProduto');
        cy.intercept('GET','https://localhost:5277/api/v1/NovProdutoes1*').as('getProdutos');
        cy.intercept('DELETE','https://localhost:5277/api/v1/NovProdutoes1/*').as('deleteProduto');
        cy.intercept('PUT','https://localhost:5277/api/v1/NovProdutoes1/*').as('putProdutos'); 

        cy.get('#produto').type("mouse");
        cy.get('#caracteristicas').type("óptico");
        cy.get('#valorUnitario').type("100");
        cy.get('#unidade').select("unidade");
        cy.get('input[name="tipoProduto"][value="1"]').check();
        cy.get('button[type="submit"]').click();

        cy.wait('@postProduto'); //isso e bem alto esplicativo, esperar da post e depois get, so para garantir que ta na api :)
        cy.wait('@getProdutos');

        cy.get('#produtosList').should('contain',"mouse");
        cy.get('#produtosList').should('contain',"óptico");
        //verificar o calculo do imposto
        cy.get('#produtosList tr').last().within(() => { // deve ter uma maneira mais eficiente de fazer isso, eu suponho, mas por enquanto e tudo manual,
            cy.get('td').eq(4).should('contain','15'); // voce vai ter que botar o calculo correto blz 
        })

        cy.get('#produtosList tr').last().find('button[data-cy="editar"]').click();
        cy.get('#produto').clear().type("mouse gamer");
        cy.get('button[type="submit"]').click();

        cy.wait('@putProdutos');
        cy.wait('@getProdutos');

        cy.get('#produtosList').should('contain',"mouse gamer");

        cy.get('#produtosList tr').last().find('button[data-cy="deletar"]').click();

        cy.wait('@deleteProduto');
        cy.wait('@getProdutos');
        
        cy.get('#produtosList').should('not.contain',"mouse");
    })
})

//usa isso quando for testar
//npx cypress open

//se voce quiser testar sem a API ,pode usar o intercept do cypress para simular as respostas da API
/* 
 cy.intercept('GET', '**/NovProdutoes1*/*', {
      statusCode: 200,
      body: []
    }).as('getProdutos');

    cy.intercept('POST', '**/NovProdutoes1/*', {
      statusCode: 201,
      body: {
        produtoId: 1,
        produto: "Mock Produto",
        caracteristicas: "Mock",
        valorUnitario: 50,
        unidade: "unidade",
        tipoProduto: 1
      }
    }).as('postProduto');

    cy.intercept('PUT', '**/NovProdutoes1/*', {
      statusCode: 204
    }).as('putProduto');

    cy.intercept('DELETE', '**/NovProdutoes1/*', {
      statusCode: 204
    }).as('deleteProduto');

    cy.visit("/index.html");
  });
  */