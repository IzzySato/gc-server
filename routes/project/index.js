const express = require('express');
const { addProject } = require('../../database/engine/project/index.js');
const router = express.Router();
const cleanCache = require('../../middlewares/cleanCache');

// TODO
// router.get('/', async (req, res, next) => {
//   const data = await getAllProjects();
//   res.json({ data });
// });

// TODO
// router.get('/:id', async (req, res, next) => {
//   const data = await getProjectById(req.params.id);
//   res.json({ data });
// });

router.post('/', async (req, res, next) => {
  const data = await addProject(req.body);
  console.log('data', data);
  res.json({ data });
});

module.exports = router;