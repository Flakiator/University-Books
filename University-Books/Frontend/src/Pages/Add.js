import { CreateBook } from "../Components/CreateBook";
import React, { useEffect, useState } from 'react';
import cookieManager from "../Components/cookieManager";

export function Add(){
    const [user, setUser] = useState({});
    async function fetchUser() {
        const response = await fetch(`http://localhost:3001/user/${cookieManager.get('TOKEN')}`, {
          method: 'GET',
        });
        const user = await response.json();
        console.log(JSON.stringify(user, null, 2));
        return user;
      }
      
      useEffect(() => {
        fetchUser().then((user) => setUser(user));
      }, []);
    return(<CreateBook user={user} books={user.books} />)
}