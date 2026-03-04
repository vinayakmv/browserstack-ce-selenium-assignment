# BrowserStack CE Technical Assignment

## Overview
This project demonstrates:

- Web scraping using Selenium WebDriver
- API integration for translation
- Text processing and word frequency analysis
- Cross-browser parallel execution using BrowserStack

## Features Implemented

1. Scrapes first 5 articles from El País Opinion section
2. Extracts:
   - Spanish title
   - Article content
   - Cover image
3. Translates titles to English
4. Identifies repeated words across translated titles
5. Runs across 5 parallel environments on BrowserStack:
   - Chrome (Windows 11)
   - Firefox (Windows 10)
   - Edge (Windows 11)
   - iPhone 14 (Safari)
   - Samsung Galaxy S22 (Chrome)

## Tech Stack

- Node.js
- Selenium WebDriver
- Axios
- translate-google
- BrowserStack Automate

## How to Run Locally
npm install
node src/scraper.js


## How to Run on BrowserStack

1. Add credentials in `.env`
2. Run:node src/browserstack-run.js