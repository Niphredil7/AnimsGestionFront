import {faker} from "@faker-js/faker"

const email = faker.internet.email()

describe('Should redirect to dashboard', () => {
  beforeEach(()=> {
    cy.visit("http://localhost:5173")
  })
   it('Should display landingPage', () => {
    cy.get('[data-cy="signin-button-header"]').should('exist')
    cy.get('[data-cy="link-signup"]').should("exist")
    cy.get('[data-cy="signin-button-header"]').click()
    cy.url().should('include','/signin')
  })

  it('Should alert when errors on signin', ()=>{
    cy.get('[data-cy="signin-button-header"]').click()
    cy.url().should('include','/signin')
    cy.get('input[role="email"]').type('email@email.com')
    cy.get('input[role="password"]').type('azertyazerty')
    cy.get('[data-cy="signin-button"]').click()
    cy.contains("Connexion échouée").should('be.visible')
  })

  it('Should alert when error on email signup', ()=>{
    cy.get('[data-cy="link-signup"]').click()
    cy.url().should('include','/signup')
    cy.get('[data-cy="signup-button"]').click()
    cy.get('input[role="username').type("Marie")
    cy.get('input[role="email"]').type('email-email.com')
    cy.get('input[role="password"]').type('azertyazerty')
    cy.get('input[role="confirmPassword"]').type('azertyazerty')
    cy.get('input[role="city"]').type('Le Mans')
    cy.get('[data-cy="signup-button"]').click()
    cy.get('input[role="email"]').invoke('prop', 'validity').its('valid').should('be.false')
  })

  it('Should alert when error on password signup', ()=>{
    cy.get('[data-cy="link-signup"]').click()
    cy.url().should('include','/signup')
    cy.get('[data-cy="signup-button"]').click()
    cy.get('input[role="username').type("Marie")
    cy.get('input[role="email"]').type('email@email.com')
    cy.get('input[role="password"]').type('Qsdfg1234*')
    cy.get('input[role="confirmPassword"]').type('Qsdfg1234')
    cy.get('input[role="city"]').type('Le Mans')
    cy.get('[data-cy="signup-button"]').click()
  })

   it('Should signup', ()=>{
    cy.get('[data-cy="link-signup"]').click()
    cy.url().should('include','/signup')
    cy.get('[data-cy="signup-button"]').click()
    cy.get('input[role="username').type("Marie")
    cy.get('input[role="email"]').type(email)
    cy.get('input[role="password"]').type('Qsdfg1234*')
    cy.get('input[role="confirmPassword"]').type('Qsdfg1234*')
    cy.get('input[role="city"]').type('Le Mans')
    cy.get('[data-cy="signup-button"]').click()
    cy.contains("Création de compte réussie").should('exist')
    cy.url().should('include','/signin')
  })

  it('Should signin', ()=>{
    cy.get('[data-cy="signin-button-header"]').click()
    cy.url().should('include','/signin')
    cy.get('input[role="email"]').type("test@test.com")
    cy.get('input[role="password"]').type('Azerty1234*')
    cy.get('[data-cy="signin-button"]').click()
    cy.contains("Connexion réussie").should('exist')
  })

  it('Should open planning modal when clicking plus button', () => {
  cy.get('[data-cy="signin-button-header"]').click()
  cy.url().should('include', '/signin')
  cy.get('input[role="email"]').type("test@test.com")
  cy.get('input[role="password"]').type('Azerty1234*')
  cy.get('[data-cy="signin-button"]').click()
  cy.contains("Connexion réussie").should('exist')
  cy.url().should('include', '/dashboard') 

  // cy.intercept('GET', '**/planning-activities*').as('getPlanning')
  // cy.wait('@getPlanning')

  cy.get('[data-cy="planning-create-Lundi-Matin"]').click()
  cy.contains("Nom de l'activité").should('exist') 
  cy.contains("Ajouter").should('exist') // bouton
  cy.contains("Lundi").should('exist')   // titre de la modale
  cy.get('input[role="planning-modal-name"]').type("Chant")
  cy.get('input[role="planning-modal-room"]').type('Salle de Lecture')
  cy.get('[data-cy="planning-modal-submit"]').click()
  cy.contains("Activité planifiée").should('exist')
})
})