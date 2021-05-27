const auth =require('./middleware/auth');
const fs = require('fs')
const bcrypt=require('bcryptjs');
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')
const config=require('config');
const crypto= require('crypto')
const server = jsonServer.create()
const router = jsonServer.router('./Json_DataBase_Files/issues.json')
const userdb = JSON.parse(fs.readFileSync('./Json_DataBase_Files/users.json', 'UTF-8'))
const issuedb=JSON.parse(fs.readFileSync('./Json_DataBase_Files/issues.json','UTF-8'))

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(jsonServer.defaults());


// JWT TOKEN DATA
const SECRET_KEY = config.get('jwtSecret')
const expiresIn = config.get('expiresIn')


// -------------------- List of Functions-----------------------


// Create a token from a payload 
function createToken(payload){
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}


// Check if the user exists in database

function CheckUser({email}){
  console.log("Email",email);
  return userdb.users.findIndex(user => user.email === email) !== -1
}

function CheckIssue({Issue}){
  console.log("Issue Name:",Issue);
  return issuedb.issues.findIndex(issue => issue.Issue === Issue) !== -1
}




server.get('/issues',(req,res)=>{

  fs.readFile("./Json_DataBase_Files/issues.json", (err, data) => {  
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({status, message})
      return
    };

    // Get current users data
    var data = JSON.parse(data.toString());
    res.status(200).json(data.issues)
    return

});
});



//----------------------Add New Issue-----------------------------



server.post('/add_issue', (req, res) => {
  const {Issue,Description,Severity,Status,user} = req.body;
  console.log(Issue,Description,Severity,Status,user);
  if(!Issue || !Description ||  !Severity || !Status) return res.status(400).json({msg:'Please Enter all Fields'});
  // Check for Existence of Registering Product
  if(CheckIssue({Issue}) === true) {  
      return res.status(400).json({msg:'Issue Already Exits'});
  }

fs.readFile("./Json_DataBase_Files/issues.json", (err, data) => {  
      if (err) {
        const status = 401
        const message = err
        res.status(status).json({status, message})
        return
      };
      // Date of Issue Creation
      var dateTime = require('node-datetime');
      var dt = dateTime.create();
      var date = dt.format('Y-m-d H:M:S');
     
      // Get current issues data
      var data = JSON.parse(data.toString());
      const id=crypto.randomBytes(12).toString('hex');
          
                    data.issues.push({id: id,Issue:Issue,Description:Description, Severity: Severity,Status:Status,user:user,date:date,rank:0,editUser:[],r_date:""}); //add some data
                    console.log("Push Pass",data);
                    var writeData = fs.writeFile("./Json_DataBase_Files/issues.json", JSON.stringify(data), (err, result) => {  // WRITE
                      if (err) {
                        const status = 401
                        const message = err
                        res.status(status).json({status, message})
                        return
                      }
                  });
                  res.status(200).json(
                            
                            {
                            id:id,
                            Issue:Issue,
                            Severity:Severity,
                            Status:Status,
                            user:user,
                            date:date,
                            rank:0,
                            editUser:[],
                            r_date:""
                            }
              
          );
}); 
})// End of Add Product Route

//----------------------------UPDATE PRODUCT DATA------------------------------------

  
server.post("/update_issue",function(req,res){  
  // req==request from client || res=== Response that would be from Server

  const {id,Issue,Description,Severity,Status,user,Comments} = req.body;
console.log(id,Issue,Description,Severity,Status,user,Comments);
if(!Comments) return res.status(401).json({msg:'Please Enter all Fields'});
// Check for Existence of Registering User
var r_date='';
// Date of Issue Creation
var dateTime = require('node-datetime');
var dt = dateTime.create();
var date = dt.format('Y-m-d H:M:S');

if(Status==="Closed"){
  r_date=date
}
  // Finding Issue by Id 
  const index=issuedb.issues.findIndex(Issue=>Issue.id===id);
  // Check for Existense of Product
  if(index==-1) return res.status(403).json({msg:'Server: Product Not Exits'});
  // Storing target Product in "Issue" from db
  const issue=issuedb.issues[index];  
  // Matching new Entries with Previous Entries
  // if(Issue===issue.Issue && Description===issue.Description && Severity===issue.Severity && Status===issue.Status) return res.status(400).json({msg:'Server: Entered Data is Same as Previous One'});
  // Reading Json DB
  fs.readFile("./Json_DataBase_Files/issues.json", (err, data) => {  
    if (err) {
      return res.status(400).json({msg:'Server: Error while Reading JSON DB'});
    };

    // Fetching Whole users data (JSON format to String)
    var data = JSON.parse(data.toString());
    // Updating only Target User data based on Index
    data.issues[index].Issue=Issue;
    data.issues[index].Severity=Severity;
    data.issues[index].Status=Status;
    // data.issues[index].editUser=
    data.issues[index].editUser.push({user,Issue,Description,Severity,Status,Comments,date});
    data.issues[index].r_date=r_date;
    
    var writeData = fs.writeFile("./Json_DataBase_Files/issues.json", JSON.stringify(data), (err, result) => {  // WRITE
      if (err) {
        return res.status(400).json({msg:'Server: Error while Writing into JSON DB'});
      };
    });// End of File Writing


  
    res.status(200).json({
      Issue:{
        id:data.issues[index].id,
        Issue:data.issues[index].Issue,  
        Severity:data.issues[index].Severity,
        Description:data.issues[index].Description,
        Status:data.issues[index].Status,
        rank:data.issues[index].rank,
        date:data.issues[index].date,
        editUser:data.issues[index].editUser,
        r_date:data.issues[index].r_date
      }  
      })
          
  }); // End of File Reading

});// End of Update API



