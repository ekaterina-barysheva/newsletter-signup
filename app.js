//jshint esversion 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const https = require("https");
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };
const jsonData = JSON.stringify(data);
const url = "https://us10.api.mailchimp.com/3.0/lists/46255fd56a";
const options = {
  method:"POST",
  auth:""
};
const request = https.request(url,options,function(response){
  if(response.statusCode === 200){
    res.sendFile(__dirname + "/success.html");
  }else{
    res.sendFile(__dirname + "/failure.html");
  };
  response.on("data", function(data){
    console.log(JSON.parse(data));
  })
})
request.write(jsonData);
request.end();
});
app.post("/failure",function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000");
});
//d68e89422ac65916e5b0175ac1a3f926-us10
//46255fd56a
