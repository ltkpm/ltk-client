var axios = require("axios")
var moxios = require("moxios")
var sinon = require("sinon")
var packagejson = require("../package.json")
var Manager = require("../cli/Manager").Manager
var PreferenceManager = require("../cli/Preferences").Preferences
var execa = require("execa")
var expect = require("chai").expect
var fs = require("fs")

describe("[Node] Test install package", function() {
  const url = "http://localhost:300"
  const packageTest = "ltk-test"
  let packageManager = undefined

  before(function() {
    moxios.install()
    packageManager = new Manager()
  })

  after(function() {
    //moxios.uninstall()
    let command = "yarn remove ltk-test"
    execa.shellSync(command)
  })

    it("[Node] Add ltk-test dependency", function(done) {
      const testPackage = {
        name: "ltk-test",
        url: "git@bitbucket.org:lotrek-tea/ltk-test.git",
        type: "node",
        version: 1,
        hash:
          "6ca47b2cb4d6a1886a6d2ca7d0cf1843450aff12478b7e8d9e10cbed18a81454d8c486c6aff6830428a16bfcd569628d9727924a03d5de8f2a8c632b87830e74"
      }
      packageManager.preference.url = url
      packageManager.preference.node = "npm"
      moxios.withMock(function() {
        let onFulfilled = sinon.spy()
        axios.get(packageManager.preference.url+"/api/repo/" + packageTest).then(onFulfilled)
        moxios.wait(function() {
          let request = moxios.requests.mostRecent()
          request.respondWith({ status: 200, response: { testPackage } })
            .then((result)=>{
              let urlRepo = result.data.testPackage.url
              console.log(urlRepo)
              packageManager.installNodeRepository(urlRepo,3)
              done()
            }).catch((error)=>{
              console.log("error" + error)
              done()
            })
        })
      })
    })
})

describe("Test ltk init", () => {
  let preference = undefined
  let defaultPref = {
    url: "Your Heart",
    default_node_manager: "npm",
    default_python_manager: "pip"
  }

  before(() => {
    preference = new PreferenceManager()
  })

  it("Create preferences File", () => {
    let path = preference.path + preference.file_name
    preference.deletePreferences()
    let promiseWrite = preference.savePreferences(JSON.stringify(defaultPref))
    promiseWrite.then(()=>{
      expect(fs.existsSync(path)).to.equal(true)
    })
  })

  it("File with correct content", () => {
    let path = preference.path + preference.file_name
    let content = JSON.stringify(JSON.parse(fs.readFileSync(path)))
    expect(JSON.stringify(defaultPref)).to.equal(content)
  })
})

describe("[Node] Remove dependencies", () => {
  let backup_file = undefined
  let packageManager = undefined
  before(function () {
    backup_file = require("../package.json")
    let tmp_file = backup_file
    backup_file =  JSON.stringify(backup_file)
    tmp_file.dependencies["ltk-test"] = "git@bitbucket.org:lotrek-tea/ltk-test.git"
    fs.writeFileSync("package.json", JSON.stringify(tmp_file, null, ""))
    packageManager = new Manager()
    packageManager.preference.node = "npm"
  })
  it("Remove ltk-test from package.json", () => {
    packageManager.removeNodeRepository("ltk-test",3)
    
  })
  after(() => {
    console.log(backup_file)
    fs.writeFileSync("package.json", backup_file)
  })
})
