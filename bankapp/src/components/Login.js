import {useState,React} from 'react'
import { Button,InputGroup,FormControl,Form } from 'react-bootstrap'
import { Link,useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'

function Login() {

    const [warning,setWarning]=useState("")
    const navigate=useNavigate()

 const login=(e)=>{
    e.preventDefault()
        let accno=e.target.elements[0].value
        let pswd=e.target.elements[1].value
        
        const user={accno,pswd}
        console.log("user",user);
        if(accno!="" && pswd!=""){
        fetch('http://localhost:3200/login', {
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
          }).then(res => res.json())
            .then(res => {
              console.log("response",res);
                setWarning(res.message)
          if (res.status){
            console.log("Inside cond");
             Swal.fire({
             icon: 'success',
            title: 'Login successfully !',
            text:'Enjoy MERN Banking services..',
            showConfirmButton: false,
            timer: 1500
          })
           setTimeout(() => {
            navigate('/home')
          }, 1500)
          sessionStorage.setItem('userData',JSON.stringify(res))

          }
          
          
         
        
         
           }
            )
          }else{
            setWarning("Please fill all the fields")

          }
 }

    return (
       <>
        <div className='registerbox'>
        <h3>LOGIN TO YOUR ACCOUNT</h3>
        <Form onSubmit={login}>
        <InputGroup className="mb-3">
    <InputGroup.Text id="basic-addon1"><i class="fas fa-landmark"/></InputGroup.Text>
    <FormControl
      placeholder="Account Number"
      aria-label="accno"
      aria-describedby="basic-addon1"
    />
  </InputGroup>
 
  <InputGroup>
    <InputGroup.Text id="basic-addon1"><i class="fas fa-lock"/></InputGroup.Text>
    <FormControl
    type='password'
      placeholder="Password"
      aria-label="password"
      aria-describedby="basic-addon1"
    />
  </InputGroup>
  <div style={{textAlign:"center"}}>
  {
    !warning.status ? <p className='warning'>{warning}</p>:<p></p>
  }
  </div>
  <div className="d-grid gap-2">
  <Button variant="success" size="lg" type='submit'>
    Login
  </Button>
  </div>
</Form>
<p  className='ptext' style={{marginLeft:"10px",marginBottom:"0px"}}> Have you no account?</p>
<div className="d-grid gap-2">
<Link className="btn btn-dark my-2 rounded btn-lg" to="registration">Create new account</Link></div>
            
        </div>
       </>
    )
}

export default Login
