import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/16qg.svg'
import api from '../../services/api'

function Home() {

  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAddress = useRef()
  const inputEmail = useRef()


  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')
    setUsers(usersFromApi.data)

  }

  async function createUsers() {
    await api.post('/usuarios', {
      name: inputName.current.value,
      address: inputAddress.current.value,
      email: inputEmail.current.value
    })
    getUsers()
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`)

    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='container'>
      <form>
        <h1>cadastro de usuario</h1>
        <input placeholder='nome' name="nome" type='text' ref={inputName} />
        <input placeholder='address' name="address" type='text' ref={inputAddress} />
        <input placeholder='email' name="email" type='text' ref={inputEmail} />
        <button onClick={createUsers} type='button'>cadastrar</button>
      </form>

      {users.map(user => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Address: <span>{user.address}</span> </p>
            <p>Email: <span>{user.email}</span> </p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} />
          </button>
        </div>
      ))}

    </div>
  )
}

export default Home
