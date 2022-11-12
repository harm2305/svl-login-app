const { addItem, getItems } = require('../db');

const express = require('express');
const router = express.Router();
router.use(express.json());

router.get('/options', async (req, res) => {
  try {
    const query = 'SELECT C.description FROM C ORDER BY C.description ASC';
    const data = await getItems('Options', query);

    res.status(200).json(data);
  } catch (e) {
    res.status(500).send(`There was an error getting the information you requested: ${e}`);
  }
});

router.post('/options', async (req, res) => {
  const optionDescription = req.body.description;

  let item = await addItem('Options', {description: optionDescription});

  if (item.statusCode >= 200 && item.statusCode < 300) {
    const response = `Successfully added option: ${optionDescription}`;
    res.json(response);
  } else {
    res.status(500).json({
      "text": "There was an error inserting the data into the database, please check Azure logs"
    });
  }
});

module.exports = router;