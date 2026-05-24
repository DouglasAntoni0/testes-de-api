describe('Booking API Tests - Restful-booker', () => {
  let token: string;
  let bookingId: number;

  const newBooking = {
    firstname: 'Jim',
    lastname: 'Brown',
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: '2024-01-01',
      checkout: '2024-01-10',
    },
    additionalneeds: 'Breakfast',
  };

  const updatedBooking = {
    firstname: 'James',
    lastname: 'Brown',
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: '2024-01-01',
      checkout: '2024-01-15',
    },
    additionalneeds: 'Lunch',
  };

  const partialUpdate = {
    firstname: 'James',
    lastname: 'Bond',
  };

  before(() => {
    cy.generateToken().then((t) => {
      token = t;
    });
  });

  it('GET /booking - Should get all booking ids', () => {
    cy.request('GET', '/booking').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0);
      expect(response.body[0]).to.have.property('bookingid');
    });
  });

  it('POST /booking - Should create a new booking', () => {
    cy.request({
      method: 'POST',
      url: '/booking',
      body: newBooking,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('bookingid');
      expect(response.body.booking).to.deep.include(newBooking);
      bookingId = response.body.bookingid;
    });
  });

  it('GET /booking/:id - Should get booking by id', () => {
    expect(bookingId, 'Booking ID should exist from previous test').to.not.be.undefined;

    cy.request('GET', `/booking/${bookingId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.deep.include(newBooking);
    });
  });

  it('PUT /booking/:id - Should update a booking', () => {
    expect(bookingId).to.not.be.undefined;
    expect(token).to.not.be.undefined;

    cy.request({
      method: 'PUT',
      url: `/booking/${bookingId}`,
      body: updatedBooking,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Cookie: `token=${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.deep.include(updatedBooking);
    });
  });

  it('PATCH /booking/:id - Should partially update a booking', () => {
    expect(bookingId).to.not.be.undefined;
    expect(token).to.not.be.undefined;

    cy.request({
      method: 'PATCH',
      url: `/booking/${bookingId}`,
      body: partialUpdate,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Cookie: `token=${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.firstname).to.eq(partialUpdate.firstname);
      expect(response.body.lastname).to.eq(partialUpdate.lastname);
    });
  });

  it('DELETE /booking/:id - Should delete a booking', () => {
    expect(bookingId).to.not.be.undefined;
    expect(token).to.not.be.undefined;

    cy.request({
      method: 'DELETE',
      url: `/booking/${bookingId}`,
      headers: {
        'Content-Type': 'application/json',
        Cookie: `token=${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
    });

    cy.request({
      method: 'GET',
      url: `/booking/${bookingId}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});
