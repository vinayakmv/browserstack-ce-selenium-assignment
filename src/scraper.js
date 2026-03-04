const analyzeWords = require("./analyzer");
const translateTitles = require("./translator");
const { Builder, By, until } = require("selenium-webdriver");
const fs = require("fs");
const axios = require("axios");
require("chromedriver");

async function downloadImage(url, filename) {
  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });

    const writer = fs.createWriteStream(filename);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch {
    console.log("Image download failed");
  }
}

async function getTitle(driver) {
  try {
    const h1 = await driver.findElement(By.css("h1")).getText();
    if (h1) return h1;
  } catch {}

  try {
    const meta = await driver.findElement(By.css("meta[property='og:title']"));
    return await meta.getAttribute("content");
  } catch {}

  return "No title found";
}

async function getContent(driver) {
  try {
    const paragraphs = await driver.findElements(By.css("article p"));
    let text = "";

    for (let p of paragraphs) {
      const t = await p.getText();
      if (t) text += t + "\n";
    }

    return text;
  } catch {
    return "No content found";
  }
}

async function getImage(driver, index) {
  try {
    const img = await driver.findElement(By.css("figure img"));
    const src = await img.getAttribute("src");

    if (src) {
      const path = `images/article_${index + 1}.jpg`;
      await downloadImage(src, path);
      console.log("Image saved:", path);
    }
  } catch {
    console.log("No image found");
  }
}

async function runScraper() {
  console.log("Launching browser...");
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://elpais.com/");
    await driver.sleep(4000);

    // Accept cookies
    try {
      const btn = await driver.wait(
        until.elementLocated(By.css("button[data-testid='didomi-notice-agree-button']")),
        5000
      );
      await btn.click();
      await driver.sleep(2000);
    } catch {}

    await driver.get("https://elpais.com/opinion/");
    await driver.wait(until.elementLocated(By.css("h2 a")), 10000);

    const articleLinks = await driver.findElements(By.css("h2 a"));
    const firstFive = articleLinks.slice(0, 5);

    let urls = [];
    for (let el of firstFive) {
      urls.push(await el.getAttribute("href"));
    }

    console.log("\nCollected URLs:", urls);

    let titles = []; // 🔥 collect titles for translation

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      await driver.get(url);
      await driver.wait(until.elementLocated(By.css("body")), 10000);

      const title = await getTitle(driver);
      const content = await getContent(driver);

      titles.push(title); // store title

      console.log(`\n========= Article ${i + 1} =========`);
      console.log("Title (Spanish):", title);
      console.log("Content preview:", content.substring(0, 150));

      await getImage(driver, i);
    }

    // 🔥 TRANSLATION PART
    console.log("\n========== TRANSLATED TITLES ==========");
    const englishTitles = await translateTitles(titles);
    analyzeWords(englishTitles);
    
    console.log("\nAll English titles:", englishTitles);

  } catch (err) {
    console.error(err);
  } finally {
    await driver.quit();
    console.log("\nDone.");
  }
}

runScraper();