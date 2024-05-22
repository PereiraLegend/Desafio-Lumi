import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Graph from './grafico';

const Dashboard = () => {
  const [clientNumber, setClientNumber] = useState('');
  const [energyData, setEnergyData] = useState(null);
  const [valueData, setValueData] = useState(null);

  useEffect(() => {
    if (clientNumber) {
      axios.get(`/faturas/${clientNumber}`)
        .then(response => {
          const faturas = response.data;
          const months = faturas.map(fatura => fatura.mes_referencia);

          const energyKWh = faturas.map(fatura => fatura.energia_eletrica_KWh + fatura.energia_SCEEE_KWh);
          const compensatedKWh = faturas.map(fatura => fatura.energia_compensada_KWh);
          const totalValue = faturas.map(fatura => fatura.energia_eletrica_Valor + fatura.energia_SCEEE_Valor + fatura.contribuicao_il_publica_Valor);
          const savedValue = faturas.map(fatura => fatura.energia_compensada_Valor);

          setEnergyData({
            labels: months,
            datasets: [
              { label: 'Consumo de Energia (kWh)', data: energyKWh, borderColor: 'blue', fill: false },
              { label: 'Energia Compensada (kWh)', data: compensatedKWh, borderColor: 'green', fill: false },
            ]
          });

          setValueData({
            labels: months,
            datasets: [
              { label: 'Valor Total sem GD (R$)', data: totalValue, borderColor: 'red', fill: false },
              { label: 'Economia GD (R$)', data: savedValue, borderColor: 'orange', fill: false },
            ]
          });
        })
        .catch(error => console.error('Erro ao buscar faturas:', error));
    }
  }, [clientNumber]);

  return (
    <div>
      <h2>Dashboard</h2>
      <label>
        Número do Cliente:
        <input type="text" value={clientNumber} onChange={e => setClientNumber(e.target.value)} />
      </label>
      {energyData && <Graph data={energyData} title="Consumo de Energia" />}
      {valueData && <Graph data={valueData} title="Valores Monetários" />}
    </div>
  );
};

export default Dashboard;
