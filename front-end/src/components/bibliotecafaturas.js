import React, { useState } from 'react';
import axios from 'axios';

const BibliotecaFaturas = () => {
  const [clientNumber, setClientNumber] = useState('');
  const [month, setMonth] = useState('');

  const handleDownload = () => {
    axios.get(`/faturas/${clientNumber}`)
      .then(response => {
        const fatura = response.data.find(f => f.mes_referencia === month);
        if (fatura) {
          // Gerar download da fatura
          const faturaData = JSON.stringify(fatura, null, 2);
          const blob = new Blob([faturaData], { type: 'application/json' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `fatura_${clientNumber}_${month}.json`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          alert('Fatura não encontrada para o mês especificado');
        }
      })
      .catch(error => console.error('Erro ao buscar faturas:', error));
  };

  return (
    <div>
      <h2>Biblioteca de Faturas</h2>
      <label>
        Número do Cliente:
        <input type="text" value={clientNumber} onChange={e => setClientNumber(e.target.value)} />
      </label>
      <label>
        Mês:
        <input type="text" value={month} onChange={e => setMonth(e.target.value)} />
      </label>
      <button onClick={handleDownload}>Baixar Fatura</button>
    </div>
  );
};

export default BibliotecaFaturas;
