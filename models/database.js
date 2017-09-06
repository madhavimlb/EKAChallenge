const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/ekainfo';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  'CREATE TABLE userInfo(id SERIAL PRIMARY KEY,  username VARCHAR(40) not null, password VARCHAR (50) NOT NULL,email VARCHAR (50) NOT NULL , firstName VARCHAR (20) , lastName VARCHAR (20),phone VARCHAR (15),address VARCHAR (200),city VARCHAR (20),state VARCHAR (30),zip VARCHAR (10))');
query.on('end', () => { client.end(); });