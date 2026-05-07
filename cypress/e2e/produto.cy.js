describe("cadastro de produto com API", () => {
    beforeEach(() => {
        cy.visit('/projeto-CALCULO-IMPOSTO-PRODUTOS-PROJETO-3/index.html');
    })
    it("cadastra produto, mostra na lista, verificar o calculo do imposto,alterar o produto e deleta o produto", ()=> {
        cy.intercept('POST','https://localhost:7297/api/v1/NovProdutoes1').as('postProduto');
        cy.intercept('GET','https://localhost:7297/api/v1/NovProdutoes1*').as('getProdutos');
        cy.intercept('DELETE','https://localhost:7297/api/v1/NovProdutoes1/*').as('deleteProduto');
        cy.intercept('PUT','https://localhost:7297/api/v1/NovProdutoes1/*').as('putProdutos'); 

        cy.get('#produto').type("mouse");
        cy.get('#caracteristicas').type("óptico");
        cy.get('#valorUnitario').type("100");
        cy.get('#unidade').select("unidade");
        cy.get('input[name="tipoProduto"][value="5"]').check();
        cy.get('button[type="submit"]').click();
        
        cy.wait('@postProduto',);
        cy.wait(1000); //isso e bem alto esplicativo, esperar da post e depois get, so para garantir que ta na api :)
        //cy.wait('@getProdutos',);
        

        cy.contains('#produtoList tr','mouse');
        //verificar o calculo do imposto
        cy.get('#produtoList tr', 'mouse').within(() => { // deve ter uma maneira mais eficiente de fazer isso, eu suponho, mas por enquanto e tudo manual,
            cy.get('td').eq(4).should('contain','17'); // voce vai ter que botar o calculo correto blz 
        })

        cy.contains('#produtoList tr', 'mouse').find('button[data-cy="editar"]').click();
        cy.get('#produto').clear().type("mouse gamer");
        cy.get('button[type="submit"]').click();
        
        cy.wait('@putProdutos');
        cy.wait(1000);
        
        cy.get('#produtoList').should('contain',"mouse gamer");

        cy.get('#produtoList tr').last().find('button[data-cy="deletar"]').click();
        
        cy.wait('@deleteProduto');
        cy.wait(1000);
        
        cy.get('#produtoList').should('not.contain',"mouse gamer");
    })
})

//usa isso quando for testar
//npx cypress open

//se voce quiser testar sem a API ,pode usar o intercept do cypress para simular as respostas da API
/* 
 cy.intercept('GET', '**//*', {
      statusCode: 200,
      body: []
    }).as('getProdutos');

    cy.intercept('POST', '**//*', {
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

    cy.intercept('PUT', '**//*', {
      statusCode: 204
    }).as('putProduto');

    cy.intercept('DELETE', '**//*', {
      statusCode: 204
    }).as('deleteProduto');

    cy.visit("/index.html");
  });
  */

 /* import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://127.0.0.1:5500",
  },
});*/