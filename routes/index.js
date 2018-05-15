const AuthenticationController = require('../controllers/authentication')
const UserController = require('../controllers/user')
const ChatController = require('../controllers/chat')
const express = require('express')
/* eslint-disable */
const passportService = require('../config/passport')
/* eslint-enable */
const passport = require('passport')

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false })
const requireLogin = passport.authenticate('local', { session: false })

module.exports = function (app) {
  // Initializing route groups
  const apiRoutes = express.Router()
  const authRoutes = express.Router()
  const userRoutes = express.Router()
  const chatRoutes = express.Router()

  //= ========================
  // Auth Routes
  //= ========================

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes)

  // Registration route
  authRoutes.get('/register', AuthenticationController.register)

  // Login route
  authRoutes.post('/login', requireLogin, AuthenticationController.login)

  //= ========================
  // User Routes
  //= ========================

  // Set user routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/user', userRoutes)

  // View profile
  userRoutes.get('/:userId', requireAuth, UserController.viewProfile)

  // // Update profile
  // userRoutes.post('/:userId', requireAuth, UserController.updateProfile);

  //= =========================
  // Chat Routes
  //= =========================

  // Set chat routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/chat', chatRoutes)

  // View messages to and from authenticated user
  chatRoutes.get('/', requireAuth, ChatController.getAllConversations)

  // Retrieve single conversation
  chatRoutes.get('/:conversationId', requireAuth, ChatController.getConversation)

  // Get more messages in conversation with conversationId and created time
  chatRoutes.get('/:conversationId/:createdAt', requireAuth, ChatController.loadMessagesWithTime)

  // Send reply in conversation
  chatRoutes.post('/:conversationId', requireAuth, ChatController.sendReply)

  // Start new conversation
  chatRoutes.post('/new/:recipient', requireAuth, ChatController.newConversation)

  // Set url for API group routes
  app.use('/api', apiRoutes)
}
