const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: './reporters/custom.js',
  viewportWidth: 1200,
  viewportHeight: 768,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
