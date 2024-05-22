const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:1234@localhost:5432/lumidb', {
  dialect: 'postgres',
});

const conectaBD = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao Banco de Dados com sucesso!');

    const Fatura = require('../models/fatura');
    await Fatura.sync({ alter: true });
    
    console.log("Models sincronizada com o Banco de Dados")
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
};

module.exports = { sequelize, conectaBD };
