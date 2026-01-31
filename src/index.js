const epxress = require('express');
const path = require('path');
const app = epxress();
const bcryptjs = require('bcryptjs');
const collection = require('./mongodb');
 const port = 3000;


 app.use(epxress.urlencoded({extended:false}));
 app.use(epxress.json());
 

 app.set('view engine', 'ejs');
 app.use(epxress.static("public"));

 app.get("/login",(req,res)=>{
  return res.render('login');
 });

 app.get('/signup',(req,res)=>{
  return res.render('signup');
 });

 app.post('/signup', async(req,res)=>{
 const data = {
  name:req.body.username,
  password: req.body.password
 };

 const existingUser =await collection.findOne({name:data.name});

 if(existingUser){
  return res.render('user_exists');
 }else{
  const saltRounds = 10;
  const hashedPassword = await bcryptjs.hash(data.password, saltRounds);
  data.password = hashedPassword;

  try {
    const userData = await collection.insertMany(data);
    console.log(userData);
   res.render("signup_success")
  } catch (error) {
    console.error(error);
    res.render('error');
  };
 };

 });

 app.post('/login',async(req, res)=>{
  try {
    const user = await collection.findOne({name:req.body.username});
    if(!user){
      res.send('No User Found');
    }
    const passwordMatch = await bcryptjs.compare(req.body.password,user.password)
    if(passwordMatch){
      res.render("home");
    }else{
      res.send('wrong password');
    }
  } catch (error) {
    console.error(error);
    res.render('wrong_inputs');
  };
 });




 app.listen(port, ()=>{
  console.log(`Server is running on port ${port}`);
 })