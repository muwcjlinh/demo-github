module.exports = {
  // Secret key for JWT signing and encryption
  'secret': 'super secret passphrase',
  // Database connection information
  'database': 'mongodb://demodb0412:perfect2@ds123770.mlab.com:23770/heroku_35nqqq9z',
  // Set port
  'port': process.env.PORT || 3000
}
