var axios = require("axios")
var server = require("../server_url.json")
var Repository = require("../Model/Repository").Repository;


class Client {
  constructor() {
    this.URL = server.url + "/api"
    axios.defaults.headers.post['Content-Type'] = 'application/json'
  }

  getRepository(repo_name) {
    let url = this.URL + "/repos/" + repo_name
    let responsePromise = new Promise(function(resolve, reject) {
      axios
        .get(url)
        .then(function(response) {
          resolve(new Repository(response.data))
        })
        .catch(response => {
          console.log("Something wrong happen! Reason "+response)
        })
    })
    return responsePromise
  }

  addRepository(repo) {
    let url = this.URL + "/repos/"
    axios.post(url, repo).then(function(response) {
      let result = undefined
      switch (response.statusCode) {
        case 400:
          result = "Oh no! Something went wrong " + "Reason -> " + response.data
          break;
        
        default:
          result = "Yay, registered correctly! "
          break;     
      }

      console.log(result)
    }).catch((response)=>{
      console.log("Something wrong happen! Reason " )
      console.log(response)
    })
  }
}

module.exports.Client = Client;
