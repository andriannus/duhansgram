const express = require('express');
const path    = require('path');

const PORT = 8070;
const app = express();

app.use(express.static('client/dist'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/dist/index.html'));
});

app.listen(PORT, () => console.log(`App listenin on port ${8070}`));
