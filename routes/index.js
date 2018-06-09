var express = require('express');
var router = express.Router();

var Users = [{"email":"vytas@hivisasa.com","password":"12345678"}];

function checkAuth(req, res, next) {
  if (!req.session.user_id) {
    res.send('You are not authorized to view this page');
  } else {
    next();
  }
}

router.get('/home', checkAuth, function(req, res){
   res.render('home', {id: req.session.user_id})
});

router.get('/login', function(req, res, next) {
  res.render('index', { message: "" });
});

router.post('/login_check', function(req, res){
   console.log(Users);
      Users.filter(function(user){
         if(user.email === req.body.email && user.password === req.body.password){
            req.session.user_id = 12345678;
            res.redirect('/home');
         }else{
         	 res.render('index', {message: "Invalid credentials!"});
         }
      });
   });

router.get('/logout', function(req, res){
   req.session.destroy(function(){
      console.log("user logged out.")
   });
   res.redirect('/login');
});

module.exports = router;
