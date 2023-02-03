// import library
const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session')

// install express app
const app = express();
const PORT = 3000;

// Add the Express-session options
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekey",
    saveUnitialize:true,
    cookie: { maxAge: oneDay},
    resave: false
}));

// Parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Serving public file
app.use(express.static(__dirname));

//Cookie parser middleware
app.use(cookieParser());

// Setup authentication credential
const myusername = 'admin'
const mypassword = '12345'

// a varriable to save a session
var session;



// page => Welcome
app.get('/',(req,res) => {
    session = req.session;
    if(session.userid){
        res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    }else
    res.sendFile('views/index.html',{root:__dirname})
});

// page => user
app.post('/user',(req,res) => {
    if(req.body.username == myusername && req.body.password == mypassword){
        session=req.session;
        session.userid=req.body.username;
        console.log(req.session)
        res.send(`Hello, welcome <a href=\'/logout'>click to logout</a>`);
    }
    else{
        res.send('Invalid username or password')
    }
})

// page => Logout
app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

//page => Error
// app.get('*', (req, res) => {
//     res.send('ไม่พบหน้าที่คุณร้องขอ (Error: 404 Page Not Found)')
// })


app.get('*', (req, res) => {
    res.sendFile('error.html',{root:__dirname})
    // return res.redirect('/index.html')
});


app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));






//google
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
   $("#name").text(profile.getName());
   $("#email").text(profile.getEmail());
   $("#image").attr('src',profile.getImageUrl());
   $(".data").css("display","block");
   $(".g-signin2").css("display","none");
  }



  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      alert("You have been signed out successfully!");
      $(".g-signin2").css("display","block");
      $(".data").css("display","none");
    });
  }
