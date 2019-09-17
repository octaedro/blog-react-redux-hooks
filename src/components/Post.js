import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//actions
import { getPost } from '../actions/getPost';
import { updatePost } from '../actions/update';
import { deletePost } from '../actions/deletePost';
import { Redirect } from 'react-router-dom';
import firebase from '../firebase/config';

const Post = (props) => {
    const loginSelector = useSelector((state) => state.logIn);
    const signinSelector = useSelector((state) => state.signIn);

    const [timer, setTimer] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [userState, setUserState] = useState(null);

    const [defaultTitle, setDefaultTitle] = useState("");
    const [defaultContent, setDefaultContent] = useState("");
    const [fileref, setFileref] = useState("");

    const [routeRedirect, setRedirect] = useState("");
    const [isBusy, setIsBusy] = useState(false);

    const titleRef = useRef(null);
    const contentRef = useRef(null);
    const fileRef = useRef(null);

    const [postid, setPostid] = useState("");

    const getPostSelector = useSelector((state) => state.post);
    const dispatch = useDispatch();

    const getPostAction = (postid) => dispatch(getPost(postid));
    const updatePostAction = (postid, post) => dispatch(updatePost(postid, post));
    const deletePostAction = (postid, fileref) => dispatch(deletePost(postid, fileref));

    let currentPost;
    let editButton;
    let deleteButton;

    useEffect(()=>{
        setTimer(true);
        setPostid(props.match.params.id);
        getPostAction(props.match.params.id);

        firebase.getUserState().then(user =>{
            if (user) {
                setUserState(user);
            }
        });
        setTimeout(() => setTimer(false), 1000);
    }, []);

    const redirect = routeRedirect;
    if (redirect) {
        return <Redirect to="/" />
    }

    const updateCurrentPost = async(e) => {
        e.preventDefault();
        setIsBusy(true);
        const post = {
            id: postid,
            title: titleRef.current.value,
            content: contentRef.current.value
        }
        if (fileRef.current.files.length > 0) {
            post["cover"] = fileRef.current.files[0];
            post["oldcover"] = getPostSelector.post.fileRef;
        }

        await updatePostAction(postid, post);
        setIsBusy(false);
        setRedirect(true);
    }

    //edit
    const editPost = () =>{
        setDefaultTitle(getPostSelector.post.title);
        setDefaultContent(getPostSelector.post.content);
        setFileref(getPostSelector.post.fileRef);
        setEditMode(!editMode);
    }

    //delete
    const deleteCurrentPost = async() => {
        await deletePostAction(postid, fileref);
        setRedirect(true);
    }

    let updateForm;
    if (editMode) {
        if (loginSelector.user.hasOwnProperty("user") || signinSelector.user.hasOwnProperty("user") || userState !=
         null && !isBusy) {
            deleteButton = <button className="delete" onClick={(e)=> deleteCurrentPost()}>Delete Post</button>
        }
        if (isBusy) {
            updateForm =    <div className="processing">
                                <p>Request is being processed</p>
                                <div className="loader">Loading ...</div>
                            </div>
        } else {
            updateForm =    <React.Fragment>
                                <form className="editForm" onSubmit={updateCurrentPost}>
                                    <p>Update de current post</p>
                                    <label htmlFor="title">Post Title: </label>
                                    <label htmlFor="title">Post Title:</label>
                                    <input type="text" name="title" ref={titleRef} defaultValue={getPostSelector.post.title} onChange={(e) => setDefaultTitle(e.target.value)} />
                                    
                                    <label htmlFor="content">Post Content:</label>
                                    <textarea type="text" name="content" ref={contentRef} defaultValue={getPostSelector.post.content} onChange={(e) => setDefaultContent(e.target.value)}></textarea>
                                    
                                    <label htmlFor="cover" className="cover">Post Title:</label>
                                    <input type="file" ref={fileRef} onChange={(e) => setFileref(e.target.files)} />
                                    <input type="submit" value="Update Post" />
                                </form>
                            </React.Fragment>
        }
    }
    if (timer) {
        currentPost = <div className="loader">Loading ...</div>
    } else {
        if (loginSelector.user.hasOwnProperty("user") || signinSelector.user.hasOwnProperty("user") || userState !=
         null && !isBusy) {
            editButton = <button className="edit" onClick={(e)=> editPost()}>Edit Post</button>
        }
        currentPost =   <div className="single">
                            <img src={ getPostSelector.post.cover } />
                            <h2>{ getPostSelector.post.title }</h2>
                            <p>{ getPostSelector.post.content }</p>
                            {editButton}
                            {updateForm}
                            {deleteButton}
                        </div>
    }
    return(
        <React.Fragment>
           {currentPost} 
        </React.Fragment>
    )
}

export default Post;