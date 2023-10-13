import React,{useEffect, useState} from 'react'
import './Login.css'
import Home from '../Adminpanel/Home';


const Login = (props) => {

    // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const storevalue =localStorage.getItem("isSubmitted");
    if(storevalue==="1")
    {
      setIsSubmitted(true);
      console.log(storevalue);
    }
  })
  const Logout = (event) => {
          localStorage.removeItem("isSubmitted")
          setIsSubmitted(false)
  }
  // User Login info
  const database = [
    {
      username: "aa",
      password: "aa"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) 
    {
        if (userData.password !== pass.value) 
        {
            setErrorMessages({ name: "pass", message: errors.pass });
        } 
        else 
        {
            localStorage.setItem("isSubmitted",'1')
            setIsSubmitted(true);
        }
    } 
    else 
    {
        setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
    </div>
    </div>
  );

  return (
   <div>
       {!isSubmitted && renderForm}
       {isSubmitted && <Home checkLogout={Logout}/>}
   </div>
  )
}

export default Login
