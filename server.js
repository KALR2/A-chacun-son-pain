const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

let transactions = [];

app.get('/', (req, res) => {
  res.send('Bienvenue sur À chacun son pain API');
});

app.post('/api/subscribe', (req, res) => {
  const { amount, method, userId } = req.body;

  if (!amount || !method || !userId) {
    return res.status(400).json({ error: 'Données manquantes' });
  }

  const newTx = {
    id: Date.now(),
    userId,
    method,
    amount,
    status: 'succès',
    date: new Date()
  };

  transactions.push(newTx);
  res.json({ success: true, message: 'Abonnement validé', transaction: newTx });
});

app.get('/api/transactions', (req, res) => {
  res.json(transactions);
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
