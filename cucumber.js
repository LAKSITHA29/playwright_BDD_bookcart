module.exports = {
  default: {
    formatOptions: {
      snippetInterface: "async-await"
    },
    dryRun: false,
    paths: ["src/test/features//*.feature"],
    require: [
      "src/test/steps/**/*.ts",
      "src/hooks/**/*.ts"
    ],
    format: [
      "progress-bar",
      "html:reports/cucumber-report.html",
      "json:test-results/cucumber-report.json", //npm install multiple-cucumber-html-reporter,--save-dev
      "rerun:@rerun.txt"
    ],
    requireModule: ["ts-node/register"],
     parallel:2
  },
  rerun: {
    requireModule: ["ts-node/register"],
    require: [
      "src/test/steps/**/*.ts",
      "src/hooks/**/*.ts"
    ],
    format: [
      "progress-bar",
      "html:reports/rerun-report.html",
      "json:test-results/rerun-report.json",
      "rerun:@rerun.txt"
    ],
    paths: ["@rerun.txt"]  // ✅ This runs only failed scenarios
  }
};
