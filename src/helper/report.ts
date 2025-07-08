import { executionAsyncId } from "async_hooks";

const report = require("multiple-cucumber-html-reporter");
const executionStartTime=new Date();
const executionEndTime=new Date();

report.generate({
  jsonDir: "test-results",
  reportPath: "./",
  reportName:"Playwright BDD Report",
  pageTitle:"BookCart App test report",
  metadata: {
    browser: {
      name: "chrome",
      version: "137",
    },
    device: "Laksitha machine",
    platform: {
      name: "Windows",
      version: "10 Pro",
    },
  },
  customData: {
    title: "Test info",
    data: [
      { label: "Project", value: "Book cart project" },
      { label: "Release", value: "1.2.3" },
      { label: "Cycle", value: "Smoke-1" },
      { label: "Execution Start Time", value: executionStartTime.toLocaleString()},
      { label: "Execution End Time", value: executionEndTime.toLocaleString()},
      ],
  },
});