module.exports = {
  // Secret key for JWT signing and encryption
  'secret': 'super secret passphrase',
  // Database connection information
  'database': 'mongodb://heroku_5rp5zj87:s7gag83m4p3eb6cqvtmlp8s8k1@ds223760.mlab.com:23760/heroku_5rp5zj87',
  // Set port
  'port': process.env.PORT || 3000
}
