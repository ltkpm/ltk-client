var ClientLtk = require("./Client").Client
var execa = require("execa")
var preferences = require("../preferences.json")

class Manager {
  constructor() {
    this.client = new ClientLtk()
  }

  install(repo_name, global) {
    let result = this.client.getRepository(repo_name.toLowerCase())
    result.then(repo => {
      if (repo) {
        switch (repo.type) {
          case "node":
            this.installNodeRepository(repo.url, global)
            break

          case "python":
            this.installPyRepository(repo.url, global)
            break
        }
      }
    })
  }

  remove(repo_name, scope) {
    let result = this.client.getRepository(repo_name.toLowerCase())
    result.then(repo => {
      switch (repo.type) {
        case "node":
          this.removeNodeRepository(repo.name, scope)
          break
        case "python":
          this.removePythonRepository(repo.name)
          break
      }
    })
  }

  register(repo) {
    this.client.addRepository(repo)
  }

  installNodeRepository(repo_url, scope) {
    const npmInstall = "npm install "
    console.log(scope)
    let command = this.getCommand(
      preferences.default_node_manager,
      scope,
      "install",
      repo_url
    )
    console.log("Wait, installing dependency")
    execa.shell(command).then(result => {
      console.log(command)
      console.log(result.stdout)
    })
  }

  installPyRepository(repo_url) {
    const pipInstall = "pip install "
    let command = this.getCommand(
      preferences.default_python_manager,
      scope,
      "install",
      repo_url
    )
    console.log("Wait, installing dependency")
    execa.shell(command).then(result => {
      console.log(result.stdout)
    })
  }

  removeNodeRepository(repo_name, scope) {
    const npmRemove = "npm remove "
    let command = this.getCommand(
      preferences.default_node_manager,
      scope,
      "remove",
      repo_name
    )
    console.log("Wait, removing dependency")
    execa.shell(command).then(result => {
      console.log(command)
      console.log(result.stdout)
    })
  }

  removePythonRepository(repo_name) {
    let command = this.getCommand(
      preferences.default_python_manager,
      scope,
      "remove",
      repo_url
    )
    console.log("Wait, removing dependency")
    execa.shell(command).then(result => {
      console.log(result.stdout)
    })
  }

  addPrefixUrl(repo_url) {
    const gitPrefix = "git+"
    const sshPrefix = "ssh://"
    let result = undefined
    if (repo_url.includes("https://")) {
      result = gitPrefix + repo_url
    } else if (repo_url.includes("git@")) {
      result =
        gitPrefix + sshPrefix + "git@bitbucket.org:lotrek-tea/ltk-test.git"
    }
    return result
  }

  getScope(scope) {
    let result = ["", ""]
    if (scope == 1) {
      result[0] = "-g "
    } else if (scope == 2) {
      result[1] = " -D"
    } else if (scope == 3) {
      result[1] = " --save"
    }

    return result
  }

  getCommand(installer, scope, operation, repo_url) {
    console.log("scope " + scope)
    const installation_command = [
      {
        yarn: {
          install: "yarn add ",
          remove: "yarn remove "
        },
        npm: {
          install: "npm install ",
          remove: "npm remove "
        },
        pip: {
          install: "pip install ",
          remove: "pip remove "
        }
      }
    ]
    let options = undefined
    let command = undefined
    let repo = undefined

    if (operation == "remove") {
      repo = repo_url
    } else {
      repo = this.addPrefixUrl(repo_url)
    }
    if (installer != "pip") {
      options = this.getScope(scope)
    }
    command = installation_command[0][installer][operation] + options[0] + repo
    console.log(command)
    return command
  }
}

module.exports.Manager = Manager
