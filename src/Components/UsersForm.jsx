import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const UsersForm = ({ getUsers, userSelected, deselectUser, handleVisibility }) => {

  const { handleSubmit, register, reset } = useForm();
  const [ isLockOpen, setIsLockOpen ] = useState(true);

  const handleLock = () => setIsLockOpen(!isLockOpen);

  useEffect(() => {
    if(userSelected) {
      reset(userSelected)
    } else {
      reset ({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        birthday: ''
      })
    }
  }, [userSelected])

  const submit = (data) => {
    // console.log(data);
    if (userSelected) {
      axios.put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`, data)
        .then(() => {
          getUsers()
          Swal.fire({
            title: 'Success',
            text: 'User has been edited!',
            icon: 'success'
          })
          deselectUser();
        })
        .catch(error => console.log(error.response?.data));
    } else {
      axios.post('https://users-crud1.herokuapp.com/users/', data)
        .then(() => {
          getUsers()
          Swal.fire({
            title: 'Success',
            text: 'A new user has been added!',
            icon: 'success'
          })
          reset(userSelected);
        })
        .catch(error => console.log(error.response?.data));
    }
  }

  return (
    <form className="users-form" onSubmit={handleSubmit(submit)}>
      <h3 className="close-btn" onClick={handleVisibility}>
        <i className="fa-solid fa-circle-xmark"></i></h3>
      <h2>New user</h2>
      <div className="input-container">
        <label htmlFor="first_name"><i className="fa-solid fa-user"></i></label>
        <input {...register('first_name')} placeholder="first name" 
        type="text" id="first_name" required />
        <label htmlFor="last_name"></label>
        <input {...register('last_name')} placeholder="last name" 
        type="text" id="last_name" required />
      </div>

      <div className="input-container">
        <label htmlFor="email"><i className="fa-solid fa-envelope"></i></label>
        <input className="padding" {...register('email')} placeholder="email" 
        type="email" id="email" required/>
      </div>
      <div className="input-container">
        <label className="password-label" onClick={handleLock} htmlFor="password">
         {isLockOpen ? <i className="fa-solid fa-eye"></i>  :
         <i className="fa-solid fa-eye-slash"></i>}</label>
        <input className="padding" {...register('password')} placeholder="password" 
        type={isLockOpen ? 'password' : 'text'} id="password" required/>
      </div>
      <div className="input-container">
        <label htmlFor="birthday"><i className="fa-solid fa-cake-candles"></i></label>
        <input className="birthday-input" {...register('birthday')} 
        type="date" id="birthday" required/>
      </div>
      <button>Upload</button>
      <button type="button" onClick={deselectUser} 
      className="cancel-btn">Cancel</button>
    </form>
  );
};

export default UsersForm;