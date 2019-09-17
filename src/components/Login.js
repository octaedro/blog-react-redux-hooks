import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../actions/login';
import { Redirect }  from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [routeRedirect, setRedirect] = useState(false);
    const dispatch = useDispatch();
    const loginUserAction = (email, password) => dispatch(loginUser(email, password));

    const login = async (e) => {
        e.preventDefault();
        if(email !== '' && password !== '') {
            let user = await loginUserAction(email, password);
            if (user) {
                setRedirect(true);
            }
        } else {
            console.log("Need to fill the credentials");
        }
    }

    const redirectTo = routeRedirect;
    if (redirectTo) {
        return <Redirect to="/" />
    }

    return(
        <React.Fragment>
            <form onSubmit={login}>
                <p>Create an account</p>
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Password: </label>
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                
                <input type="submit" value="Login"/>
            </form>
        </React.Fragment>
    )
}

export default Login;