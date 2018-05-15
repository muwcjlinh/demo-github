// require('rootpath')

// const expect = require('chai').expect
// const mockery = require('mockery')
// const sinon = require('sinon')
// const User = require('../../../models/user')

// describe('Authentication controllers', () => {
//   let authControllers, db, res, req, randomNumber, skyNumber, token

//   before((done) => {
//     randomNumber = '12345678'
//     skyNumber = '88888888'
//     token = 'asdfaweargawefyg23e7ry1p29f1p2dg1p27g'

//     // set up DB stub functions
//     User.findOne = sinon.stub()
//     User.findOne.callsArgWith(1, null, {
//       'skyNumber': randomNumber
//     })

//     db = {}
//     db.findOne = User.findOne

//     // enable mockery and register DB stub object
//     mockery.enable({
//       warnOnReplace: true,
//       warnOnUnregistered: false,
//       useCleanCache: false
//     })

//     mockery.registerMock('models/user', db)

//     // load userControllers after registering the DB stub so it dose not load the real one
//     authControllers = require('controllers/authentication')

//     done()
//   })

//   after((done) => {
//     mockery.disable()
//     done()
//   })

//   beforeEach((done) => {
//     // set up request and response
//     req = {}
//     res = {}
//     done()
//   })

//   it('Should Login', (done) => {
//     req.body = {
//       'skyNumber': skyNumber,
//       'token': token
//     }
//     req.headers = {
//       'Authentication': 'Bearer ' + token
//     }

//     // setup response
//     res.json = function (respObj) {
//       expect(respObj.user).to.not.be.undefined
//       expect(respObj.user.skyNumber).to.equal(skyNumber)
//       done()
//     }
//     res.status = function (statusCode) {
//       expect(statusCode).to.equal(200)
//       done()
//     }

//     authControllers.login(req, res, done)
//   })
// })

// // it('Should register', (done) => {
// //   req = {}

// //   // setup response assuming that you return the reponse via res.json
// //   res.json = function (respObj) {
// //     expect(respObj.user).to.not.be.undefined
// //     expect(respObj.token).to.not.be.undefined
// //     expect(respObj.user.skyNumber).to.not.equal(randomNumber)
// //     done()
// //   }
// //   res.status = function (statusCode) {
// //     expect(statusCode).to.equal(201)
// //     done()
// //   }

// //   authControllers.register(req, res, done)
// // })
