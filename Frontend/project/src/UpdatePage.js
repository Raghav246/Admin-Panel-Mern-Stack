import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function UpdatePage(){
    const [user, setuser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      const {id}=useParams();
      useEffect(()=>{
       getUser
      },[])

      const getUser=async(id)=>{
        try{
        const response=await axios.get(`http://localhost:4000/user/${id}`);
        setuser(response.data.data)
        }
        catch(e){
            console.log(e)
        }
      }
      const changehandler = (e) => {
        const { name, value } = e.target;
        setuser({ ...user, [name]: value });
      };
      const submithandler = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.put(
            `http://localhost:4000/api/update/${id}`,user
          );
          console.log(response.data);
        } catch (e) {
          console.log(e);
        }
      };
    return(
        <>
         <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-xs-12 col-sm-8 col-md-6 col-lg-5">
            <div className="card-header">
                Update
            </div>
            <div className="card-body">
                <div>
                <form onSubmit={submithandler}>
            <div className="form-group">
                <lablel for="">First Name</lablel>
            <input type="text" placeholder="enter first name" name="firstName" value={user?.firstName} className="form-control mt-2 mb-3" onChange={changehandler} />
            </div>
            <div className="form-group">
                <lablel for="">Last Name</lablel>
            <input type="text" placeholder="enter last name" name="lastName" value={user?.lastName} className="form-control mt-2 mb-3" onChange={changehandler} />
            </div>
            <div className="form-group">
                <lablel for="">Email</lablel>
            <input type="email" placeholder="enter your email" name="email" value={user?.email} className="form-control mt-2 mb-3" onChange={changehandler} />
            </div>
            <div className="form-group">
                <lablel for="">Password</lablel>
            <input type="password" placeholder="enter your password" name="password" value={user?.password} className="form-control mt-2 mb-3" onChange={changehandler} />
            </div>
            <button type="submit" className="btn btn-success form-control">Update</button>
            </form>
                </div>
          
            </div>
          </div>
        </div>
      </div>
        </>
    )
}