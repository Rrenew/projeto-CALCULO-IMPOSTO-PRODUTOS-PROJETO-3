describe("cadastro de produto", () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/index.html')
    })
    it("cadastra produto e mostra na lista ", ()=> {
        // Preenche o formulário de cadastro
        cy.get('#produto').type("notebook");
        cy.get('#caracteristicas').type("16GB RAM, 512GB SSD");
        cy.get('#valorUnitario').type("3500");
        cy.get('#unidade').select("unidade");
        cy.get('input[name="tipoProduto"][value="2"]').check()
        cy.get('button[type="submit"]').click();
        // Verifica se o produto foi adicionado à lista
        cy.get('#produtosList').should('contain',"notebook");
        cy.get('#produtosList').should('contain',"16GB RAM, 512GB SSD");
    })
})

//usa isso depois quando for testar 
//cd "c:caminho da pasta do projeto"
//npm run cypress:open