import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Signin } from './SignIn';
import { Signup } from './SignUp';

export const Index = () => {
    return(
        <>
            <Router>
                <Switch>
                <Route exact path="/" >
                    <Signin/>
                </Route>
                <Route path="/signup" >
                    <Signup/>
                </Route>
                </Switch>
            </Router>
        </>
    );
};

export const Nav = () => {
    return (
        <h1>Nav</h1>
    );
};