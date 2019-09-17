import firebase from '../firebase/config';

export const deletePost = (postid, fileref) => {
    return async function(dispatch) {
        const post = await firebase.deletePost(postid,fileref).catch(err => console.log(err));
        dispatch({type: "DELETE_POST", payload: post});
    }
}