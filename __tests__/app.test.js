import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Resources from '../lib/models/Resources';

describe('Resources CRUD routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a new resource', async () => {
    const resource = {
      src_name: 'Day One Crime Victim Support Line',
      category: 'Crisis',
      src_description: 'Day One hosts the statewide support line for general crime victims. Help is available to you no matter where you’re located in the state of Minnesota. 24/7 support line.',
      st_address: '1000 E 80th St',
      city: 'Bloomington',
      us_state: 'MN',
      zip: 55420,
      phone: '1-(866)-223-1111',
      text_num: '612-399-9995',
      website: 'https://dayoneservices.org/',
      email: 'safety@dayoneservices.org',
      is_24_7: true
    };

    const res = await request(app)
      .post('/api/v1/resources')
      .send(resource);

    expect(res.body).toEqual({
      id: '1',
      ...resource
    });
  });
});
