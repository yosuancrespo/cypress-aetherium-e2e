describe('Open the homepage of the project and check the login URL is correct', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173')
	
	cy.wait(500);
	
    cy.url().should('eq', 'http://localhost:5173/login');
  })
})