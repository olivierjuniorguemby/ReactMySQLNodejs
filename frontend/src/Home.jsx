import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Home() {
    const [data, setData] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:8081")
        .then(res => setData(res.data))
        .catch(err => console.log(err));       
    }, [])
  return (
    <div>
        <div>
            <table>
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
                        return <tr key={index}>
                            <td>{students.ID}</td>
                            <td>{students.Name}</td>
                            <td>{students.Email}</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    })}
                    
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Home