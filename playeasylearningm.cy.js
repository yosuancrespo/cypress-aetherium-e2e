describe('Easy level learning moments test with congratulations check', () => {
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

    //Capture the card front sources
    let card0, card1, card2, card3;

    cy.log('Compare card 0 and card 1');
    cy.get('.MuiGrid-root .MuiBox-root .css-1bkx8aw').eq(0).click();
    cy.get('.MuiGrid-root .MuiBox-root .css-1bkx8aw')
      .eq(0)
      .find('img[alt="Card front"]')
      .invoke('attr', 'src')
      .then((src) => {
        card0 = src;
      });
    cy.get('.MuiGrid-root .MuiBox-root .css-1bkx8aw').eq(1).click();
    cy.get('.MuiGrid-root .MuiBox-root .css-1bkx8aw')
      .eq(1)
      .find('img[alt="Card front"]')
      .invoke('attr', 'src')
      .then((src) => {
        card1 = src;
      })
      .then(() => {
        if (card0 === card1) {
          //They match – assert visible flipped state for cards 0 & 1
          cy.get('.MuiGrid-root .MuiBox-root .css-1bkx8aw')
            .eq(0).should('have.css', 'transform', 'matrix3d(-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)');
          cy.get('.MuiGrid-root .MuiBox-root .css-1bkx8aw')
            .eq(1).should('have.css', 'transform', 'matrix3d(-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)');
          
          //Since they match, counter remains unchanged
          cy.get('.MuiBox-root.css-fx2t7r').should('contain.text', 'Learning Moments: 0');

          cy.log('Cards 0 and 1 match. Flipping cards 2 and 3.');
          cy.get('.MuiGrid-root .MuiBox-root .css-1bkx8aw').eq(2).click();
          cy.get('.MuiGrid-root .MuiBox-root .css-1bkx8aw').eq(3).click();
          //Capture card 2 and card 3 sources
          cy.get('.MuiGrid-root .MuiBox-root .css-1bkx8aw').eq(2)
            .find('img[alt="Card front"]').invoke('attr', 'src')
            .then((src) => { card2 = src; });
          cy.get('.MuiGrid-root .MuiBox-root .css-1bkx8aw').eq(3)
            .find('img[alt="Card front"]').invoke('attr', 'src')
            .then((src) => { card3 = src; })
            .then(() => {
              //Verify cards 2 and 3 match
              if (card2 === card3) {
                cy.get('.MuiGrid-root .MuiBox-root .css-1bkx8aw').eq(2)
                  .should('have.css', 'transform', 'matrix3d(-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)');
                cy.get('.MuiGrid-root .MuiBox-root .css-1bkx8aw').eq(3)
                  .should('have.css', 'transform', 'matrix3d(-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)');
                //No change to the counter
                cy.get('.MuiBox-root.css-fx2t7r').should('contain.text', 'Learning Moments: 0');
              } else {
                //If cards 2 & 3 don't match, wait for reset
                cy.wait(1500);
                cy.get('.MuiGrid-root .MuiBox-root .css-1bkx8aw').eq(2)
                  .should('have.css', 'transform', 'matrix(1, 0, 0, 1, 0, 0)');
                cy.get('.MuiGrid-root .MuiBox-root .css-1bkx8aw').eq(3)
                  .should('have.css', 'transform', 'matrix(1, 0, 0, 1, 0, 0)');
                //No match so the counter should now be incremented to 1
                cy.get('.MuiBox-root.css-fx2t7r').should('contain.text', 'Learning Moments: 1');
              }
            });
        } else {
          cy.log('Cards 0 and 1 do not match. Waiting for reset.');
          cy.wait(1500);
          cy.get('.MuiGrid-root .MuiBox-root .css-1bkx8aw').eq(0)
            .should('have.css', 'transform', 'matrix(1, 0, 0, 1, 0, 0)');
          cy.get('.MuiGrid-root .MuiBox-root .css-1bkx8aw').eq(1)
            .should('have.css', 'transform', 'matrix(1, 0, 0, 1, 0, 0)');
          //As they don't match, the counter should be incremented by 1
          cy.get('.MuiBox-root.css-fx2t7r').should('contain.text', 'Learning Moments: 1');

          cy.log('Trying match on cards 0 and 2.');
          cy.get('.MuiGrid-root .MuiBox-root .css-1bkx8aw').eq(0).click();
          cy.get('.MuiGrid-root .MuiBox-root .css-1bkx8aw').eq(2).click();
          cy.get('.MuiGrid-root .MuiBox-root .css-1bkx8aw').eq(0)
            .find('img[alt="Card front"]').invoke('attr', 'src')
            .then((src) => { card0 = src; });
          cy.get('.MuiGrid-root .MuiBox-root .css-1bkx8aw').eq(2)
            .find('img[alt="Card front"]').invoke('attr', 'src')
            .then((src) => { card2 = src; })
            .then(() => {
              if (card0 === card2) {
                cy.get('.MuiGrid-root .MuiBox-root .css-1bkx8aw').eq(0)
                  .should('have.css', 'transform', 'matrix3d(-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)');
                cy.get('.MuiGrid-root .MuiBox-root .css-1bkx8aw').eq(2)
                  .should('have.css', 'transform', 'matrix3d(-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)');
                //They match so the counter remains as 1
                cy.get('.MuiBox-root.css-fx2t7r').should('contain.text', 'Learning Moments: 1');
                cy.log('Cards 0 and 2 match, now flipping cards 1 & 3.');
                cy.get('.MuiGrid-root .MuiBox-root .css-1bkx8aw').eq(1).click();
                cy.get('.MuiGrid-root .MuiBox-root .css-1bkx8aw').eq(3).click();
              } else {
                cy.wait(1500);
                cy.get('.MuiGrid-root .MuiBox-root .css-1bkx8aw').eq(0)
                  .should('have.css', 'transform', 'matrix(1, 0, 0, 1, 0, 0)');
                cy.get('.MuiGrid-root .MuiBox-root .css-1bkx8aw').eq(2)
                  .should('have.css', 'transform', 'matrix(1, 0, 0, 1, 0, 0)');
                //No match, so the counter should now increment to 2
                cy.get('.MuiBox-root.css-fx2t7r').should('contain.text', 'Learning Moments: 2');
  
                cy.log('Cards 0 and 2 do not match, now trying cards 0 and 3.');
                cy.wait(1500);
                cy.get('.MuiGrid-root .MuiBox-root .css-1bkx8aw').eq(0).click();
                cy.get('.MuiGrid-root .MuiBox-root .css-1bkx8aw').eq(3).click();
                cy.get('.MuiGrid-root .MuiBox-root .css-1bkx8aw').eq(0)
                  .find('img[alt="Card front"]').invoke('attr', 'src')
                  .then((src) => { card0 = src; });
                cy.get('.MuiGrid-root .MuiBox-root .css-1bkx8aw').eq(3)
                  .find('img[alt="Card front"]').invoke('attr', 'src')
                  .then((src) => { card3 = src; })
                  .then(() => {
                    if (card0 === card3) {
                      cy.get('.MuiGrid-root .MuiBox-root .css-1bkx8aw').eq(0)
                        .should('have.css', 'transform', 'matrix3d(-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)');
                      cy.get('.MuiGrid-root .MuiBox-root .css-1bkx8aw').eq(3)
                        .should('have.css', 'transform', 'matrix3d(-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)');
                      //Since these cards match, counter remains unchanged
                      cy.get('.MuiBox-root.css-fx2t7r').should('contain.text', 'Learning Moments: 2');
                      cy.log('Cards 0 and 3 match; flipping the final pending pair: cards 1 and 2.');
                      cy.get('.MuiGrid-root .MuiBox-root .css-1bkx8aw').eq(1).click();
                      cy.get('.MuiGrid-root .MuiBox-root .css-1bkx8aw').eq(2).click();
                    }
                  });
              }
            });
        }
      })
      
      .then(() => {
        cy.log('All card pairs processed. Expecting Congratulations page.');
        cy.wait(1500);
        cy.url().should('eq', 'http://localhost:5173/congt-easy');
      });
  });
});