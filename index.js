const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');


// crear el servidor de express
const app = express();

// Base de datos
dbConnection();

//CORS
app.use(cors());

// console.log(process.env);

// Directorio publico
app.use( express.static( 'public') );

// Lectura y parseo del body
app.use( express.json() );


// Rutas
// app.get('/', (req, res) =>{
// 
//     console.log('se requiere el /')
//     res.json({
//         ok: true
//     })
// 
// });
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
// todo: CRUD: Eventos

// Escuchar preticiones

app.listen( process.env.PORT, ()=>{
     console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
});