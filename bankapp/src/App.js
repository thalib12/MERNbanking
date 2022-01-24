import Registration from "./components/Registration";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from "./components/Header";
import Home from "./components/Home";




function App() {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </Router>
     
    </>
  );
}

export default App;
