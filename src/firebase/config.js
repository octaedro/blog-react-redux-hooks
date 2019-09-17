import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import config from '../configuration.js'

class Firebase {
    constructor(){
        firebase.initializeApp(config);
        this.auth = firebase.auth();
        this.db = firebase.firestore();
    }

    //sign in
    async signin(email, password) {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password).catch(err => {
            console.log(err);
        });
        return user;
    }

    //log in
    async login(email, password) {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password).catch(err => {
            console.log(err);
        });
        return user;
    }

    //log out
    async logout() {
        const logout = await firebase.auth().signOut().catch(err => {
            console.log(err);
        });
        return logout;
    }

    async getUserState() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve);
        })
    }

    async createPost(post) {
        const storageRef = firebase.storage().ref();
        const storageChild = storageRef.child(post.cover.name);
        const postCover = await storageChild.put(post.cover);
        const downloadURL = await storageChild.getDownloadURL(); //url
        const fileRef = postCover.ref.location.path; // actual path

        let newPost = {
            title: post.title,
            content: post.content,
            cover: downloadURL,
            fileRef: fileRef
        }

        const firestorePost = await firebase.firestore().collection("posts").add(newPost).catch(err => console.log(err));

        return firestorePost;
    }

    async getPosts() {
        let postsArray = [];
        const posts = await firebase.firestore().collection("posts").get();
        posts.forEach(doc =>{
            postsArray.push({id: doc.id, data: doc.data()});
        });
        return postsArray;
    }
    
    async getPost(postid) {
        const post = await firebase.firestore().collection("posts").doc(postid).get(); // promise
        const postData = post.data();
        return postData;
    }

    async updatePost(postid, postData) {
        if (postData["cover"]) {
            const storageRef = firebase.storage().ref();
            const storageChild = storageRef.child(postData.cover.name);
            const postCover = await storageChild.put(postData.cover);
            const downloadURL = await storageChild.getDownloadURL(); //url
            const fileRef = postCover.ref.location.path; // actual path
            
            await storageRef.child(postData["oldcover"]).delete().catch(err => {
                console.log(err);
            })
            console.log("image deleted");

            let updatePost = {
                title: postData.title,
                content: postData.content,
                cover: downloadURL,
                fileref: fileRef
            }

            const post = await firebase.firestore().collection("posts").doc(postid)
            .set(updatePost, {merge: true}).catch(err => console.log(err));
            // if (post) {
                console.log("post updated");
            // }
            return post;
        } else {
            const post = await firebase.firestore().collection("posts").doc(postid)
            .set(postData, {merge:true}).catch(err => console.log(err));
            console.log("post updated");
            return post;
        }
    }

    async deletePost(postid, fileref) {
        const storageRef = firebase.storage().ref();
        await storageRef.child(fileref).delete().catch(err => console.log(err));
        console.log("image deleted");
        const post = await firebase.firestore().collection("posts").doc(postid).delete().catch(err => console.log(err));
        console.log("post deleted successfully");
        return post;
    }
}

export default new Firebase();