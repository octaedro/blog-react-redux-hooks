import firebase from '../firebase/config';

export const loginUser = (email, password) => {
    return async function(dispatch) {
        const user = await firebase.login(email, password).catch(err => console.log(err));
        console.log(user);
        if(user) {
            dispatch({type: "LOGIN_USER", payload: user});
            return user;
        } else {
            console.log("error, user not logged in");
        }

    }
}