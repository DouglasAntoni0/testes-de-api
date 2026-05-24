declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to generate an auth token
       */
      generateToken(): Chainable<string>;
    }
  }
}

Cypress.Commands.add('generateToken', () => {
  return cy
    .request({
      method: 'POST',
      url: '/auth',
      body: {
        username: 'admin',
        password: 'password123',
      },
    })
    .then((response) => {
      expect(response.status).to.eq(200);
      return response.body.token;
    });
});

export {};
