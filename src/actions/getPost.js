import firebase from '../firebase/config';

export const getPost = (postid) => {
    return async function(dispatch) {
        const postData = await firebase.getPost(postid).catch(err => console.log(err));
        dispatch({type: "GET_POST", payload: postData});
    }
}