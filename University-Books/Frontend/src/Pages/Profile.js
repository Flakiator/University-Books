import React, { useEffect, useState } from 'react';
import ProfileInfo from '../Components/ProfileInfo';
import BorrowerLenderTable from '../Components/BorrowLenderTable';
import cookieManager from '../Components/cookieManager';

export default function Profile() {
  const [user, setUser] = useState({});
  const [books, setBooks] = useState({});

  async function fetchUser() {
    const response = await fetch(`http://localhost:3001/user/${cookieManager.get('TOKEN')}`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  }

  async function fetchBooks() {
    const response = await fetch("http://localhost:3001/", {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    fetchUser().then((data) => setUser(data));
    fetchBooks().then((data) => setBooks(data));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', padding: '20px' }}>
      {Object.keys(user).length > 0 ? (
        <>
          <ProfileInfo name={user.name} password={user.password} email={user.email} user={user}/>
          <div style={{ width: '100%', maxWidth: '800px', marginTop: '0%' }}>
            <BorrowerLenderTable orders={user.orders} books={books} />
          </div>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
