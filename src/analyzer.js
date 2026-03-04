function analyzeWords(titles) {
  let wordCount = {};

  for (let title of titles) {
    // clean punctuation
    title = title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/gi, "");

    const words = title.split(/\s+/);

    for (let word of words) {
      if (!word) continue;

      wordCount[word] = (wordCount[word] || 0) + 1;
    }
  }

  console.log("\n========== REPEATED WORDS ==========");

  let found = false;

  for (let word in wordCount) {
    if (wordCount[word] > 2) {
      console.log(`${word}: ${wordCount[word]}`);
      found = true;
    }
  }

  if (!found) {
    console.log("No words repeated more than twice.");
  }

  return wordCount;
}

module.exports = analyzeWords;