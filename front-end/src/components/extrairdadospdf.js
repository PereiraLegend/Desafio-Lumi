import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ExtratorDadosPdf = () => {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [extractedData, setExtractedData] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  const extractDataFromPdf = async () => {
    if (!file) {
      alert('Por favor, selecione um arquivo PDF.');
      return;
    }

    try {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = async () => {
        const pdfData = new Uint8Array(reader.result);
        const pdfDocument = await pdfjs.getDocument({ data: pdfData }).promise;
        const page = await pdfDocument.getPage(pageNumber);
        const textContent = await page.getTextContent();
        const rawText = textContent.items.map(item => item.str).join('\n');

        // Lógica para extrair os dados do texto bruto do PDF
        const extractedData = extractDataFromRawText(rawText);
        setExtractedData(extractedData);

        // Enviar os dados extraídos para a API
        await sendExtractedDataToApi(extractedData);
      };
    } catch (error) {
      console.error('Erro ao extrair dados do PDF:', error);
    }
  };

  const extractDataFromRawText = (rawText) => {
    const extractedData = {
      numero_cliente: '',
      mes_referencia: '',
      energia_eletrica_KWh: '',
      energia_eletrica_Valor: '',
      energia_SCEEE_KWh: '',
      energia_SCEEE_Valor: '',
      energia_compensada_KWh: '',
      energia_compensada_Valor: '',
      contribuicao_il_publica_Valor: ''
    };
  
    // Expressões regulares para encontrar as informações específicas no texto bruto do PDF
    const clienteNumMatch = rawText.match(/Nº DO CLIENTE\s+(\d+)/);
    if (clienteNumMatch) {
      extractedData.numero_cliente = clienteNumMatch[1];
    }
  
    const mesReferenciaMatch = rawText.match(/Referente a\s+([\w\s]+\d{4})/);
    if (mesReferenciaMatch) {
      extractedData.mes_referencia = mesReferenciaMatch[1];
    }
  
    const energiaEletricaMatch = rawText.match(/Energia Elétrica\s+(\d+\s+kWh)\s+R\$\s+(\d+,\d{2})/);
    if (energiaEletricaMatch) {
      extractedData.energia_eletrica_KWh = energiaEletricaMatch[1];
      extractedData.energia_eletrica_Valor = energiaEletricaMatch[2];
    }
  
    const energiaSCEEEMatch = rawText.match(/Energia SCEEE s\/ICMS\s+(\d+\s+kWh)\s+R\$\s+(\d+,\d{2})/);
    if (energiaSCEEEMatch) {
      extractedData.energia_SCEEE_KWh = energiaSCEEEMatch[1];
      extractedData.energia_SCEEE_Valor = energiaSCEEEMatch[2];
    }
  
    const energiaCompensadaMatch = rawText.match(/Energia Compensada GD I\s+(\d+\s+kWh)\s+R\$\s+(\d+,\d{2})/);
    if (energiaCompensadaMatch) {
      extractedData.energia_compensada_KWh = energiaCompensadaMatch[1];
      extractedData.energia_compensada_Valor = energiaCompensadaMatch[2];
    }
  
    const contribuicaoIlumPublicaMatch = rawText.match(/Contrib Ilum Publica Municipal\s+R\$\s+(\d+,\d{2})/);
    if (contribuicaoIlumPublicaMatch) {
      extractedData.contribuicao_il_publica_Valor = contribuicaoIlumPublicaMatch[1];
    }
  
    return extractedData;
  };
  

  const sendExtractedDataToApi = async (extractedData) => {
    try {
      const apiUrl = 'your-api-url'; // URL da sua API backend
      await axios.post(apiUrl, extractedData);
      console.log('Dados extraídos enviados com sucesso para a API.');
    } catch (error) {
      console.error('Erro ao enviar dados extraídos para a API:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="application/pdf" />
      <button onClick={extractDataFromPdf}>Extrair Dados</button>
      {extractedData && (
        <div>
          <h2>Dados Extraídos do PDF:</h2>
          <p>Número do Cliente: {extractedData.numero_cliente}</p>
          <p>Mês de Referência: {extractedData.mes_referencia}</p>
          <p>Energia Elétrica (kWh): {extractedData.energia_eletrica_KWh}</p>
          <p>Energia Elétrica (R$): {extractedData.energia_eletrica_Valor}</p>
          <p>Energia SCEEE s/ ICMS (kWh): {extractedData.energia_SCEEE_KWh}</p>
          <p>Energia SCEEE s/ ICMS (R$): {extractedData.energia_SCEEE_Valor}</p>
          <p>Energia Compensada GD I (kWh): {extractedData.energia_compensada_KWh}</p>
          <p>Energia Compensada GD I (R$): {extractedData.energia_compensada_Valor}</p>
          <p>Contribuição Ilum. Pública (R$): {extractedData.contribuicao_il_publica_Valor}</p>
        </div>
      )}
      {file && (
        <div>
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <p>Página {pageNumber} de {numPages}</p>
        </div>
      )}
    </div>
  );
  
};

export default ExtratorDadosPdf;
