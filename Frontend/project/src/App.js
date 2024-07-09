import {BrowserRouter,Routes,Route} from "react-router-dom"
import Register from "./Register"
import Login from "./Login"
import './App.css'
export default function App(){
  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}