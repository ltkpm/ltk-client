var ClientLtk = require("./Client").Client;

class Manager {
  constructor() {
    this.client = new ClientLtk();
  }

  install(repo_name, global) {
    let repo;
    repo = this.client.getRepository(repo_name);
    repo.then(function(response) {
      console.log(response);
      if (repo) {
        console.log(repo.name);
        if (repo.type == "Npm") installNodeRepo();
      }
    });
  }

  remove(repo, global) {}

  register() {}

  installNodeRepo() {
    console.log("Node Repo");
  }

  installPipRepo() {
    console.log("Pip Repo");
  }
}

module.exports.Manager = Manager;
