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
   * Ensures input number of todo tasks are rendered
   */
  it('should have three todo tasks', () => {
    cy
      .get('[class=list-container]')
      .children()
      .should('have.length', 3);
  });

  /**
   * Test that clicking check mark completes an task
   */
  it('should mark complete', () => {
    cy
      .get('[class=complete-icon]')
      .children()
      .should('have.class', 'fa-square');
    cy
      .get('[class=complete-icon]')
      .click({ multiple: true });

    cy
      .get('[class=complete-icon]')
      .children()
      .should('have.class', 'fa-check-square');
  });

  /**
   * Test whether 'x' button removes tasks
   */
  it('should remove task', () => {
    cy
      .get('[class=list-container]')
      .children()
      .should('have.length', 3);

    cy
      .get('[class=remove-task-button]')
      .first()
      .click();

    cy
      .get('[class=list-container]')
      .children()
      .should('have.length', 2);
  });

  /**
   * Test sorting functionality based on type
   */
  it('should sort', () => {
    cy
      .get('[class=type-pill]')
      .children()
      .first()
      .contains('quiz');

    cy
      .get('[id=sort-button]')
      .click();

    cy
      .get('[class=type-pill]')
      .children()
      .first()
      .contains('exam');

    cy
      .get('[id=sort-button]')
      .click();

    cy
      .get('[class=type-pill]')
      .children()
      .first()
      .contains('assignment');
  });
});
