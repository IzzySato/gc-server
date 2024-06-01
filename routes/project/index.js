const express = require('express');
const { addProject, getProjectById, getAllProjects, updateProject } = require('../../database/engine/project/index.js');
const router = express.Router();
const cleanCache = require('../../middlewares/clearCache.js');

router.get('/', async (req, res, next) => {
  const data = await getAllProjects();
  res.json({ data });
});

router.get('/:id', async (req, res, next) => {
  console.log(req.params)
  const data = await getProjectById(req.params.id);
  res.json({ data });
});

router.post('/', async (req, res, next) => {
  const data = await addProject(req.body);
  res.json({ data });
});

router.patch('/', async (req, res, next) => {
  const data = await updateProject(req.body);
  res.json({ data });
});

module.exports = router;