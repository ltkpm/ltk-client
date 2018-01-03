var ClientLtk = require("Client").Client

class Manager {
    var client = new ClientLtk()

    install(package_name,global) {
        let repo = client.getPackage(package_name)    
    }

    remove(package,global) {

    }

    register() {

    }
}