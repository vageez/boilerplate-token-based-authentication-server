const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

// Define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true, required: true },
  password: String
})

userSchema.pre('save', function(next) {
  // Extract currect user
  const user = this
  bcrypt.genSalt(10, function(err, salt) {
    if (err) next(err)
    bcrypt.hash(user.password, salt, function(err, hash) {
      // Store hash in your password DB.
      if (err) next(err)

      user.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) callback(err)
    callback(null, isMatch)
  })
}

// Create model class
const ModelClass = mongoose.model('user', userSchema)

// Export our model
module.exports = ModelClass
