const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 8000;

// Caminhos dos arquivos
const LATEST_JSON_PATH = path.join(__dirname, 'updates', 'latest.json');
const MSI_PATH = path.join(__dirname, 'updates', 'brilliant-software_1.0.0_x64_en-US.msi');

// Endpoint para retornar o latest.json
app.get('/latest', (req, res) => {
  if (!fs.existsSync(LATEST_JSON_PATH)) {
    return res.status(404).json({ error: 'Arquivo latest.json não encontrado.' });
  }
  res.sendFile(LATEST_JSON_PATH);
});

// Endpoint para retornar o instalador MSI
app.get('/download', (req, res) => {
  if (!fs.existsSync(MSI_PATH)) {
    return res.status(404).json({ error: 'Arquivo .msi não encontrado.' });
  }
  res.sendFile(MSI_PATH);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
