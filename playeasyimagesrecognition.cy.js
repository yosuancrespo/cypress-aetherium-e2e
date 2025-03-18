describe('Play easy level - identify the images to match cards', () => {
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
	
	cy.get('button.game-button').contains('Play').click();
	
    cy.get('button.difficulty-button.green').contains('Easy').click();
	
    cy.get('button.play-button').contains('Accept').click();
    
    cy.wait(3000);

    //Get all 4 card elements and alias them
    cy.get('.MuiGrid-root .MuiBox-root .css-1bkx8aw')
      .should('have.length', 4)
      .as('cards')
      .then(($cards) => {
        const cardData = [];
        Cypress._.each($cards, (card, index) => {
          //Retrieve the front image src for each card
          const src = Cypress.$(card).find('img[alt="Card front"]').attr('src');
          cardData.push({ index, src });
        });
        cy.log("Card data: " + JSON.stringify(cardData));
        
        //Determine matching pairs by comparing card src values
        const matches = [];
        for (let i = 0; i < cardData.length; i++) {
          for (let j = i + 1; j < cardData.length; j++) {
            if (cardData[i].src === cardData[j].src) {
              matches.push([cardData[i].index, cardData[j].index]);
            }
          }
        }
        cy.log("Matching pairs: " + JSON.stringify(matches));
        
        //Assert there are exactly 2 matching pairs
        expect(matches).to.have.length(2);

        cy.log("Clicking first matching pair: " + JSON.stringify(matches[0]));
        cy.get('@cards').eq(matches[0][0]).click();
        cy.get('@cards').eq(matches[0][1]).click();
        
        return cy.wait(1500).then(() => {
          cy.log("Clicking second matching pair: " + JSON.stringify(matches[1]));
          cy.get('@cards').eq(matches[1][0]).click();
          cy.get('@cards').eq(matches[1][1]).click();
        });
      })
    
        .then(() => {
          cy.log('All card pairs are processed. Expecting Congratulations page for easy level.');
          cy.wait(1500);
          cy.url().should('eq', 'http://localhost:5173/congt-easy');
      });
  });
});

