const UsersList = ({ usersList, deleteUser, selectUser }) => {
  return (
    <div>
      {
        usersList.map(user => (
          <div className="user-container" key={user.id}>
            <div className="user-info">
              <h3>{user.first_name} {user.last_name}</h3>
              <h3 style={{color: 'grey'}}>{user.email}</h3>
              <h3><i className="fa-solid fa-cake-candles"></i> {user.birthday}</h3>
            </div>
            <div className="buttons">
              <button 
              onClick={() => deleteUser(user)}
              className="delete-btn"><i className="fa-solid fa-trash"></i></button>
              <button onClick={() => selectUser(user)} 
              className="edit-btn"><i className="fa-solid fa-pencil"></i></button>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default UsersList;