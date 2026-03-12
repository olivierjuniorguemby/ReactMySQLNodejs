import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Update() {

  const { id } = useParams()

  const [student, setStudent] = useState(null)
  const [message, setMessage] = useState('')
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: '',
    email: ''
  })

  useEffect(() => {
    axios.get("http://localhost:8081/read/" + id)
      .then(res => {

        if (res.data.length > 0) {
          setStudent(res.data[0])

          // ⭐ IMPORTANT
          setValues({
            name: res.data[0].Name,
            email: res.data[0].Email
          })

        } else {
          setMessage("Aucun étudiant trouvé")
        }

      })
      .catch(err => {
        console.log(err)
        setMessage("Erreur lors du chargement")
      })
  }, [id])

  const handleUpdate = (event) =>{
    event.preventDefault();

    axios.put("http://localhost:8081/update/" + id, values)
      .then(res => {
        console.log(res);
        navigate('/');
      }).catch(err => console.log(err))

  }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleUpdate}>
          <h2>Update Student</h2>

          {message && <p>{message}</p>}

          <div className='mb-2'>
            <label>Name</label>
            <input
              type='text'
              className='form-control'
              value={values.name}
              onChange={e => setValues({ ...values, name: e.target.value })}
            />
          </div>

          <div className='mb-2'>
            <label>Email</label>
            <input
              type='email'
              className='form-control'
              value={values.email}
              onChange={e => setValues({ ...values, email: e.target.value })}
            />
          </div>

          <button className='btn btn-success'>Update</button>
        </form>
      </div>
    </div>
  )
}

export default Update