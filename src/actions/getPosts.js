import firebase from '../firebase/config';

export const getPosts = () => {
    return async function(dispatch) {
        const postArray = await firebase.getPosts().catch(err => console.log(err));
        console.log(postArray);
        dispatch({type: "GET_POSTS", payload: postArray});
    }
}