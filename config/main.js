module.exports = {
  // Secret key for JWT signing and encryption
  'secret': 'super secret passphrase',
  // Database connection information
  'database': 'mongodb://mongo/sky',
  // Set port
  'port': process.env.PORT || 3000
}
