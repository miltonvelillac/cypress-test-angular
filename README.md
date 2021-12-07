### Ngx-Admin Angular 8 application from akveo.com

This is modified and more lightweight version of original application to practice UI Automation with Cypress.

The original repo is here: https://github.com/akveo/ngx-admin


# STRUCTURE
* support -> index.js = the first execution file, all the code added there will be executed at the first time, is common used to add libraries
* support -> commands.js = is the file where you can add your commonly used functions, i.e. login function
* plugin -> index.js = is the file to put the needed plugins
* integration -> this is the main folder where you will keep your test
* fixtures -> here we will keep our test data objects
* cypress.json -> this is the cypress configuration file (https://docs.cypress.io/guides/references/configuration)