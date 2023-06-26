import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from "react";
import Overview from "./Pages/Overview"
import Profile from "./Pages/Profile"
import Header from "./Components/Header"
import { BookDetails } from './Pages/BookDetails';
import { NotFound } from './Pages/NotFound';
import { Favorites } from './Pages/Favorites';
import CreateProfile from './Pages/CreateProfile';
import { Add } from './Pages/Add';
import  {Search} from './Pages/Search';
import { Login } from './Pages/Login';
import ProtectedRoutes from './Pages/ProtectedRoutes';
import cookieManager from './Components/cookieManager';
import './responsive.css';
import {Footer} from './Components/Footer';

function App() {
  const [user, setUser] = useState();

  async function fetchUser() {
    try {
      console.log("Looking for user");
      const response = await fetch(`http://localhost:3001/user/${cookieManager.get('TOKEN')}`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
  
      const user = await response.json();
      return user;
    } catch (error) {
      console.error(error);
      return undefined; // Return null or an empty object to indicate the user is not found
    }
  }
  
   useEffect(() => {
    if (user === undefined) {
      fetchUser().then((user) => setUser(user));
    }
    }, []);

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  return (
    <div className='App'>
      <Header />
        <Routes>
          <Route path='/' element={<Overview />}/>
          <Route path='/create-profile' element={<CreateProfile user={user} setUser={setUser} />}/>
          <Route element={<ProtectedRoutes />}>
            <Route path='/favorites' element={<Favorites user={user} setUser={setUser} />}/>
            <Route path='/profile' element={<Profile />}/>
            <Route path='/add' element={<Add />}/>
            <Route path='/books/:id' element={<BookDetails user={user} setUser={setUser} />}/>
          </Route>
          <Route path='/search' element={<Search />}/>
          <Route path='/login' element={<Login updateUser={updateUser} />}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>    
        <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

          body {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>  
      <Footer />
    </div>
  )
}

export default App