import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListarFaturas = () => {
  const [clientNumber, setClientNumber] = useState('');
  const [faturas, setFaturas] = useState([]);

  useEffect(() => {
    if (clientNumber) {
      axios.get(`/faturas/${clientNumber}`)
        .then(response => setFaturas(response.data))
        .catch(error => console.error('Erro ao buscar faturas:', error));
    }
  }, [clientNumber]);

  return (
    <div>
      <h2>Lista de Faturas</h2>
      <label>
        Número do Cliente:
        <input type="text" value={clientNumber} onChange={e => setClientNumber(e.target.value)} />
      </label>
      <ul>
        {faturas.map(fatura => (
          <li key={fatura.id}>
            {fatura.mes_referencia}: {fatura.energia_eletrica_KWh} kWh, {fatura.energia_eletrica_Valor} R$
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListarFaturas;
