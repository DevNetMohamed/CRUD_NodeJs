const todoModel = require('../models/todos')

const SaveTodos = async (req,res, next)=>{
    let NewTodo = req.body;
    try{
        const todo = await todoModel.create(NewTodo); 
        res.status(201).json({
            status: "sccessfully",
            message: "saved successfully",
            data: todo,
        })
    }catch(err){
        res.status(400).json({
            status: "fial",
            massage: err.message,
        })    
    }
};  


const GetAllTodos = async (req, res)=>{
    try{
        const alltoto = await todoModel.find().populate({_id: id});
        res.status(200).json({
            status: "Sccusse",
            data: alltoto
        });
    }catch(err){
        res.status(400).json({
            status: "fiald",
            mas: err.massage
        })
    }
}




module.exports = {SaveTodos, GetAllTodos}