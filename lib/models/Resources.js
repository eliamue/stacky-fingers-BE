import pool from '../utils/pool.js';

export default class Resources {
  id;
  title;
  category;
  about;
  website;
  logo;
  located;
  tags;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.category = row.category;
    this.about = row.about;
    this.website = row.website;
    this.logo = row.logo;
    this.located = row.located;
    this.tags = row.tags;
  }

  static async createResource(value) {
    const { rows } = await pool.query(
      'INSERT INTO resources (title, category, about, website, logo, located, tags) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [
        value.title,
        value.category,
        value.about,
        value.website,
        value.logo,
        value.located,
        value.tags,
      ]
    );
    return new Resources(rows[0]);
  }

  static async getAllResources() {
    const { rows } = await pool.query('SELECT * FROM resources');
    return rows.map((row) => new Resources(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM resources WHERE id=$1', [
      id,
    ]);
    return new Resources(rows[0]);
  }

  static async update(
    id,
    {
      title,
      category,
      about,
      website,
      logo,
      located,
      tags,
    }
  ) {
    const existingResource = await Resources.getById(id);
    const new_title = title ?? existingResource.title;
    const new_category = category ?? existingResource.category;
    const new_about = about ?? existingResource.about;
    const new_website = website ?? existingResource.website;
    const new_logo = logo ?? existingResource.logo;
    const new_located = located ?? existingResource.located;
    const new_tags = tags ?? existingResource.tags;

    const { rows } = await pool.query(
      'UPDATE resources SET title=$1, category=$2, about=$3, website=$4, logo=$5, located=$6, tags=$7 WHERE id=$8 RETURNING *',
      [
        new_title,
        new_category,
        new_about,
        new_website,
        new_logo,
        new_located,
        new_tags,
        id,
      ]
    );
    return new Resources(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM resources WHERE id=$1 RETURNING *',
      [id]
    );
    return new Resources(rows[0]);
  }
}


