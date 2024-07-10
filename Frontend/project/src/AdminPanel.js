import { useEffect, useState } from "react";
import axios from "axios";
import { TablePagination } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
export default function AdminPanel() {
  const [search, setsearch] = useState("");
  const [userList, setuserList] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, settotalCount] = useState(0);
  const navigate=useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const handleSearchFilter = (e) => {
    e.preventDefault();
    getUsers(1, search);
    setPage(1);
  };
  const handleChangePage = (event, newpage) => {
    getUsers(newpage + 1, search);
    setPage(newpage + 1);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getUsers = async (page, search) => {
    try {
      let query = { page: page, search: search };
      const response = await axios.get("http://localhost:4000/api/users", {
        params: query,
      });
      setuserList(response?.data?.data);
      settotalCount(response?.data?.totalCount);
    } catch (e) {
      console.log(e);
    }
  };
  const deletehandler=async(index,id)=>{
      try{
        const response=await axios.delete('http://localhost:4000/api/delete/${id}');
        if(response.data.status){
          const users=userList;
          users.splice(index,1);
          setuserList(users)
        }

      }
      catch(e){
        console.log(e)
      }
      
  }
  return (
    <>
      <section className="content-main">
        <div className="head d-flex justify-content-between mb-4"></div>
        <h2 className="text-center">Admin Panel</h2>
        <div className="card shadow-lg manage_user">
          <div className="card-body">
            <div className="top_filter d-flex align-items-center justify-content-between py-0 mb-4">
              <div className="rounded-pill form_custom_inner d-flex">
                <div className="input-group size position-relative">
                  <input
                    type="text"
                    placeholder="Search here...."
                    className="form-control border-2 "
                    name="search"
                    value={search}
                    onChange={(e) => setsearch(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary ml-2"
                  onClick={handleSearchFilter}
                >
                  Search
                </button>
              </div>
            </div>
            <div className="table-responsive table-custom_1">
              <table className="table mb-0 bg-white">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userList?.length > 0 ? (
                    userList?.map((user, i) => {
                      return (
                        <>
                          <tr key={i}>
                            <td>{user?.firstName}</td>
                            <td>{user?.lastName}</td>
                            <td>{user?.email}</td>
                            <td>
                              <button className="btn btn-success btn-sm" onClick={()=>navigate(`/update/${user._id}`)}>
                                <i className="bi bi-pencil-fill"></i>
                              </button>
                              <button className="btn btn-danger btn-sm" onClick={()=>deletehandler(i,user._id)}>
                                <i className="bi bi-trash-fill"></i>
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    })
                  ) : (
                    <tr>
                      <td colspan="3">No Record Found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 25, 100]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
