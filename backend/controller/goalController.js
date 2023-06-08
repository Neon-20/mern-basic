const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc   Get Goals
// @route  GET
// @access Private
//We get back a promise when we work with mongoose so use async
const getGoals = asyncHandler (async function(req,res){
    const goals = await Goal.find({ user:req.user.id })
    res.status(200).json(goals);
})

// @desc   Set Goals
// @route  POST
// @access Private
const setGoals = asyncHandler (async function(req,res){
    if(!req.body.text){
        res.status(400)
        throw new Error("Please add a text field")
    }
    const goals = await Goal.create({
        text:req.body.text,
        user:req.user.id
    })
    res.status(200).json(goals)
})


// @desc   Update Goals
// @route  PUT
// @access Private

const updateGoals = asyncHandler (async function(req,res){
    const goals = await Goal.findById(req.params.id)
    if(!goals){
        res.status(400)
        throw new Error("Goal not found")
    }
    const user = await User.findById(req.user.id)
    //Check for user
    if(!user){
        res.status(401)
        throw new Error("User not found")
    }
   
     //Make sure only the logged in user matches the goal user
    if(goals.user.toString() !== user.id){
      res.status(401)
      throw new Error("User not authorized")
    }

    //This is done to find the ID and update properly
    const updatedGoals =await Goal.findByIdAndUpdate(req.params.id,req.body,{new:true})
    
    res.status(200).json(updatedGoals);
})

// @desc   Delete Goals
// @route  DELETE
// @access Private
const deleteGoals = asyncHandler (async function(req,res){
    const goals = await Goal.findById(req.params.id)
    if(!goals){
        res.status(400)
        throw new Error("Goal not found")
    } 
    const user = await User.findById(req.user.id)
    //Check for user
    if(!user){
        res.status(401)
        throw new Error("User not found")
    }
   
     //Make sure only the logged in user matches the goal user
    if(goals.user.toString() !== user.id){
      res.status(401)
      throw new Error("User not authorized")
    }

    await Goal.findByIdAndDelete(req.params.id,req.body,{new:true})   
    res.status(200).json({id:req.params.id});
})


module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}