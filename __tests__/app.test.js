import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Resources from '../lib/models/Resources.js';
//testing
describe('Resources CRUD routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
  it('creates a new resource', async () => {
    const resource = 
    {
      title: 'Dark Reader',
      category: 'Accessibility',
      about:
      'Eye-care browser extension to switch any website into dark mode with full customizability.',
      website: 'https://darkreader.org/',
      logo: 'https://repository-images.githubusercontent.com/26682105/4d22e080-070e-11eb-8930-c69a17260e45',
      located: '',
      tags: [
        'photophobia',
        'eye-care',
        'dark mode',
        'computer filter',
        'light sensitivity',
        'vision',
        'technology',
        'open-source',
        'free',
        'sensory processing',
      ],
    };

    const res = await request(app).post('/api/v1/resources').send(resource);

    expect(res.body).toEqual({
      id: '1',
      ...resource,
    });
  });

  it('gets all resources', async () => {
    const resource1 = await Resources.createResource({
      title: 'Dark Reader',
      category: 'Accessibility',
      about:
      'Eye-care browser extension to switch any website into dark mode with full customizability.',
      website: 'https://darkreader.org/',
      logo: 'https://repository-images.githubusercontent.com/26682105/4d22e080-070e-11eb-8930-c69a17260e45',
      located: '',
      tags: [
        'photophobia',
        'eye-care',
        'dark mode',
        'computer filter',
        'light sensitivity',
        'vision',
        'technology',
        'open-source',
        'free',
        'sensory processing',
      ],
    });

    const resource2 = await Resources.createResource({ title: 'f.lux',
      category: 'Accessibility',
      about: 'Eye-care software that adapts the color of your computer display.',
      website: 'https://justgetflux.com/',
      logo: 'https://tamezatu.com/wp-content/uploads/2015/05/flux.png',
      located: '',
      tags: [
        'photophobia',
        'eye-care',
        'blue-light filter',
        'adaptive display',
        'computer filter',
        'light sensitivity',
        'vision',
        'technology',
        'desktop application',
        'free',
        'sensory processing',
        'tinted'
      ],
    });

    const resource3 = await Resources.createResource({
      title: 'Brain Trauma Foundation',
      category: 'Education',
      about:
      'Develops evidence-based guidelines, research partnerships, & educational outreach.',
      website: 'http://www.braintrauma.org/',
      logo: 'https://med.stanford.edu/braincenter/research/_jcr_content/main/panel_builder/panel_1/panel_builder/panel_0/feature_box.img.620.high.png/neurosurgery_concussion_BTF.png',
      located: '',
      tags: ['peer-reviewed', 'articles', 'scholarly', 'study', 'teaching'],
    });

    const resource4 = await Resources.createResource({
      title: 'Hennepin Health Traumatic Brain Injury Center',
      category: 'Services',
      about:
      'Prevention, emergency care, neurosurgery, critical care, inpatient, & outpatient care.',
      website: 'https://www.hennepinhealthcare.org/specialty/traumatic-brain-injury-center/',
      logo: 'https://hereforlife.blog/wp-content/uploads/2018/03/featured-hennepin-healthcare-promo.jpg',
      located: '*MN only',
      tags: [
        'Minnesota',
        'ER',
        'case management',
        'medical doctor',
        'rehabilitation',
        'treatment',
        'recovery',
        'therapy',
        'physical rehab'
      ],
    });


    const res = await request(app).get('/api/v1/resources');

    expect(res.body).toEqual([
      resource1,
      resource2,
      resource3,
      resource4
    ]);
  });

  it('gets one resource by id', async () => {
    const resource = await Resources.createResource({ title: 'f.lux',
      category: 'Accessibility',
      about: 'Eye-care software that adapts the color of your computer display.',
      website: 'https://justgetflux.com/',
      logo: 'https://tamezatu.com/wp-content/uploads/2015/05/flux.png',
      located: '',
      tags: [
        'photophobia',
        'eye-care',
        'blue-light filter',
        'adaptive display',
        'computer filter',
        'light sensitivity',
        'vision',
        'technology',
        'desktop application',
        'free',
        'sensory processing',
        'tinted'
      ],
    });

    const res = await request(app).get(`/api/v1/resources/${resource.id}`);

    expect(res.body).toEqual(resource);
  });

  it('updates a resource', async () => {
    const resource = await Resources.createResource({
      title: 'Brain Injury Alliance',
      category: 'Advocacy',
      about:
      'Resource facilitation, education, outreach, events, & case management, plus state-specific chapters.',
      website: 'https://usbia.org/',
      logo: 'https://biacolorado.org/wp-content/uploads/2011/12/USBIA-Logo.jpg',
      located: '',
      tags: [
        'newsletter',
        'case manager',
        'support group',
        'check-in',
        'referrals',
        'support services',
      ],
    });

    const res = await request(app)
      .put(`/api/v1/resources/${resource.id}`)
      .send({
        title: 'MN Brain Injury Alliance',
        website: 'https://www.braininjurymn.org/',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQarrQg3SfqDlfnSQfliaolc8bbkjxJtH063GVjDESB4mCisUx9JdYPosoazFrR0JjYCV4&usqp=CAU',
        located: '*MN only',
      });
    expect(res.body).toEqual({ ...resource,
      title: 'MN Brain Injury Alliance',
      website: 'https://www.braininjurymn.org/',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQarrQg3SfqDlfnSQfliaolc8bbkjxJtH063GVjDESB4mCisUx9JdYPosoazFrR0JjYCV4&usqp=CAU',
      located: '*MN only',
    });
  });

  it('deletes a specific existing resource', async () => {
    const resource = await Resources.createResource({ title: 'f.lux',
      category: 'Accessibility',
      about: 'Eye-care software that adapts the color of your computer display.',
      website: 'https://justgetflux.com/',
      logo: 'https://tamezatu.com/wp-content/uploads/2015/05/flux.png',
      located: '',
      tags: [
        'photophobia',
        'eye-care',
        'blue-light filter',
        'adaptive display',
        'computer filter',
        'light sensitivity',
        'vision',
        'technology',
        'desktop application',
        'free',
        'sensory processing',
        'tinted'
      ],
    });

    const res = await request(app).delete(`/api/v1/resources/${resource.id}`);

    expect(res.body).toEqual({
      message: `You have deleted ${resource.title}.`,
    });
  });
});
