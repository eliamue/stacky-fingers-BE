import pool from '../utils/pool';

export default class Resources {
  id;
  name;
  category;
  description;
  address;
  city;
  state;
  zip;
  phone;
  text;
  website;
  email;
  is_24_7;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.category = row.category;
    this.description = row.description;
    this.address = row.address;
    this.city = row.city;
    this.state = row.state;
    this.zip = row.zip;
    this.phone = row.phone;
    this.text = row.text;
    this.website = row.website;
    this.email = row.email;
    this.is_24_7 = row.is_24_7;
  }

  static async createResource(value) {
    const { rows } = await pool.query(
      'INSERT INTO resources (name, category, description, address, city, state, zip, phone, text, website, email, is_24_7) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
      [
        value.name,
        value.category,
        value.description,
        value.address,
        value.city,
        value.state,
        value.zip,
        value.phone,
        value.text,
        value.website,
        value.email,
        value.is_24_7,
      ]
    );
    return new Resources(rows[0]);
  }
}
