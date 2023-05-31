import React, {useState} from 'react';
import ErrorModal from './components/UI/ErrorModal';
import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';


function App() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState()

  const userNameAgeMissing = (obj) => {
    setError(obj)
  }

  const invalidAge = (obj) => {
    setError(obj)
  }
  
  const errorHandler = () => {
    setError(null)
  }

  const submitHandler = (...data) => {
    const [userName, age] = data
    setUsers(prevUsers => {
      return [{
        id: Math.random().toString(),
        userName,
        age},...prevUsers]
    })
    
    console.log(userName,age)
  }


  return (
    <div>
      <AddUser onAddUser={submitHandler} onUserNameAgeMissing={userNameAgeMissing} onAgeInvalid={invalidAge}/>
      <UsersList list={users}/>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
    </div>
  );
}

export default App;
