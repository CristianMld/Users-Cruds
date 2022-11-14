import axios from 'axios';
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import './App.css'
import UsersForm from './Components/UsersForm';
import UsersList from './Components/UsersList';

function App() {
  
  const [ usersList, setUsersList ] = useState([]);
  const [ userSelected, setUserSelected ] = useState(null);
  const [ isVisible, setIsVisible ] = useState(false);

  useEffect(() => {
    axios.get('https://users-crud1.herokuapp.com/users/')
      .then(res => setUsersList(res.data));
  }, [])

  const getUsers = () => {
    axios.get('https://users-crud1.herokuapp.com/users/')
      .then(res => setUsersList(res.data));
  }

  const deleteUser = (user) => {
    Swal.fire({
      title: 'Do you want to delete this user?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://users-crud1.herokuapp.com/users/${user.id}/`)
          .then(() => getUsers())
          .catch(error => console.log(error.response?.data))
          Swal.fire('Deleted!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Cancelled', '', 'info')
      }
    });
  }

  const selectUser = (user) => setUserSelected(user);

  const deselectUser = () => setUserSelected(null);

  // console.log(usersList);
  return (
  
    <div className="App">
      {
        isVisible && <>
        <UsersForm 
        getUsers={getUsers}
        userSelected={userSelected}
        deselectUser={deselectUser}/>
        </>
      }
      
      <UsersList 
      usersList={usersList} 
      selectUser={selectUser}
      deleteUser={deleteUser}/>
      <button className='newUser-btn'
      onClick={() => setIsVisible(!isVisible)}><i className="fa-solid fa-user-plus"></i></button>
    </div>
  )
}

export default App
