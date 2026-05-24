import { test, expect } from '@playwright/test';

test.describe.serial('Booking API Tests - Restful-booker', () => {
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

  test.beforeAll(async ({ request }) => {
    // Generate token before running tests
    const response = await request.post('/auth', {
      data: {
        username: 'admin',
        password: 'password123',
      },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    token = body.token;
  });

  test('GET /booking - Should get all booking ids', async ({ request }) => {
    const response = await request.get('/booking');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty('bookingid');
  });

  test('POST /booking - Should create a new booking', async ({ request }) => {
    const response = await request.post('/booking', {
      data: newBooking,
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('bookingid');
    expect(body.booking).toMatchObject(newBooking);
    bookingId = body.bookingid;
  });

  test('GET /booking/:id - Should get booking by id', async ({ request }) => {
    expect(bookingId).toBeDefined();

    const response = await request.get(`/booking/${bookingId}`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toMatchObject(newBooking);
  });

  test('PUT /booking/:id - Should update a booking', async ({ request }) => {
    expect(bookingId).toBeDefined();
    expect(token).toBeDefined();

    const response = await request.put(`/booking/${bookingId}`, {
      data: updatedBooking,
      headers: {
        Cookie: `token=${token}`,
      },
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toMatchObject(updatedBooking);
  });

  test('PATCH /booking/:id - Should partially update a booking', async ({ request }) => {
    expect(bookingId).toBeDefined();
    expect(token).toBeDefined();

    const response = await request.patch(`/booking/${bookingId}`, {
      data: partialUpdate,
      headers: {
        Cookie: `token=${token}`,
      },
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.firstname).toBe(partialUpdate.firstname);
    expect(body.lastname).toBe(partialUpdate.lastname);
  });

  test('DELETE /booking/:id - Should delete a booking', async ({ request }) => {
    expect(bookingId).toBeDefined();
    expect(token).toBeDefined();

    const response = await request.delete(`/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });
    expect(response.status()).toBe(201);

    const getResponse = await request.get(`/booking/${bookingId}`);
    expect(getResponse.status()).toBe(404);
  });
});
