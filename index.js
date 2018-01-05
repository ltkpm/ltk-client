#!/usr/bin/env node

var program = require("commander")
var Manager = require("./cli/Manager").Manager
var inquirer = require("inquirer")

var repoManager = new Manager()

program
  .option("-g, --global", "global installation")
  .option("-s, --save", "save to local folder")
  .command("install <repo>")
  .action(function(repo) {
    let scope = undefined
    if (program.save) {
      scope = 2
    } else {
      scope = 1
    }
    repoManager.install(repo, scope)
  })

program
  .option("-g, --global", "global installation")
  .command("remove <repo>")
  .action(function(repo) {
    console.log(repo)
  })

program.command("register").action(function(repo) {
  var questions = [
    {
      type: "input",
      name: "name",
      message: "The name of repository",
    },
    { type: "input", name: "url", message: "Url of repository" },
    {
      type: "list",
      name: "type",
      message: "Type of repository",
      choices: ["Node", "Python"],
      filter: function(val) {
        return val.toLowerCase()
      }
    },
    {
      type: "input",
      name: "version",
      message: "Version of repository",
      validate: function(value) {
        var valid = !isNaN(parseFloat(value))
        return valid || "Please enter a number"
      },
      filter: Number
    }
  ]

  inquirer.prompt(questions).then(answers => {
    repoManager.register(JSON.stringify(answers, null, "  "))
  })
})

program.parse(process.argv)

/*
  install
  remove
  register
  */
