const {
  criarFatura,
  pegarFatura,
  atualizarFatura,
  deletarFatura,
  } = require('../repositories/faturaRepositorio');
  
  const create = async (req, res) => {
    try {
      const data = await criarFatura(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const read = async (req, res) => {
    try {
      const data = await pegarFatura(req.params.numero_cliente);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const update = async (req, res) => {
    try {
      const data = await atualizarFatura(req.params.id, req.body);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const remove = async (req, res) => {
    try {
      await deletarFatura(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    create,
    read,
    update,
    remove,
  };
  