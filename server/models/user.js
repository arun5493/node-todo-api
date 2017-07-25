var mongoose = require('mongoose');

var User = mongoose.model('User',{
  email: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  }
});

// 
// var newUser = new User({
//   email:'    arun5493@gmail.com    '
// });
//
// newUser.save().then((doc) => {
//   console.log('Saved the user email', doc);
// },(err) => {
//   console.log('Unable to save user email',err);
// });


module.exports = {User};
