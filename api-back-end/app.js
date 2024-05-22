const express = require('express');
const bodyParser = require('body-parser');
const faturaController = require('./src/controllers/faturaController');
const { conectaBD } = require('./src/database');

const app = express();
app.use(bodyParser.json());

conectaBD();

// Rotas
app.post('/fatura', faturaController.create);
app.get('/fatura/:numero_cliente', faturaController.read);
app.put('/fatura/:id', faturaController.update);
app.delete('/fatura/:id', faturaController.remove);

module.exports = app;
