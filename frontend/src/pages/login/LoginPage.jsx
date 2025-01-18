import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import User from '../../models/user';
import { useDispatch, useSelector } from 'react-redux';
import AuthenticationService from '../../services/authentication.service';
import { setCurrentUser } from '../../store/actions/user';
import { IoPersonCircle } from 'react-icons/io5';

const LoginPage = () => {
  const [ user, setUser ] = useState(new User('', '', ''));
  const [ loading, setLoading ] = useState(false);
  const [ submitted, setSubmitted ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');

  const currentUser = useSelector((state) => state.user);
  
  const navigate = useNavigate();  
  const dispatch = useDispatch();

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

  const handleLogin = (e) => {
    e.preventDefault();

    setSubmitted(true);
    
    if (!user.username || !user.password) {
      return;
    }

    setLoading(true);

    AuthenticationService.login(user).then((response) => {
      dispatch(setCurrentUser(response.data));
      navigate('/profile')
    }).catch(error => {
      console.log(error);
      setErrorMessage("Username or password is not valid.");
      setLoading(false)
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
        onSubmit={handleLogin} 
        noValidate 
        className={submitted ? 'was-validated' : ''}
      >
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
        <button className="btn btn-info w-100 mt-3" disabled={loading}>Sign In</button>
      </form>

      <Link to="/register" className="btn btn-link" style={{color: 'darkgray'}}>Create new account</Link>
      </div>
    </div>
  )
}

export default LoginPage