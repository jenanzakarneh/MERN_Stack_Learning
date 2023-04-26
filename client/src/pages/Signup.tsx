import React from 'react'
import SignUpModal from '../components/SignupModal';
import { redirect, useNavigate } from 'react-router';
const Signup = () => {
    const navigate = useNavigate();
    return (
        <SignUpModal
            onDismiss={() => { }}
            onSignUpSuccessful={(user) => {
                navigate("/login")
                console.log(user)
            }}
        />
    )
}

export default Signup
