import React,{ useRef } from 'react';
import logoImg from '../svgs/logo.svg';
import { Link } from 'react-router-dom';
import './signIn.css';

export const Signin = ()=>{
    return (
        <>
            <div className="signIn">
                <Logo/>
                <Form/>
            </div>
        </>
    );
};

const Logo = () => {
    return (
        <> 
            <section className="logoSignIn">
                <img src={logoImg}/>
                <h2>Helping people connect to the emergency services</h2>
            </section>
        </>
    );
};

const Form = () => {
    let emailDOM = useRef(null);
    let passwordDOM = useRef(null);
    const submitHandler = (e) => {
        e.preventDefault();
        const email = emailDOM.current.value;
        const password = passwordDOM.current.value;
        console.log(email,password);
    }
    return (
        <form onSubmit={(e) => submitHandler(e)} className="form">
            <input type="text" ref={emailDOM} className="input" placeholder="email or phone number" required/>
            <input type="password" ref={passwordDOM} className="input" placeholder="password" required/>
            <button className="forgetPassword">forget password</button>
            <button type="submit" className="signin">Sign In</button>
            <Link to="/Signup" className="signup">Sign Up</Link>
        </form>
    );
};