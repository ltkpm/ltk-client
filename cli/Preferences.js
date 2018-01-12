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
    } else {
      if (!this.fileExist()) {
        return false
      } else {
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

  deletePreferences() {
    if (this.fileExist()) {
      fs.unlinkSync(this.path + this.file_name)
      return true
    } else {
      return false
    }
  }

  async savePreferences(preferences) {
    let result = undefined 
    try{
      result = await fs.writeFile(this.path + this.file_name, preferences, err => {
        if (err) {
        console.error(err)
      } else {
        this.file = require(this.path + this.file_name)
        this.url = this.file.url
        this.python = this.file.default_python_manager
        this.node = this.file.default_node_manager
      }
      })
    }
    catch(e){
      console.log(e)
    }
    return result
  }
}

module.exports.Preferences = Preferences
