import React,{ useRef } from 'react';
import logoImg from '../svgs/logo.svg';
import { Link } from 'react-router-dom';
import './signIn.css';

const Signin = ()=>{
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
        if(!email){
            alert("Please enter your email");
        }else{
            if(!password){
                alert("Please enter the password");
            }
        }
        console.log(email,password);
    }
    return (
        <form className="form">
            <input type="text" ref={emailDOM} className="input" placeholder="Email or Mobile Number"/>
            <input type="password" ref={passwordDOM} className="input" placeholder="Password"/>
            <button type="submit" onClick={(e) => submitHandler(e)} className="signin">Sign In</button>
            <button className="forgetPassword">Forget Password?</button>
            <p>Don't Have an Account? <Link to="/signup" className="signup">Sign Up</Link></p>
        </form>
    );
};

export default Signin;