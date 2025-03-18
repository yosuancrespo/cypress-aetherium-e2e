describe('Open the register page of the project and check the register URL is correct', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173')
	
	cy.get('button[type="button"]').click();
	
	cy.wait(500);
	
    cy.url().should('eq', 'http://localhost:5173/register');
  })
})