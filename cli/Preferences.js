var os = require("os")
var preferences_name = require("../package.json")
var fs = require("fs")

class Preferences {
  constructor() {
    this.base_dir = "/ltk/"
    this.file_name = preferences_name.preference_file
    this.path = os.userInfo().homedir + this.base_dir
    this.file = undefined
    this.url = undefined
    this.python = undefined
    this.node = undefined
  }


  alredyInit() {
    let absUrl = this.path + this.file_name
      if (!this.folderExist()) {
        fs.mkdirSync(this.path)
        return false
      }
      else{
        if(!this.fileExist()){
          return false
        }
        else{
          return true
        }
      }
  }

  folderExist() {
    if (fs.existsSync(this.path)) {
      return true
    } else {
      return false
    }
  }

  fileExist() {
    if (fs.existsSync(this.path + this.file_name)) {
      return true
    } else {
      return false
    }
  }

  savePreferences(preferences) {
    fs.writeFile(this.path + this.file_name, preferences, err => {
      if (err) {
        return console.log(err)
      } else {
        this.file = require(this.path + this.file_name)
        this.url = this.file.url
        this.python = this.file.default_python_manager
        this.node = this.file.default_node_manager
      }
    })
  }
}

module.exports.Preferences = Preferences
