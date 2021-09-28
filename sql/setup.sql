DROP TABLE IF EXISTS resources;

CREATE TABLE resources (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    src_name TEXT NOT NULL,
    category TEXT NOT NULL,
    src_description TEXT NOT NULL,
    st_address TEXT,
    city TEXT NOT NULL,
    us_state TEXT NOT NULL,
    zip TEXT,
    phone TEXT NOT NULL,
    text_num TEXT,
    website TEXT,
    email TEXT,
    is_24_7 TEXT
);
