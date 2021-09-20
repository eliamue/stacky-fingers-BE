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
      zip: 55420,
      us_state: 'MN',
      phone: '1-(866)-223-1111',
      text_num: '612-399-9995',
      website: 'https://dayoneservices.org/',
      email: 'safety@dayoneservices.org',
      is_24_7: true,
    };

    const res = await request(app).post('/api/v1/resources').send(resource);

    expect(res.body).toEqual({
      id: '1',
      ...resource,
    });
  });

  it('tests getting all resources', async () => {
    const resource1 = await Resources.createResource({
      src_name: 'Tubman Family Crisis and Support Services',
      category: 'Mental Health',
      src_description: 'Tubman helps people of all ages, genders, and cultural backgrounds who have experienced relationship violence, elder abuse, addiction, sexual exploitation or other forms of trauma. Throughout the Twin Cities, Tubman provides safe shelter, legal services, mental and chemical health counseling, youth programming, and community education, including public information campaigns to provide community members the information and support they need to get help or give help.',
      st_address: '4432 Chicago Avenue South',
      city: 'Minneapolis',
      zip: 55407,
      us_state: 'MN',
      phone: '612-825-0000',
      text_num: '612-825-3333',
      website: 'https://www.tubman.org/',
      email: '',
      is_24_7: true,
    });

    const resource2 = await Resources.createResource({
      src_name: 'Domestic Violence Resource Center',
      category: 'Domestic',
      src_description: 'The Domestic Violence Resource Center provides free, confidential, bilingual services in an effort to bring an end to family violence in Washoe County.',
      st_address: '1735 Vassar Street',
      city: 'Reno',
      zip: 89502,
      us_state: 'NV',
      phone: '775-329-4150',
      text_num: '',
      website: 'https://domesticviolenceresourcecenter.org/',
      email: 'info@domesticviolenceresourcecenter.org',
      is_24_7: true,
    });

    const resource3 = await Resources.createResource({
      src_name: 'Multnomah County Animal Services',
      category: 'Animals',
      src_description: 'Multnomah County Animal Services (MCAS) is the county’s sole public animal shelter and control agency. The mission of MCAS is to protect the health, safety and welfare of people and pets throughout Multnomah County. MCAS cares for the community’s lost, homeless, stray, injured, sick, neglected and abandoned animals.',
      st_address: '1700 W Historic River Hwy',
      city: 'Troutdale',
      zip: 97060,
      us_state: 'OR',
      phone: '503-988-7387',
      text_num: '',
      website: 'https://www.multcopets.org/',
      email: '',
      is_24_7: true,
    });

    const resource4 = await Resources.createResource({
      src_name: 'St Paul Animal Control Center',
      category: 'Animals',
      src_description: '',
      st_address: '1285 Jessamine Avenue West',
      city: 'St Paul',
      zip: 55108,
      us_state: 'MN',
      phone: '651-266-1100',
      text_num: '651-266-8989',
      website: 'https://www.stpaul.gov/departments/safety-inspections/animal-control-information',
      email: '',
      is_24_7: false,
    });

    const resource5 = await Resources.createResource({
      src_name: 'Day One Crime Victim Support Line',
      category: 'Crisis',
      src_description: 'Day One hosts the statewide support line for general crime victims. Help is available to you no matter where you’re located in the state of Minnesota. 24/7 support line.',
      st_address: '1000 E 80th St',
      city: 'Bloomington',
      zip: 55420,
      us_state: 'MN',
      phone: '1-(866)-223-1111',
      text_num: '612-399-9995',
      website: 'https://dayoneservices.org/',
      email: 'safety@dayoneservices.org',
      is_24_7: true,
    });

    const res = await request(app).get('/api/v1/resources');

    expect(res.body).toEqual([resource1, resource2, resource3, resource4, resource5]);
  });

  it('gets one resource by id', async () => {
    const resource = {
      src_name: 'Day One Crime Victim Support Line',
      category: 'Crisis',
      src_description: 'Day One hosts the statewide support line for general crime victims. Help is available to you no matter where you’re located in the state of Minnesota. 24/7 support line.',
      st_address: '1000 E 80th St',
      city: 'Bloomington',
      zip: 55420,
      us_state: 'MN',
      phone: '1-(866)-223-1111',
      text_num: '612-399-9995',
      website: 'https://dayoneservices.org/',
      email: 'safety@dayoneservices.org',
      is_24_7: true,
    };


    const res = await request(app).get(`/api/v1/resourcess/${resource.id}`);

    expect(res.body).toEqual(resource);
  });
});
