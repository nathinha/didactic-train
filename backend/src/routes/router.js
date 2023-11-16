const express = require('express');
const { getTask } = require('../helpers/adp');

const router = express.Router();

router.get('/', (_, res) => {
  getTask()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
