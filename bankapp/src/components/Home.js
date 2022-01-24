import { React, useState, useEffect } from 'react'
import { Navbar, Nav, Container, Button, Modal, InputGroup, FormControl, Form, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './home.css'


import Swal from 'sweetalert2'

function Home() {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [trans, setTrans] = useState([])
  const [showtrans, setshowtrans] = useState(false)
  const [balshow, setBalshow] = useState(false);
  const [balance, setBalance] = useState(0)
  const [user, setUser] = useState({})
  const [amount, setAmount] = useState("")
  const [dpstshow, setDpstshow] = useState(false);
  const [username, setUsername] = useState("")
  const [warning, setWarning] = useState("")
  const [userwarn, setUserwarn] = useState({})
  const [warn, setWarn] = useState({})
  const [transwarning, setTranswarning] = useState("")
  const getUser = () => {
    const userData = JSON.parse(sessionStorage.getItem("userData"))
    console.log("useeer", userData);
    setUser(userData)
  }

  useEffect(() => {
    getUser()
  }, [])
  const handleClose = () => {
    setShow(false)
    setUsername("")
    setTranswarning("")
    setUserwarn({})
  };
  const handleShow = () => setShow(true);



  const transfer = (e) => {
    e.preventDefault()
    const accno = user.currentAcno
    let toaccno = e.target.elements[0].value
    let toname = username
    let fromname = user.currentUsername
    let pswd = e.target.elements[2].value
    let amt = e.target.elements[3].value
    if (accno == "" || toaccno == "" || pswd == "" || amt == "") {
      setTranswarning("please fill all the fields")
    }
    else if (userwarn.status) {
      const data = { toaccno, toname, fromname, accno, pswd, amt }
      console.log("user", data);

      fetch('http://localhost:3200/transfer', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(res => res.json())
        .then(res => {
          console.log(res)
          setWarn(res)
          if (res.status) {
            Swal.fire({
              icon: 'success',
              title: `${amt}Rs transferred successfully!`,
              showConfirmButton: false,
              timer: 1500
            })
            handleClose()
            getTransaction()

          }
        })
    }
    console.log("warn....", warn);
  }
  const getTransaction = () => {
    console.log(trans);
    console.log("hello");
    const current_accno = user.currentAcno
    console.log(current_accno);
    fetch('http://localhost:3200/getTransaction', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ current_accno })
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        let transc = res.transaction.reverse()
        setTrans(transc)
      })



  }


  const getBalance = () => {
    const current_accno = user.currentAcno
    //  console.log(current_accno);

    fetch('http://localhost:3200/getBalance', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ current_accno })
    }).then(res => res.json())
      .then(res => {
        console.log("Response..", res)
        setBalance(res.balance)
      })


    setBalshow(true)
  }
  const logout = () => {
    console.log("logout");
    Swal.fire({
      icon: 'warning',
      confirmButtonText: "Yes",
      title: 'Do you want to Logout?',

    }).then(res => {

      if (res.isConfirmed) {
        sessionStorage.clear()
        Swal.fire({
          icon: 'success',
          title: 'Logout successfully !',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
          navigate('/')
        }, 1500)
      }
    })
  }
  const deposit = () => {
    console.log(user);
    const accno = user.currentAcno

    const amt = amount
    const data = { accno, amt }
    console.log("user", data);
    if (amount == "") {
      setWarning("Please enter the amount")
    }
    if (amount <= 10000 && amount != "") {
      fetch('http://localhost:3200/deposit', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(res => res.json())
        .then(res => {
          if (res.status) {

            setDpstshow(false)

            Swal.fire({
              icon: 'success',
              title: `${amount}Rs deposited successfully !`,
              showConfirmButton: false,
              timer: 1500
            })
            setAmount("")
            getTransaction()
          }



          console.log(res);

        })
    }


  }
  const getName = (e) => {
    let accno = e.target.value
    let data = { accno }
    fetch('http://localhost:3200/getName', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(res => {
        console.log(res)

        if (res.status) {
          setUsername(res.name)
          setUserwarn(res)
        }
        else {
          setUsername("")
          setUserwarn(res)
        }

      })

  }

  return (
    <div className='home' >
      <Navbar bg="light" bsPrefix='navbar' >
        <Container>

          <Nav className="me-auto">
            {/* <Nav.Link >Home</Nav.Link>
      <Nav.Link >Add Cash</Nav.Link>
      <Nav.Link >Transfer Cash</Nav.Link>
      <Nav.Link >Check Balance</Nav.Link>
      <Nav.Link >Transaction History</Nav.Link> */}
            <button onClick={() => setshowtrans(false)}>Home</button>
            <button onClick={() => setDpstshow(true)}>Deposit Cash</button>
            <button onClick={handleShow}>Transfer Cash</button>
            <button onClick={getBalance}>Check Balance</button>
            <button onClick={() => {
              setshowtrans(true)
              getTransaction()
            }}>Transaction History</button>
            <button onClick={logout} style={{ marginLeft: "30rem" }} >Logout</button>


          </Nav>
        </Container>
      </Navbar>

      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}
      <Modal show={dpstshow} onHide={() => {
        setDpstshow(false)
        setAmount("")
        setWarning("")
      }}>
        <Modal.Header closeButton>
          <Modal.Title>Deposit in your Account</Modal.Title>

        </Modal.Header>
        <Modal.Body>

          <h4 style={{ fontFamily: "serif", marginBottom: "40px", textAlign: "center" }}>Add dummy cash in your account</h4>

          <InputGroup>
            <InputGroup.Text id="basic-addon1"><i class="fas fa-money-bill-alt" /></InputGroup.Text>
            <FormControl
              onChange={(e) => {

                setAmount(e.target.value)
                if (e.target.value > 10000) {
                  setWarning("You can add max 10000 rs at a time")
                }
                else {
                  setWarning("")
                }
              }}
              type='text'
              value={amount}
              placeholder="Enter Amount"
              aria-label="amount"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          {(warning != "") ? <p className='warning'>{warning}</p> : null

          }

          <Modal.Footer>
            <Button variant="success" onClick={deposit}>
              Deposit
            </Button>

          </Modal.Footer>



        </Modal.Body>

      </Modal>
      <Modal show={balshow} onHide={() => setBalshow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Balance Enquiry</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <h3>Your available balance :  <span style={{ color: "green" }}>{balance} Rs</span> </h3>


        </Modal.Body>

      </Modal>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Transfer Cash</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ margin: "30px" }}>
            <Form onSubmit={transfer} >
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1"><i class="fas fa-landmark" /></InputGroup.Text>
                <FormControl
                  placeholder="Recipient's account number"
                  aria-label="accno"
                  aria-describedby="basic-addon1"
                  onChange={(e) => getName(e)}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1"><i class="fas fa-user" /></InputGroup.Text>
                <FormControl
                  placeholder="Recipient's Name"
                  aria-label="Name"
                  value={username}
                  aria-describedby="basic-addon1"
                />
              </InputGroup>


              <InputGroup className='mb-3'>
                <InputGroup.Text id="basic-addon1"><i class="fas fa-lock" /></InputGroup.Text>
                <FormControl
                  type='password'
                  placeholder="Your password"
                  aria-label="password"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              <InputGroup>
                <InputGroup.Text id="basic-addon1"><i class="fas fa-money-bill-alt" /></InputGroup.Text>
                <FormControl
                  type='text'
                  placeholder="Enter Amount"
                  aria-label="amount"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              {
                (!userwarn.status) ? <p className='warning'>{userwarn.message}</p> : null
              }

              {


                (!warn.status) ? <p className='warning'>{warn.message}</p> : null


              }
              {
                (transwarning != "") ? <p className='warning'>{transwarning}</p> : null
              }
              <Button variant="primary" type='submit' style={{ float: "right", marginTop: "20px" }}>
                Transfer cash
              </Button>
            </Form>
          </div>
        </Modal.Body>



      </Modal>


      {
        (showtrans) ?
          <div style={{ width: "50%", margin: "3% 25% ", borderRadius: "10px", overflow: "hidden" }}>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr style={{ textAlign: "center" }}>
 
                  <th>Account</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {
                  trans.map((item) =>

                    (item.Type == "debit") ?
                      <tr style={{ textAlign: "center" }}>
                        <td>{item.To}</td>
                        <td style={{ color: "red", fontWeight: "bold" }}>-{item.Amount} Rs</td>
                      </tr> : <tr style={{ textAlign: "center" }}>
                        <td>{item.From ? item.From : item.Type}</td>
                        <td style={{ color: "green", fontWeight: "bold" }}>+{item.Amount} Rs</td>
                      </tr>




                  )
                }

              </tbody>
            </Table>

          </div> : <div style={{ height: "100vh" }}></div>


      }


    </div>
  )
}

export default Home

