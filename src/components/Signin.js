import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect }  from 'react-router-dom'
//action
import { createUser } from '../actions/signin';

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [routRedirect, setRedirect] = useState(false);
    const dispatch = useDispatch();
    const createUserAction = (email, password) => dispatch(createUser(email, password));

    const signin = async (e) => {
        e.preventDefault();
        if(email !== '' && password !== '') {
            await createUserAction(email, password);
            //setRedirect(true);
        } else {
            console.log("Need to fill the credentials");
        }
    }

    const redirectTo = routRedirect;
    if (redirectTo) {
        return <Redirect to="/" />
    }

    return(
        <React.Fragment>
            <form onSubmit={signin}>
                <p>Create an account</p>
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Password: </label>
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                
                <input type="submit" value="Create account"/>
            </form>
        </React.Fragment>
    )
}

export default Signin;