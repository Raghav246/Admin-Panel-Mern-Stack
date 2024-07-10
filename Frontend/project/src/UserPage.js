import { useNavigate } from "react-router-dom";

export default function UserPage(){
const navigate=useNavigate();
    const clickhandler=()=>{
        localStorage.clear();
        navigate('/');
    }
    return(
        <>
       <div className="d-flex justify-content-around mt-3">
        <div>
        <h1>Welcome!</h1>
        </div>
        <div>
            <button className="btn btn-success" onClick={clickhandler}>Logout</button>
        </div>
       </div>
        </>
    )
}