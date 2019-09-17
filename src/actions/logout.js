import firebase from '../firebase/config';

export const logoutUser = () => {
    return async function(dispatch) {
        await firebase.logout().catch(err => console.log(err));
        console.log("user logged out");
        dispatch({type: "LOGIN_USER", payload: {}});
        dispatch({type: "CREATE_USER", payload: {}});
    }
}