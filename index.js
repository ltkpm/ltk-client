#!/usr/bin/env node

var program = require("commander")
var Manager = require("./cli/Manager").Manager
var Preferences = require("./cli/Preferences").Preferences
var inquirer = require("inquirer")
const os = require("os")
const fs = require("fs")
var repoManager = new Manager()

program
  .option("-g, --global", "global installation")
  .option("-d, --dev", "save to local folder")
  .command("install <repo>")
  .action(function(repo) {
    repoManager.install(repo, getScope(program.dev, program.global))
  })

program.command("init").action(function(repo) {
  let preference = new Preferences()
  let questions = [
    { type: "input", name: "url", message: "Url of your private repos" },
    {
      type: "list",
      name: "default_node_manager",
      message: "Default node dependency manager",
      choices: ["Npm", "Yarn"],
      filter: function(val) {
        return val.toLowerCase()
      }
    },
    {
      type: "list",
      name: "default_python_manager",
      message: "Default python dependency manager",
      choices: ["Pip"],
      filter: function(val) {
        return val.toLowerCase()
      }
    }
  ]
  if (!preference.alredyInit()) {
    inquirer
      .prompt(questions)
      .then(answers => {
        preference.savePreferences(JSON.stringify(answers, null, "  "))
      })
      .catch(error => {
        console.log(error)
      })
  }
})

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
    if (name != undefined)
      repoManager.remove(name, getScope(program.dev, program.global))
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
          getScope(program.dev, program.global)
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
