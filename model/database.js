const { Client } = require('pg')

const connectionString = 'postgres://postgres:admin001@localhost:5432/loto';

const client = new Client({
    connectionString: connectionString,
  });

client.connect();
client.query('CREATE TABLE sorteo_resultado(id SERIAL PRIMARY KEY, numero_ganador Integer not null, fecha_sorteo date, tipo_sorteo varchar(30))',
 (err, res) => {
    console.log(err ? err.stack : res) // Hello World!
    client.end()
  })
