#!/usr/bin/env node

var program = require("commander")
var Manager = require("Manager")

var packageManager = new Manager()

program
  .option("-g, --global", "global installation")
  .command("install <package>")
  .action(function(package) {
    console.log(package);
  });

program
  .option("-g, --global", "global installation")
  .command("remove <package>")
  .action(function(package) {
    console.log(package);
    packageManager.
  });

program
  .option("-g, --global", "global installation")
  .command("register <package>")
  .action(function(package) {
    console.log(package);
  });


program.parse(process.argv);

/*
  install
  remove
  register
  */
