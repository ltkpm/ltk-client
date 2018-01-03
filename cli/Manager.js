var ClientLtk = require("./Client").Client;

class Manager {
  constructor() {
    this.client = new ClientLtk();
  }

  install(repo_name, global) {
    let repo;
    let result = this.client.getRepository(repo_name);
    result.then((response) => {
      repo = response
      console.log(repo.type)
      if (repo) {
        switch (repo.type) {
            case "npm":
                this.installNodeRepository()
                break;
        
            default:
                break;
        }
      }
    });
  }

  remove(repo, global) {}

  register() {}

  installNodeRepository() {
      console.log('Humaniiiii')
  }
}

module.exports.Manager = Manager;
