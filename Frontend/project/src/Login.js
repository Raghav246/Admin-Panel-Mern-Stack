import axios from "axios";
import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';
export default function Login(){
    const[user,setuser]=useState({"email":'',"password":""})
    const[isSubmitting,setisSubmitting]=useState(false)
  const SimpleValidator=useRef(new SimpleReactValidator());
  const[,forceUpdate]=useState();

    const navigate=useNavigate();
    const changehandler=(e)=>{
        const{name,value}=e.target;
        setuser({...user,[name]:value})
}
    const submithandler=async(e)=>{
        e.preventDefault();
        const formValid=SimpleValidator.current.allValid();
        if(!formValid){
          SimpleValidator.current.showMessages();
      forceUpdate(1);
        }
        else{
          setisSubmitting(true);
          try{
            const response=await axios.post("http://localhost:4000/api/login",user);
            setisSubmitting(false)
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
            <div style={{color:'red',fontSize:'14px'}}>
              {SimpleValidator.current.message('email',user?.email,'required|email')}
            </div>
            </div>
            <div className="form-group">
                <lablel for="">Password</lablel>
            <input type="password" placeholder="enter your password" name="password" value={user?.password} className="form-control mt-2 mb-3" onChange={changehandler} />
            <div style={{color:'red',fontSize:'14px'}}>
              {SimpleValidator.current.message('password',user?.password,'required|alphanumeric|max:8')}
            </div>
            </div>
            <button type="submit" className="btn btn-success form-control" disabled={isSubmitting}>Login</button>
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