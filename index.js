const express = require('express');
const path = require('path');
const app = express();
const userModel = require('./models/user');
// const { name } = require('ejs');

app.set("view engine",'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));



app.get('/',(req,res)=>{
     res.render("index");
})

app.get('/read', async(req,res)=>{
   let users = await userModel.find()
   res.render("read",{users})
})


app.get('/delete/:id', async(req,res)=>{
      let users = await userModel.findOneAndDelete({_id: req.params.id});
      res.redirect("/read")
})

app.get('/edit/:userid', async(req,res)=>{
     let user = await userModel.findOne({_id: req.params.userid});
     res.render("edit",{user})
})

app.post('/update/:userid', async(req,res)=>{
  let {imageurl, name , email} = req.body;
  let user = await userModel.findOneAndUpdate({_id: req.params.userid},{imageurl, name , email}, {new:true});
  res.redirect("/read");
})


app.post('/create', async (req,res)=>{
    let {name,email,imageurl} = req.body;
    let createUser = await  userModel.create({
      name,
      email,
      imageurl
    });
    res.redirect("/read");
    
})





const PORT = 3000;

app.listen(PORT,()=>{
  
  console.log(`Your Server is running on this ${PORT} No....`);
  
})