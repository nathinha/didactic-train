const express = require('express');
const { getTask } = require('../helpers/adp');
const { parseTransactions } = require('../helpers/transactions');

const router = express.Router();

router.get('/', (_, res) => {
  let data = { };
  getTask()
    .then((task) => {
      res.status(200).json(task.transactions);
      parseTransactions(task);
    })
    .catch((error) => {
      console.log(error);
    });

    
});

module.exports = router;
