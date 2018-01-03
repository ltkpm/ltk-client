var axios = require("axios")
var server = require("../server_url.json")
var Repository = require("../Model/Repository").Repository;


class Client {
  constructor() {
    this.URL = server.url + "/api"
  }

  getRepository(repo_name) {
    var url = this.URL + "/repos/" + repo_name
    var p = new Promise(function(resolve, reject) {
        axios.get(url).then(function(response) {
            resolve(new Repository(response.data));
        });
    })
    return p;
  }
}

module.exports.Client = Client;
