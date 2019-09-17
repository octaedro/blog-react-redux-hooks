import React, {useState} from 'react';
import { Redirect }  from 'react-router';
import { useDispatch } from 'react-redux';
import { createPost } from '../actions/create';

const Create = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [cover, setCover] = useState("");
    const [routeRedirect, setRedirect] = useState("");
    const [loading, setLoading] = useState(false);
    
    const dispatch = useDispatch();
    const createPostAction = (post) => dispatch(createPost(post));
    const redirectTo = routeRedirect;
    if (redirectTo) {
        return <Redirect to="/" />
    }

    const addPost = async (e) => {
        e.preventDefault();
        setLoading(true);
        let post = {
            title,
            content,
            cover: cover[0]
        }
        await createPostAction(post);
        setLoading(false);
        setRedirect(true);
    }

    let form;
    if(loading) {
        form =  <div className="processing">
                    <p>Request is being processed</p>
                    <div className="loader">Loading...</div>
                </div>
    } else {
        form =  <form onSubmit={addPost}>
                    <p>Create a new post</p>
                    <label htmlFor="title">Post Title:</label>
                    <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} />
                    
                    <label htmlFor="content">Post Content:</label>
                    <textarea type="text" name="content" onChange={(e) => setContent(e.target.value)}></textarea>
                    
                    <label htmlFor="cover" className="cover">Post Title:</label>
                    <input type="file" onChange={(e) => setCover(e.target.files)} />
                    <input type="submit" value="Create Post" />
                </form>
    }

    return(
        <React.Fragment>
            {form}
        </React.Fragment>
    )
}

export default Create;