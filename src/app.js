const express = require('express');
const { asyncRoute } = require('@base-cms/utils');
const {
  playlist,
  playlists,
  video,
  videos,
} = require('./brightcove');

const { log } = console;
const app = express();

app.get('/playlist/:id', asyncRoute(async (req, res) => {
  try {
    const { id } = req.params;
    const payload = await playlist(id);
    res.json(payload);
  } catch (error) {
    log(error);
    res.status(500).json({ error: error.message });
  }
}));

app.get('/video/:id', asyncRoute(async (req, res) => {
  try {
    const { id } = req.params;
    const payload = await video(id);
    res.json(payload);
  } catch (error) {
    log(error);
    res.status(500).json({ error: error.message });
  }
}));

app.get('/playlists', asyncRoute(async (req, res) => {
  try {
    const payload = await playlists();
    res.json(payload);
  } catch (error) {
    log(error);
    res.status(500).json({ error: error.message });
  }
}));

app.get('/videos', asyncRoute(async (req, res) => {
  try {
    const payload = await videos();
    res.json(payload);
  } catch (error) {
    log(error);
    res.status(500).json({ error: error.message });
  }
}));

module.exports = app;
