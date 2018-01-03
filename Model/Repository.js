
class Repository {
  constructor(repository) {
    this.name = repository.name
    this.url = repository.url
    this.type = repository.type
    this.commit = repository.commit
    this.version = repository.version
    this.hash = repository.hash
  }
}

module.exports.Repository = Repository
