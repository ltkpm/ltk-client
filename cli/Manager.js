var ClientLtk = require("./Client").Client
var execa = require("execa")

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
          this.removeNodeRepository(repo.name)
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
    let options = this.getScope(scope)
    let command =
      npmInstall + options[0] + this.addPrefixUrl(repo_url) + options[1]
    console.log("Wait, installing dependency")
    execa.shell(command).then(result => {
      console.log(command)
      console.log(result.stdout)
    })
  }

  installPyRepository(repo_url) {
    const pipInstall = "pip install "
    let command = pipInstall + this.addPrefixUrl(repo_url)
    console.log("Wait, installing dependency")
    execa.shell(command).then(result => {
      console.log(result.stdout)
    })
  }

  removeNodeRepository(repo_name, scope) {
    const npmInstall = "npm remove "
    let options = this.getScope(scope)
    let command = npmInstall + options[0] + repo_name + options[1]
    console.log("Wait, removing dependency")
    execa.shell(command).then(result => {
      console.log(command)

      console.log(result.stdout)
    })
  }

  removePythonRepository(repo_name) {
    const pipInstall = "pip remove " + repo_name
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
    const npmInstall = "npm install "
    if (scope == 1) {
      result[0] = "-g "
    } else if (scope == 2) {
      result[1] = " -D"
    } else if (scope == 3) {
      result[1] = " --save"
    }

    return result
  }
}

module.exports.Manager = Manager
