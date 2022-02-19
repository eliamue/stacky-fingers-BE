import pool from '../utils/pool.js';

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
      'INSERT INTO resources (src_name, category, src_description, st_address, city, us_state, zip, phone, text_num, website, email, is_24_7) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
      [
        value.src_name,
        value.category,
        value.src_description,
        value.st_address,
        value.city,
        value.us_state,
        value.zip,
        value.phone,
        value.text_num,
        value.website,
        value.email,
        value.is_24_7,
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
      src_name,
      category,
      src_description,
      st_address,
      city,
      us_state,
      zip,
      phone,
      text_num,
      website,
      email,
      is_24_7,
    }
  ) {
    const existingResource = await Resources.getById(id);
    const new_src_name = src_name ?? existingResource.src_name;
    const new_category = category ?? existingResource.category;
    const new_src_description =
      src_description ?? existingResource.src_description;
    const new_st_address = st_address ?? existingResource.st_address;
    const new_city = city ?? existingResource.city;
    const new_us_state = us_state ?? existingResource.us_state;
    const new_zip = zip ?? existingResource.zip;
    const new_phone = phone ?? existingResource.phone;
    const new_text_num = text_num ?? existingResource.text_num;
    const new_website = website ?? existingResource.website;
    const new_email = email ?? existingResource.email;
    const new_is_24_7 = is_24_7 ?? existingResource.is_24_7;

    const { rows } = await pool.query(
      'UPDATE resources SET src_name=$1, category=$2, src_description=$3, st_address=$4, city=$5, us_state=$6, zip=$7, phone=$8, text_num=$9, website=$10, email=$11, is_24_7=$12 WHERE id=$13 RETURNING *',
      [
        new_src_name,
        new_category,
        new_src_description,
        new_st_address,
        new_city,
        new_us_state,
        new_zip,
        new_phone,
        new_text_num,
        new_website,
        new_email,
        new_is_24_7,
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
