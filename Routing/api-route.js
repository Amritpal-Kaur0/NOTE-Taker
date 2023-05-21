// const express =require ('express');
const Router =require('express').Router(); 
const fs=require('fs');
const {v4 : uuidv4}=require('uuid')
const path =require('path') 


Router.get('/', (req,res)=>{
   res.sendFile(path.join(__dirname ,'./db/db.json'));
})

Router.post('/api/notes',(req,res)=>{
    console.log("Request recieved at /notes")
    const newData ={
        title:req.body.title,
        text:req.body.text,
        id:uuidv4(),
    }
let filepath =path.join(__dirname,'..','db','db.json');
 const rawfile =JSON.parse(fs.readFileSync(filepath));

 rawfile.push(newData)
    
fs.writeFileSync('./db/db.json',JSON.stringify(rawfile),(err)=>{
    if(err){
        console.log(err)
        return;
    }
    console.log("NOTe Added");
})
res.status(200).json(rawfile)

});

Router.delete('/api/notes/:id',(req,res)=>{
    let data =fs.readFileSync("db/db.json","utf8")
    const jsondata =JSON.parse(data)
    const newNotes =jsondata.filtera((note)=>{
        return note.id !==req.params.id;
    })
    fs.writeFileSync("db/db.json",JSON.stringify(newNotes))
    res.json("Note Deleted Successfully")
    // const jsonfile =require('./db/db.json')
    // const id =req.params.id;
    // const newNotes =jsonfile.filter((note)=>{
    //     note.id!==id;
    // })
    // jsonfile.splice(id,1)
    // res.json(newNotes)
})
module.exports =Router;