const jwt=require('jsonwebtoken')
const db=require('./db')

const register = (account_no, name, password) => {
  return db.User.findOne({account_no}).then(user=>{console.log(user)
    if(user){
      return {
        status: false,
        statusCode: 401,
        message: "Account already exist!!! PLEASE LOGIN"
      }
    

    }
    else{
      const newUser=new db.User({
        name,
        account_no,
        password,
        balance: 0,
        transaction: []

      })
      newUser.save()
      return{
        status: true,
        statusCode: 200,
        message: "Account created succesfuly"

      }
    }
    })

  


}
const login=(account_no,password)=>{

    return db.User.findOne({
      account_no,password
    }).then(user=>{
      if(user){
        currentUsername=user.name
        balance=user.balance
        const token=jwt.sign({
          currentAcno:account_no
        },'supersecretkey123456')
        return {
          status:true,
          statusCode:200,
          message:"login succesful",
          currentUsername:currentUsername,
          currentAcno:account_no,
          balance,
          token
          
  
        }

      }
      else{
        return {
          status:false,
          statusCode:401,
          message:"Invalid account no or password"
        }

      }
    })

  
 
  
}


const deposit=(acno,amt)=>{
  var amount=parseInt(amt)

  return db.User.findOne({
    account_no:acno,
    // password:pswd
  }).then(user=>{
    if(!user){
      return{
        status:false,
        statusCode:401,
        message:"Invalid account number or password"

      }
    }
    user.balance += amount
    user.transaction.push({
      Type:"Self Deposit",
      Amount:amount   
    })
    user.save()
    return{
      status:true,
      statusCode:200,
      message:amount+"Credited! new balance is :"+user.balance
      
    }
  })


}





const transfer=(toaccno,toname,fromname,acno,pswd,amt)=>{
  var amount=parseInt(amt)
  

  db.User.findOne({
    account_no:toaccno,
   
  }).then(user=>{
    if(!user){
      return{
        status:false,
        statusCode:401,
        message:"Invalid reciever account number or password"

      }
    }
    user.balance += amount
    
    user.transaction.push({
      Type:"credit",
      From:`${fromname} (${acno})`,
      Amount:amount   
    })
    user.save()

  })


  return db.User.findOne({
    account_no:acno,
    password:pswd
  }).then(user=>{
    if(!user){
      return{
        status:false,
        statusCode:401,
        message:"Invalid password"

      }
    }
    if(user.balance<amount){
      return{
        status:false,
        statusCode:401,
        message:"Insufficienct balance"
      }

    }
    user.balance -= amount
    recname=user.name
    user.transaction.push({
      Type:"debit",
      To:`${toname} (${toaccno})`,
      Amount:amount   
    })
    user.save()


    
    
    
    return{
      status:true,
      statusCode:200,
      message:amount+"Debited! new balance is :"+user.balance
      
    }
  })
  


}




    




const getTransaction=(acno)=>{
  return db.User.findOne({
    account_no:acno
  })
  .then(user=>{
    if(!user){
      return{
        status:false,
        statusCode:401,
        message:"user doesn't exist"
      }

    }
    return{
      status:true,
      statusCode:200,
      transaction:user.transaction
  
    } 

  })
  
   

  }
  const getBalance=(acno)=>{
    return db.User.findOne({
      account_no:acno
    })
    .then(user=>{
      if(!user){
        return{
          status:false,
          statusCode:401,
          message:"user doesn't exist"
        }
  
      }
      return{
        status:true,
        statusCode:200,
        balance:user.balance
    
      } 
  
    })
    
     
  
    }
    const getName=(acno)=>{
      return db.User.findOne({
        account_no:acno
      })
      .then(user=>{
        if(!user){
          return {
            status:false,
            statusCode:401,
            message:"user doesn't exist"
          }
        }
        return{
          status:true,
          statusCode:200,
          name:user.name,
        }
      })

    }
    
  




module.exports = {
  register,
  login,
  deposit,
  getTransaction,
  getBalance,
  transfer,
  getName
}