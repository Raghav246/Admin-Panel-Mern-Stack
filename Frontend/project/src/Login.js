import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
export default function Login(){
    const[user,setuser]=useState({"email":'',"password":""})
    const navigate=useNavigate();
    const changehandler=(e)=>{
        const{name,value}=e.target;
        setuser({...user,[name]:value})
}
    const submithandler=async(e)=>{
        e.preventDefault();
          const{name,value}=e.target;
          try{
          const response=await axios.post("http://localhost:4000/api/login",user);
          if(response.data.status)
            {
            localStorage.setItem("accessToken",response?.data?.token);
              if(response?.data?.data?.role=='Admin'){
              localStorage.setItem("adminToken",response?.data?.token);
                navigate('/admin')
              }
              else{
                navigate('/user')
              }
          
          }
            
          }
          catch(e){
          console.log(e)
          }
    }
    return(
        <>
        <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-xs-12 col-sm-8 col-md-6 col-lg-5">
            <div className="card-header">
                Login
            </div>
            <div className="card-body">
                <div>
                <form onSubmit={submithandler}>
            <div className="form-group">
                <lablel for="">Email</lablel>
            <input type="email" placeholder="enter your email" name="email" value={user?.email} className="form-control mt-2 mb-3" onChange={changehandler} />
            </div>
            <div className="form-group">
                <lablel for="">Password</lablel>
            <input type="password" placeholder="enter your password" name="password" value={user?.password} className="form-control mt-2 mb-3" onChange={changehandler} />
            </div>
            <button type="submit" className="btn btn-success form-control">Login</button>
            </form>
            <div className="text-center mt-2">
            <a>Don't Have Account?<Link to="/register">Register here</Link></a>
            </div>
          
                </div>
          
            </div>
          </div>
        </div>
      </div>
        
        </>
    )
}