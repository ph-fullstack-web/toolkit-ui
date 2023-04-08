module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("@chiragrupani/karma-chromium-edge-launcher"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage"),
      require("@angular-devkit/build-angular/plugins/karma"),
    ],
    client: {
      /** Leave jasmine spec runner output visible in browser. */
      clearContext: false,
      // captureConsole: false, -> Prod settings
    },
    jasmineHtmlReporter: {
      /** removes the duplicated traces. */
      supressAll: true,
    },
    coverageReporter: {
      dir: require("path").join(__dirname, "./coverage/"),
      subdir: ".",
      reporters: [{ type: "html" }, { type: "text-summary" }],
      check: {
        global: {
          statement: 5,
          branches: 5,
          functions: 5,
          lines: 5,
        },
      },
    },
    reporters: ["progress", "kjhtml"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    /**
     * Change the value to ["Chrome"],
     * I'm using Edge since I don't have Chrome installed.
     */
    browsers: ["Edge"],
    browserNoActivityTimeout: 2000,
    singleRun: false,
  });
};
