import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import LoginForm from './components/LoginForm';
import { IUser } from './models/IUser';
import UserService from './services/UserService';

function App() {
  const {store} = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    
    if(localStorage.getItem('token')) {
      store.checkAuth()
    }

  }, [])

  async function getUsers() {
    try {
       const response = await UserService.fetchUsers();
       setUsers(response.data);
    } catch (e) {
      console.log(e);
      
      
    }
  }

  if(store.isLoading) {
    return <div>Loading...</div>
  }

  if(!store.isAuth){
    return (
      <div>
        <LoginForm/>
        <button onClick={getUsers}>Get users</button>
      </div>
      
    )
  }
  return (
    <div>
      <h1> {store.isAuth ? `Useer authorized ${store.user.email}` : 'SIGN IN'}</h1>
      <h1>{store.user.isActivated ? "Account confirmed" : "Confirmed your account"}</h1>
      <button onClick={() => store.logout}>Log out</button>
      <div>
        <button onClick={getUsers}>Get users</button>
      </div>
      {users.map(user => 
        <div key={user.email}>{user.email}</div>
        )}
    </div>
  );
}

export default observer (App);
