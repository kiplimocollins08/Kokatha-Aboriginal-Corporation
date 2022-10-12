 
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/employee', {useNewUrlParser: true});
var conn =mongoose.Collection;
 
var employeeSchema =new mongoose.Schema({
	fname: String,
	lname: String,
	email: String,
	Address: String,
	Age: Number,
	
});
 
var empModel = mongoose.model('Employee', employeeSchema);
var employee =empModel.find({});
 
router.post('/', function(req, res, next) {
  var empDetails = new empModel({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    Address: req.body.address,
    Age: req.body.age,
  
  });
 
  empDetails.save(function(err,req1){
    if(err) throw err;
    employee.exec(function(err,data){
      if(err) throw err;
      res.render('index', { title: 'Employee Records', records:data, success:'Record Inserted Successfully' });
        });
  })
  
  
});