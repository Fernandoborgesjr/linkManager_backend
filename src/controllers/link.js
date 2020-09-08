'use-strict';

const express = require('express');
const { Link } = require('../models');

const router = express.Router();

/* Quando essas rotas são chamadas a requisição passa pelo middleware jwt para
verificar o token. Caso o token seja válido, o id do usuário é atribuido na requisição.
Posteriormente é dada a sequencia das rotas abaixo. */

router.get('/', async (req, res) => {
  /* Esse id que está na requisição está vindo da verificação do token */
  const { accountId } = req;
  const link = await Link.findAll({ where: { accountId } });

  if (!link) return res.jsonNotFound();

  return res.jsonOK(link);
});

router.get('/:id', async (req, res) => {
  const { accountId, params } = req;
  const { id } = params;
  const link = await Link.findOne({ where: { id, accountId } });

  if (!link) return res.jsonNotFound();

  return res.jsonOK(link);
});

router.post('/', async (req, res) => {
  const { accountId, body } = req;

  const {
    label, url, isSocial, /* image, */
  } = body;

  const image = 'https://google.com/image.jpeg';

  const link = await Link.create({
    label, url, isSocial, image, accountId,
  });

  return res.jsonOK(link);
});

router.put('/:id', async (req, res) => {
  const { accountId, body, params } = req;
  const { id } = params;

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
  const { accountId, params } = req;
  const { id } = params;
  const link = await Link.findOne({ where: { id, accountId } });

  if (!link) return res.jsonNotFound();
  await link.destroy();
  return res.jsonOK();
});

module.exports = router;
