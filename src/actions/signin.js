import firebase from '../firebase/config';

export const createUser = (email, password) => {
    return async function(dispatch) {
        const user = await firebase.signin(email, password).catch(err => console.log(err));
        console.log(user);
        if(user) {
            dispatch({type: "CREATE_USER", payload: user});
        } else {
            console.log("error, user not created");
        }
    }
}