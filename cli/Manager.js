var ClientLtk = require("./Client").Client
var execa = require("execa")

class Manager {
  constructor() {
    this.client = new ClientLtk()
  }

  install(repo_name, global) {
    let repo
    let result = this.client.getRepository(repo_name.toLowerCase())
    result.then(response => {
      repo = response
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

  remove(repo, global) {}

  register() {}

  installNodeRepository(repo_url, scope) {
    let global = "",
      save = ""
    const npmInstall = "npm install "
    if (scope == 1) {
      global = "-g "
    } else if (scope == 2) {
      save = " --save"
    }
    let command = npmInstall + global + this.addPrefixUrl(repo_url) + save
    execa.shell(command).then(result => {
      console.log(command)
      console.log("Wait, installing dependency")
      console.log(result.stdout)
    })
  }

  installPyRepository(repo_url) {
    const pipInstall = "pip install "
    let command = pipInstall + this.addPrefixUrl(repo_url)
    execa.shell(command).then(result => {
      console.log("Wait, installing dependency")
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
}

module.exports.Manager = Manager
