const express = require('express');
const { addUser, getUserById } = require('../../database/engine/user/index.js');
const router = express.Router();
const cleanCache = require('../../middlewares/clearCache.js');

router.get('/:id', async (req, res, next) => {
  const data = await getUserById(req.params.id);
  res.json({ data });
});

router.post('/', async (req, res, next) => {
  const data = await addUser(req.body);
  res.json({ data });
});

module.exports = router;