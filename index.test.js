const { chromium } = require("playwright");
const fs = require("fs");
const { saveHackerNewsArticles } = require("./index");

// Playwright test suite
test("saveHackerNewsArticles creates a CSV file with correct data", async () => {
  // Run the function to scrape data and save to CSV
  await saveHackerNewsArticles();

  // Check if the CSV file is created
  const csvExists = fs.existsSync("hacker_news_articles.csv");
  expect(csvExists).toBe(true);

  // Read the CSV file and check its contents
  const data = fs.readFileSync("hacker_news_articles.csv", "utf8");
  const rows = data.split("\n");
  expect(rows.length).toBeGreaterThan(1); // Header plus at least one line of data

  // Optionally, check for specific content in the CSV
  expect(data).toContain("TITLE");
  expect(data).toContain("URL");

  // Clean up: delete the CSV file after test
  fs.unlinkSync("hacker_news_articles.csv");
});
