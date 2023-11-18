const express = require('express');
const { getTask, submitTask } = require('../helpers/adp');
const { parseTransactions } = require('../helpers/transactions');

const router = express.Router();

// whenever this route is accessed, it will provide information to the frontend and then submit the task results
router.get('/', (_, res) => {
  let result = {};

  getTask().then((task) => {
      res.status(200).json(task.transactions);
      result.id = task.id;
      result.result = parseTransactions(task);

      submitTask(result).then((res) => {
        switch (res.status) {
          case 200:
            console.log('submitTask: Success!');
            break;

          case 400:
            console.log('submitTask: Incorrect value in result; no ID specified; value is invalid.');
            break;

          case 404:
            console.log('submitTask: Value not found for specified ID.');
            break;

          case 503:
            console.log('submitTask: Error communicating with database.');
            break;
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
