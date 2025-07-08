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
      "json:test-results/cucumber-report.json" //npm install multiple-cucumber-html-reporter,--save-dev
    ],
    requireModule: ["ts-node/register"],

    parallel:2
  }
};