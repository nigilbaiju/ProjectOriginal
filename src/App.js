import { Home } from '@mui/icons-material';
import './App.css';
import Login from './components/Login/Login';
import React, { useEffect, useState } from 'react'
import Topbar from './components/Adminpanel/Topbar';

function App() {
  const [isloggedin,setIsloggedin] =useState(false);

useEffect(()=>{
const storevalue =localStorage.getItem("isloggedin");
if(storevalue==="1")
 {
  setIsloggedin(true); 
}
},[])

const Logincheck =() =>{
localStorage.setItem("isloggedin",'1')
setIsloggedin(true);
}
const Logoutcheck =() =>{
localStorage.removeItem("isloggedin")
setIsloggedin(false);
}

  return (
    <div className="App">
        <React.Fragment>
            { !isloggedin && <Topbar checkLogOut={Logoutcheck}/>}
            { isloggedin && <Login checkLogin={Logincheck}/>}
        </React.Fragment>
    </div>
  );
}

export default App;
