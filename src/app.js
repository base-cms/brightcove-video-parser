const express = require('express');
const { asyncRoute } = require('@base-cms/utils');
const brightcove = require('./brightcove');

const { log } = console;
const app = express();

app.get('/favicon.ico', (_, res) => res.status(404).send());
app.get('/:id', asyncRoute(async (req, res) => {
  try {
    const { id } = req.params;
    const payload = await brightcove(id);
    res.json(payload);
  } catch (error) {
    log(error);
    res.status(500).json({ error: error.message });
  }
}));

module.exports = app;
