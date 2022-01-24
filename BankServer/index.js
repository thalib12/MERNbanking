//Import express
const express=require('express')
const session = require('express-session')
const dataService=require('./services/data.service')
const jwt=require('jsonwebtoken')
const cors=require('cors')

//create app using express
const app=express()

app.use(cors({
    // origin:'http://localhost:4200',
    origin:'http://localhost:3000',
    credential:true

}))


app.use(session({
    secret:'randomsecretstring',
    resave:false,
    saveUninitialized:false
}))

app.use(express.json())

// app.use((req,res,next)=>{
//     console.log("Application specific middleware");
//     next()
// })
// const logMiddleware=(req,res,next)=>{
//     if(!req.session.currentAcno){
//         res.json({
//           status:false,
//           statusCode:401,
//           message:"please login"
//         })
//       }
//       else
//       {
//           next()
//       }
// }

//jwt middleware
const jwtMiddleware=(req,res,next)=>{
    try{
        const token=req.headers["x-access-token"]
        //token validation
        const data=jwt.verify(token,'supersecretkey123456')
        req.currentAcno=data.currentAcno
        next()
    }
    catch{
        res.json({
            status:false,
            statusCode:401,
            message:"please login"
          })
    }
}
//token API- for testing
app.post('/token',jwtMiddleware,(req,res)=>{
    res.send("current account no is :"+req.currentAcno)
})
//define default router
app.get('/',(req,res)=>{
    res.send("GET METHOD")
})
app.post('/register',(req,res)=>{
    console.log(req.body)
   dataService.register(req.body.accno,req.body.name,req.body.pswd).then(result=>{
       console.log(result)
       res.status(result.statusCode).json(result)
   })
   
    
})
app.post('/login',(req,res)=>{
    console.log(req.body)
    dataService.login(req.body.accno,req.body.pswd)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
    
})
app.post('/deposit',(req,res)=>{
    console.log(req.body)
    dataService.deposit(req.body.accno,req.body.amt)
    
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.post('/transfer',(req,res)=>{
    console.log(req.body)
    dataService.transfer(req.body.toaccno,req.body.toname,req.body.fromname,req.body.accno,req.body.pswd,req.body.amt)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.post('/getTransaction',(req,res)=>{
    console.log(req.body)
dataService.getTransaction(req.body.current_accno)
.then(result=>{
    res.status(result.statusCode).json(result)
})
})
app.post('/getBalance',(req,res)=>{
    console.log(req.body)
dataService.getBalance(req.body.current_accno)
.then(result=>{
    res.status(result.statusCode).json(result)
})
})
app.post('/getName',(req,res)=>{
    console.log(req.body)
    dataService.getName(req.body.accno)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})


app.patch('/',(req,res)=>{
    res.send("patch working")
})
app.delete('/',(req,res)=>{
    res.send("delete working")
})
//set port
app.listen(3200,()=>{
    console.log("Server started at port number 3200");
})