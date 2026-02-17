const mongoose = require('mongoose');

const todoSchema =  mongoose.Schema({
    title: {
        type: String,
        require: [true, "title is required"],
        unique:true,
        trim: true,
        minlength:[5, "the title must ba 5 char"],
        maxlength:[20, "the title must be 20 char"]
    },
    Status: {
        type: String,
        require:[true, ],
        enum:["to do", "in progress", "Done"],
        default: "to do"
    },
    userID:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'User'
    }
});


const TodoModel =  mongoose.model("Todo", todoSchema);
module.exports = TodoModel;