server.post("/delete_issue",function(req,res){  
  // req==request from client || res=== Response that would be from Server

  const {id} = req.body;
  // Finding Issue by Id 
  console.log("id",id);
  const index=issuedb.issues.findIndex(Issue=>Issue.id===id);
  // Check for Existense of Product
  if(index==-1) return res.status(403).json({msg:'Server: Issue Not Exits'});
  // Storing target Product in "Issue" from db
  const Issue=issuedb.issues[index];  
  // Matching new Entries with Previous Entries
  fs.readFile("./Json_DataBase_Files/issues.json", (err, data) => {  
    if (err) {
      return res.status(400).json({msg:'Server: Error while Reading JSON DB'});
    };

    // Fetching Whole users data (JSON format to String)
    var data = JSON.parse(data.toString()); // Object
    var issues=data.issues;
    data.issues=issues.filter(Issue=>Issue.id!==id)
    // Writing Updated data to Json DB
    var writeData = fs.writeFile("./Json_DataBase_Files/issues.json", JSON.stringify(data), (err, result) => {  // WRITE
      if (err) {
        return res.status(400).json({msg:'Server: Error while Writing into JSON DB'});
      };
    });// End of File Writing

    // Returing Response with 200 Status and Updated Data To the Client

  
    res.status(200).json({
      msg:"Product Deleted",
      Issue:Issue  
      })
          
  }); // End of File Reading

});// End of Dalete API



//-----------------------------------LOGIN API ROUTE-----------------------------------


// Login to one of the users from ./Json_DataBase_Files/users.json
server.post('/auth/login', (req, res) => {
  // req==request from client || res=== Response that would be Given from Server

  // Destructuring 'email,password' from Client Request
  const {email, password} = req.body;
  // Check for blank Entry
  if(!email || !password) return res.status(400).json({msg:'Please Enter all Fields'});
  // Finding Index of Target User from JSON DB 
  const index=userdb.users.findIndex(user => user.email === email);
  // Checking the Existense of User
  if(index==-1)return res.status(400).json({msg:'Server: User Not Exits'});
  // console.log("Index",index);

  // Storing Target User data to "user" using index from DB
  const user=userdb.users[index]
  let id=user.id;
  // Comparing User Entered password with Encrypted password
  bcrypt.compare(password,user.password)
  .then(isMatch=>{
    // Return Error as Response if password didn't match
    if(!isMatch) return res.status(400).json({msg:"Server: Invalid Credential"});
    // Creating JWT token using user (id & email)
    const token = createToken({id,email})
    // console.log("Access Token:" + access_token);

    //Response with token && User data
    res.status(200).json({
      token,
      user:{
        _id:user.id,
        fname:user.fname,
        lname:user.lname,
        email:user.email,
        img:user.img,
        password:user.password,
        city:user.city,
        state:user.state,
        country:user.country,
        postal:user.postal,
        ip:user.ip,
        date:user.date
    }  
    })
  })// End of Bcrypt
  

})// End of LOGIN API




//---------------------REGISTER API--------------------------------------


