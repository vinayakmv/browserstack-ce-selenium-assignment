require("dotenv").config();
const { Builder } = require("selenium-webdriver");

const USERNAME = process.env.BROWSERSTACK_USERNAME;
const ACCESS_KEY = process.env.BROWSERSTACK_ACCESS_KEY;

const HUB_URL = `https://${USERNAME}:${ACCESS_KEY}@hub-cloud.browserstack.com/wd/hub`;

const capabilitiesList = [
  {
    browserName: "Chrome",
    browserVersion: "latest",
    "bstack:options": {
      os: "Windows",
      osVersion: "11",
      buildName: "CE Assignment Build",
      sessionName: "Chrome Test"
    }
  },
  {
    browserName: "Firefox",
    browserVersion: "latest",
    "bstack:options": {
      os: "Windows",
      osVersion: "10",
      buildName: "CE Assignment Build",
      sessionName: "Firefox Test"
    }
  },
  {
    browserName: "Edge",
    browserVersion: "latest",
    "bstack:options": {
      os: "Windows",
      osVersion: "11",
      buildName: "CE Assignment Build",
      sessionName: "Edge Test"
    }
  },
  {
    deviceName: "iPhone 14",
    realMobile: "true",
    osVersion: "16",
    browserName: "Safari",
    "bstack:options": {
      buildName: "CE Assignment Build",
      sessionName: "iPhone Test"
    }
  },
  {
    deviceName: "Samsung Galaxy S22",
    realMobile: "true",
    osVersion: "12.0",
    browserName: "Chrome",
    "bstack:options": {
      buildName: "CE Assignment Build",
      sessionName: "Android Test"
    }
  }
];

async function runTest(capabilities) {
  let driver = await new Builder()
    .usingServer(HUB_URL)
    .withCapabilities(capabilities)
    .build();

  try {
    await driver.get("https://elpais.com/opinion/");
    await driver.sleep(5000);

    console.log("Title:", await driver.getTitle());

  } catch (err) {
    console.error(err);
  } finally {
    await driver.quit();
  }
}

async function runParallelTests() {
  await Promise.all(capabilitiesList.map(cap => runTest(cap)));
}

runParallelTests();