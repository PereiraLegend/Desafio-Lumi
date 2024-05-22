const Fatura = require('../models/fatura');

const criarFatura = async (data) => {
  return await Fatura.create(data);
};

const pegarFatura = async (numero_cliente) => {
  return await Fatura.findAll({ where: { numero_cliente } });
};

const atualizarFatura = async (id, data) => {
  return await Fatura.update(data, { where: { id } });
};

const deletarFatura = async (id) => {
  return await Fatura.destroy({ where: { id } });
};

module.exports = {
  criarFatura,
  pegarFatura,
  atualizarFatura,
  deletarFatura,
};
