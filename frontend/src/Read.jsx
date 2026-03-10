import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

function Read() {
    const [student, setStudent] = useState([])
    const {id} = useParams();
    useEffect(()=>{
        axios.get("http://localhost:8081/read/"+id)
        .then(res => {
            console.log(res);
            setStudent(res.data[0]);
        })
        .catch(err => console.log(err))

    }, [])
  return (
    <div>
        <div>
            <h2>Student Detail</h2>
            <h2>{student.ID}</h2>
            <h2>{student.Name}</h2>
            <h2>{student.Email}</h2>
            <Link to="/" className='btn btn-primary me-2'>Back</Link>
            <button className='btn btn-info'>Edit</button>
        </div>
    </div>
  )
}

export default Read