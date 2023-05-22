const Router =require('express').Router(); 
const fs=require('fs');
const {v4 : uuidv4}=require('uuid')
const path =require('path') 


Router.get('/api/notes', (req,res)=>{
   res.sendFile(path.join(__dirname ,'../db/db.json'));
})
//posting stuff in the database(.json)file
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
//Bonus points to add deleting functionality
Router.delete('/api/notes/:id',(req,res)=>{
    let data =fs.readFileSync("db/db.json","utf8")
    const jsondata =JSON.parse(data)
    const newNotes =jsondata.filter((note)=>{
        return note.id !==req.params.id;
    })
    fs.writeFileSync("db/db.json",JSON.stringify(newNotes))
    res.json("Note Deleted Successfully")
    
})
module.exports =Router;
