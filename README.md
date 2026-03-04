# BrowserStack Customer Engineer Technical Assignment

## Overview
This project demonstrates web scraping, API integration, text processing, and cross-browser testing using BrowserStack.

The script collects articles from the El País Opinion section, translates the titles to English, performs text analysis, and verifies execution across multiple browsers and devices using BrowserStack Automate.

---

## Features Implemented

- Scrapes the first 5 articles from the El País Opinion section
- Extracts:
  - Spanish article title
  - Article content
  - Cover image
- Downloads article images locally
- Translates article titles to English using a translation API
- Performs word frequency analysis on translated titles
- Executes tests locally for validation
- Runs tests on BrowserStack across **5 parallel environments**

### BrowserStack Environments Used

- Chrome – Windows 11
- Firefox – Windows 10
- Edge – Windows 11
- iPhone 14 – Safari
- Samsung Galaxy S22 – Chrome

---

## Tech Stack

- Node.js
- Selenium WebDriver
- Axios
- translate-google
- BrowserStack Automate

---

The repository is organized as follows:

## Project Structure

```
browserstack-selenium-ce-assignment
│
├── src
│   ├── scraper.js
│   ├── translator.js
│   ├── analyzer.js
│   └── browserstack-run.js
│
├── images
├── .env.example
├── package.json
└── README.md
```


---

## Run Locally

Install dependencies:

npm install


Run the scraper:


node src/scraper.js


---

## Run on BrowserStack

1. Add your BrowserStack credentials in `.env`

```
BROWSERSTACK_USERNAME=your_username
BROWSERSTACK_ACCESS_KEY=your_access_key
```


2. Run the BrowserStack test:


node src/browserstack-run.js


---

## Author

Vinayak Sathisan
