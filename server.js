//Dependencies
const express =require ('express');
const app =express();
const  port = process.env.PORT ||3000;

 //express app to handle data parsing
 //parse applicattion/parse
 app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));


//Routes
// HTML 
const html_routes =require('./Routing/api-route.js')
app.use(html_routes);
//API
const api_routes =require('./Routing/html-route.js')
app.use(api_routes)

//Listening Port
app.listen(port,()=>{
    console.log(`You are listening the server At http://localhost:${port}`)
})
