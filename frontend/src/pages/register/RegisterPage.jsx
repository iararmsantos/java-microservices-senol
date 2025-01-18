import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AuthenticationService from '../../services/authentication.service';
import User from '../../models/user';
import './RegisterPage.css';
import { IoPersonCircle } from "react-icons/io5";

const RegisterPage = () => {
  const [ user, setUser ] = useState(new User('', '', ''));
  const [ loading, setLoading ] = useState(false);
  const [ submitted, setSubmitted ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  const currentUser = useSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.id) {
      navigate('/profile');
    }    
  }, []);

  const handleChange = (event) => {    
    const { name, value } = event.target;
    setUser(prevState => {
      return {
        ...prevState,
        [name] : value
      }
    })
  }

  const handleRegister = (e) => {    
    e.preventDefault();
    setSubmitted(true);

    if (!user.username || !user.password || !user.name) {
      return;
    }

    setLoading(true);

    AuthenticationService.register(user).then(_ => {
      navigate('/login');
    }).catch(error => {
      console.log(error);

      if (error?.response?.status === 409) {
        setErrorMessage("Username or password is not valid!");
      } else {
        setErrorMessage("Unexpected error occurred.")
      }
      setLoading(false);
    }) 
  }

  return (
    <div className="container mt-5">
      <div className="card ms-auto me-auto p-3 shadow-lg custom-card">
        <IoPersonCircle className='ms-auto me-auto user-icon'/>
      
      {errorMessage && (
        <div className="alert alert-danger"> 
          {errorMessage}
        </div>
      )}

      <form 
        onSubmit={handleRegister} 
        noValidate 
        className={submitted ? 'was-validated' : ''}
      >
        <div className="form-group">
          <label htmlFor="name" >Full Name: </label>
          <input 
            type="text" 
            className="form-control" 
            name='name' 
            placeholder='Name' 
            required 
            onChange={handleChange} 
            value={user.name}
          />
          <div className="invalid-feedback">Full name is required</div>
        </div>

        <div className="form-group">
          <label htmlFor="username" >Username</label>
          <input 
            type="text" 
            className="form-control" 
            name='username' 
            placeholder='Username' 
            required 
            onChange={handleChange} 
            value={user.username}
          />
          <div className="invalid-feedback">Usernamename is required</div>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            className="form-control" 
            name='password' 
            required 
            onChange={handleChange} 
            value={user.password}
          />
          <div className="invalid-feedback">Password is required</div>
        </div>
        <button className="btn btn-info w-100 mt-3" disabled={loading}>Sign Up</button>
      </form>

      <Link to="/login" className="btn btn-link" style={{color: 'darkgray'}}>I have an account</Link>
      </div>
    </div>
  )
}

export default RegisterPage