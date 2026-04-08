import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', '[구인·계약]');

const files = [
  { html: '구인글_종로점.html', out: '스포짐_종로점_급여조건.jpg' },
  { html: '구인글_양천향교역점.html', out: '스포짐_양천향교역점_급여조건.jpg' },
  { html: '구인글_고덕역점.html', out: '스포짐_고덕역점_급여조건.jpg' },
  { html: '구인글_부천점.html', out: '스포짐_부천점_급여조건.jpg' },
];

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  for (const f of files) {
    const htmlPath = path.join(__dirname, f.html);
    const url = `file:///${htmlPath.replace(/\\/g, '/')}`;
    await page.goto(url, { waitUntil: 'networkidle0' });

    // Wait for fonts
    await page.evaluate(() => document.fonts.ready);
    await new Promise(r => setTimeout(r, 1000));

    // Get .wrap element dimensions
    const clip = await page.evaluate(() => {
      const el = document.querySelector('.wrap');
      const rect = el.getBoundingClientRect();
      return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
    });

    await page.setViewport({ width: Math.ceil(clip.width), height: Math.ceil(clip.height), deviceScaleFactor: 2 });
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    await new Promise(r => setTimeout(r, 500));

    const outPath = path.join(outDir, f.out);
    await page.screenshot({ path: outPath, type: 'jpeg', quality: 92, fullPage: true });
    console.log(`Saved: ${outPath}`);
  }

  await browser.close();
  console.log('Done! All 4 JPGs saved.');
})();
