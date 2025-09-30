const express = require('express');
const app = express();
app.use(express.json());
let tasks = [];

app.get("/tasks",(req,res)=>{
    res.json(tasks);
});
app.post("/tasks",(req,res)=>{
    const{task}=req.body;
    if(!task)
        return res.status(400).json({error:"Task is required"});
    tasks.push(task);
    res.status(201).json({message:"Task added"});
});
app.listen(3000,()=>{
    console.log("Server is running at http://localhost:3000");
});