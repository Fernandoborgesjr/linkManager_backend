'use-strict';

const express = require('express');
const { Link } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  const accountId = 2; /* req.id */
  const link = await Link.findAll({ where: { accountId } });

  if (!link) return res.jsonNotFound();

  return res.jsonOK(link);
});

router.get('/:id', async (req, res) => {
  const accountId = 2; /* req.id */
  const { id } = req.params;
  const link = await Link.findOne({ where: { id, accountId } });

  if (!link) return res.jsonNotFound();

  return res.jsonOK(link);
});

router.post('/', async (req, res) => {
  const accountId = 2; /* req.id */

  const {
    label, url, isSocial, /* image, */
  } = req.body;

  const image = 'https://google.com/image.jpeg';

  const link = await Link.create({
    label, url, isSocial, image, accountId,
  });

  return res.jsonOK(link);
});

router.put('/:id', async (req, res) => {
  const accountId = 2; /* req.id */
  const { id } = req.params;
  const { body } = req;

  const fields = ['label', 'url', 'isSocial', 'image'];

  const link = await Link.findOne({ where: { id, accountId } });

  if (!link) return res.jsonNotFound();

  // eslint-disable-next-line array-callback-return
  fields.map((fieldName) => {
    const newValue = body[fieldName];
    if (newValue) link[fieldName] = newValue;
  });

  await link.save();

  return res.jsonOK(link);
});

router.delete('/:id', async (req, res) => {
  const accountId = 2; /* req.id */
  const { id } = req.params;
  const link = await Link.findOne({ where: { id, accountId } });

  if (!link) return res.jsonNotFound();
  await link.destroy();
  return res.jsonOK();
});

module.exports = router;
