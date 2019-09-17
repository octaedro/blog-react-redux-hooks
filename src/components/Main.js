import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPosts } from '../actions/getPosts';
// import img from "../../public/nice.png";

const Main = () => {
    const getPostsSelector = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const getPostsAction = () => dispatch(getPosts());
    
    useEffect(()=>{
        getPostsAction();
    }, [])

    return(
        <React.Fragment>
            <header>
                <div>
                    <h1>React redux</h1>
                    <p>This is a blog made with React, Redux, Hooks and Firebase</p>
                    <p>Life is good!</p>
                    <img src={process.env.PUBLIC_URL + '/cartman.png'} /> 
                </div>
            </header>
            <div className="posts">
                {getPostsSelector.posts.map( post => {
                    return(
                        <div className="post" key={post.id}>
                            <img src={ post.data.cover } />
                            <Link to={"post/" + post.id}>
                                <p>{post.data.title}</p>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </React.Fragment>
    )
}
export default Main;