var axios = require("axios")
var moxios = require("moxios")
var sinon = require("sinon")
var packagejson = require("../package.json")
var Manager = require("../cli/Manager").Manager
var equal = require("assert").equal
var assert = require("assert")

describe("[Node] Test install package", function() {
  const url = "http://localhost:300"
  const packageTest = "ltk-test"
  let packageManager = new Manager()

  beforeEach(function() {
    moxios.install()
  })

  afterEach(function() {
    moxios.uninstall()
  })

  it("just for a single spec", function(done) {
    const testPackage = {
      name: "ltk-test",
      url: "git@bitbucket.org:lotrek-tea/ltk-test.git",
      type: "node",
      version: 1,
      hash:
        "6ca47b2cb4d6a1886a6d2ca7d0cf1843450aff12478b7e8d9e10cbed18a81454d8c486c6aff6830428a16bfcd569628d9727924a03d5de8f2a8c632b87830e74"
    }

    moxios.withMock(function() {
      let onFulfilled = sinon.spy()
      axios.get("/api/repo/" + packageTest).then(onFulfilled)

      moxios.wait(function() {
        let request = moxios.requests.mostRecent()
        request
          .respondWith({ status: 200, response: { testPackage } })
          .then(function(result) {
            let installPromise = new Promise(function(resolve, reject) {
              
              resolve(packageManager.installNodeRepository(result.data.url))
            })
            installPromise
              .then(result => {
                console.log("aaa"+result)
              })
              .catch(() => {})
            
          }).catch(()=>{})
          done()
      })
    })
  })
})
