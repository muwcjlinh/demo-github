// // const httpMocks = require('node-mocks-http')
// // const chai = require('chai')
// // const should = chai.should()
// // const mockery = require('mockery')

// // function buildResponse () {
// //   return httpMocks.createResponse({eventEmitter: require('events').EventEmitter})
// // }

// // describe('User controllers Tests', () => {
// //   before(() => {
// //     mockery.enable({
// //       warnOnUnregistered: false
// //     })

// //     mockery.registerMock('../../models/user', {
// //       viewProfile: (id, cb) => cb(null, {skyNumber: skyNumber, firstName: firstName, lastName: lastName, id: id})
// //     })

// //     this.controller = require('../../controllers/user')
// //   })

// //   after(() => {
// //     mockery.disable()
// //   })

// //   it('View Profile', (done) => {
// //     const response = buildResponse()
// //     const request = httpMocks.createRequest({
// //       method: 'GET',
// //       url: '/api/user'
// //     })

// //     response.on('end', () => {
// //       response._isJSON().should.be.true

// //       const data = JSON.parse(response._getData())
// //       should.not.exist(data.error)
// //       data.user.id.should.eql(request.id)
// //       data.user.skyNumber.should.exist

// //       done()
// //     })
// //     this.controller.handle(request, response)
// //   })
// // })

// require('rootpath')()

// const expect = require('chai').expect
// const mockery = require('mockery')
// const sinon = require('sinon')
// const User = require('../../../models/user')

// describe('User controllers', () => {
//   let userControllers, db, res, req, skyNumber, firstName, lastName, userId

//   before((done) => {
//     // fill your db dummy return object
//     skyNumber = '12345678'
//     firstName = 'Muc'
//     lastName = 'Nguyen'
//     userId = '5ae99690e1d9710b41201c1d'

//     // set up DB stub functions
//     User.findById = sinon.stub()
//     User.findById.callsArgWith(1, null, {
//       'skyNumber': skyNumber,
//       'firstName': firstName,
//       'lastName': lastName,
//       '_id': userId
//     })

//     db = {}
//     db.findById = User.findById

//     // enable mockery and register DB stb object
//     mockery.enable({
//       warnOnReplace: true,
//       warnOnUnregistered: false,
//       useCleanCache: false
//     })

//     mockery.registerMock('models/user', db)

//     // load userControllers after registering the DB stub so it does not load the real one
//     userControllers = require('controllers/user')

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

//   it('Should view user profile', (done) => {
//     req.params = {
//       'userId': userId
//     }

//     req.user = {
//       '_id': userId
//     }

//     // setup response assuming that you return the response via res.json
//     res.json = function (respObj) {
//       expect(respObj.user).to.not.be.undefined
//       expect(respObj.user.skyNumber).to.equal(skyNumber)
//       done()
//     }
//     res.status = function (statusCode) {
//       expect(statusCode).to.equal(200)
//       done()
//     }

//     userControllers.viewProfile(req, res, done)
//   })
// })
