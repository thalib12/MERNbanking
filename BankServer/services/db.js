const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/bank'),{
    useNewUrlParser:true
}

const User=mongoose.model('User',{
    name: String,
     account_no: Number,
      password: String, 
      balance: Number, 
      transaction: []
})
module.exports={
    User
}