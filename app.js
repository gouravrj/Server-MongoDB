const express = require('express')
const app = express()

const User = require('./User')
const db = require('./db')

const port = process.env.PORT || 3000;

const cors = require('cors')
app.use(cors({'origin':'*'}))
app.use(express.json())  //require to accept Json Data ..........

app.get('/api/get',async(req,res) => {
    try{
        const users = await User.find()
        res.status(200).json({
            message:"Data Fetched Successfully ...",
            users: users
        })
    }catch(err){
        res.status(500).json({
            message:"Something went Wrong ... ",
            error: err
        })
    }
})

app.post('/api/post',async(req,res)=> {
    const userObj = {
        name : req.body.name,
        phone: req.body.phone,
        email: req.body.email
    }
    try{
        const user  = new User(userObj)
        user.save()
        res.status(200).json({
            message: "User added Successfully ...",
            user: user
        })
    }catch(err){
        res.status(500).json({
            message:"Something went Wrong ..",
            error: err
        })
    }
})

app.delete('/api/deleteById/:id',async(req,res)=>{
    const id = req.params.id;

    try{
        const deletedUser = await User.findByIdAndDelete(id);
        if(deletedUser==null)
        {
            res.status(400).json({
                message: "Id Not Found -_- "
            })
        }else{
            res.status(200).json({
                message:"User Deleted Successfully ..."
            })
        }
    }catch(err){
        res.status(500).json({
            message: "Something Went Wrong ...",
            error: err
        })
    }
})

app.put('/api/updateById/:id',async(req,res)=>{
    const id = req.params.id;
    const userObj = {
        name : req.body.name,
        phone: req.body.phone,
        email: req.body.email
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(id,{$set:userObj});
        if(updatedUser==null){
            res.status(400).json({
                message: "Id Not Found -_- "
            })
        }else{
            res.status(200).json({
                message:"Updated Successfully ... ",
                user:updatedUser
            })
        }
    }catch(err){
        res.status(500).json({
            message:"Something went Wrong ..",
            error: err
        })
    }
})

db();

app.listen(port, ()=>{
    console.log(`Server is Running at port no. ${port}`);
})