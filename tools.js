const puppeteer = require('puppeteer');
const fs = require('fs');

async function shotScreen(url, filename = 'screenshot.png') {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    await page.screenshot({ path: filename });

    console.log(`Screenshot saved as ${filename}`);
    return filename;
  } catch (error) {
    console.error('Error capturing screenshot:', error);
  } finally {
    await browser.close();
  }
}

module.exports = { shotScreen };