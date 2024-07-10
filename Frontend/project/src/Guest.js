import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

export default function Guest({children}){
    const navigate=useNavigate();
    useEffect(()=>{
    const accessToken=localStorage.getItem("accessToken");
     if(!accessToken)
     {
     navigate("/");
     }
    },[navigate])
    return(
        <>
    {children}
        </>
    )
}