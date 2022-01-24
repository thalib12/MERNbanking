import { useState, React } from 'react'
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import "./Registration.css"
import Swal from 'sweetalert2'

function Registration() {
  const navigate = useNavigate()
  const [formdata, setFormdata] = useState({})
  const [message, setMessage] = useState("")
  const [password, setPassword] = useState("")
  const [cnfpswd, setCnfpswd] = useState("")
  const [accno, setAccno] = useState("")
  const [name, setName] = useState("")
  // const [conditions, setConditions] = useState(false)

var conditions

  const validate = () => {

    if (accno.length < 8 && accno != "") {
      return (<p className='warning' style={{ marginLeft: "0%" }}>Account Number must be alteast 8 characters long</p>)


    }


    if (password.length < 8 && password != "") {

      return (<p className='warning' style={{ marginLeft: "0%" }}>Password must be alteast 8 characters long</p>)

    }
    if (cnfpswd != password && cnfpswd != "") {

      return (<p className='warning' style={{ marginLeft: "0%" }}>Password does not match</p>)

    }
  }

  const register = (e) => {
    e.preventDefault()


    // var pattern = new RegExp("^.{8}$");

    let accno = e.target.elements[0].value
    let name = e.target.elements[1].value
    let pswd = e.target.elements[2].value
    const user = { accno, name, pswd }
    console.log("user", user);
    // var test=pattern.test(pswd)
    // console.log("Validation..",test);
    if(name=="" || cnfpswd=="" || password=="" || accno==""){
      setMessage("Please fill all the fields")
    }

    if(accno.length >= 8 && password.length >= 8  && cnfpswd == password && name!=""){
    fetch('http://localhost:3200/register', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(res => res.json())
      .then(res => {
        setMessage(res.message)
        console.log("response", res.message);
        if (res.status) {
          Swal.fire({

            icon: 'success',
            title: 'Account successfully ceated !',
            text: 'please login',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(() => {
            navigate('/')
          }, 1500);

        }
      });
    }

    console.log("messaagggee", message);

  }
  return (
    <>
      <div className='registerbox' style={{ paddingBottom: "45px" }}>
        <h3>CREATE NEW ACCOUNT</h3>
        <Form onSubmit={register}  >
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1"><i class="fas fa-landmark" /></InputGroup.Text>
            <FormControl
              placeholder="Account Number"
              aria-label="accno"
              aria-describedby="basic-addon1"
              onChange={(e) => setAccno(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1"><i class="fa fa-user" aria-hidden="true" /></InputGroup.Text>
            <FormControl
              placeholder="Full Name"
              aria-label="fullname"
              aria-describedby="basic-addon1"
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <InputGroup.Text id="basic-addon1"><i class="fas fa-lock" /></InputGroup.Text>
            <FormControl
              type='password'
              style={{ marginRight: "10px" }}
              placeholder="New assword"
              aria-label="password"
              onChange={(e) => setPassword(e.target.value)}
              aria-describedby="basic-addon1"
            />
            <FormControl

              type='password'
              placeholder="Confirm password"
              aria-label="cnfpassword"
              aria-describedby="basic-addon1"
              onChange={(e) => setCnfpswd(e.target.value)}
            />
          </InputGroup>
          <div style={{textAlign:"center"}}>
          {

            !message.status ? <p className='warning'>{message}</p> : null

          }
          {
            validate()
          }
          </div>

          <div className="d-grid gap-2">
            <Button variant="success" size="lg" type='submit'>
              Register
            </Button>
          </div>
        </Form>
        <p className='ptext' style={{ marginLeft: "50%" }}>Already have an account?</p>
        <Link className="btn btn-dark my-2 rounded btn-sm ms-3" to="/">Login</Link>

      </div>
    </>
  )
}

export default Registration
