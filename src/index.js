import express from 'express'; // Hacer npm i express
import cors from 'cors'; // Hacer npm i cors
import { sumar, restar, multiplicar, dividir } from './modules/matematica.js';

const app = express();
const port = 3000; // El puerto 3000 (http://localhost:3000)

// Agrego los Middlewares
app.use(cors()); // Middleware de CORS
app.use(express.json()); // Middleware para parsear y comprender JSON

// Acá pongo todos los EndPoints
app.get('/', (req, res) => {
    // EndPoint "/"
    res.send('Ya estoy respondiendo! (mia)');
});

app.get('/saludar/:nombre', (req, res) => {
    res.status(200);
    res.send(`Hola ${req.params.nombre}`);
});

app.get('/validarFecha/:ano/:mes/:dia', (req, res) => {
    const params = req.params;
    const date = new Date(params.ano, params.mes, params.dia);
    if (
        date == 'Invalid Date' ||
        params.ano < 0 ||
        params.mes > 12 ||
        params.mes <= 0 ||
        params.dia > 31 ||
        params.dia <= 0
    ) {
        res.status(400);
        res.send('Fecha Invalida');
    } else {
        res.status(200);
        res.send(date);
    }
});

app.get('/matematica/sumar', (req, res) => {
    let n1 = parseInt(req.query.n1);
    let n2 = parseInt(req.query.n2);
    let respuesta = sumar(n1, n2);
    console.log(n1, n2, respuesta);
    res.status(200);
    res.send(respuesta.toString());
});

app.get('/matematica/restar', (req, res) => {
    res.status(200);
    res.send(restar(req.query.n1, req.query.n2));
});

app.get('/matematica/multiplicar', (req, res) => {
    res.status(200);
    res.send(multiplicar(req.query.n1, req.query.n2));
});

app.get('/matematica/dividir', (req, res) => {
    res.status(200);
    res.send(dividir(req.query.n1, req.query.n2));
});

// Inicio el Server y lo pongo a escuchar.
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
