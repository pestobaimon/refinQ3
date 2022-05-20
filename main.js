const puppeteer = require("puppeteer");

const scrape = async (args, url) => {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  await page.goto(url);
  const button = await page.waitForSelector("input");
  await button.click();
  await page.waitForSelector("tr");
  const trHandleArray = await page.$$("tr");
  for (i in trHandleArray) {
    const tdHandleArray = await trHandleArray[i].$$("td");
    const row = [];
    for (j in tdHandleArray) {
      const text = await page.evaluate((el) => el.textContent, tdHandleArray[j]);
      row.push(text.replace(" ", ""));
    }
    if (row[0] === args[0]) console.log(row[1]);
  }
  browser.close();
};

const args = process.argv.slice(2);
const url = "https://codequiz.azurewebsites.net/";
scrape(args, url);
