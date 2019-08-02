// https://docs.cypress.io/api/introduction/api.html

describe('root tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  /**
   * Ensures app has loaded properly
   */
  it('Visits the app root url', () => {
    cy.contains('h1', 'Your Amazing ToDo List');
  });

  /**
   * Ensures input number of todo items are rendered
   */
  it('should have three todo items', () => {
    cy
      .get('[class=list-container]')
      .children()
      .should('have.length', 3)
  });

  /**
   * Test that clicking check mark completes an item
   */
  it('should mark complete', () => {
    cy
      .get('[class=complete-icon]')
      .children()
      .should('have.class', 'fa-square')
    cy
      .get('[class=complete-icon]')
      .click({multiple: true})

    cy
      .get('[class=complete-icon]')
      .children()
      .should('have.class', 'fa-check-square')
  });

  /**
   * Test whether 'x' button removes items
   */
  it('should remove item', () => {
    cy
      .get('[class=list-container]')
      .children()
      .should('have.length', 3)

    cy
      .get('[class=remove-item-button]')
      .first()
      .click()

    cy
      .get('[class=list-container]')
      .children()
      .should('have.length', 2)
  });

  /**
   * Test sorting functionality based on priority
   */
  it('should sort', () => {
    cy
      .get('[class=priority-pill]')
      .children()
      .first()
      .contains('important');

    cy
      .get('[id=sort-button]')
      .click()

    cy
      .get('[class=priority-pill]')
      .children()
      .first()
      .contains('life changing');

    cy
      .get('[id=sort-button]')
      .click()

    cy
      .get('[class=priority-pill]')
      .children()
      .first()
      .contains('meh');
  });
});
