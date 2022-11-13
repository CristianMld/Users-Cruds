import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const UsersForm = ({ getUsers, userSelected, deselectUser }) => {

  const { handleSubmit, register, reset } = useForm();

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
          deselectUser();
        })
        .catch(error => console.log(error.response?.data));
    } else {
      axios.post('https://users-crud1.herokuapp.com/users/', data)
        .then(() => {
          getUsers()
          reset(userSelected);
        })
        .catch(error => console.log(error.response?.data));
    }
  }

  return (
    <form className="users-form" onSubmit={handleSubmit(submit)}>
      <h2>New user</h2>
      <div className="input-container">
        <label htmlFor="first_name"><i className="fa-solid fa-user"></i></label>
        <input {...register('first_name')} placeholder="first name" type="text" id="first_name" />
        <label htmlFor="last_name"></label>
        <input {...register('last_name')} placeholder="last name" type="text" id="last_name" />
      </div>

      <div className="input-container">
        <label htmlFor="email"><i className="fa-solid fa-envelope"></i></label>
        <input {...register('email')} placeholder="email" type="email" id="email" />
      </div>
      <div className="input-container">
        <label htmlFor="password"><i className="fa-solid fa-lock"></i></label>
        <input {...register('password')} placeholder="password" type="password" id="password" />
      </div>
      <div className="input-container">
        <label htmlFor="birthday"><i className="fa-solid fa-cake-candles"></i></label>
        <input {...register('birthday')} type="date" id="birthday" />
      </div>
      <button>Upload</button>
    </form>
  );
};

export default UsersForm;