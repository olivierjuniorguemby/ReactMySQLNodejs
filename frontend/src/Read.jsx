import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function Read() {
  const [student, setStudent] = useState(null)
  const [message, setMessage] = useState('')
  const { id } = useParams()

  useEffect(() => {
    axios.get("http://localhost:8081/read/" + id)
      .then(res => {
        console.log(res.data)

        if (res.data.length > 0) {
          setStudent(res.data[0])
        } else {
          setMessage("Aucun étudiant trouvé")
        }
      })
      .catch(err => {
        console.log(err)
        setMessage("Erreur lors du chargement")
      })
  }, [id])

  return (
    <div className="container mt-5">
      <h2>Student Detail</h2>

      {message && <p>{message}</p>}

      {student && (
        <>
          <p><strong>ID:</strong> {student.ID}</p>
          <p><strong>Name:</strong> {student.Name}</p>
          <p><strong>Email:</strong> {student.Email}</p>

          <Link to="/" className="btn btn-primary me-2">Back</Link>
          <Link to={`/edit/${student.ID}`} className="btn btn-info">Edit</Link>
        </>
      )}
    </div>
  )
}

export default Read