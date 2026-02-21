const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
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
        message: props => `${props.value} the password must be char Abc123@#`
    }
  }
});

usersSchema.pre("save", async function(next){

const salt =  await bcrypt.genSalt(10);
const hashedpassword = await bcrypt.hash(this.password,salt);
this.password = hashedpassword

  // next();
});
const userModel =  mongoose.model("User", usersSchema);

module.exports = userModel;
