import pool from '../utils/pool';

export default class Resources {
  id;
  src_name;
  category;
  src_description;
  st_address;
  city;
  us_state;
  zip;
  phone;
  text_num;
  website;
  email;
  is_24_7;

  constructor(row) {
    this.id = row.id;
    this.src_name = row.src_name;
    this.category = row.category;
    this.src_description = row.src_description;
    this.st_address = row.st_address;
    this.city = row.city;
    this.us_state = row.us_state;
    this.zip = row.zip;
    this.phone = row.phone;
    this.text_num = row.text_num;
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
