#!/usr/bin/env node

var program = require("commander")
var Manager = require("./cli/Manager").Manager
var inquirer = require("inquirer")

var repoManager = new Manager()

program
  .option("-g, --global", "global installation")
  .option("-d, --dev", "save to local folder")
  .command("install <repo>")
  .action(function(repo) {
    repoManager.install(repo, getScope(program.dev, program.global))
  })

program
  .option("-g, --global", "global installation")
  .option("-d --dev", "save to local folder")
  .command("remove [name]")
  .action(function(name) {
    if (name != undefined) repoManager.remove(name, getScope(program.dev,program.global))
    else {
      var questions = [
        {
          type: "input",
          name: "name",
          message: "The name of repository you want remove"
        }
      ]
      inquirer.prompt(questions).then(answers => {
        repoManager.remove(
          JSON.stringify(answers, null, "  "),
          getScope(program.dev,program.global)
        )
      })
    }
  })

program.command("register").action(function(repo) {
  var questions = [
    {
      type: "input",
      name: "name",
      message: "The name of repository"
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

function getScope(dev, global) {
  let scope = 3
  if (dev) {
    scope = 2
  } else {
    if (global) scope = 1
  }
  return scope
}
