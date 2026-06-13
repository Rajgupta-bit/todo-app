import React from 'react'
import Header from './components/Header'
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgetPass from "./components/ForgetPass";
import './App.css';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
       <Route path="/login" element={<Login />} />
       <Route path='/signup' element={<Signup/>}/>
       <Route path='/forgetpass' element={<ForgetPass/>}/>
    </Routes>
  )
}

export default App;
