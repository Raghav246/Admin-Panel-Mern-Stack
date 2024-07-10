import {BrowserRouter,Routes,Route} from "react-router-dom"
import Register from "./Register"
import Login from "./Login"
import './App.css'
import AdminPanel from "./AdminPanel"
import UserPage from "./UserPage"
import Guard from "./Guard"
import Guest from "./Guest"
import UpdatePage from "./UpdatePage"
export default function App(){
  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Guest><Login/></Guest>}/>
      <Route path="/register" element={<Guest><Register/></Guest>}/>
      <Route path="/admin" element={<Guard><AdminPanel/></Guard>}/>
      <Route path="/user" element={<Guest><UserPage/></Guest>}/>
      <Route path="/update/:id" element={<Guard><UpdatePage/></Guard>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}