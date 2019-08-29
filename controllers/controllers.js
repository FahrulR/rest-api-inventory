require('dotenv').config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
var response = require('../res');
var connection = require('../config/conn');
// home
exports.Index = function(req, res) {
        console.log('someone process home')
        response.ok("Hello ! welcome home!", res)    
};

// 404
exports.notFound = function(req, res) {
    console.log('someone access 404')
    res.send('404 Not Found!')
};

// Verify Token

exports.Register = function(req,res){
  // console.log("req",req.body);
  console.log('someone acces register')
  const saltRounds = 10;
  var hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
  req.body.password = hashedPassword
  var today = new Date();
  var users={
    "first_name":req.body.first_name,
    "last_name":req.body.last_name,
    "email":req.body.email,
    "password":req.body.password,
    "created":today,
    "modified":today
  }  

  let usernameQuery = "SELECT * FROM `users` WHERE email = '" + users.email + "'";
connection.query(usernameQuery ,function (error, results, fields) {
    if(results.length >0 ){
        res.send({
          "code":400,
          "success":"user already registered"
            });
          } else {
            connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
              if (error) {
              console.log("error ocurred",error);
              res.send({
                "code":400,
                "failed":"error ocurred"
              })
            }else{
              res.send({
                "code":200,
                "success":"user registered sucessfully"
                  });
            }
            });
          }
  })
 
}


  exports.Login = function(req,res){
      console.log('someone access login')
    const saltRounds = 8;
    var email= req.body.email;
    var hashedPassword = req.body.password
    connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
    
    if (error) {
      // console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
       //console.log('The solution is: ', hashedPassword);
      if(results.length >0){
        bcrypt.compare(hashedPassword, results[0].password, function(err,result){
          if(result == true){
            jwt.sign({email:email, password:req.body.password}, process.env.JWT, { expiresIn: '10m' }, function(err, token){
              res.json({
                    "code": 200,
                    "success": "login successfully",
                    "token": token
                })
            })
        
          }
          else{
          res.send({
            "code":204,
            "success":"Email and password does not match"
              });
        }

        })
      }
      else{
        res.send({
          "code":204,
          "success":"Email does not exits"
            });
      }
    }
    });
  }

  exports.Users = function(req, res) {
    console.log('someone access users')

    connection.query('SELECT * FROM users', function(err, results, fields){
        if(err) {
            console.log(err)
        } else {
            res.status(200).json({
                status: 200,
                error: false,
                message: 'Successfully get all users data!',
                data: results
            })
        }
    })
};

