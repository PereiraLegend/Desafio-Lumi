const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Fatura = sequelize.define('Fatura', {
  numero_cliente: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  mes_referencia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  energia_eletrica_KWh: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  energia_eletrica_Valor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  energia_SCEEE_KWh: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  energia_SCEEE_Valor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  energia_compensada_KWh: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  energia_compensada_Valor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contribuicao_il_publica_Valor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Fatura;
