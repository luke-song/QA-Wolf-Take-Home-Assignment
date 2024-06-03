// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");
const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

async function saveHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com");

  // Select the top 10 articles
  const articles = await page.$$eval(".athing", (nodes) =>
    nodes.slice(0, 10).map((node) => {
      const titleElement = node.querySelector(".titleline > a");
      if (!titleElement) return { title: "N/A", url: "N/A" };
      const title = titleElement.innerText;
      const url = titleElement.href;
      return { title, url };
    })
  );

  // CSV file setup
  const csvWriter = createCsvWriter({
    path: "hacker_news_articles.csv",
    header: [
      { id: "title", title: "TITLE" },
      { id: "url", title: "URL" },
    ],
  });

  // Write data to CSV
  await csvWriter.writeRecords(articles);

  // Close browser
  await browser.close();
}

(async () => {
  await saveHackerNewsArticles();
})();
