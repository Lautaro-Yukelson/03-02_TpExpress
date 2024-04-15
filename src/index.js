import express from 'express'; // Hacer npm i express
import cors from 'cors'; // Hacer npm i cors
import { sumar, restar, multiplicar, dividir } from './modules/matematica.js';
import { OMDBGetByImdbID, OMDBSearchByPage, OMDBSearchComplete } from './modules/omdb-wrapper.js';
import {Alumno} from './models/Alumno.js'

const app = express();
const port = 3000;

let alumnosArray = [];
alumnosArray.push(new Alumno("EstebanDido" ,"22888444",20));
alumnosArray.push(new Alumno("MatiasQueroso","28946255",51));
alumnosArray.push(new Alumno("ElbaCalao" ,"32623391",18));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
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
    let n1 = parseInt(req.query.n1);
    let n2 = parseInt(req.query.n2);
    let respuesta = restar(n1, n2);
    console.log(n1, n2, respuesta);
    res.status(200);
    res.send(respuesta.toString());
});

app.get('/matematica/multiplicar', (req, res) => {
    let n1 = parseInt(req.query.n1);
    let n2 = parseInt(req.query.n2);
    let respuesta = multiplicar(n1, n2);
    console.log(n1, n2, respuesta);
    res.status(200);
    res.send(respuesta.toString());
});

app.get('/matematica/dividir', (req, res) => {
    let n1 = parseInt(req.query.n1);
    let n2 = parseInt(req.query.n2);
    let respuesta = dividir(n1, n2);
    console.log(n1, n2, respuesta);
    res.status(200);
    res.send(respuesta.toString());
});

app.get('/omdb/searchbypage', async (req, res) => {
    const texto = req.query.search;
    const pagina = req.query.p;
    let respuesta = await OMDBSearchByPage(texto, pagina);
    res.status(200).send(respuesta);
});

app.get('/omdb/searchcomplete', async (req, res) => {
    const texto = req.query.texto;
    let respuesta = await OMDBSearchComplete(texto);
    res.status(200).send(respuesta);
});

app.get('/omdb/getbyomdbid', async (req, res) => {
    const id = req.query.imdbID;
    let respuesta = await OMDBGetByImdbID(id);
    res.status(200).send(respuesta);
});

app.get('/alumnos', (req, res) => {
    res.status(200).send(alumnosArray);
});

app.get('/alumnos/:dni', (req, res) => {
    let dni = req.params.dni;
    console.log(dni);
    res.status(200).send(alumnosArray.find((e) => e.dni == dni));
});

app.get('/alumnos/:dni', (req, res) => {
    let dni = req.params.dni;
    console.log(dni);
    res.status(200).send(alumnosArray.find((e) => e.dni == dni));
});

app.post('/alumnos', (req, res) => {
    const { username, dni, edad } = req.body;
    const nuevoAlumno = new Alumno(username, dni, edad);
    alumnosArray.push(nuevoAlumno);
    console.log(alumnosArray);
    res.status(201).send("Alumno creado correctamente.");
});

app.delete('/alumnos', (req, res) => {
    const { dni } = req.body;
    alumnosArray.filter((e) => e.dni != dni);
    console.log(alumnosArray);
    res.status(201).send("Alumno eliminado correctamente.");
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
