import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

function Home() {

  const [data, setData] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:8081")
    .then(res => setData(res.data))
    .catch(err => console.log(err));       
  }, [])

  return (
    <div className="container-fluid mt-5 bg-primary">
      <h2>Student List</h2>
      <div className='d-flex justify-content-end'>
        <Link to="/create" className='btn btn-success'>Create +</Link>
      </div>
      <div className="row">
        <div className="col-12">

          <table className="table table-striped w-100">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((students, index) => {
                return (
                  <tr key={index}>
                    <td>{students.ID}</td>
                    <td>{students.Name}</td>
                    <td>{students.Email}</td>
                    <td>
                      <Link to='/read/${students.ID}' className="btn btn-info btn-sm">Read</Link>
                      <button className="btn btn-primary btn-sm mx-2">Edit</button>
                      <button className="btn btn-danger btn-sm">Delete</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>

          </table>

        </div>
      </div>

    </div>
  )
}

export default Home