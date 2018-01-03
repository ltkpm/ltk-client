#!/usr/bin/env node

var program = require("commander")
var Manager = require("./cli/Manager").Manager

var repoManager = new Manager()

program
  .option("-g, --global", "global installation")
  .command("install <repo>")
  .action(function(repo) {
    console.log(repo);
    repoManager.install(repo);
  });

program
  .option("-g, --global", "global installation")
  .command("remove <repo>")
  .action(function(repo) {
    console.log(repo);
  });

program
  .option("-g, --global", "global installation")
  .command("register <repo>")
  .action(function(repo) {
    console.log(repo);
  });


program.parse(process.argv);

/*
  install
  remove
  register
  */
