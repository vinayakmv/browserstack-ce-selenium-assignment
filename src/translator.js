const translate = require("translate-google");

async function translateTitles(titles) {
  let translatedTitles = [];

  for (let title of titles) {
    try {
      const translated = await translate(title, { to: "en" });

      console.log("\nSpanish:", title);
      console.log("English:", translated);

      translatedTitles.push(translated);
    } catch (error) {
      console.log("Translation failed for:", title);
      translatedTitles.push(title);
    }
  }

  return translatedTitles;
}

module.exports = translateTitles;