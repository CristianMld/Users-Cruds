import axios from 'axios';
import { useEffect, useState } from 'react'
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
    axios.delete(`https://users-crud1.herokuapp.com/users/${user.id}/`)
      .then(() => getUsers());
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
