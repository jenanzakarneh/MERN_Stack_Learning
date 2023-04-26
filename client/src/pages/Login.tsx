import React from 'react'
import LoginModal from '../components/LoginModal';
import {  useNavigate } from 'react-router';
const Login = () => {
    const navigate=useNavigate();
  return (
    <LoginModal
                    onDismiss={() => {}}
                    onLoginSuccessful={(user) => { 
                        console.log(user) ;
                        localStorage.setItem('token',user.token);
                        navigate('/notes');
                    }
                        
                    }
                />
  )
}

export default Login
