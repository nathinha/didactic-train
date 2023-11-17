const express = require('express');
const { getTask } = require('../helpers/adp');
const { parseTransactions } = require('../helpers/transactions');

const router = express.Router();

router.get('/', (_, res) => {
  let id = '';
  let transactions = [];

  getTask()
    .then((task) => {
      res.status(200).json(task.transactions);
      id = task.id;
      transactions = parseTransactions(task);
      console.log(transactions);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
