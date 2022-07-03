import express from 'express'

const path = require('path');
const options = {root: path.join(__dirname, "../home")};

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//var http = require('http').Server(app);
//var io = require('socket.io')(http);
app.use(express.static(path.join(__dirname, '../')));

//VIEWS TEST

//MVC-test
app.get('/',(req:any,res:any,next:any)=>{
  res.sendFile(path.join(__dirname,'../home/home.html'));
  console.log("Captured get /");
  //res.sendFile("../home/home.html");
});

app.listen(8000,()=>console.log('Server started on 8000'));
