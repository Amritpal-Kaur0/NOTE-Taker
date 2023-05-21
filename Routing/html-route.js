const Router =require('express').Router(); 
const path =require('path');

    Router.get('/',(req,res)=>{
        res.sendFile(path.join(__dirname, './public/index.html'));
    })
    Router.get('/notes',(req,res)=>{
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    })

module.exports = Router;