server.post('/auth/register', (req, res) => {
        const {fname,lname,email, password,city,state,postal,country,ip} = req.body;
        console.log(fname,lname,email, password,city,state,postal,country,ip);
        if(!fname || !lname || !email || !password || !state || !postal ) return res.status(401).json({msg:'Please Enter all Fields'});
        // Check for Existence of Registering User
        if(CheckUser({email}) === true) {  
            return res.status(403).json({msg:'User Already Exits'});
        }

      fs.readFile("./Json_DataBase_Files/users.json", (err, data) => {  
            if (err) {
              const status = 401
              const message = err
              res.status(status).json({status, message})
              return
            };
            var dateTime = require('node-datetime');
            var dt = dateTime.create();
            var date = dt.format('Y-m-d H:M:S');
            // Get current users data
            var data = JSON.parse(data.toString());
            var newPassword;
            // Get the id of last user
            var last_item_id = data.users[data.users.length-1].id;
            // Create salt & hash
                   bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(password,salt,(err,hash)=>{
                        if(err) throw err;
                        newPassword=hash;
                        //Add new user
                        // console.log("New PAss",newPassword);
                        // console.log("Img:",img);
                          data.users.push({id: last_item_id + 1,fname:fname,lname:lname, email: email, password: newPassword,date:date,city:city,state:state,postal:postal,country:country,ip:ip}); //add some data
                          // console.log("Push Pass",data);
                          var writeData = fs.writeFile("./Json_DataBase_Files/users.json", JSON.stringify(data), (err, result) => {  // WRITE
                            if (err) {
                              const status = 401
                              const message = err
                              res.status(status).json({status, message})
                              return
                            }
                        });
                        console.log("WriteData",writeData);
                        console.log("User",userdb.users);
                          // Create token for new user
                        const id=last_item_id+1
                        const token = createToken({id,email})
                        console.log("Access Token:" + token);
                        res.status(200).json({
                                  token,
                                  user:{
                                  _id:last_item_id+1,
                                  fname:fname,
                                  lname:lname,
                                  email:email,
                                  password:newPassword,
                              
                                  date:date,
                                  city:city,
                                  state:state,
                                  country:country,
                                  postal:postal,
                                  ip:ip
                      }})
                    });
                });
      }); 
})// End of Register Route




//----------------------------UPDATE USER DATA------------------------------------


  
server.post("/auth/update",auth,function(req,res){  
  // req==request from client || res=== Response that would be from Server

  // Destructuring User data from Request   
  const {id,fname,lname,email,img,city,state,postal,country,ip }=req.body;
  // console.log("ID:",id," Name:",name," Email:",email);
  
  // Check Empty entries
  if(!fname || !lname || !email || !state || !postal) return res.status(400).json({msg:'Server: Please Enter all Fields'});

  // Finding user by Id 
  const index=userdb.users.findIndex(user=>user.id===id);
  // Check for Existense of User
  if(index==-1) return res.status(400).json({msg:'Server: User Not Exits'});
  // Stroing target User in "user" from db
  const user=userdb.users[index];  
  // Matching new Entries with Previous Entries
  if(fname===user.fname && lname===user.lname && city===user.city && state===user.state && postal===user.postal && img===user.img && email===user.email ) return res.status(400).json({msg:'Server: Entered Data is Same as Previous One'});
  // Reading Json DB
  fs.readFile("./Json_DataBase_Files/users.json", (err, data) => {  
    if (err) {
      return res.status(400).json({msg:'Server: Error while Reading JSON DB'});
    };

    // Fetching Whole users data (JSON format to String)
    var data = JSON.parse(data.toString());
    // Updating only Target User data based on Index
    data.users[index].fname=fname;
    data.users[index].lname=lname;
    data.users[index].email=email;
    data.users[index].city=city;
    data.users[index].state=state;
    data.users[index].postal=postal;
    data.users[index].country=country;
    data.users[index].img=img;
    // Writing Updated data to Json DB
    var writeData = fs.writeFile("./Json_DataBase_Files/users.json", JSON.stringify(data), (err, result) => {  // WRITE
      if (err) {
        return res.status(400).json({msg:'Server: Error while Writing into JSON DB'});
      };
    });// End of File Writing

    // Returing Response with 200 Status and Updated Data To the Client
    res.status(200).json({
      user:{
        _id:user.id,
        fname:user.fname,
        lname:user.lname,
        email:user.email,
        img:user.img,
        password:user.password,
        city:user.city,
        state:user.state,
        country:user.country,
        postal:user.postal,
        ip:user.ip,
        date:user.date
      }  
      })
          
  }); // End of File Reading

});// End of Update API



//----------------------- Verify User Using Token-----------------------------------

server.get("/auth/user",auth, (req,res)=>{
  // console.log("Request Update",req.user)

  // Here Data in Request "req" is coming from JWT(auth function[After verification with Secret Key])
  
  //Fetching target user using user id from Json DB
  const index=userdb.users.findIndex(user=>user.id===req.user.id)
  // console.log("UserLoad index:",index);
  // console.log(userdb.users[index]);

  // Check for Existense of User
  if(index==-1) return res.status(400).json({msg:'Server: User Not Exits[Authentication Index]'});
  
  const user=userdb.users[index];
  // console.log("User from Json:",user)
  // res.status(200).json(user);
  
  // Response with only User Data(except password)
  res.status(200).json(
    {
      _id:user.id,
      fname:user.fname,
        lname:user.lname,
        email:user.email,
        img:user.img,
        city:user.city,
        state:user.state,
        country:user.country,
        postal:user.postal,
        password:user.password,
        ip:user.ip,
        date:user.date
      // password:user.password
    
  })
});// End of Verify User using Token









server.use(router)
const port=process.env.PORT || 8000;
// Server Listening at Port 8000
server.listen(port, () => {
  console.log('Server started on Port '+port)
})
