var axios = require("axios");
var server = require("../server_url.json");
var Repository = require("../Model/Repository")

class Client {
    
    const URL = server.url+"/api/" 

    getpackage(package_name) {
        let repo = new Repository(axios.get(URL+/package_name)) 
        console.log(response)
    }

}

module.exports.Client = Client