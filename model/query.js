const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'loto',
  password: 'admin001',
  port: 5432,
})

const text = 'INSERT INTO public.sorteo_resultado(numero_ganador, fecha_sorteo, tipo_sorteo, mes, anio) VALUES ($1, $2,$3, $4,$5) RETURNING *'

const guardarDatos= (values)=>{
    console.log(values);
    pool.query(text, values)
    .then(res => {
      console.log(res.rows[0])    
    })
    .catch(e => console.error(e.stack))
}

module.exports = {
    guardarDatos
  }
