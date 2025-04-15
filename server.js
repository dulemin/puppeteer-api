const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/scrape', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Fehlende URL');

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });

    // Beispiel: gib den kompletten HTML-Code zurück
    const html = await page.content();

    await browser.close();
    res.send(html);
  } catch (err) {
    res.status(500).send('Fehler beim Scrapen: ' + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
