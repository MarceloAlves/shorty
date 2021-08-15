context('App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/')
  })

  it('should load the app', () => {
    cy.contains('Shorty')
  })

  it('should show an error if the url is invalid', () => {
    cy.findByRole('textbox', { name: /enter a url:/i }).type('example.com')
    cy.findByRole('button', { name: /shorten!/i }).click()
    cy.findByText(/must be a valid url/i).should('exist')
  })

  it('should let you create a link', () => {
    cy.window().then((window) => {
      const { worker, rest } = window.msw
      worker.use(
        rest.post('/api/link', (req, res, ctx) => {
          return res(
            ctx.status(201),
            ctx.json({
              id: '123',
              url: 'http://example.com',
              slug: 'abc123',
              createdAt: new Date(),
              updatedAt: new Date(),
            })
          )
        })
      )
    })

    cy.findByRole('textbox', { name: /enter a url:/i }).type('https://example.com')
    cy.findByRole('button', { name: /shorten!/i }).click()
    cy.findByRole('textbox').should('have.value', 'http://localhost:3001/abc123')
  })

  it('should have some link history after creating a link', () => {
    cy.window().then((window) => {
      const { worker, rest } = window.msw
      worker.use(
        rest.post('/api/link', (req, res, ctx) => {
          return res(
            ctx.status(201),
            ctx.json({
              id: '123',
              url: 'http://example.com',
              slug: 'abc123',
              createdAt: new Date(),
              updatedAt: new Date(),
            })
          )
        })
      )
    })

    cy.findByRole('textbox', { name: /enter a url:/i }).type('https://example.com')
    cy.findByRole('button', { name: 'Shorten!' }).click()
    cy.findByRole('button', { name: 'Link History' }).click()
    cy.findByText('http://example.com').should('exist')
  })

  it('should show an error if link cannot be created', () => {
    cy.window().then((window) => {
      const { worker, rest } = window.msw
      worker.use(
        rest.post('/api/link', (req, res, ctx) => {
          return res(
            ctx.status(401),
            ctx.json({
              message: 'Oops',
            })
          )
        })
      )
    })

    cy.findByRole('textbox', { name: /enter a url:/i }).type('https://example.com')
    cy.findByRole('button', { name: 'Shorten!' }).click()
    cy.findByText(/unable to create link. please try again later./i).should('exist')
  })
})
