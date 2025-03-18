describe('Register and Login with Random Credentials', () => {
  it('passes', () => {
    
    const randomNum = Cypress._.random(1000, 9999);
    const username = `testuser${randomNum}`;
    const password = `Pass${randomNum}`;
    
    cy.visit('http://localhost:5173/register');

    cy.get('input[placeholder="Username"]').clear().type(username);
    cy.get('input[placeholder="Password"]').clear().type(password);

    cy.get('button[type="submit"]').click();

    cy.contains('User registered successfully',{ timeout: 1000 }).should('be.visible');

    cy.visit('http://localhost:5173');

    cy.get('input[placeholder="Username"]').clear().type(username);
    cy.get('input[placeholder="Password"]').clear().type(password);
	
    cy.get('button[type="submit"]').click();

    cy.get('button.game-button', { timeout: 1000 }).should('be.visible');
  });
});