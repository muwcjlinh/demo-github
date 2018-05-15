// require('rootpath')()

// const expect = require('chai').expect
// const mockery = require('mockery')
// const sinon = require('sinon')
// const User = require('../../../models/user')
// const heplers = require('../../../config/helpers')

// describe('Should create a new user', () => {
//   let authControllers, db, res, req, randomNumber, skyNumber, token

//   before((done) => {
//     randomNumber = heplers.getRandomNumber()
//     skyNumber = '88888888'
//     token = 'asdfaewgsdb23t34gergf23rt34gfasdf1efawfg'

//     // Set up DB stub functions
//     User.findOne = sinon.stub()
//     // User.findOne.callsArgWith(1, {
//     //   'skyNumber': randomNumber
//     // })

//     User.saveUser = sinon.stub()

//     db = {}
//     db.findOne = User.findOne
//     db.save = User.saveUser

//     // enable mockery and register DB stub object
//     mockery.enable({
//       warnOnReplace: true,
//       warnOnUnregistered: false,
//       useCleanCache: false
//     })

//     mockery.registerMock('models/user', db)

//     // load authControllers after registering the DB stub so it does not load the real one
//     authControllers = require('controllers/authentication')

//     done()
//   })

//   after((done) => {
//     mockery.disable()
//     done()
//   })

//   beforeEach((done) => {
//     // set up request and respone
//     req = {}
//     res = {}
//     done()
//   })

//   it('Should create a new user', (done) => {
//     req = {}

//     // setup response assuming that you return the reponse via res.json
//     res.json = function (respObj) {
//       expect(respObj.user).to.not.be.undefined
//       expect(respObj.token).to.not.be.undefined
//       //   expect(respObj.user.skyNumber).to.not.equal(randomNumber)
//       done()
//     }
//     res.status = function (statusCode) {
//       expect(statusCode).to.equal(201)
//       done()
//     }

//     authControllers.register(req, res, done)
//   })
// })
