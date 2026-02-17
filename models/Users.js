const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "The UserName is required"],
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z]{3,8}@(gmail|yahoo)\.com$/.test(v);
      },
      message: props => `${props.value} is not a valid email`
    }
  },
  password:{
    type: String,
    required: true,
    validate:{
        validator: function(value){
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?!.*\s).{8,}$/.test(value);
        },
        message: props => `${props.value} the password must be char`
    }
  }
});

const userModel =  mongoose.model("User", usersSchema);

module.exports = userModel;
